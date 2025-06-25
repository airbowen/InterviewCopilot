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

// 参数验证中间件
const validateUserId = (req, res, next) => {
  const userId = req.params.userId || req.body.userId;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ success: false, message: '无效的用户ID' });
  }
  next();
};

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  console.error('信用服务错误:', err);
  res.status(500).json({
    success: false,
    message: '服务异常，请稍后重试'
  });
};

// 额度管理路由
app.post('/api/credits/check', validateUserId, async (req, res) => {
  try {
    const { userId } = req.body;
    const credit = await Credit.findOne({ userId });
    
    if (!credit) {
      return res.status(404).json({
        success: false,
        message: '用户额度信息不存在'
      });
    }

    const sufficient = credit.totalCredit > credit.usedCredit;
    res.json({
      success: true,
      sufficient,
      remaining: credit.totalCredit - credit.usedCredit
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/credits/consume', validateUserId, async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    
    // 参数校验
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: '无效的消费额度'
      });
    }
    
    if (!type || !['AUDIO', 'GPT'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: '无效的消费类型'
      });
    }

    // 使用事务确保扣费和记录同步
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const credit = await Credit.findOne({ userId }).session(session);
      if (!credit) {
        throw new Error('用户额度信息不存在');
      }

      if (credit.totalCredit - credit.usedCredit < amount) {
        throw new Error('额度不足');
      }

      // 更新额度
      await Credit.updateOne(
        { userId },
        { $inc: { usedCredit: amount }, lastUpdated: Date.now() },
        { session }
      );

      // 记录使用明细
      await Usage.create([{
        userId,
        amount,
        type
      }], { session });

      await session.commitTransaction();
      res.json({ success: true });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    next(error);
  }
});

app.get('/api/credits/:userId/usage', validateUserId, async (req, res) => {
  try {
    const { userId } = req.params;
    const usage = await Usage.find({ userId }).sort({ timestamp: -1 });
    res.json({ success: true, usage });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(3003, () => console.log('Credit service running on port 3003'));