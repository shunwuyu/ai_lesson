# Makefile.in generated by automake 1.16.1 from Makefile.am.
# debug/Makefile.  Generated from Makefile.in by configure.

# Copyright (C) 1994-2018 Free Software Foundation, Inc.

# This Makefile.in is free software; the Free Software Foundation
# gives unlimited permission to copy and/or distribute it,
# with or without modifications, as long as this notice is preserved.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY, to the extent permitted by law; without
# even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE.




am__is_gnu_make = { \
  if test -z '$(MAKELEVEL)'; then \
    false; \
  elif test -n '$(MAKE_HOST)'; then \
    true; \
  elif test -n '$(MAKE_VERSION)' && test -n '$(CURDIR)'; then \
    true; \
  else \
    false; \
  fi; \
}
am__make_running_with_option = \
  case $${target_option-} in \
      ?) ;; \
      *) echo "am__make_running_with_option: internal error: invalid" \
              "target option '$${target_option-}' specified" >&2; \
         exit 1;; \
  esac; \
  has_opt=no; \
  sane_makeflags=$$MAKEFLAGS; \
  if $(am__is_gnu_make); then \
    sane_makeflags=$$MFLAGS; \
  else \
    case $$MAKEFLAGS in \
      *\\[\ \	]*) \
        bs=\\; \
        sane_makeflags=`printf '%s\n' "$$MAKEFLAGS" \
          | sed "s/$$bs$$bs[$$bs $$bs	]*//g"`;; \
    esac; \
  fi; \
  skip_next=no; \
  strip_trailopt () \
  { \
    flg=`printf '%s\n' "$$flg" | sed "s/$$1.*$$//"`; \
  }; \
  for flg in $$sane_makeflags; do \
    test $$skip_next = yes && { skip_next=no; continue; }; \
    case $$flg in \
      *=*|--*) continue;; \
        -*I) strip_trailopt 'I'; skip_next=yes;; \
      -*I?*) strip_trailopt 'I';; \
        -*O) strip_trailopt 'O'; skip_next=yes;; \
      -*O?*) strip_trailopt 'O';; \
        -*l) strip_trailopt 'l'; skip_next=yes;; \
      -*l?*) strip_trailopt 'l';; \
      -[dEDm]) skip_next=yes;; \
      -[JT]) skip_next=yes;; \
    esac; \
    case $$flg in \
      *$$target_option*) has_opt=yes; break;; \
    esac; \
  done; \
  test $$has_opt = yes
am__make_dryrun = (target_option=n; $(am__make_running_with_option))
am__make_keepgoing = (target_option=k; $(am__make_running_with_option))
pkgdatadir = $(datadir)/xz
pkgincludedir = $(includedir)/xz
pkglibdir = $(libdir)/xz
pkglibexecdir = $(libexecdir)/xz
am__cd = CDPATH="$${ZSH_VERSION+.}$(PATH_SEPARATOR)" && cd
install_sh_DATA = $(install_sh) -c -m 644
install_sh_PROGRAM = $(install_sh) -c
install_sh_SCRIPT = $(install_sh) -c
INSTALL_HEADER = $(INSTALL_DATA)
transform = $(program_transform_name)
NORMAL_INSTALL = :
PRE_INSTALL = :
POST_INSTALL = :
NORMAL_UNINSTALL = :
PRE_UNINSTALL = :
POST_UNINSTALL = :
build_triplet = arm-apple-darwin23.6.0
host_triplet = arm-apple-darwin23.6.0
noinst_PROGRAMS = repeat$(EXEEXT) sync_flush$(EXEEXT) \
	full_flush$(EXEEXT) memusage$(EXEEXT) crc32$(EXEEXT) \
	known_sizes$(EXEEXT) hex2bin$(EXEEXT)
