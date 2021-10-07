#!/bin/bash

CFLAGS="-s USE_PTHREADS=1 -O3 -I/opt/ffmpeg/include"
LDFLAGS="$CFLAGS -L/opt/ffmpeg/lib -s INITIAL_MEMORY=33554432"


FLAGS=(
# --disable-all
#   --enable-avcodec
#   --enable-avformat
#   --enable-avfilter
#   --enable-avdevice
#   --enable-avutil
#   --enable-swresample
#   --enable-postproc
#   --enable-swscale
#   --enable-protocol=file
#   --enable-decoder=aac,pcm_s16le
#   --enable-demuxer=mov,matroska
#   --enable-muxer=mp4
  --target-os=none
  --arch=x86_32
  --enable-cross-compile
  --disable-debug
  --disable-x86asm
  --disable-inline-asm
  --disable-stripping
  --disable-programs
  --disable-doc
  --disable-runtime-cpudetect
  --disable-autodetect
  --pkg-config-flags="--static"
  # --disable-pthreads --disable-w32threads --disable-os2threads
  --extra-cflags="$CFLAGS"
  --extra-cxxflags="$CFLAGS"
  --extra-ldflags="$LDFLAGS"
  --nm="llvm-nm -g"
  --ar=emar
  --as=llvm-as
  --ranlib=llvm-ranlib
  --cc=emcc
  --cxx=em++
  --objcc=emcc
  --dep-cc=emcc
  --logfile=/dev/stdout
)

emconfigure ./configure "${FLAGS[@]}"
