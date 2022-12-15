/// <reference types="emscripten" />

interface Pointer {

}

interface WAMSVectorPointer<V> extends Pointer {
    get(key: number): V
    size(): number
}

interface WASMMapPointer<K, V> extends Pointer {
    get(key: K): V
    keys(): WAMSVectorPointer<K>
}

export interface FFprobeCore extends EmscriptenModule {
    cwrap: typeof cwrap
    FS: typeof FS
    ccall: typeof ccall
    setValue: typeof setValue
    getValue: typeof getValue
    writeAsciiToMemory: typeof writeAsciiToMemory
    // AsciiToString: typeof AsciiToString
    exit: (exitcode: number) => void
    getFileTags: (filename: string) => WASMMapPointer<string, string>
}

declare const module: EmscriptenModuleFactory<FFprobeCore>
export default module