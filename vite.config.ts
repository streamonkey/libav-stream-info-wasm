import { defineConfig } from "vite"
import * as path from "path"

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "src/runtime/browser-vite.mts",
      formats: ["es"],
      fileName: () => "browser.mjs",
    },
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@wasm": path.resolve(__dirname, "src/wasm-dist")
    }
  },
  worker: {
  },
})
