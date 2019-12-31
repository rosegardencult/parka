#
#  Example Makefile for building a program with embedded Duktape.
#
#  There are two source sets in the distribution: (1) combined sources where
#  you only need duktape.c, duktape.h, and duk_config.h, and (2) separate
#  sources where you have a bunch of source and header files.  Whichever
#  you use, simply include the relevant sources into your C project.  This
#  Makefile uses the combined source file.
#

DUKTAPE_SOURCES = ../../src/duk/*.c

CC = clang
CCOPTS = -Os -pedantic -std=c99 -Wall -fstrict-aliasing -fomit-frame-pointer
CCOPTS += -I./../../src/duk
CCLIBS = -lm
DEFINES =

OBJDIR = build

all: $(OBJDIR) hello

$(OBJDIR):
	mkdir -p $(OBJDIR)

hello: hello.c
	$(CC) -o $(OBJDIR)/$@ $(DEFINES) $(CCOPTS) $(DUKTAPE_SOURCES) hello.c $(CCLIBS)
