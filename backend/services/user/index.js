const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 用户模型
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  nickname: String,
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: Date
});

const User = mongoose.model('User', UserSchema);

// 用户信息路由
app.post('/api/users', async (req, res) => {
  // 创建用户
});

app.get('/api/users/:userId', async (req, res) => {
  // 获取用户信息
});

app.put('/api/users/:userId', async (req, res) => {
  // 更新用户信息
});

app.listen(3002, () => console.log('User service running on port 3002'));