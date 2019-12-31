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

CC = gcc

.PHONY: all
all: libduktape.$(SO_REALNAME_SUFFIX) libduktaped.$(SO_REALNAME_SUFFIX) examples

.PHONY: clean
clean:
	rm -rf libduktaped.205.20500.so.dSYM/
	rm -f libduktape.205.20500.so libduktaped.205.20500.so

.PHONY: examples
examples:
	make -C examples/hello
	make -C examples/sandbox

libduktape.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktape.$(SO_SONAME_SUFFIX) -o $@ $(DUKTAPE_SOURCES)

libduktaped.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -g -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktaped.$(SO_SONAME_SUFFIX) -o $@ $(DUKTAPE_SOURCES)
