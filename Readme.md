# ffProbe Webassembly

This library uses [libav](https://libav.org/) to extract an audio files Tags, just like [ffprobe](https://ffmpeg.org/ffprobe.html) does.

It is compiled to Webassembly and can be used in the Browser

Depending on your bundler, you might need a different way to instantiate the module.
The following works to initialize the module in Vite:

```ts
import FFProbeCore, { type FFprobeCore } from "ffprobe-wasm"
import FFprobewasm from 'ffprobe-wasm/ffprobe-core.wasm?url'
import FFprobeWorker from 'ffprobe-wasm/ffprobe-core.worker.js?url'

const ffprobe = await FFProbeCore({
    locateFile: (path, prefix) => {
        if (typeof window !== 'undefined') {
            if (path.endsWith('.wasm')) {
                return FFprobewasm
            }
            if (path.endsWith('.worker.js')) {
                return FFprobeWorker
            }
        }
        return prefix + path
    }
})


ffprobe.FS.writeFile(file.name, new Uint8Array(await file.arrayBuffer()))

const tags: Record<string, string | undefined> = {}

const out = ffprobe!.getFileTags(file.name)

const keys = out.keys()

for (let i = 0; i < keys.size(); i++) {
    const key = keys.get(i)
    tags[key] = out.get(key)
}

return tags
```