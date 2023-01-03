import type { WASMMapPointer } from "@wasm/libav-wasm.mjs"

export const wasmMapToRecord = <K extends string | number | symbol, V>(map: WASMMapPointer<K, V>): Record<K, V | undefined> => {
    const tags = {} as Record<K, V | undefined>

    const keys = map.keys()

    for (let i = 0; i < keys.size(); i++) {
        const key = keys.get(i)
        tags[key] = map.get(key)
    }

    return tags
}
