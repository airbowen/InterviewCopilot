const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const TencentASR = require('./services/TencentASR');
const AudioProcessor = require('./services/AudioProcessor');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 会话管理
const sessions = new Map();

// 设置超时时间（5分钟）
const TIMEOUT_MS = 5 * 60 * 1000;

// 定期检查超时的会话
setInterval(() => {
  const now = Date.now();
  sessions.forEach((session, sessionId) => {
    if (now - session.lastActivity > TIMEOUT_MS) {
      // 停止计费
      if (session.userId) {
        axios.post('http://localhost:3004/api/stats/stop', {
          userId: session.userId,
          sessionId: sessionId
        }).catch(error => {
          console.error('停止计费失败:', error.message);
        });
      }
      
      // 关闭连接
      session.ws.close();
      sessions.delete(sessionId);
    }
  });
}, 60000);

wss.on('connection', async (ws) => {
  const sessionId = uuidv4();
  
  // 初始化会话
  const session = {
    id: sessionId,
    ws,
    userId: null,
    lastActivity: Date.now(),
    isAuthenticated: false
  };
  
  sessions.set(sessionId, session);

  // 监听连接关闭
  ws.on('close', () => {
    // 停止计费
    if (session.userId) {
      axios.post('http://localhost:3004/api/stats/stop', {
        userId: session.userId,
        sessionId: sessionId
      }).catch(error => {
        console.error('停止计费失败:', error.message);
      });
    }
    
    sessions.delete(sessionId);
  });

  ws.on('message', async (data) => {
    try {
      // 更新最后活动时间
      session.lastActivity = Date.now();
      
      const message = JSON.parse(data);
      
      // 参数类型检查
      if (!message || typeof message !== 'object') {
        throw new Error('无效的消息格式');
      }
      
      if (message.type === 'auth') {
        if (!message.token || typeof message.token !== 'string') {
          throw new Error('无效的认证参数');
        }

        // 验证 token
        const response = await axios.post('http://localhost:3001/api/verify-token', {
          token: message.token
        });
        
        if (response.data.valid && response.data.userId) {
          session.userId = response.data.userId;
          session.isAuthenticated = true;
          ws.send(JSON.stringify({ type: 'auth_success', sessionId }));
        } else {
          throw new Error('认证失败');
        }
        return;
      }
      
      // 所有非认证消息必须先认证
      if (!session.isAuthenticated || !session.userId) {
        throw new Error('请先完成认证');
      }
      
      if (message.type === 'audio') {
        // 检查音频参数
        if (!message.audio || typeof message.audio !== 'string') {
          throw new Error('无效的音频数据');
        }

        // 处理音频
        const result = await audioProcessor.processAudio(
          session.userId,
          session.id,
          message.audio
        );

        // 返回结果
        ws.send(JSON.stringify({
          type: 'transcription',
          sessionId: session.id,
          text: result.text,
          requestId: result.requestId
        }));
      }
    } catch (error) {
      // 统一错误处理
      const errorMessage = error.response?.data?.message || error.message || '服务异常';
      console.error('处理消息错误:', error);
      ws.send(JSON.stringify({ 
        type: 'error', 
        code: error.response?.status || 500,
        message: errorMessage
      }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`WebSocket service running on port ${PORT}`));