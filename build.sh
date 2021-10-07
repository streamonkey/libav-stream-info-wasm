#!/bin/bash

cd ffmpeg || exit 1

ls -la

if [ ! -f config.h ]; then
    ../configure.sh
fi

# wasm-ld -lavcodec

../compile.sh