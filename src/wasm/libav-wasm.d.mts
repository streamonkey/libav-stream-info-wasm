/// <reference types="emscripten" />

interface Pointer { }

export interface WASMVectorPointer<V> extends Pointer {
    get(key: number): V
    size(): number
}

export interface WASMMapPointer<K, V> extends Pointer {
    get(key: K): V
    keys(): WASMVectorPointer<K>
}

export interface WorkerFSMountOptions {
    files?: File[]
    blobs?: Blob[]
    packages?: any[]
}

// declare global variables
declare global {
    const WORKERFS: Emscripten.FileSystemType
}

export interface LibavWASMModule extends EmscriptenModule {
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

declare const module: EmscriptenModuleFactory<LibavWASMModule>

export default module
