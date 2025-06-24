const express = require('express');
const Redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});

// 验证码相关路由
app.post('/api/send-code', async (req, res) => {
  const { phone } = req.body;
  // 验证码逻辑
});

app.post('/api/verify', async (req, res) => {
  const { phone, code } = req.body;
  // 验证逻辑
});

// JWT token 验证中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: '无效的token' });
  }
};

app.listen(3001, () => console.log('Auth service running on port 3001'));