#am__append_1 = $(top_builddir)/lib/libgnu.a
subdir = debug
ACLOCAL_M4 = $(top_srcdir)/aclocal.m4
am__aclocal_m4_deps = $(top_srcdir)/m4/ax_check_capsicum.m4 \
	$(top_srcdir)/m4/ax_pthread.m4 $(top_srcdir)/m4/getopt.m4 \
	$(top_srcdir)/m4/gettext.m4 $(top_srcdir)/m4/host-cpu-c-abi.m4 \
	$(top_srcdir)/m4/iconv.m4 $(top_srcdir)/m4/intlmacosx.m4 \
	$(top_srcdir)/m4/lib-ld.m4 $(top_srcdir)/m4/lib-link.m4 \
	$(top_srcdir)/m4/lib-prefix.m4 $(top_srcdir)/m4/libtool.m4 \
	$(top_srcdir)/m4/ltoptions.m4 $(top_srcdir)/m4/ltsugar.m4 \
	$(top_srcdir)/m4/ltversion.m4 $(top_srcdir)/m4/lt~obsolete.m4 \
	$(top_srcdir)/m4/nls.m4 $(top_srcdir)/m4/po.m4 \
	$(top_srcdir)/m4/posix-shell.m4 $(top_srcdir)/m4/progtest.m4 \
	$(top_srcdir)/m4/tuklib_common.m4 \
	$(top_srcdir)/m4/tuklib_cpucores.m4 \
	$(top_srcdir)/m4/tuklib_integer.m4 \
	$(top_srcdir)/m4/tuklib_mbstr.m4 \
	$(top_srcdir)/m4/tuklib_physmem.m4 \
	$(top_srcdir)/m4/tuklib_progname.m4 \
	$(top_srcdir)/m4/visibility.m4 $(top_srcdir)/configure.ac
am__configure_deps = $(am__aclocal_m4_deps) $(CONFIGURE_DEPENDENCIES) \
	$(ACLOCAL_M4)
DIST_COMMON = $(srcdir)/Makefile.am $(am__DIST_COMMON)
mkinstalldirs = $(install_sh) -d
CONFIG_HEADER = $(top_builddir)/config.h
CONFIG_CLEAN_FILES =
CONFIG_CLEAN_VPATH_FILES =
PROGRAMS = $(noinst_PROGRAMS)
crc32_SOURCES = crc32.c
crc32_OBJECTS = crc32.$(OBJEXT)
crc32_LDADD = $(LDADD)
am__DEPENDENCIES_1 =
crc32_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
AM_V_lt = $(am__v_lt_$(V))
am__v_lt_ = $(am__v_lt_$(AM_DEFAULT_VERBOSITY))
am__v_lt_0 = --silent
am__v_lt_1 = 
full_flush_SOURCES = full_flush.c
full_flush_OBJECTS = full_flush.$(OBJEXT)
full_flush_LDADD = $(LDADD)
full_flush_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
hex2bin_SOURCES = hex2bin.c
hex2bin_OBJECTS = hex2bin.$(OBJEXT)
hex2bin_LDADD = $(LDADD)
hex2bin_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
known_sizes_SOURCES = known_sizes.c
known_sizes_OBJECTS = known_sizes.$(OBJEXT)
known_sizes_LDADD = $(LDADD)
known_sizes_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
memusage_SOURCES = memusage.c
memusage_OBJECTS = memusage.$(OBJEXT)
memusage_LDADD = $(LDADD)
memusage_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
repeat_SOURCES = repeat.c
repeat_OBJECTS = repeat.$(OBJEXT)
repeat_LDADD = $(LDADD)
repeat_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
sync_flush_SOURCES = sync_flush.c
sync_flush_OBJECTS = sync_flush.$(OBJEXT)
sync_flush_LDADD = $(LDADD)
sync_flush_DEPENDENCIES = $(top_builddir)/src/liblzma/liblzma.la \
	$(am__append_1) $(am__DEPENDENCIES_1)
AM_V_P = $(am__v_P_$(V))
am__v_P_ = $(am__v_P_$(AM_DEFAULT_VERBOSITY))
am__v_P_0 = false
am__v_P_1 = :
AM_V_GEN = $(am__v_GEN_$(V))
am__v_GEN_ = $(am__v_GEN_$(AM_DEFAULT_VERBOSITY))
am__v_GEN_0 = @echo "  GEN     " $@;
am__v_GEN_1 = 
AM_V_at = $(am__v_at_$(V))
am__v_at_ = $(am__v_at_$(AM_DEFAULT_VERBOSITY))
am__v_at_0 = @
am__v_at_1 = 
DEFAULT_INCLUDES = -I. -I$(top_builddir)
depcomp = $(SHELL) $(top_srcdir)/build-aux/depcomp
am__maybe_remake_depfiles = depfiles
am__depfiles_remade = ./$(DEPDIR)/crc32.Po ./$(DEPDIR)/full_flush.Po \
	./$(DEPDIR)/hex2bin.Po ./$(DEPDIR)/known_sizes.Po \
	./$(DEPDIR)/memusage.Po ./$(DEPDIR)/repeat.Po \
	./$(DEPDIR)/sync_flush.Po
