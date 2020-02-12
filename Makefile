# Soname version must be bumped whenever a binary compatibility change occurs
# (and should not be bumped when the library is compatible).  A simple Duktape
# convention is to set soname version to (100*MAJOR + MINOR), e.g. 104 for
# Duktape 1.4.x, so that it gets automatically bumped for major and minor
# releases (potentially binary incompatible), but not for patch releases.
DUK_VERSION = 20500
SONAME_VERSION = 205
REAL_VERSION = $(SONAME_VERSION).$(DUK_VERSION)

OPTS = -Wall -Wextra -Os
TEST_OPTS = --prep-test-path tests/prep_test.py --minify-uglifyjs2 tests/node_modules/.bin/uglifyjs --util-include-path tests/ecmascript --known-issues tests/known_issues.yaml

ifeq ($(OS),Windows_NT)
	CC := "C:\Program Files\LLVM\bin\clang.exe"
	LIB_TYPE = dll
endif

ifeq ($(shell uname -s),Darwin)
	CC := clang
	LIB_TYPE = dylib
endif

ifeq ($(shell uname -s),Linux)
	CC := clang
	OPTS += -fPIC
	LIB_TYPE = so
endif

DUKTAPE_SOURCES = src/duk/*.c

OBJDIR = build

.PHONY: all
all: libduktape libduktaped examples

.PHONY: $(OBJDIR)
$(OBJDIR):
	mkdir -p $(OBJDIR)

.PHONY: clean
clean:
	rm -rf build
	rm -rf examples/cmdline/build examples/hello/build examples/sandbox/build
	rm -rf tests/node_modules
	cargo clean

.PHONY: lint
lint:
	clang-format --verbose -i src/**/*.c src/**/*.h

.PHONY: database
database:
	bear -v -o $(OBJDIR)/compile_commands.json make all

.PHONY: issue_count
issue_count:
	@echo "FIXME:     `grep FIXME: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "XXX:       `grep XXX: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "TODO:      `grep TODO: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "NOTE:      `grep NOTE: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "SCANBUILD: `grep SCANBUILD: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"

.PHONY: line_count
line_count:
	@echo "Line Count: `cloc --quiet --vcs=git`"

# Overall quick test target.
.PHONY: test
test: test_api test_ecma

.PHONY: test_dependencies
test_dependencies:
	cd tests && npm install

.PHONY: test_api
test_api: test_dependencies
	node tests/runtests.js $(TEST_OPTS) --num-threads 8 --log-file=build/test_api.json tests/api/

.PHONY: test_ecma
test_ecma: test_dependencies examples
	node tests/runtests.js $(TEST_OPTS) --run-duk --cmd-duk=$(shell pwd)/examples/cmdline/build/duk --num-threads 8 --log-file=build/test_ecma.json tests/ecmascript/

.PHONY: examples
examples:
	make -C examples/hello
	make -C examples/sandbox
	make -C examples/cmdline

.PHONY: cargo
cargo:
	cargo build

libduktape: $(OBJDIR) cargo
	$(CC) -shared $(OPTS) -o $(OBJDIR)/$@.$(LIB_TYPE) $(DUKTAPE_SOURCES)

libduktaped: $(OBJDIR) cargo
	$(CC) -shared -g $(OPTS) -o $(OBJDIR)/$@.$(LIB_TYPE) $(DUKTAPE_SOURCES)
