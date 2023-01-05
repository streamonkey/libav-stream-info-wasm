import { defineConfig } from "vite"
import * as path from "path"

export default defineConfig({
  build: {
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/runtime/browser-vite.mts"),
      formats: ["es"],
      fileName: "browser",
    },
    emptyOutDir: true,
    minify: "esbuild",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@wasm": path.resolve(__dirname, "src/wasm-dist")
    }
  },
  worker: {
    format: "iife",
  },
})