am__mv = mv -f
COMPILE = $(CC) $(DEFS) $(DEFAULT_INCLUDES) $(INCLUDES) $(AM_CPPFLAGS) \
	$(CPPFLAGS) $(AM_CFLAGS) $(CFLAGS)
LTCOMPILE = $(LIBTOOL) $(AM_V_lt) --tag=CC $(AM_LIBTOOLFLAGS) \
	$(LIBTOOLFLAGS) --mode=compile $(CC) $(DEFS) \
	$(DEFAULT_INCLUDES) $(INCLUDES) $(AM_CPPFLAGS) $(CPPFLAGS) \
	$(AM_CFLAGS) $(CFLAGS)
AM_V_CC = $(am__v_CC_$(V))
am__v_CC_ = $(am__v_CC_$(AM_DEFAULT_VERBOSITY))
am__v_CC_0 = @echo "  CC      " $@;
am__v_CC_1 = 
CCLD = $(CC)
LINK = $(LIBTOOL) $(AM_V_lt) --tag=CC $(AM_LIBTOOLFLAGS) \
	$(LIBTOOLFLAGS) --mode=link $(CCLD) $(AM_CFLAGS) $(CFLAGS) \
	$(AM_LDFLAGS) $(LDFLAGS) -o $@
AM_V_CCLD = $(am__v_CCLD_$(V))
am__v_CCLD_ = $(am__v_CCLD_$(AM_DEFAULT_VERBOSITY))
am__v_CCLD_0 = @echo "  CCLD    " $@;
am__v_CCLD_1 = 
SOURCES = crc32.c full_flush.c hex2bin.c known_sizes.c memusage.c \
	repeat.c sync_flush.c
DIST_SOURCES = crc32.c full_flush.c hex2bin.c known_sizes.c memusage.c \
	repeat.c sync_flush.c
am__can_run_installinfo = \
  case $$AM_UPDATE_INFO_DIR in \
    n|no|NO) false;; \
    *) (install-info --version) >/dev/null 2>&1;; \
  esac
am__tagged_files = $(HEADERS) $(SOURCES) $(TAGS_FILES) $(LISP)
# Read a list of newline-separated strings from the standard input,
# and print each of them once, without duplicates.  Input order is
# *not* preserved.
am__uniquify_input = $(AWK) '\
  BEGIN { nonempty = 0; } \
  { items[$$0] = 1; nonempty = 1; } \
  END { if (nonempty) { for (i in items) print i; }; } \
'
# Make sure the list of sources is unique.  This is necessary because,
# e.g., the same source file might be shared among _SOURCES variables
# for different programs/libraries.
am__define_uniq_tagged_files = \
  list='$(am__tagged_files)'; \
  unique=`for i in $$list; do \
    if test -f "$$i"; then echo $$i; else echo $(srcdir)/$$i; fi; \
  done | $(am__uniquify_input)`
ETAGS = etags
CTAGS = ctags
am__DIST_COMMON = $(srcdir)/Makefile.in \
	$(top_srcdir)/build-aux/depcomp README
