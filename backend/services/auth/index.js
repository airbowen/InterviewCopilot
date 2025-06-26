require('dotenv').config();
const express = require('express');
const Redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 初始化 Redis 客户端
const redisClient = Redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('error', err => console.error('Redis 错误:', err));

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('环境变量 JWT_SECRET 未设置');
}

(async () => {
  await redisClient.connect();

  /**
   * POST /api/send-code
   * 请求体: { phone: '13812345678' }
   */
  app.post('/api/send-code', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: '缺少手机号' });

    const lockKey = `lock:${phone}`;
    const codeKey = `code:${phone}`;

    // 防刷机制：60 秒内只能发一次
    const isLocked = await redisClient.exists(lockKey);
    if (isLocked) {
      return res.status(429).json({ message: '发送太频繁，请稍后再试' });
    }

    // 生成 6 位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await redisClient.setEx(codeKey, 300, code); // 验证码 5 分钟过期
    await redisClient.setEx(lockKey, 60, '1');   // 防刷锁定 60 秒

    console.log(`[模拟短信] 发送给 ${phone} 的验证码是: ${code}`);
    res.json({ message: '验证码已发送（模拟）' });
  });

  /**
   * POST /api/verify
   * 请求体: { phone: '13812345678', code: '123456' }
   */
  app.post('/api/verify', async (req, res) => {
    const { phone, code } = req.body;
    if (!phone || !code) return res.status(400).json({ message: '参数不完整' });

    const cachedCode = await redisClient.get(`code:${phone}`);
    if (!cachedCode || cachedCode !== code) {
      return res.status(400).json({ message: '验证码错误或已过期' });
    }

    // 验证成功，清除验证码
    await redisClient.del(`code:${phone}`);

    const token = jwt.sign({ phone, uid: uuidv4() }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });

  /**
   * JWT 验证中间件
   */
  const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '未提供 token' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: '无效 token' });
    }
  };

  /**
   * 示例受保护路由
   */
  app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ message: '已通过认证', user: req.user });
  });

  app.listen(3001, () => console.log('✅ Auth service running on http://localhost:3001'));
})();
