const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();

// 现有的路由转发配置
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001' }));
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3002' }));
app.use('/credits', createProxyMiddleware({ target: 'http://localhost:3003' }));
app.use('/stats', createProxyMiddleware({ target: 'http://localhost:3004' }));
app.use('/ws', createProxyMiddleware({ 
  target: 'http://localhost:3000',
  ws: true
}));

// 新增聚合 API 端点
app.get('/api/user-profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // 并行请求多个服务
    const [userInfo, creditInfo, statsInfo] = await Promise.all([
      axios.get(`http://localhost:3002/api/users/${userId}`),
      axios.get(`http://localhost:3003/api/credits/${userId}`),
      axios.get(`http://localhost:3004/api/stats/${userId}/today`)
    ]);
    
    // 合并数据
    const profile = {
      ...userInfo.data,
      credit: creditInfo.data,
      stats: statsInfo.data
    };
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.listen(8000, () => console.log('Gateway running on port 8000'));