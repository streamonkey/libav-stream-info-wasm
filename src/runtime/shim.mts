// fixes https://github.com/vitejs/vite/issues/9879

// @ts-ignore
self.document = {
    baseURI: location.origin
}