DISTFILES = $(DIST_COMMON) $(DIST_SOURCES) $(TEXINFOS) $(EXTRA_DIST)
ACLOCAL = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/missing aclocal-1.16
AMTAR = $${TAR-tar}
AM_CFLAGS =  -pthread -fvisibility=hidden -Wall -Wextra -Wvla -Wformat=2 -Winit-self -Wmissing-include-dirs -Wstrict-aliasing -Wfloat-equal -Wundef -Wshadow -Wpointer-arith -Wbad-function-cast -Wwrite-strings -Waggregate-return -Wstrict-prototypes -Wold-style-definition -Wmissing-prototypes -Wmissing-declarations -Wmissing-noreturn -Wredundant-decls
AM_DEFAULT_VERBOSITY = 1
AR = ar
AS = as
AUTOCONF = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/missing autoconf
AUTOHEADER = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/missing autoheader
AUTOMAKE = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/missing automake-1.16
AWK = awk
CAPSICUM_LIB = 
CC = gcc
CCAS = gcc
CCASDEPMODE = depmode=gcc3
CCASFLAGS = -g -O2
CCDEPMODE = depmode=gcc3
CFLAGS = -g -O2
CFLAG_VISIBILITY = -fvisibility=hidden
CPP = gcc -E
CPPFLAGS = 
CYGPATH_W = echo
DEFS = -DHAVE_CONFIG_H
DEPDIR = .deps
DLLTOOL = false
DSYMUTIL = dsymutil
DUMPBIN = 
ECHO_C = \c
ECHO_N = 
ECHO_T = 
EGREP = /usr/bin/grep -E
EXEEXT = 
FGREP = /usr/bin/grep -F
GETOPT_H = 
GETTEXT_MACRO_VERSION = 0.20
GMSGFMT = /opt/homebrew/bin/msgfmt
GMSGFMT_015 = /opt/homebrew/bin/msgfmt
GREP = /usr/bin/grep
HAVE_VISIBILITY = 1
INSTALL = /usr/bin/install -c
INSTALL_DATA = ${INSTALL} -m 644
INSTALL_PROGRAM = ${INSTALL}
INSTALL_SCRIPT = ${INSTALL}
INSTALL_STRIP_PROGRAM = $(install_sh) -c -s
INTLLIBS = 
INTL_MACOSX_LIBS = -Wl,-framework -Wl,CoreFoundation
LD = /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/ld
LDFLAGS = 
LIBICONV = -liconv
LIBINTL = 
LIBOBJS = 
LIBS =  -lpthread
LIBTOOL = $(SHELL) $(top_builddir)/libtool
LIPO = lipo
LN_EXEEXT = $(EXEEXT)
LN_S = ln -s
LTLIBICONV = -liconv
LTLIBINTL = 
LTLIBOBJS = 
LT_SYS_LIBRARY_PATH = 
MAKEINFO = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/missing makeinfo
MANIFEST_TOOL = :
MKDIR_P = ../build-aux/install-sh -c -d
MSGFMT = /opt/homebrew/bin/msgfmt
MSGMERGE = /opt/homebrew/bin/msgmerge
MSGMERGE_FOR_MSGFMT_OPTION = --for-msgfmt
NM = /usr/bin/nm -B
NMEDIT = nmedit
OBJDUMP = objdump
OBJEXT = o
OTOOL = otool
OTOOL64 = :
PACKAGE = xz
PACKAGE_BUGREPORT = lasse.collin@tukaani.org
PACKAGE_NAME = XZ Utils
PACKAGE_STRING = XZ Utils 5.2.5
PACKAGE_TARNAME = xz
PACKAGE_URL = https://tukaani.org/xz/
PACKAGE_VERSION = 5.2.5
PATH_SEPARATOR = :
POSIX_SHELL = /bin/sh
POSUB = 
PREFERABLY_POSIX_SHELL = /bin/sh
PTHREAD_CC = gcc
PTHREAD_CFLAGS = -pthread
PTHREAD_LIBS = -lpthread
RANLIB = ranlib
RC = 
SED = /usr/bin/sed
SET_MAKE = 
SHELL = /bin/sh
STRIP = strip
USE_NLS = no
VERSION = 5.2.5
XGETTEXT = /opt/homebrew/bin/xgettext
XGETTEXT_015 = /opt/homebrew/bin/xgettext
XGETTEXT_EXTRA_OPTIONS = 
abs_builddir = /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/debug
abs_srcdir = /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/debug
abs_top_builddir = /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5
abs_top_srcdir = /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5
ac_ct_AR = ar
ac_ct_CC = gcc
ac_ct_DUMPBIN = 
am__include = include
am__leading_dot = .
am__quote = 
am__tar = $${TAR-tar} chof - "$$tardir"
am__untar = $${TAR-tar} xf -
ax_pthread_config = 
bindir = ${exec_prefix}/bin
build = arm-apple-darwin23.6.0
build_alias = 
build_cpu = arm
build_os = darwin23.6.0
build_vendor = apple
builddir = .
datadir = ${datarootdir}
datarootdir = ${prefix}/share
docdir = ${datarootdir}/doc/${PACKAGE_TARNAME}
dvidir = ${docdir}
enable_path_for_scripts = 
exec_prefix = ${prefix}
host = arm-apple-darwin23.6.0
host_alias = 
host_cpu = arm
host_os = darwin23.6.0
host_vendor = apple
htmldir = ${docdir}
includedir = ${prefix}/include
infodir = ${datarootdir}/info
install_sh = ${SHELL} /Users/shunwuyu/workspace/lesson/ai_lesson/llama/3.2/10/xz-5.2.5/build-aux/install-sh
libdir = ${exec_prefix}/lib
libexecdir = ${exec_prefix}/libexec
localedir = ${datarootdir}/locale
localstatedir = ${prefix}/var
mandir = ${datarootdir}/man
mkdir_p = $(MKDIR_P)
oldincludedir = /usr/include
pdfdir = ${docdir}
prefix = /usr/local
program_transform_name = s,x,x,
psdir = ${docdir}
sbindir = ${exec_prefix}/sbin
sharedstatedir = ${prefix}/com
srcdir = .
sysconfdir = ${prefix}/etc
target_alias = 
top_build_prefix = ../
top_builddir = ..
top_srcdir = ..
xz = xz
EXTRA_DIST = \
	translation.bash

