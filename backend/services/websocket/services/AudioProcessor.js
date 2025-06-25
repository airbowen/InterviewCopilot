const axios = require('axios');
const OpenAI = require('openai');

class AudioProcessor {
  constructor(asrService) {
    this.asrService = asrService;
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
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

      // 3. GPT 分析
      const gptResponse = await this.analyzeWithGPT(recognitionResult.text);

      // 4. 记录统计
      await this.recordStats(userId, sessionId);

      return {
        success: true,
        text: recognitionResult.text,
        requestId: recognitionResult.requestId,
        analysis: gptResponse
      };
    } catch (error) {
      // 5. 失败退费
      await this.refundCredits(userId).catch(console.error);
      throw error;
    }
  }

  async analyzeWithGPT(text) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一个面试辅导专家，请对候选人的回答进行分析，给出优点、改进建议和需要注意的问题。请从专业度、表达清晰度、逻辑结构等方面进行评估。"
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      return {
        feedback: completion.choices[0].message.content,
        usage: completion.usage
      };
    } catch (error) {
      console.error('GPT 分析失败:', error);
      return {
        feedback: '无法生成 AI 反馈',
        error: error.message
      };
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