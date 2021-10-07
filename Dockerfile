FROM emscripten/emsdk:2.0.31

RUN apt-get update && apt-get install -y autoconf libtool build-essential

WORKDIR /compile

RUN mkdir /compile/ffmpeg

COPY build.sh build.sh
COPY configure.sh configure.sh
COPY compile.sh compile.sh

RUN ls -la

CMD ./build.sh