AM_CPPFLAGS = \
	-I$(top_srcdir)/src/common \
	-I$(top_srcdir)/src/liblzma/api

LDADD = $(top_builddir)/src/liblzma/liblzma.la $(am__append_1) \
	$(LTLIBINTL)
all: all-am

.SUFFIXES:
.SUFFIXES: .c .lo .o .obj
$(srcdir)/Makefile.in:  $(srcdir)/Makefile.am  $(am__configure_deps)
	@for dep in $?; do \
	  case '$(am__configure_deps)' in \
	    *$$dep*) \
	      ( cd $(top_builddir) && $(MAKE) $(AM_MAKEFLAGS) am--refresh ) \
	        && { if test -f $@; then exit 0; else break; fi; }; \
	      exit 1;; \
	  esac; \
	done; \
	echo ' cd $(top_srcdir) && $(AUTOMAKE) --foreign debug/Makefile'; \
	$(am__cd) $(top_srcdir) && \
	  $(AUTOMAKE) --foreign debug/Makefile
Makefile: $(srcdir)/Makefile.in $(top_builddir)/config.status
	@case '$?' in \
	  *config.status*) \
	    cd $(top_builddir) && $(MAKE) $(AM_MAKEFLAGS) am--refresh;; \
	  *) \
	    echo ' cd $(top_builddir) && $(SHELL) ./config.status $(subdir)/$@ $(am__maybe_remake_depfiles)'; \
	    cd $(top_builddir) && $(SHELL) ./config.status $(subdir)/$@ $(am__maybe_remake_depfiles);; \
	esac;

$(top_builddir)/config.status: $(top_srcdir)/configure $(CONFIG_STATUS_DEPENDENCIES)
	cd $(top_builddir) && $(MAKE) $(AM_MAKEFLAGS) am--refresh

$(top_srcdir)/configure:  $(am__configure_deps)
	cd $(top_builddir) && $(MAKE) $(AM_MAKEFLAGS) am--refresh
$(ACLOCAL_M4):  $(am__aclocal_m4_deps)
	cd $(top_builddir) && $(MAKE) $(AM_MAKEFLAGS) am--refresh
$(am__aclocal_m4_deps):

clean-noinstPROGRAMS:
	@list='$(noinst_PROGRAMS)'; test -n "$$list" || exit 0; \
	echo " rm -f" $$list; \
	rm -f $$list || exit $$?; \
	test -n "$(EXEEXT)" || exit 0; \
	list=`for p in $$list; do echo "$$p"; done | sed 's/$(EXEEXT)$$//'`; \
	echo " rm -f" $$list; \
	rm -f $$list

crc32$(EXEEXT): $(crc32_OBJECTS) $(crc32_DEPENDENCIES) $(EXTRA_crc32_DEPENDENCIES) 
	@rm -f crc32$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(crc32_OBJECTS) $(crc32_LDADD) $(LIBS)

full_flush$(EXEEXT): $(full_flush_OBJECTS) $(full_flush_DEPENDENCIES) $(EXTRA_full_flush_DEPENDENCIES) 
	@rm -f full_flush$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(full_flush_OBJECTS) $(full_flush_LDADD) $(LIBS)

