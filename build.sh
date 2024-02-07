#!/bin/bash

# Exit on error
set -e

mkdir -p dist
rm -rf src/wasm-dist

# build the wasm in docker
docker build -t libav-wasm .
docker create -ti --name libav-wasm-container libav-wasm
docker cp libav-wasm-container:/build/dist src/wasm-dist
docker rm -fv libav-wasm-container

# copy the typescript definitions
cp src/wasm/*.d.mts src/wasm-dist/

# build the bundle:
npm run build
