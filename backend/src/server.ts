/**
 * 主服务器文件
 * 负责初始化Express应用、HTTP服务器和Socket.IO服务
 */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { setupSocketHandlers } from './socket/handlers';

// 加载环境变量
dotenv.config();

// 创建Express应用实例
const app = express();

// 创建HTTP服务器
const server = http.createServer(app);

// 创建Socket.IO服务器实例
const io = new Server(server, {
  cors: {
    origin: '*', // 在生产环境中应该设置为具体的前端域名
    methods: ['GET', 'POST']
  }
});

// 配置中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 注册API路由
app.use('/api', apiRoutes);

// 设置Socket.IO事件处理器
setupSocketHandlers(io);

// 启动服务器
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 导出Socket.IO实例，供其他模块使用
export { io };