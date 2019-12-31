#
#  Example Makefile for building the sandbox example
#

DUKTAPE_SOURCES = ../../src/duk/*.c

CC = gcc

OBJDIR = build

all: $(OBJDIR) sandbox

$(OBJDIR):
	mkdir -p $(OBJDIR)

sandbox:
	$(CC) -o $(OBJDIR)/$@ -std=c99 -O2 -Wall -Wextra -I../../src/duk/ $(DUKTAPE_SOURCES) sandbox.c -lm
