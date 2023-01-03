dist/libav-wasm.js:
	mkdir -p dist && \
	emcc --bind \
	-O3 \
	-L/opt/ffmpeg/lib \
	-I/opt/ffmpeg/include/ \
	-s EXPORTED_RUNTIME_METHODS="[FS, cwrap, ccall, getValue, setValue, writeAsciiToMemory]" \
	-s INITIAL_MEMORY=268435456 \
	-lavcodec -lavformat -lavfilter -lavdevice -lswresample -lswscale -lavutil -lm \
	-lworkerfs.js \
	-s EXPORT_ES6=1 \
	-s WASM=1 \
	-s SINGLE_FILE \
	--closure 1 \
	-s MODULARIZE \
	-o dist/libav-wasm.mjs \
	src/libav-wasm-wrapper.cpp