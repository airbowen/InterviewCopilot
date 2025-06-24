require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 使用 Map 存储用户会话信息
const sessions = new Map();

// WebSocket 连接处理
wss.on('connection', (ws, req) => {
  // 生成唯一的会话 ID
  const sessionId = Date.now().toString();
  
  // 初始化会话信息
  const session = {
    id: sessionId,
    ws,
    userId: null, // 将在认证后设置
    conversationHistory: [],
    lastActivity: Date.now()
  };
  
  sessions.set(sessionId, session);
  console.log(`Client connected: ${sessionId}`);

  // 处理认证消息
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'auth') {
        // 处理用户认证
        session.userId = message.userId;
        ws.send(JSON.stringify({
          type: 'auth_success',
          sessionId
        }));
        return;
      }
      
      if (!session.userId) {
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Unauthorized'
        }));
        return;
      }

      // 处理音频数据
      if (message.type === 'audio') {
        const transcription = await openai.audio.transcriptions.create({
          file: message.data,
          model: "whisper-1",
        });

        // 更新会话历史
        session.conversationHistory.push({
          role: 'user',
          content: transcription.text
        });

        // 发送转录结果
        ws.send(JSON.stringify({
          type: 'transcription',
          text: transcription.text,
          timestamp: new Date(),
          sessionId
        }));

        // 生成 AI 回答
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "你是一位面试官，正在与候选人进行技术面试。请根据候选人的回答给出专业的反馈和下一个问题。"
            },
            ...session.conversationHistory
          ]
        });

        // 更新会话历史
        session.conversationHistory.push({
          role: 'assistant',
          content: completion.choices[0].message.content
        });

        // 发送 AI 反馈
        ws.send(JSON.stringify({
          type: 'ai_feedback',
          text: completion.choices[0].message.content,
          timestamp: new Date(),
          sessionId
        }));
      }

      // 更新最后活动时间
      session.lastActivity = Date.now();

    } catch (error) {
      console.error('Error:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message,
        sessionId
      }));
    }
  });

  // 处理连接关闭
  ws.on('close', () => {
    console.log(`Client disconnected: ${sessionId}`);
    sessions.delete(sessionId);
  });

  // 处理连接错误
  ws.on('error', (error) => {
    console.error(`WebSocket error for ${sessionId}:`, error);
    sessions.delete(sessionId);
  });
});

// 定期清理过期会话（30分钟无活动）
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > 30 * 60 * 1000) {
      console.log(`Cleaning up inactive session: ${sessionId}`);
      session.ws.close();
      sessions.delete(sessionId);
    }
  }
}, 5 * 60 * 1000); // 每5分钟检查一次

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    connections: sessions.size,
    sessions: Array.from(sessions.keys())
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});