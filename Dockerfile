FROM emscripten/emsdk:2.0.31

RUN apt-get update && apt-get install -y autoconf libtool build-essential

WORKDIR /compile

COPY ffmpeg ffmpeg

WORKDIR /compile/ffmpeg

COPY configure.sh configure.sh

RUN ./configure.sh

COPY compile.sh compile.sh

CMD ./compile.sh