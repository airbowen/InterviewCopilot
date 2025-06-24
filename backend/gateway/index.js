const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 路由转发配置
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001' }));
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3002' }));
app.use('/credits', createProxyMiddleware({ target: 'http://localhost:3003' }));
app.use('/stats', createProxyMiddleware({ target: 'http://localhost:3004' }));
app.use('/ws', createProxyMiddleware({ 
  target: 'http://localhost:3000',
  ws: true
}));

app.listen(8000, () => console.log('Gateway running on port 8000'));