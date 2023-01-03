# libav-stream-info-wasm

This library uses [libav](https://libav.org/) to extract an audio files metadata, just like [ffprobe](https://ffmpeg.org/ffprobe.html) does.

It is compiled to Webassembly and can be used in the Browser

## Building

Prerequisites: Docker installed

```bash
bash build.sh
```

## Thanks

A big thanks to https://github.com/tfoxy/ffprobe-wasm and https://github.com/alfg/ffprobe-wasm