hex2bin$(EXEEXT): $(hex2bin_OBJECTS) $(hex2bin_DEPENDENCIES) $(EXTRA_hex2bin_DEPENDENCIES) 
	@rm -f hex2bin$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(hex2bin_OBJECTS) $(hex2bin_LDADD) $(LIBS)

known_sizes$(EXEEXT): $(known_sizes_OBJECTS) $(known_sizes_DEPENDENCIES) $(EXTRA_known_sizes_DEPENDENCIES) 
	@rm -f known_sizes$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(known_sizes_OBJECTS) $(known_sizes_LDADD) $(LIBS)

memusage$(EXEEXT): $(memusage_OBJECTS) $(memusage_DEPENDENCIES) $(EXTRA_memusage_DEPENDENCIES) 
	@rm -f memusage$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(memusage_OBJECTS) $(memusage_LDADD) $(LIBS)

repeat$(EXEEXT): $(repeat_OBJECTS) $(repeat_DEPENDENCIES) $(EXTRA_repeat_DEPENDENCIES) 
	@rm -f repeat$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(repeat_OBJECTS) $(repeat_LDADD) $(LIBS)

sync_flush$(EXEEXT): $(sync_flush_OBJECTS) $(sync_flush_DEPENDENCIES) $(EXTRA_sync_flush_DEPENDENCIES) 
	@rm -f sync_flush$(EXEEXT)
	$(AM_V_CCLD)$(LINK) $(sync_flush_OBJECTS) $(sync_flush_LDADD) $(LIBS)

mostlyclean-compile:
	-rm -f *.$(OBJEXT)

distclean-compile:
	-rm -f *.tab.c

include ./$(DEPDIR)/crc32.Po # am--include-marker
include ./$(DEPDIR)/full_flush.Po # am--include-marker
include ./$(DEPDIR)/hex2bin.Po # am--include-marker
include ./$(DEPDIR)/known_sizes.Po # am--include-marker
include ./$(DEPDIR)/memusage.Po # am--include-marker
include ./$(DEPDIR)/repeat.Po # am--include-marker
include ./$(DEPDIR)/sync_flush.Po # am--include-marker

$(am__depfiles_remade):
	@$(MKDIR_P) $(@D)
	@echo '# dummy' >$@-t && $(am__mv) $@-t $@

am--depfiles: $(am__depfiles_remade)

.c.o:
	$(AM_V_CC)$(COMPILE) -MT $@ -MD -MP -MF $(DEPDIR)/$*.Tpo -c -o $@ $<
	$(AM_V_at)$(am__mv) $(DEPDIR)/$*.Tpo $(DEPDIR)/$*.Po
#	$(AM_V_CC)source='$<' object='$@' libtool=no \
#	DEPDIR=$(DEPDIR) $(CCDEPMODE) $(depcomp) \
#	$(AM_V_CC_no)$(COMPILE) -c -o $@ $<

.c.obj:
	$(AM_V_CC)$(COMPILE) -MT $@ -MD -MP -MF $(DEPDIR)/$*.Tpo -c -o $@ `$(CYGPATH_W) '$<'`
	$(AM_V_at)$(am__mv) $(DEPDIR)/$*.Tpo $(DEPDIR)/$*.Po
#	$(AM_V_CC)source='$<' object='$@' libtool=no \
#	DEPDIR=$(DEPDIR) $(CCDEPMODE) $(depcomp) \
#	$(AM_V_CC_no)$(COMPILE) -c -o $@ `$(CYGPATH_W) '$<'`

.c.lo:
	$(AM_V_CC)$(LTCOMPILE) -MT $@ -MD -MP -MF $(DEPDIR)/$*.Tpo -c -o $@ $<
	$(AM_V_at)$(am__mv) $(DEPDIR)/$*.Tpo $(DEPDIR)/$*.Plo
#	$(AM_V_CC)source='$<' object='$@' libtool=yes \
#	DEPDIR=$(DEPDIR) $(CCDEPMODE) $(depcomp) \
#	$(AM_V_CC_no)$(LTCOMPILE) -c -o $@ $<

mostlyclean-libtool:
	-rm -f *.lo

clean-libtool:
	-rm -rf .libs _libs

ID: $(am__tagged_files)
	$(am__define_uniq_tagged_files); mkid -fID $$unique
tags: tags-am
TAGS: tags

