const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 会话管理
const sessions = new Map();

wss.on('connection', async (ws) => {
  const sessionId = Date.now().toString();
  
  // 初始化会话
  const session = {
    id: sessionId,
    ws,
    userId: null,
    lastActivity: Date.now()
  };
  
  sessions.set(sessionId, session);

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'auth') {
        // 验证 token
        const response = await axios.post('http://localhost:3001/api/verify-token', {
          token: message.token
        });
        
        if (response.data.valid) {
          session.userId = response.data.userId;
          ws.send(JSON.stringify({ type: 'auth_success', sessionId }));
        }
        return;
      }
      
      if (message.type === 'audio') {
        // 检查额度
        const creditCheck = await axios.post('http://localhost:3003/api/credits/check', {
          userId: session.userId
        });
        
        if (!creditCheck.data.sufficient) {
          ws.send(JSON.stringify({ type: 'error', message: '额度不足' }));
          return;
        }
        
        // 处理音频并记录统计
        // ...
      }
    } catch (error) {
      console.error('Error:', error);
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });
});

server.listen(3000, () => console.log('WebSocket service running on port 3000'));