/**
 * Socket.IO服务
 * 负责处理与后端的实时通信，包括视频监控、截图等功能
 */
import { io, Socket } from 'socket.io-client';

// Socket服务器URL
const SOCKET_URL = 'http://localhost:3002';

class SocketService {
  // Socket实例
  private socket: Socket | null = null;

  /**
   * 连接到Socket服务器
   * @returns Socket实例
   */
  connect(): Socket {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      
      // 监听连接事件
      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      // 监听断开连接事件
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      // 监听错误事件
      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    return this.socket;
  }

  /**
   * 断开与Socket服务器的连接
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * 开始监控
   * @param cameraId 摄像头ID（可选）
   */
  startMonitoring(cameraId?: string): void {
    if (this.socket) {
      this.socket.emit('start-monitoring', { cameraId });
    }
  }

  /**
   * 停止监控
   */
  stopMonitoring(): void {
    if (this.socket) {
      this.socket.emit('stop-monitoring');
    }
  }

  /**
   * 捕获截图
   */
  captureScreenshot(): void {
    if (this.socket) {
      this.socket.emit('capture-screenshot');
    }
  }

  /**
   * 监听监控开始事件
   * @param callback 回调函数
   */
  onMonitoringStarted(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('monitoring-started', callback);
    }
  }

  /**
   * 监听监控停止事件
   * @param callback 回调函数
   */
  onMonitoringStopped(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('monitoring-stopped', callback);
    }
  }

  /**
   * 监听截图完成事件
   * @param callback 回调函数
   */
  onScreenshotCaptured(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('screenshot-captured', callback);
    }
  }

  /**
   * 监听视频帧事件
   * @param callback 回调函数
   */
  onVideoFrame(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('video-frame', callback);
    }
  }

  /**
   * 移除视频帧事件监听器
   */
  offVideoFrame(): void {
    if (this.socket) {
      this.socket.off('video-frame');
    }
  }

  /**
   * 移除所有事件监听器
   */
  offAllEvents(): void {
    if (this.socket) {
      this.socket.off('monitoring-started');
      this.socket.off('monitoring-stopped');
      this.socket.off('screenshot-captured');
      this.socket.off('video-frame');
    }
  }
}

// 导出单例实例
export default new SocketService();