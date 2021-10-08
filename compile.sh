#!/bin/bash 

set -eo pipefail

emmake make -j


mkdir -p /dist
  # -I. \
  # -I./fftools \

  
FLAGS=(
  --bind
  -s MODULARIZE=1
  -s EXPORT_ES6=1
  -O3 --closure 1
  # -O0
  -I. -I./fftools
  -Llibavcodec -Llibavdevice -Llibavfilter -Llibavformat -Llibavresample -Llibavutil -Llibpostproc -Llibswscale -Llibswresample
  -Qunused-arguments
  -lavdevice -lavfilter -lavformat -lavcodec -lswresample -lswscale -lavutil -lm
  -s USE_SDL=2                   
  -s USE_PTHREADS=1               
  -s INITIAL_MEMORY=33554432      
  -s INVOKE_RUN=0  
  -s EXIT_RUNTIME=1  
  # -s PROXY_TO_PTHREAD=1
  -s EXPORTED_RUNTIME_METHODS="[FS]"   # export preamble funcs
  --pre-js /src/pre.js
  --post-js /src/post.js
  -o /dist/ffprobe-core.js
  # fftools/cmdutils.c fftools/ffprobe.c
  /src/ffprobe-wrapper.cpp
)

emcc "${FLAGS[@]}"

echo "build done, replacing strings in output" 

#
# fix wasm core for vitejs SSR
#
sed -i 's/new URL("ffprobe-core.wasm",import.meta.url)/""/g' /dist/ffprobe-core.js
sed -i 's/new URL("ffprobe-core.worker.js",import.meta.url)/""/g' /dist/ffprobe-core.js