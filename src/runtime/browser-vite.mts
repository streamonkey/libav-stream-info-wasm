import BrowserWorker from "./worker-browser.mjs?worker&inline"
import type {
  IncomingMessage,
  IncomingData,
  OutgoingMessage,
} from "./worker-browser.mjs"

const worker = new BrowserWorker()

/**
 * Retreive tags from an audio file via libav
 * @param file an Audio file to get tags from
 * @returns 
 */
export async function getAudioFileTags(file: File) {
  const fileInfo = await postMessage({
    type: "getFileTags",
    file,
  })
  return fileInfo as Record<string, string | undefined>
}

/**
 * Retreive audio duration from an audio file via libav
 * @param file an Audio file to get tags from
 * @returns duration in milliseconds
 */
export async function getAudioDuration(file: File) {
  const fileInfo = await postMessage({
    type: "getAudioDuration",
    file,
  })
  return fileInfo as number
}

async function postMessage(data: IncomingData): Promise<Record<string, string | undefined> | number> {
  const channel = new MessageChannel()
  const message: IncomingMessage = {
    ...data,
    port: channel.port2,
  }

  worker.postMessage(message, [channel.port2])

  return new Promise((resolve, reject) => {
    channel.port1.onmessage = (event: MessageEvent<OutgoingMessage>) => {
      const { data } = event
      if (data.status === "success") {
        resolve(data.payload)
      } else {
        reject(new Error(data.message))
      }
    }
  })
}
