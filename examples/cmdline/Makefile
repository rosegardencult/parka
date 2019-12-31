#
#  Example Makefile for building a program with embedded Duktape.
#  The example program here is the Duktape command line tool.
#

DUKTAPE_SOURCES = ../../src/duk/*.c

CMDLINE_SOURCES = duk_cmdline.c

CC = gcc
CCOPTS = -Os -pedantic -std=c99 -Wall -fstrict-aliasing -fomit-frame-pointer
CCOPTS += -I./ -I./../../src/duk/
CCLIBS = -lm

# Enable console object (console.log() etc) for command line.
CCOPTS += -DDUK_CMDLINE_CONSOLE_SUPPORT -I./console
CMDLINE_SOURCES += console/duk_console.c

# Enable Duktape.Logger for command line.
CCOPTS += -DDUK_CMDLINE_LOGGING_SUPPORT -I./logging
CMDLINE_SOURCES += logging/duk_logging.c

# Enable Duktape 1.x module loading for command line.
CCOPTS += -DDUK_CMDLINE_MODULE_SUPPORT -I./module-duktape
CMDLINE_SOURCES += module-duktape/duk_module_duktape.c

# Enable print() and alert() for command line using an optional extra module.
CCOPTS += -DDUK_CMDLINE_PRINTALERT_SUPPORT -I./print-alert
CMDLINE_SOURCES += print-alert/duk_print_alert.c

OBJDIR = build

all: $(OBJDIR) duk

$(OBJDIR):
	mkdir -p $(OBJDIR)

duk: $(DUKTAPE_SOURCES)
	$(CC) -o $(OBJDIR)/$@ $(DEFINES) $(CCOPTS) $(DUKTAPE_SOURCES) $(CMDLINE_SOURCES) $(CCLIBS)
