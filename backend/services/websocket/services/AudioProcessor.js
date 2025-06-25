const axios = require('axios');

class AudioProcessor {
  constructor(asrService) {
    this.asrService = asrService;
  }

  async processAudio(userId, sessionId, audioData) {
    // 1. 扣费
    const creditResult = await this.deductCredits(userId);
    if (!creditResult.success) {
      throw new Error(creditResult.message || '扣费失败');
    }

    try {
      // 2. 语音识别
      const recognitionResult = await this.asrService.recognize(audioData, {
        sessionId,
        engineType: '16k_zh',
        format: 'wav',
      });

      if (!recognitionResult.success) {
        throw new Error(recognitionResult.error);
      }

      // 3. 记录统计
      await this.recordStats(userId, sessionId);

      return {
        success: true,
        text: recognitionResult.text,
        requestId: recognitionResult.requestId,
      };
    } catch (error) {
      // 4. 失败退费
      await this.refundCredits(userId).catch(console.error);
      throw error;
    }
  }

  async deductCredits(userId) {
    try {
      const response = await axios.post('http://localhost:3003/api/credits/consume', {
        userId,
        type: 'AUDIO',
        amount: 1
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '扣费失败'
      };
    }
  }

  async refundCredits(userId) {
    return axios.post('http://localhost:3003/api/credits/refund', {
      userId,
      type: 'AUDIO',
      amount: 1
    });
  }

  async recordStats(userId, sessionId) {
    return axios.post('http://localhost:3004/api/stats/record', {
      userId,
      sessionId,
      audioMinutes: 1,
      type: 'AUDIO'
    });
  }
}

module.exports = AudioProcessor;