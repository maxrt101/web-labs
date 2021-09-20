
TOPDIR   := $(shell pwd)
PREFIX   := $(TOPDIR)/build

CXX      := clang++
CXXFLAGS := -std=c++17 -I$(TOPDIR)/app -I$(PREFIX)/include -I$(TOPDIR)/json/include
LDFLAGS  := -L$(PREFIX)/lib -lmrt -lpthread -lhttpserver

SRC      := app/main.cc app/car.cc
TARGET   := $(PREFIX)/bin/app

.PHONY: build

define Dependency
  if [ ! -f "$1/.built" ]; then \
    $2; \
  fi
endef

build: prepare
	$(info Building $(TARGET))
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $(SRC) -o $(TARGET)

prepare: dependencies
	mkdir -p $(PREFIX)
	mkdir -p $(PREFIX)/bin
	mkdir -p $(PREFIX)/include
	mkdir -p $(PREFIX)/lib

dependencies:
	$(info Building Dependencies)
	$(call Dependency,http-server,cd http-server; make PREFIX=$(PREFIX); touch .built)
	$(call Dependency,json,cd json; mkdir -p build; cd build; cmake ..; cmake --build .; touch ../.built)

clean:
	rm -rf http-server/.built
	rm -rf json/.built

$(V).SILENT:

