import { Server, Socket } from 'socket.io';

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // 处理视频流相关事件
    socket.on('start-monitoring', (data) => {
      console.log('Start monitoring request:', data);
      socket.emit('monitoring-started', {
        status: 'success',
        message: '视频监控已启动',
        timestamp: new Date().toISOString()
      });
    });

    socket.on('stop-monitoring', () => {
      console.log('Stop monitoring request');
      socket.emit('monitoring-stopped', {
        status: 'success',
        message: '视频监控已停止',
        timestamp: new Date().toISOString()
      });
    });

    socket.on('capture-screenshot', () => {
      console.log('Capture screenshot request');
      // 模拟截图功能
      socket.emit('screenshot-captured', {
        status: 'success',
        message: '截图已完成',
        timestamp: new Date().toISOString(),
        imageUrl: 'https://via.placeholder.com/640x480?text=Screenshot'
      });
    });

    // 模拟视频帧数据传输（实际项目中应该是真实的视频流）
    const videoFrameInterval = setInterval(() => {
      socket.emit('video-frame', {
        frame: 'mock-video-frame-data',
        timestamp: new Date().toISOString()
      });
    }, 100); // 每100ms发送一帧

    // 处理断开连接
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clearInterval(videoFrameInterval);
    });
  });
}
