# InterviewCopilot
# InterviewCopilot - Backend

## 概述

InterviewCopilot Backend 是一个基于 **Node.js** 的多服务后端项目，采用微服务架构，支持认证、用户管理、积分统计、实时 WebSocket 通信等功能。

### 项目结构


## backeend
```
backend/
├── gateway/
│   └── index.js
├── services/
│   ├── auth/
│   │   ├── index.js
│   │   └── package.json
│   ├── user/
│   │   ├── index.js
│   │   └── package.json
│   ├── credit/
│   │   ├── index.js
│   │   └── package.json
│   ├── stats/
│   │   ├── index.js
│   │   └── package.json
│   └── websocket/
│       ├── index.js
│       └── package.json
├── package.json
└── docker-compose.yml
```
