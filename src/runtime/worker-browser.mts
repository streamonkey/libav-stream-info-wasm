import "./shim.mjs"
import loadlibav from "@wasm/libav-wasm.mjs"
import type { WorkerFSMountOptions } from "@wasm/libav-wasm.mjs"
import { wasmMapToRecord } from "./helper.mjs"

export type IncomingMessage = {
    port: MessagePort
} & IncomingData

export type IncomingData = {
    type: "getFileTags"
    file: File
}

export type OutgoingMessage =
    | { status: "success", payload: OutgoingData }
    | { status: "error"; message: string }

export type OutgoingData = Record<string, string | undefined>

const libavPromise = loadlibav()

self.onmessage = async function onmessage(event: MessageEvent<IncomingMessage>) {
    const data = event.data
    try {
        switch (data.type) {
            case "getFileTags":

                const message: OutgoingMessage = {
                    status: "success",
                    payload: await getFileTags(data.file),

                }

                data.port.postMessage(message)
                break
            default:
                const _: never = data.type
                throw new Error(`Unknown event: ${JSON.stringify(_)}`)
        }
    } catch (error) {
        console.error(error)
        data.port.postMessage({
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error",
        })
    }
}

async function getFileTags(
    file: File,
) {
    const libav = await libavPromise

    const { FS, getFileTags } = libav

    try {
        try {
            console.log(FS.stat("/work"))
        } catch (error) {
            FS.mkdir("/work")
        }

        /**
         * Mount the worker file system and add the current file
         */
        const mountOptions: WorkerFSMountOptions = {
            files: [file],
        }
        FS.mount(FS.filesystems.WORKERFS, mountOptions, "/work")

        const rawInfo = getFileTags(`/work/${file.name}`)

        return wasmMapToRecord(rawInfo)
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        // Cleanup mount.
        FS.unmount("/work")
    }
}