tags-am: $(TAGS_DEPENDENCIES) $(am__tagged_files)
	set x; \
	here=`pwd`; \
	$(am__define_uniq_tagged_files); \
	shift; \
	if test -z "$(ETAGS_ARGS)$$*$$unique"; then :; else \
	  test -n "$$unique" || unique=$$empty_fix; \
	  if test $$# -gt 0; then \
	    $(ETAGS) $(ETAGSFLAGS) $(AM_ETAGSFLAGS) $(ETAGS_ARGS) \
	      "$$@" $$unique; \
	  else \
	    $(ETAGS) $(ETAGSFLAGS) $(AM_ETAGSFLAGS) $(ETAGS_ARGS) \
	      $$unique; \
	  fi; \
	fi
ctags: ctags-am

CTAGS: ctags
ctags-am: $(TAGS_DEPENDENCIES) $(am__tagged_files)
	$(am__define_uniq_tagged_files); \
	test -z "$(CTAGS_ARGS)$$unique" \
	  || $(CTAGS) $(CTAGSFLAGS) $(AM_CTAGSFLAGS) $(CTAGS_ARGS) \
	     $$unique

GTAGS:
	here=`$(am__cd) $(top_builddir) && pwd` \
	  && $(am__cd) $(top_srcdir) \
	  && gtags -i $(GTAGS_ARGS) "$$here"
cscopelist: cscopelist-am

cscopelist-am: $(am__tagged_files)
	list='$(am__tagged_files)'; \
	case "$(srcdir)" in \
	  [\\/]* | ?:[\\/]*) sdir="$(srcdir)" ;; \
	  *) sdir=$(subdir)/$(srcdir) ;; \
	esac; \
	for i in $$list; do \
	  if test -f "$$i"; then \
	    echo "$(subdir)/$$i"; \
	  else \
	    echo "$$sdir/$$i"; \
	  fi; \
	done >> $(top_builddir)/cscope.files

distclean-tags:
	-rm -f TAGS ID GTAGS GRTAGS GSYMS GPATH tags

distdir: $(BUILT_SOURCES)
	$(MAKE) $(AM_MAKEFLAGS) distdir-am

