#
#  Example of how to build and install locally as a shared library
#
#  Usage:
#
#    $ make -f Makefile.sharedlibrary
#    $ sudo make -f Makefile.sharedlibrary install
#    $ make -f Makefile.sharedlibrary duk  # --> example 'duk' linked to shared libduktape
#
#    $ ls -l duk
#    -rwxrwxr-x 1 duktape duktape 19407 Nov 30 15:48 duk
#
#    $ ldd ./duk
#            linux-vdso.so.1 =>  (0x00007ffd5ed3c000)
#            libduktape.so.104 => /usr/local/lib/libduktape.so.104 (0x00007fb2f9753000)
#            libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007fb2f944d000)
#            libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fb2f9088000)
#            /lib64/ld-linux-x86-64.so.2 (0x00007fb2f9991000)
#
#  Based on: http://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html

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

# Change to actual path for actual distribution packaging.
INSTALL_PREFIX = /usr/local

# The 'noline' variant may be more appropriate for some distributions; it
# doesn't have #line directives in the combined source.
DUKTAPE_SRCDIR = ./src
#DUKTAPE_SRCDIR = ./src-noline

CC = gcc

.PHONY: all
all: libduktape.$(SO_REALNAME_SUFFIX) libduktaped.$(SO_REALNAME_SUFFIX)

# If the default duk_config.h is not suitable for the distribution, modify it
# before compiling the shared library and copy the same, edited duk_config.h
# to $INSTALL_PREFIX/include on installation.

libduktape.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktape.$(SO_SONAME_SUFFIX) \
		-o $@ $(DUKTAPE_SRCDIR)/duktape.c

libduktaped.$(SO_REALNAME_SUFFIX):
	$(CC) -shared -fPIC -g -Wall -Wextra -Os -Wl,$(LD_SONAME_ARG),libduktaped.$(SO_SONAME_SUFFIX) \
		-o $@ $(DUKTAPE_SRCDIR)/duktape.c

# Symlinks depend on platform conventions.
.PHONY: install
install: libduktape.$(SO_REALNAME_SUFFIX) libduktaped.$(SO_REALNAME_SUFFIX)
	mkdir -p $(INSTALL_PREFIX)/lib/
	cp $+ $(INSTALL_PREFIX)/lib/
	rm -f $(INSTALL_PREFIX)/lib/libduktape.so $(INSTALL_PREFIX)/lib/libduktape.$(SO_SONAME_SUFFIX)
	ln -s libduktape.$(SO_REALNAME_SUFFIX) $(INSTALL_PREFIX)/lib/libduktape.so
	ln -s libduktape.$(SO_REALNAME_SUFFIX) $(INSTALL_PREFIX)/lib/libduktape.$(SO_SONAME_SUFFIX)
	rm -f $(INSTALL_PREFIX)/lib/libduktaped.so $(INSTALL_PREFIX)/lib/libduktaped.$(SO_SONAME_SUFFIX)
	ln -s libduktaped.$(SO_REALNAME_SUFFIX) $(INSTALL_PREFIX)/lib/libduktaped.so
	ln -s libduktaped.$(SO_REALNAME_SUFFIX) $(INSTALL_PREFIX)/lib/libduktaped.$(SO_SONAME_SUFFIX)
	mkdir -p $(INSTALL_PREFIX)/include/
	cp $(DUKTAPE_SRCDIR)/duktape.h $(DUKTAPE_SRCDIR)/duk_config.h $(INSTALL_PREFIX)/include/

CCOPTS = -I./examples/cmdline
duk:
	$(CC) $(CCOPTS) -I$(INSTALL_PREFIX)/include -L$(INSTALL_PREFIX)/lib -Wall -Wextra -Os -o $@ ./examples/cmdline/duk_cmdline.c -lduktape -lm
