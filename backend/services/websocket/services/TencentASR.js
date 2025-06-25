const tencentcloud = require('tencentcloud-sdk-nodejs');
const AsrClient = tencentcloud.asr.v20190614.Client;

class TencentASR {
  constructor(config) {
    this.client = new AsrClient({
      credential: {
        secretId: config.secretId,
        secretKey: config.secretKey,
      },
      region: config.region || 'ap-guangzhou',
      profile: {
        signMethod: 'TC3-HMAC-SHA256',
        httpProfile: {
          reqMethod: 'POST',
          reqTimeout: 30,
        },
      },
    });
  }

  async recognize(audioData, options = {}) {
    try {
      const result = await this.client.SentenceRecognition({
        ProjectId: 0,
        SubServiceType: 2,
        EngSerViceType: options.engineType || '16k_zh',
        SourceType: 1,
        VoiceFormat: options.format || 'wav',
        UsrAudioKey: options.sessionId,
        Data: audioData,
      });

      return {
        success: true,
        text: result.Result,
        requestId: result.RequestId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || '语音识别失败',
        requestId: error.RequestId,
      };
    }
  }
}

module.exports = TencentASR;