# Soname version must be bumped whenever a binary compatibility change occurs
# (and should not be bumped when the library is compatible).  A simple Duktape
# convention is to set soname version to (100*MAJOR + MINOR), e.g. 104 for
# Duktape 1.4.x, so that it gets automatically bumped for major and minor
# releases (potentially binary incompatible), but not for patch releases.
DUK_VERSION = 20500
SONAME_VERSION = 205
REAL_VERSION = $(SONAME_VERSION).$(DUK_VERSION)

TEST_OPTS = --prep-test-path tests/prep_test.py --util-include-path tests/ecmascript --known-issues tests/known_issues.yaml

# Mac has an unusual .so naming convention
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell uname -s)
endif

ifeq ($(DETECTED_OS),Darwin)
    LD_SONAME_ARG=-install_name
    SO_SONAME_SUFFIX=$(SONAME_VERSION).so
    SO_REALNAME_SUFFIX=$(REAL_VERSION).so
else
    LD_SONAME_ARG=-soname
    SO_SONAME_SUFFIX=so.$(SONAME_VERSION)
    SO_REALNAME_SUFFIX=so.$(REAL_VERSION)
endif

DUKTAPE_SOURCES = src/duk/*.c

CC = clang

OBJDIR = build

.PHONY: all
all: libduktape.$(SO_REALNAME_SUFFIX) libduktaped.$(SO_REALNAME_SUFFIX) examples

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
	clang-format --verbose -i {src,tests}/**/*.c src/**/*.h

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
test_api: test_dependencies libduktape.$(SO_REALNAME_SUFFIX)
	node tests/runtests.js $(TEST_OPTS) --num-threads 1 --log-file=build/test_api.log tests/api/

.PHONY: test_ecma
test_ecma: test_dependencies examples
	node tests/runtests.js $(TEST_OPTS) --run-duk --cmd-duk=$(shell pwd)/examples/cmdline/build/duk --num-threads 4 --log-file=build/test_ecma.log tests/ecmascript/

.PHONY: examples
examples:
	make -C examples/hello
	make -C examples/sandbox
	make -C examples/cmdline

libduktape.$(SO_REALNAME_SUFFIX): $(OBJDIR)
	$(CC) -shared -fPIC -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktape.$(SO_SONAME_SUFFIX) -o $(OBJDIR)/$@ $(DUKTAPE_SOURCES)

libduktaped.$(SO_REALNAME_SUFFIX): $(OBJDIR)
	$(CC) -shared -fPIC -g -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktaped.$(SO_SONAME_SUFFIX) -o $(OBJDIR)/$@ $(DUKTAPE_SOURCES)
