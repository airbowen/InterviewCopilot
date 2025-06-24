const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 额度模型
const CreditSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  totalCredit: { type: Number, default: 1000 },
  usedCredit: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const Credit = mongoose.model('Credit', CreditSchema);

// 额度使用记录模型
const UsageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['AUDIO', 'GPT'], required: true },
  timestamp: { type: Date, default: Date.now }
});

const Usage = mongoose.model('Usage', UsageSchema);

// 额度管理路由
app.post('/api/credits/check', async (req, res) => {
  // 检查用户额度
});

app.post('/api/credits/consume', async (req, res) => {
  // 消耗额度
});

app.get('/api/credits/:userId/usage', async (req, res) => {
  // 获取使用记录
});

app.listen(3003, () => console.log('Credit service running on port 3003'));