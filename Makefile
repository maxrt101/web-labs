
TOPDIR   := $(shell pwd)
BINDIR   := $(TOPDIR)/bin

CXX      := clang++
CXXFLAGS := -std=c++17 -I$(TOPDIR)/app -I$(TOPDIR)/http-server/src -I$(TOPDIR)/json/include
LDFLAGS  := -L$(TOPDIR)/http-server/src/mrt/bin -L$(TOPDIR)/http-server/bin -lmrt -lpthread -lhttpserver

SRC      := app/main.cc app/car.cc
TARGET   := $(BINDIR)/app

.PHONY: build

build: prepare
	$(info Building $(TARGET))
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $(SRC) -o $(TARGET)

prepare: dependencies
	mkdir -p $(BINDIR)

dependencies:
	$(info Building Dependencies)
	if [ ! -f http-server/.built ]; then \
		cd http-server; \
		make; \
	fi
	if [ ! -f json/build/.built ]; then \
		cd json;       	 		\
		mkdir build;    		\
		cd build;       		\
		cmake ..;       		\
		cmake --build . ; 	\
		touch .built;  			\
	fi

$(V).SILENT:

