import { getAudioFileTags } from "libav-stream-info-wasm"

export { }
const input = document.querySelector("#input") as HTMLInputElement
const output = document.querySelector("#output") as HTMLPreElement
const time = document.querySelector("#time") as HTMLSpanElement

input.addEventListener("change", async () => {

  const start = performance.now()
  const tags = await getAudioFileTags(input.files![0])
  const end = performance.now()

  output.textContent = JSON.stringify(tags, null, 2)

  time.textContent = `${(end - start).toFixed(2)}ms`
})
