# libav-stream-info-wasm

This library uses [libav](https://libav.org/) to extract an audio files metadata, just like [ffprobe](https://ffmpeg.org/ffprobe.html) does.

Version 2.0.0 pulls the source code of ffmpeg version 4.3.1 in docker and compiles it to WASM/JS via emscripten.

At the end all code is bundled into a single file so it can be easily used in the Browser with any bundler.

## Usage

The runtime exports a single `getAudioFileTags` function that takes a `File` as an argument and returns an object of the corresponding metadata tags.

Internally this uses a WebWorker to prevent blocking the main thread. 

## Building

Prerequisites: Docker installed

```bash
bash build.sh
```

## Thanks

A big thanks to https://github.com/tfoxy/ffprobe-wasm and https://github.com/alfg/ffprobe-wasm