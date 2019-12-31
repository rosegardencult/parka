# Soname version must be bumped whenever a binary compatibility change occurs
# (and should not be bumped when the library is compatible).  A simple Duktape
# convention is to set soname version to (100*MAJOR + MINOR), e.g. 104 for
# Duktape 1.4.x, so that it gets automatically bumped for major and minor
# releases (potentially binary incompatible), but not for patch releases.
DUK_VERSION = 20500
SONAME_VERSION = 205
REAL_VERSION = $(SONAME_VERSION).$(DUK_VERSION)

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
all: $(OBJDIR) libduktape.$(SO_REALNAME_SUFFIX) libduktaped.$(SO_REALNAME_SUFFIX) examples

.PHONY: clean
clean:
	rm -rf build
	rm -rf examples/cmdline/build examples/hello/build examples/sandbox/build
	cargo clean

.PHONY: examples
examples:
	make -C examples/hello
	make -C examples/sandbox
	make -C examples/cmdline

.PHONY: format
format:
	clang-format --verbose -i src/duk/*.c src/duk/*.h

.PHONY: database
database:
	bear -v -o $(OBJDIR)/compile_commands.json make all

.PHONY: issues
issues:
	@echo "FIXME:     `grep FIXME: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "XXX:       `grep XXX: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "TODO:      `grep TODO: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "NOTE:      `grep NOTE: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"
	@echo "SCANBUILD: `grep SCANBUILD: src/duk/*.c src/duk/*.h | wc -l | tr -d ' '`"

.PHONY: lines
lines:
	@echo "Line Count: `cloc --quiet src/duk/*.c src/duk/*.h`"

$(OBJDIR):
	mkdir -p $(OBJDIR)

libduktape.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktape.$(SO_SONAME_SUFFIX) -o $(OBJDIR)/$@ $(DUKTAPE_SOURCES)

libduktaped.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -g -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktaped.$(SO_SONAME_SUFFIX) -o $(OBJDIR)/$@ $(DUKTAPE_SOURCES)
