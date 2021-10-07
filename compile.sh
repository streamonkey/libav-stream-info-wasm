#!/bin/bash

emmake make -j


mkdir -p /dist
  # -I. \
  # -I./fftools \

  
FLAGS=(
  -s MODULARIZE=1
  -s EXPORT_ES6=1
  -O3 --closure 1
  -I. -I./fftools
  -Llibavcodec -Llibavdevice -Llibavfilter -Llibavformat -Llibavresample -Llibavutil -Llibpostproc -Llibswscale -Llibswresample
  -Qunused-arguments
  -lavdevice -lavfilter -lavformat -lavcodec -lswresample -lswscale -lavutil -lm
  -s USE_SDL=2                    # use SDL2
  -s USE_PTHREADS=1               # enable pthreads support
  -s INITIAL_MEMORY=33554432      # 33554432 bytes = 32 MB
  -o /dist/ffprobe-core.js
  fftools/cmdutils.c fftools/ffprobe.c
)

emcc "${FLAGS[@]}"