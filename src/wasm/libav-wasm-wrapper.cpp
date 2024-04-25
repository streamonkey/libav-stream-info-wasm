#include <vector>
#include <string>
#include <inttypes.h>
#include <emscripten.h>
#include <emscripten/bind.h>
#include <stdexcept>

using namespace emscripten;

extern "C"
{
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
#include <libavutil/avutil.h>
#include <libavutil/imgutils.h>
};

const std::string c_avformat_version()
{
    return AV_STRINGIFY(LIBAVFORMAT_VERSION);
}

const std::string c_avcodec_version()
{
    return AV_STRINGIFY(LIBAVCODEC_VERSION);
}

const std::string c_avutil_version()
{
    return AV_STRINGIFY(LIBAVUTIL_VERSION);
}

// get all metadata tags from a file
std::map<std::string, std::string> getFileTags(std::string filename)
{
    av_log_set_level(AV_LOG_QUIET); // No logging output for libav.

    FILE *file = fopen(filename.c_str(), "rb");
    if (!file)
    {
        printf("cannot open file\n");
    }
    fclose(file);

    AVFormatContext *fmt_ctx = NULL;
    AVDictionaryEntry *tag = NULL;
    int ret;

    if ((ret = avformat_open_input(&fmt_ctx, filename.c_str(), NULL, NULL)))
        throw std::invalid_argument("could not open file");

    if ((ret = avformat_find_stream_info(fmt_ctx, NULL)) < 0)
    {
        av_log(NULL, AV_LOG_ERROR, "Cannot find stream information\n");
        throw std::invalid_argument("given file has no streams");
    }

    std::map<std::string, std::string> tags;

    while ((tag = av_dict_get(fmt_ctx->metadata, "", tag, AV_DICT_IGNORE_SUFFIX)))
    {
        tags[tag->key] = tag->value;
    }

    avformat_close_input(&fmt_ctx);
    return tags;
}

// probe the duration of the audio file
// returns the duration in milliseconds as a double, because emscripten does not support int64_t
double getAudioDuration(std::string filename)
{
    av_log_set_level(AV_LOG_QUIET); // No logging output for libav.

    FILE *file = fopen(filename.c_str(), "rb");
    if (!file)
    {
        printf("cannot open file\n");
    }
    fclose(file);

    AVFormatContext *fmt_ctx = NULL;
    AVDictionaryEntry *tag = NULL;
    int ret;

    if ((ret = avformat_open_input(&fmt_ctx, filename.c_str(), NULL, NULL)))
        throw std::invalid_argument("could not open file");

    if ((ret = avformat_find_stream_info(fmt_ctx, NULL)) < 0)
    {
        av_log(NULL, AV_LOG_ERROR, "Cannot find stream information\n");
        throw std::invalid_argument("given file has no streams");
    }

    double duration = double(fmt_ctx->duration) / double(AV_TIME_BASE) * 1000.0;

    avformat_close_input(&fmt_ctx);
    return duration;
}

EMSCRIPTEN_BINDINGS(constants)
{
    function("avformat_version", &c_avformat_version);
    function("avcodec_version", &c_avcodec_version);
    function("avutil_version", &c_avutil_version);
}

EMSCRIPTEN_BINDINGS(module)
{
    function("getFileTags", &getFileTags);
    function("getAudioDuration", &getAudioDuration);

    register_vector<std::string>("vector<string>");
    register_map<std::string, std::string>("map<string, string>");
}