distdir-am: $(DISTFILES)
	@srcdirstrip=`echo "$(srcdir)" | sed 's/[].[^$$\\*]/\\\\&/g'`; \
	topsrcdirstrip=`echo "$(top_srcdir)" | sed 's/[].[^$$\\*]/\\\\&/g'`; \
	list='$(DISTFILES)'; \
	  dist_files=`for file in $$list; do echo $$file; done | \
	  sed -e "s|^$$srcdirstrip/||;t" \
	      -e "s|^$$topsrcdirstrip/|$(top_builddir)/|;t"`; \
	case $$dist_files in \
	  */*) $(MKDIR_P) `echo "$$dist_files" | \
			   sed '/\//!d;s|^|$(distdir)/|;s,/[^/]*$$,,' | \
			   sort -u` ;; \
	esac; \
	for file in $$dist_files; do \
	  if test -f $$file || test -d $$file; then d=.; else d=$(srcdir); fi; \
	  if test -d $$d/$$file; then \
	    dir=`echo "/$$file" | sed -e 's,/[^/]*$$,,'`; \
	    if test -d "$(distdir)/$$file"; then \
	      find "$(distdir)/$$file" -type d ! -perm -700 -exec chmod u+rwx {} \;; \
	    fi; \
	    if test -d $(srcdir)/$$file && test $$d != $(srcdir); then \
	      cp -fpR $(srcdir)/$$file "$(distdir)$$dir" || exit 1; \
	      find "$(distdir)/$$file" -type d ! -perm -700 -exec chmod u+rwx {} \;; \
	    fi; \
	    cp -fpR $$d/$$file "$(distdir)$$dir" || exit 1; \
	  else \
	    test -f "$(distdir)/$$file" \
	    || cp -p $$d/$$file "$(distdir)/$$file" \
	    || exit 1; \
	  fi; \
	done
check-am: all-am
check: check-am
all-am: Makefile $(PROGRAMS)
installdirs:
install: install-am
install-exec: install-exec-am
install-data: install-data-am
uninstall: uninstall-am

install-am: all-am
	@$(MAKE) $(AM_MAKEFLAGS) install-exec-am install-data-am

installcheck: installcheck-am
install-strip:
	if test -z '$(STRIP)'; then \
	  $(MAKE) $(AM_MAKEFLAGS) INSTALL_PROGRAM="$(INSTALL_STRIP_PROGRAM)" \
	    install_sh_PROGRAM="$(INSTALL_STRIP_PROGRAM)" INSTALL_STRIP_FLAG=-s \
	      install; \
	else \
	  $(MAKE) $(AM_MAKEFLAGS) INSTALL_PROGRAM="$(INSTALL_STRIP_PROGRAM)" \
	    install_sh_PROGRAM="$(INSTALL_STRIP_PROGRAM)" INSTALL_STRIP_FLAG=-s \
	    "INSTALL_PROGRAM_ENV=STRIPPROG='$(STRIP)'" install; \
	fi
mostlyclean-generic:

clean-generic:

distclean-generic:
	-test -z "$(CONFIG_CLEAN_FILES)" || rm -f $(CONFIG_CLEAN_FILES)
	-test . = "$(srcdir)" || test -z "$(CONFIG_CLEAN_VPATH_FILES)" || rm -f $(CONFIG_CLEAN_VPATH_FILES)

maintainer-clean-generic:
	@echo "This command is intended for maintainers to use"
	@echo "it deletes files that may require special tools to rebuild."
clean: clean-am

clean-am: clean-generic clean-libtool clean-noinstPROGRAMS \
	mostlyclean-am

distclean: distclean-am
		-rm -f ./$(DEPDIR)/crc32.Po
	-rm -f ./$(DEPDIR)/full_flush.Po
	-rm -f ./$(DEPDIR)/hex2bin.Po
	-rm -f ./$(DEPDIR)/known_sizes.Po
	-rm -f ./$(DEPDIR)/memusage.Po
	-rm -f ./$(DEPDIR)/repeat.Po
	-rm -f ./$(DEPDIR)/sync_flush.Po
	-rm -f Makefile
distclean-am: clean-am distclean-compile distclean-generic \
	distclean-tags

dvi: dvi-am

dvi-am:

html: html-am

html-am:

info: info-am

info-am:

install-data-am:

install-dvi: install-dvi-am

install-dvi-am:

install-exec-am:

install-html: install-html-am

install-html-am:

install-info: install-info-am

install-info-am:

install-man:

install-pdf: install-pdf-am

install-pdf-am:

install-ps: install-ps-am

install-ps-am:

installcheck-am:

maintainer-clean: maintainer-clean-am
		-rm -f ./$(DEPDIR)/crc32.Po
	-rm -f ./$(DEPDIR)/full_flush.Po
	-rm -f ./$(DEPDIR)/hex2bin.Po
	-rm -f ./$(DEPDIR)/known_sizes.Po
	-rm -f ./$(DEPDIR)/memusage.Po
	-rm -f ./$(DEPDIR)/repeat.Po
	-rm -f ./$(DEPDIR)/sync_flush.Po
	-rm -f Makefile
maintainer-clean-am: distclean-am maintainer-clean-generic

mostlyclean: mostlyclean-am

mostlyclean-am: mostlyclean-compile mostlyclean-generic \
	mostlyclean-libtool

pdf: pdf-am

pdf-am:

ps: ps-am

ps-am:

uninstall-am:

.MAKE: install-am install-strip

.PHONY: CTAGS GTAGS TAGS all all-am am--depfiles check check-am clean \
	clean-generic clean-libtool clean-noinstPROGRAMS cscopelist-am \
	ctags ctags-am distclean distclean-compile distclean-generic \
	distclean-libtool distclean-tags distdir dvi dvi-am html \
	html-am info info-am install install-am install-data \
	install-data-am install-dvi install-dvi-am install-exec \
	install-exec-am install-html install-html-am install-info \
	install-info-am install-man install-pdf install-pdf-am \
	install-ps install-ps-am install-strip installcheck \
	installcheck-am installdirs maintainer-clean \
	maintainer-clean-generic mostlyclean mostlyclean-compile \
	mostlyclean-generic mostlyclean-libtool pdf pdf-am ps ps-am \
	tags tags-am uninstall uninstall-am

.PRECIOUS: Makefile


# Tell versions [3.59,3.63) of GNU make to not export all variables.
# Otherwise a system limit (for SysV at least) may be exceeded.
.NOEXPORT:
