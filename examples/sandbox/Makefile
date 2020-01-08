#
#  Example Makefile for building the sandbox example
#

DUKTAPE_SOURCES = ../../src/duk/*.c

ifeq ($(OS),Windows_NT)
	CC := "C:\Program Files\LLVM\bin\clang.exe"
else
	CC := clang
	CCLIBS = -lm
endif

OBJDIR = build

all: $(OBJDIR) sandbox

$(OBJDIR):
	mkdir -p $(OBJDIR)

sandbox:
	$(CC) -o $(OBJDIR)/$@ -std=c99 -O2 -Wall -Wextra -I../../src/duk/ $(DUKTAPE_SOURCES) sandbox.c $(CCLIBS)
