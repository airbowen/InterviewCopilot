const express = require('express');
const Redis = require('redis');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 使用 Redis 存储实时统计数据
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});

// 统计模型（用于持久化）
const StatsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  audioMinutes: { type: Number, default: 0 },
  gptTokens: { type: Number, default: 0 },
  creditUsed: { type: Number, default: 0 }
});

const Stats = mongoose.model('Stats', StatsSchema);

// 实时统计路由
app.post('/api/stats/record', async (req, res) => {
  // 记录使用统计
});

app.get('/api/stats/:userId/today', async (req, res) => {
  // 获取今日统计
});

app.get('/api/stats/:userId/history', async (req, res) => {
  // 获取历史统计
});

app.listen(3004, () => console.log('Stats service running on port 3004'));