import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import OpenAI from 'openai';
import { motion } from 'motion/react';
import { 
  Activity, 
  Heart, 
  Droplets, 
  Wheat, 
  AlertCircle,
  Play,
  Camera,
  Sparkles,
  Fan,
  Trash2,
  Bell,
  Volume2
} from 'lucide-react';
import apiService from '../services/api';
import socketService from '../services/socketService';
import { Language, translations } from '../i18n/translations';

interface HomePageProps {
  language: Language;
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const QuickAction = ({ icon, label, onClick, color }: QuickActionProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${color} transition-all shadow-sm hover:shadow-md`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </motion.button>
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  status?: 'good' | 'warning' | 'danger';
  bgColor: string;
}

const StatCard = ({ icon, label, value, unit, status, bgColor }: StatCardProps) => {
  const statusColor = status === 'good' ? 'text-green-600' : status === 'warning' ? 'text-orange-500' : 'text-red-500';
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${bgColor} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-white/70 rounded-xl">
          {icon}
        </div>
        {status && (
          <div className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`} />
        )}
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`text-2xl ${statusColor}`}>
        {value}{unit && <span className="text-base ml-1">{unit}</span>}
      </div>
    </motion.div>
  );
};

// 环形缓冲区类
class RingBuffer {
  private buffer: ArrayBuffer;
  private view: Uint8Array;
  private capacity: number;
  private size: number;
  private head: number;
  private tail: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new ArrayBuffer(capacity);
    this.view = new Uint8Array(this.buffer);
    this.size = 0;
    this.head = 0;
    this.tail = 0;
  }

  push(data: Uint8Array): void {
    const bytesWritten = Math.min(data.length, this.capacity - this.size);
    
    // 写入数据到缓冲区末尾
    const end = Math.min(this.tail + bytesWritten, this.capacity);
    const endBytes = end - this.tail;
    this.view.set(data.subarray(0, endBytes), this.tail);
    
    // 如果需要，从缓冲区开头继续写入
    if (endBytes < bytesWritten) {
      this.view.set(data.subarray(endBytes), 0);
    }
    
    this.tail = (this.tail + bytesWritten) % this.capacity;
    this.size += bytesWritten;
    
    // 如果缓冲区已满，移动头部
    if (this.size > this.capacity) {
      this.size = this.capacity;
      this.head = this.tail;
    }
  }

  pop(length: number): Uint8Array {
    const bytesRead = Math.min(length, this.size);
    const result = new Uint8Array(bytesRead);
    
    // 从缓冲区开头读取数据
    const end = Math.min(this.head + bytesRead, this.capacity);
    const endBytes = end - this.head;
    result.set(this.view.subarray(this.head, end));
    
    // 如果需要，从缓冲区末尾继续读取
    if (endBytes < bytesRead) {
      result.set(this.view.subarray(0, bytesRead - endBytes), endBytes);
    }
    
    this.head = (this.head + bytesRead) % this.capacity;
    this.size -= bytesRead;
    
    return result;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.size = 0;
    this.head = 0;
    this.tail = 0;
  }
}

export function HomePage({ language }: HomePageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const [videoMode, setVideoMode] = useState<'chicken' | 'coop'>('chicken');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [emotions, setEmotions] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  // AI视频问答相关状态
  const [isAiActive, setIsAiActive] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  // 流式缓冲机制相关状态
  const [ringBuffer] = useState(new RingBuffer(5 * 1024 * 1024)); // 减小缓冲区大小到5MB
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [frameInterval] = useState(3000); // 增加帧间隔到3秒，减少处理频率
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const aiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 文本清理函数，保留中文和英文的句号、逗号和感叹号，移除其他特殊字符
  const cleanText = (text: string): string => {
    // 保留中文、英文、数字、中文和英文的句号（。.）、逗号（，,）、感叹号（!）和空白字符
    return text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9。,.!\s]/g, '');
  };

  const toggleVideoMode = () => {
    setVideoMode(prev => prev === 'chicken' ? 'coop' : 'chicken');
  };

  // 切换全屏状态
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // 进入全屏
      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if ((videoContainer as any).webkitRequestFullscreen) {
          (videoContainer as any).webkitRequestFullscreen();
        } else if ((videoContainer as any).msRequestFullscreen) {
          (videoContainer as any).msRequestFullscreen();
        }
        setIsFullScreen(true);
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // 从后端API获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsData, statsData, emotionsData] = await Promise.all([
          apiService.getAlerts(),
          apiService.getStats(),
          apiService.getEmotions()
        ]);
        setAlerts(alertsData.data);
        setStats(statsData.data);
        setEmotions(emotionsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // 初始化Socket连接
  useEffect(() => {
    const socket = socketService.connect();

    socketService.onMonitoringStarted((data) => {
      console.log('Monitoring started:', data);
      setIsMonitoring(true);
      // 在监控开始时绑定视频帧事件监听器
      socketService.onVideoFrame((videoData) => {
        console.log('Received video frame:', videoData.timestamp);
      });
    });

    socketService.onMonitoringStopped((data) => {
      console.log('Monitoring stopped:', data);
      setIsMonitoring(false);
      // 在监控停止时解绑视频帧事件监听器
      socketService.offVideoFrame();
    });

    socketService.onScreenshotCaptured((data) => {
      console.log('Screenshot captured:', data);
      setScreenshotUrl(data.imageUrl);
    });

    return () => {
      socketService.offAllEvents();
      socketService.disconnect();
    };
  }, []);

  // 处理摄像头调用
  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 检查浏览器是否支持getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('您的浏览器不支持摄像头访问功能');
      }

      // 移动端兼容的摄像头参数设置
      const videoConstraints: MediaTrackConstraints = {
        facingMode: 'environment', // 使用后置摄像头
        width: {
          ideal: 640, // 减小理想宽度，提高移动端兼容性
          max: 1280 // 保留最大宽度选项
        },
        height: {
          ideal: 480, // 减小理想高度，提高移动端兼容性
          max: 720 // 保留最大高度选项
        }
      };

      // 尝试获取摄像头权限
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: videoConstraints,
          audio: false 
        });
        
        setVideoStream(stream);
        setIsCameraActive(true);
        socketService.startMonitoring();
      } catch (initialError: any) {
        if (initialError.name === 'NotAllowedError' || initialError.name === 'PermissionDeniedError') {
          // 权限被拒绝，提供更详细的指引，符合iOS和Android最新权限规范
          setError('摄像头权限被拒绝，请在设备设置中允许此应用访问摄像头\n\n📱 iOS (14+): 设置 > 隐私 > 相机 > 允许此应用访问\n🤖 Android (10+): 设置 > 应用 > 此应用 > 权限 > 相机 > 允许');
        } else {
          // 尝试使用更简单的参数重新请求
          try {
            const simpleStream = await navigator.mediaDevices.getUserMedia({ 
              video: true,
              audio: false 
            });
            setVideoStream(simpleStream);
            setIsCameraActive(true);
            socketService.startMonitoring();
            return;
          } catch (simpleError) {
            throw initialError;
          }
        }
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      
      // 处理不同类型的错误
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setError('未检测到可用的摄像头设备');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setError('摄像头被其他应用占用或无法访问，请先关闭其他使用摄像头的应用');
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        setError('无法满足摄像头参数要求，请尝试使用其他设备');
      } else {
        setError('无法访问摄像头，请检查权限设置和设备状态');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 监听视频流变化
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  // 监听屏幕方向变化
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth > window.innerHeight) {
        setScreenOrientation('landscape');
      } else {
        setScreenOrientation('portrait');
      }
    };

    // 初始检测
    handleOrientationChange();

    // 添加监听器
    window.addEventListener('resize', handleOrientationChange);
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }

    // 监听全屏状态变化
    const handleFullscreenChange = () => {
      const isCurrentlyFullScreen = !!document.fullscreenElement || 
                                  !!document.webkitFullscreenElement || 
                                  !!document.msFullscreenElement;
      setIsFullScreen(isCurrentlyFullScreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // 停止摄像头
  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setIsCameraActive(false);
      socketService.stopMonitoring();
    }
  };

  // 截图功能
  const captureScreenshot = () => {
    socketService.captureScreenshot();
  };

  // 存储最新的视频帧
  const [latestVideoFrame, setLatestVideoFrame] = useState<string>('');
  
  // 语音录音相关状态
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 视频帧采样和处理函数
  const processVideoFrame = () => {
    if (!videoRef.current || !isCameraActive) return;

    const now = Date.now();
    if (now - lastFrameTime < frameInterval) return;

    setLastFrameTime(now);

    // 创建canvas元素用于帧采样，保持适当尺寸以确保视频清晰度
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 320; // 保持适当宽度，确保视频清晰度
      canvas.height = 180; // 保持适当高度，保持16:9比例
      canvasRef.current = canvas;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 绘制视频帧到canvas
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // 将canvas转换为base64编码的图像，保持适当质量以确保视频清晰度
    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          // 直接存储最新的视频帧，不使用环形缓冲区
          setLatestVideoFrame(base64data);
          // 移除控制台日志，减少移动端性能消耗
        };
        reader.readAsDataURL(blob);
      }
    }, 'image/jpeg', 0.6); // 保持适当质量到0.6，确保视频清晰度
  };

  // 启动视频帧处理
  const startVideoProcessing = () => {
    if (!aiIntervalRef.current) {
      aiIntervalRef.current = setInterval(processVideoFrame, 1000);
    }
  };

  // 停止视频帧处理
  const stopVideoProcessing = () => {
    if (aiIntervalRef.current) {
      clearInterval(aiIntervalRef.current);
      aiIntervalRef.current = null;
    }
  };

  // 开始录音
  const startRecording = async () => {
    try {
      // 检查浏览器是否支持getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('您的浏览器不支持麦克风访问功能');
      }

      // 请求麦克风权限
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        // 创建MediaRecorder实例
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        // 存储音频数据
        audioChunksRef.current = [];
        
        // 监听数据可用事件
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        // 监听录制结束事件
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          
          // 自动启动语音识别，直接传递音频Blob
          setTimeout(() => {
            recognizeSpeech(audioBlob);
          }, 100);
        };
        
        // 开始录制
        mediaRecorder.start();
        setIsRecording(true);
      } catch (permissionError: any) {
        if (permissionError.name === 'NotAllowedError' || permissionError.name === 'PermissionDeniedError') {
          // 权限被拒绝，提供更详细的指引，符合iOS和Android最新权限规范
          alert('麦克风权限被拒绝，请在设备设置中允许此应用访问麦克风\n\n📱 iOS (14+): 设置 > 隐私 > 麦克风 > 允许此应用访问\n🤖 Android (10+): 设置 > 应用 > 此应用 > 权限 > 麦克风 > 允许');
        } else if (permissionError.name === 'NotFoundError' || permissionError.name === 'DevicesNotFoundError') {
          alert('未检测到可用的麦克风设备');
        } else if (permissionError.name === 'NotReadableError' || permissionError.name === 'TrackStartError') {
          alert('麦克风被其他应用占用或无法访问，请先关闭其他使用麦克风的应用');
        } else {
          alert('无法访问麦克风，请检查权限设置和设备状态');
        }
      }
    } catch (error) {
      console.error('录音启动失败:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // 停止媒体流
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      console.log('停止录音');
    }
  };

  // 切换录音状态
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 分块处理大数组，避免栈溢出
  const chunkedFromCharCode = (arrayBuffer: ArrayBuffer): string => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const chunkSize = 10000; // 每块处理10000个元素
    let result = '';
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      result += String.fromCharCode(...chunk);
    }
    
    return result;
  };

  // 音频格式转换函数
  const convertAudioFormat = async (audioBlob: Blob): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          // 创建单声道目标
          const monoContext = new (window.AudioContext || (window as any).webkitAudioContext)({
            sampleRate: 16000
          });
          const monoBuffer = monoContext.createBuffer(1, audioBuffer.length, 16000);
          
          // 混合声道
          const leftChannel = audioBuffer.getChannelData(0);
          const rightChannel = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : leftChannel;
          const monoChannel = monoBuffer.getChannelData(0);
          
          for (let i = 0; i < audioBuffer.length; i++) {
            monoChannel[i] = (leftChannel[i] + rightChannel[i]) * 0.5;
          }
          
          // 转换为16bit PCM
          const pcmData = new Int16Array(monoBuffer.length);
          for (let i = 0; i < monoBuffer.length; i++) {
            const sample = monoChannel[i];
            pcmData[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
          }
          
          resolve(pcmData.buffer);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(audioBlob);
    });
  };

  // 生成语音识别鉴权参数函数
  const generateAuthParams = () => {
    const host = 'iat.cn-huabei-1.xf-yun.com';
    const date = new Date().toUTCString();
    const requestLine = 'GET /v1 HTTP/1.1';
    const apiKey = '400c8a717cf49aa624509a41c8d7bf86';
    const apiSecret = 'NDZlZTI5OGE4M2U4YWVjMWI1OWE4Njg4';
    
    // 生成signature_origin
    const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}`;
    
    // 使用Crypto API生成HMAC-SHA256签名
    const encoder = new TextEncoder();
    const keyData = encoder.encode(apiSecret);
    const data = encoder.encode(signatureOrigin);
    
    return new Promise<string>(async (resolve) => {
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, data);
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
      
      // 生成authorization_origin
      const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureBase64}"`;
      
      // 生成最终的authorization
      const authorization = btoa(authorizationOrigin);
      resolve(authorization);
    });
  };

  // 生成文本转语音鉴权参数函数
  const generateTTSAuthParams = () => {
    const host = 'cbm01.cn-huabei-1.xf-yun.com';
    const date = new Date().toUTCString();
    const requestLine = 'GET /v1/private/mcd9m97e6 HTTP/1.1';
    const apiKey = '400c8a717cf49aa624509a41c8d7bf86';
    const apiSecret = 'NDZlZTI5OGE4M2U4YWVjMWI1OWE4Njg4';
    
    // 生成signature_origin
    const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}`;
    
    // 使用Crypto API生成HMAC-SHA256签名
    const encoder = new TextEncoder();
    const keyData = encoder.encode(apiSecret);
    const data = encoder.encode(signatureOrigin);
    
    return new Promise<string>(async (resolve) => {
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, data);
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
      
      // 生成authorization_origin
      const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureBase64}"`;
      
      // 生成最终的authorization
      const authorization = btoa(authorizationOrigin);
      resolve(authorization);
    });
  };

  // 语音识别功能
  const recognizeSpeech = async (audioBlobParam?: Blob) => {
    const currentAudioBlob = audioBlobParam || audioBlob;
    if (!currentAudioBlob) {
      alert('请先录制语音');
      return;
    }

    try {
      // 音频格式转换
      console.log('开始音频格式转换');
      const pcmData = await convertAudioFormat(currentAudioBlob);
      console.log('音频格式转换完成');
      
      // 生成鉴权参数
      console.log('生成鉴权参数');
      const authorization = await generateAuthParams();
      console.log('鉴权参数生成完成');
      
      // 建立WebSocket连接
      console.log('建立WebSocket连接');
      const date = new Date().toUTCString();
      const wsUrl = `wss://iat.cn-huabei-1.xf-yun.com/v1?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=iat.cn-huabei-1.xf-yun.com`;
      
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('WebSocket连接建立成功');
        
        // 发送首帧数据
        const firstFrame = {
          header: {
            app_id: 'a31f4b01',
            status: 0
          },
          parameter: {
            iat: {
              domain: 'slm',
              language: 'mul_cn',
              accent: 'mandarin',
              eos: 6000,
              vinfo: 1,
              result: {
                encoding: 'utf8',
                compress: 'raw',
                format: 'json'
              }
            }
          },
          payload: {
            audio: {
              encoding: 'raw',
              sample_rate: 16000,
              channels: 1,
              bit_depth: 16,
              seq: 1,
              status: 0,
              audio: btoa(chunkedFromCharCode(pcmData))
            }
          }
        };
        
        ws.send(JSON.stringify(firstFrame));
        
        // 发送结束帧
        const lastFrame = {
          header: {
            app_id: 'a31f4b01',
            status: 2
          },
          payload: {
            audio: {
              encoding: 'raw',
              sample_rate: 16000,
              status: 2,
              audio: ''
            }
          }
        };
        
        ws.send(JSON.stringify(lastFrame));
      };
      
      ws.onmessage = (event) => {
        console.log('收到WebSocket消息:', event.data);
        const response = JSON.parse(event.data);
        
        if (response.payload && response.payload.result) {
          const text = response.payload.result.text;
          if (text) {
            // 解码base64文本（处理UTF-8编码）
            const binaryString = atob(text);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const decodedText = new TextDecoder('utf-8').decode(bytes);
            const result = JSON.parse(decodedText);
            console.log('识别结果:', result);
            
            // 提取识别文本
            let recognizedText = '';
            if (result.ws) {
              result.ws.forEach((word: any) => {
                if (word.cw) {
                  word.cw.forEach((char: any) => {
                    recognizedText += char.w;
                  });
                }
              });
            }
            
            if (recognizedText) {
              setAiQuestion(recognizedText);
              console.log('识别结果:', recognizedText);
            }
          }
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket错误:', error);
        alert('语音识别连接失败，请重试');
      };
      
      ws.onclose = () => {
        console.log('WebSocket连接关闭');
      };
      
    } catch (error) {
      console.error('语音识别失败:', error);
      alert('语音识别失败，请重试');
    }
  };

  // 文本转语音功能
  const textToSpeech = async (text: string) => {
    if (!text) {
      alert('请输入要转换的文本');
      return;
    }

    // 检查是否有音频正在播放
    if (isAudioPlaying) {
      return;
    }

    try {
      // 立即设置播放状态，防止重复点击
      setIsAudioPlaying(true);
      
      // 生成鉴权参数
      console.log('生成文本转语音鉴权参数');
      const authorization = await generateTTSAuthParams();
      console.log('鉴权参数生成完成');
      
      // 建立WebSocket连接
      console.log('建立WebSocket连接');
      const date = new Date().toUTCString();
      const wsUrl = `wss://cbm01.cn-huabei-1.xf-yun.com/v1/private/mcd9m97e6?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=cbm01.cn-huabei-1.xf-yun.com`;
      
      const ws = new WebSocket(wsUrl);
      
      // 存储音频数据
      const audioChunks: Blob[] = [];
      
      ws.onopen = () => {
        console.log('WebSocket连接建立成功');
        
        // 发送首帧数据
        const firstFrame = {
          header: {
            app_id: 'a31f4b01',
            status: 2
          },
          parameter: {
            oral: {
              oral_level: 'mid'
            },
            tts: {
              vcn: localStorage.getItem('ttsSpeaker') || 'x5_lingfeiyi_flow',
              speed: 50,
              volume: 50,
              pitch: 50,
              bgs: 0,
              reg: 0,
              rdn: 0,
              rhy: 0,
              audio: {
                encoding: 'lame',
                sample_rate: 24000,
                channels: 1,
                bit_depth: 16,
                frame_size: 0
              }
            }
          },
          payload: {
            text: {
              encoding: 'utf8',
              compress: 'raw',
              format: 'plain',
              status: 2,
              seq: 0,
              text: btoa(unescape(encodeURIComponent(text)))
            }
          }
        };
        
        ws.send(JSON.stringify(firstFrame));
      };
      
      ws.onmessage = (event) => {
        console.log('收到WebSocket消息:', event.data);
        
        try {
          const response = JSON.parse(event.data);
          
          if (response.header && response.header.code === 0) {
            if (response.payload && response.payload.audio) {
              const audioData = response.payload.audio;
              if (audioData.audio) {
                // 解码base64音频数据
                const binaryString = atob(audioData.audio);
                const len = binaryString.length;
                console.log('音频数据长度:', len);
                
                // 检查音频数据是否有效
                if (len > 0) {
                  const bytes = new Uint8Array(len);
                  for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  
                  // 创建音频Blob
                  const audioBlob = new Blob([bytes], { type: 'audio/mp3' });
                  audioChunks.push(audioBlob);
                  console.log('添加音频数据，当前长度:', audioChunks.length);
                }
              }
            }
          } else if (response.header && response.header.code !== 0) {
            console.error('文本转语音失败:', response.header.message);
            alert(`语音合成失败: ${response.header.message}`);
            setIsAudioPlaying(false);
          }
        } catch (error) {
          console.error('解析WebSocket消息失败:', error);
          setIsAudioPlaying(false);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket错误:', error);
        alert('语音合成连接失败，请重试');
        setIsAudioPlaying(false);
      };
      
      ws.onclose = () => {
        console.log('WebSocket连接关闭');
        
        // 播放合成的音频
        if (audioChunks.length > 0) {
          const combinedBlob = new Blob(audioChunks, { type: 'audio/mp3' });
          console.log('合并后的音频Blob大小:', combinedBlob.size);
          
          // 检查音频Blob是否有效
          if (combinedBlob.size > 0) {
            const audioUrl = URL.createObjectURL(combinedBlob);
            
            // 创建音频实例
            const audio = new Audio(audioUrl);
            
            // 存储音频实例到ref
            audioRef.current = audio;
            
            // 播放音频
            console.log('开始播放音频');
            audio.play().then(() => {
              console.log('音频播放成功');
            }).catch(error => {
              console.error('音频播放失败:', error);
              alert('音频播放失败，请重试');
              setIsAudioPlaying(false);
            });
            
            // 音频播放完成事件
            audio.addEventListener('ended', () => {
              console.log('音频播放完成');
              setIsAudioPlaying(false);
            });
            
            // 音频错误事件
            audio.addEventListener('error', () => {
              console.error('音频播放错误');
              setIsAudioPlaying(false);
            });
          } else {
            console.error('音频数据为空');
            alert('音频合成失败，没有生成有效的音频数据');
            setIsAudioPlaying(false);
          }
        } else {
          console.error('没有收到音频数据');
          alert('音频合成失败，没有收到音频数据');
          setIsAudioPlaying(false);
        }
      };
      
    } catch (error) {
      console.error('文本转语音失败:', error);
      alert('语音合成失败，请重试');
      setIsAudioPlaying(false);
    }
  };

  // 监听摄像头状态变化
  useEffect(() => {
    if (isCameraActive) {
      startVideoProcessing();
    } else {
      stopVideoProcessing();
    }

    return () => {
      stopVideoProcessing();
    };
  }, [isCameraActive]);

  // AI视频问答功能
  const askAiQuestion = async () => {
    if (!aiQuestion.trim()) {
      setAiError('请输入问题');
      return;
    }

    setIsAiLoading(true);
    setAiError(null);
    setAiAnswer('');

    try {
      // 使用最新的视频帧
      if (!latestVideoFrame) {
        throw new Error('没有足够的视频数据，请确保摄像头已开启并运行一段时间');
      }

      const base64Frame = latestVideoFrame;

      // 确保base64数据格式正确
      if (!base64Frame.startsWith('data:image/')) {
        throw new Error('视频帧数据格式错误，请确保摄像头正常运行');
      }

      // 验证base64数据完整性
      const parts = base64Frame.split(',');
      if (parts.length !== 2) {
        throw new Error('base64数据格式错误，缺少逗号分隔符');
      }
      
      const base64Content = parts[1];
      if (!base64Content || base64Content.length === 0) {
        throw new Error('base64数据不完整，请确保摄像头正常运行');
      }

      // 验证base64内容是否有效（简单检查）
      const validBase64Regex = /^[A-Za-z0-9+/=]+$/;
      if (!validBase64Regex.test(base64Content)) {
        throw new Error('base64数据格式错误，包含无效字符');
      }

      console.log('Base64帧数据长度:', base64Frame.length);
      console.log('Base64内容长度:', base64Content.length);
      console.log('Base64帧数据前缀:', base64Frame.substring(0, 100));
      console.log('Base64内容前缀:', base64Content.substring(0, 100));
      console.log('Base64内容后缀:', base64Content.substring(base64Content.length - 50));

      // 检查数据是否被截断
      if (base64Content.length % 4 !== 0) {
        console.warn('Base64内容长度不是4的倍数，可能被截断');
      }

      // 使用fetch API调用ModelScope API
      const endpoint = 'https://api-inference.modelscope.cn/v1/chat/completions';
      
      console.log('使用fetch API调用API端点:', endpoint);
      
      // 准备包含图片的请求数据，使用用户输入的问题和从摄像头获取的视频帧
      // 根据API错误信息，使用image_url类型（API支持：text, image_url, video_url, video）
      const requestData = {
        model: 'Qwen/Qwen3-VL-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that can analyze images and answer questions about them. Please provide detailed and accurate descriptions based on the image content.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: aiQuestion || '这张图片是什么颜色的？它看起来像什么？'
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Frame
                }
              }
            ]
          }
        ],
        stream: false,
        max_tokens: 256,
        temperature: 0.7
      };
      
      console.log('发送API请求:', JSON.stringify(requestData, null, 2));
      
      // 使用fetch API调用API，只发送必要的头部
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ms-72ed56c5-4dd0-4298-a99a-9f983fae79ac`
          // 只发送必要的头部，避免发送不被CORS允许的头部
        },
        body: JSON.stringify(requestData)
      });

      console.log('API响应状态:', response.status, response.statusText);

      // 获取详细的错误信息
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API错误详情:', JSON.stringify(errorData, null, 2));
        throw new Error(`API请求失败: ${response.statusText}\n${errorData.error?.message || ''}\n${errorData.error?.code || ''}`);
      }

      // 处理非流式响应
      const responseData = await response.json();
      console.log('API响应数据:', JSON.stringify(responseData, null, 2));
      
      // 检查响应数据
      if (responseData.choices && responseData.choices[0]?.message?.content) {
        const fullAnswer = responseData.choices[0].message.content;
        console.log('模型回答:', fullAnswer);
        // 清理文本后再设置到状态中
        const cleanedAnswer = cleanText(fullAnswer);
        console.log('清理后的回答:', cleanedAnswer);
        setAiAnswer(cleanedAnswer);
      } else {
        console.error('响应中没有找到回答内容:', responseData);
        throw new Error('模型没有返回回答内容');
      }

      setIsAiLoading(false);
    } catch (error: any) {
      console.error('AI问答错误:', error);
      setAiError(`AI问答失败: ${error.message || '未知错误'}`);
      setIsAiLoading(false);
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部问候 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.home.greeting}</h1>
        <p className="text-muted-foreground">{t.home.status}</p>
      </div>

      {/* AI 智能提醒卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-4 mb-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="mb-2 text-orange-900">{t.home.aiAlert}</h3>
            <div className="space-y-2">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <div key={alert.id} className="text-sm text-orange-800">
                    • {alert.message}
                  </div>
                ))
              ) : (
                <>
                  <div className="text-sm text-orange-800">
                    • {t.home.alerts.highTemperature}
                  </div>
                  <div className="text-sm text-orange-800">
                    • {t.home.alerts.lowActivity}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 实时监控 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            <h2>{t.home.liveMonitoring}</h2>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isMonitoring ? 'text-green-600' : 'text-green-600'}`}>
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
            {isMonitoring ? t.home.monitoring : t.home.online}
          </div>
        </div>

        <motion.div
          onDoubleClick={() => {
            toggleVideoMode();
            toggleFullScreen();
          }}
          className="relative bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl overflow-hidden aspect-video cursor-pointer group video-container"
          style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '16/9' }}
        >
          {isCameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="absolute inset-0">
              {/* 预览图片 */}
              <img
                src="./assets/images/xiaoji.png"
                alt="Chicken Coop Preview"
                className="w-full h-full object-cover"
              />
              {/* 覆盖层文字 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white/80 mb-2 mx-auto" />
                </div>
              </div>
            </div>
          )}



          {/* 底部信息栏 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3" style={{ position: 'absolute', bottom: '0', left: '0', right: '0', zIndex: '10' }}>
            <div className="flex flex-wrap justify-between items-center gap-1 text-white text-[10px] sm:text-xs" style={{ width: '100%', boxSizing: 'border-box' }}>
              <span className="flex-shrink-0" style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>{new Date().toISOString().slice(0, 19).replace('T', ' ')}</span>
              <div className="flex flex-wrap gap-1 justify-end flex-shrink-0">
                <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>{t.health.temperature}: 22°C</span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>|</span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>{t.health.humidity}: 65%</span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>|</span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>{t.health.ammoniaLevel}: 12ppm</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* 视频控制按钮 */}
        <div className="mt-4 flex justify-center">
          {!isCameraActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startCamera}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isLoading ? t.home.requestingPermission : t.home.startMonitoring}
            </motion.button>
          ) : (
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={captureScreenshot}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <Camera className="w-5 h-5" />
                {t.home.screenshot}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopCamera}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white"></div>
                </div>
                {t.home.stopMonitoring}
              </motion.button>
            </div>
          )}
        </div>

        {/* 截图预览 */}
        {screenshotUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white rounded-xl p-3 shadow-sm"
          >
            <h4 className="text-sm font-medium mb-2">截图预览</h4>
            <img src={screenshotUrl} alt="Screenshot" className="w-full rounded-lg" />
          </motion.div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          {t.home.hint}
        </div>

        {/* AI视频问答功能 */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t.home.aiVideoQa}</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAiActive(!isAiActive)}
              className={`px-4 py-1.5 rounded-full text-sm ${isAiActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {isAiActive ? t.home.close : t.home.open}
            </motion.button>
          </div>

          {isAiActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              {/* 问题输入区域 */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={t.home.inputQuestion}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* 发送按钮 */}
              <div className="mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={askAiQuestion}
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAiLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isAiLoading ? t.home.analyzing : t.home.sendQuestion}
                </motion.button>
              </div>

              {/* 麦克风按钮 */}
              <div className="mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  disabled={isAiLoading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                  {isRecording ? t.home.stopRecording : t.home.voiceQuestion}
                </motion.button>
                
                {/* 录音状态反馈 */}
                {isRecording && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{t.home.recording}</span>
                  </div>
                )}
                
                {/* 录音完成反馈 */}
                {audioBlob && !isRecording && (
                  <div className="mt-2">
                    <div className="text-center text-sm text-green-600 mb-2">
                      录音完成，音频大小: {(audioBlob.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                )}
              </div>

              {/* 错误提示 */}
              {aiError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{aiError}</p>
                </div>
              )}

              {/* 回答显示区域 */}
              {aiAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{t.home.aiAnswer}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={isAudioPlaying ? { 
                        scale: [1, 1.1, 1],
                        color: '#3b82f6'
                      } : {}}
                      transition={isAudioPlaying ? { 
                        repeat: Infinity,
                        duration: 1
                      } : {}}
                      onClick={() => textToSpeech(aiAnswer)}
                      className={`flex items-center justify-center p-1.5 rounded-full transition-all ${isAudioPlaying ? 'text-blue-500 bg-blue-100' : 'text-blue-500 hover:bg-blue-100'}`}
                      title={t.home.playVoice}
                    >
                      <motion.div
                        animate={isAudioPlaying ? {
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={isAudioPlaying ? {
                          repeat: Infinity,
                          duration: 1
                        } : {}}
                      >
                        <Volume2 className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-normal break-words">{aiAnswer}</p>
                </motion.div>
              )}

              {/* 提示信息 */}
              <div className="mt-4 text-xs text-gray-500">
                {t.home.qaHint}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 鸡群情绪状态 */}
      <div className="mb-6 bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3>{t.home.chickenEmotions}</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {
            [
              { emoji: '😊', label: t.home.emotions.happy, count: 8 },
              { emoji: '😌', label: t.home.emotions.relaxed, count: 4 },
              { emoji: '😰', label: t.home.emotions.nervous, count: 1 },
              { emoji: '😱', label: t.home.emotions.panic, count: 0 }
            ].map((emotion) => (
              <div
                key={emotion.label}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 text-center"
              >
                <div className="text-2xl mb-1">{emotion.emoji}</div>
                <div className="text-xs text-gray-600 mb-1">{emotion.label}</div>
                <div className="text-lg">{emotion.count}</div>
              </div>
            ))
          }
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={<Activity className="w-5 h-5 text-green-600" />}
          label={t.home.activity}
          value={stats.activity || 85}
          unit="%"
          status="good"
          bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
        />
        <StatCard
          icon={<Heart className="w-5 h-5 text-pink-600" />}
          label={t.home.healthScore}
          value={stats.health || 92}
          unit="/100"
          status="good"
          bgColor="bg-gradient-to-br from-pink-50 to-rose-50"
        />
        <StatCard
          icon={<Wheat className="w-5 h-5 text-amber-600" />}
          label={t.home.feed}
          value={stats.feed || 65}
          unit="%"
          status="good"
          bgColor="bg-gradient-to-br from-amber-50 to-yellow-50"
        />
        <StatCard
          icon={<Droplets className="w-5 h-5 text-blue-600" />}
          label={t.home.water}
          value={stats.water || 42}
          unit="%"
          status="warning"
          bgColor="bg-gradient-to-br from-blue-50 to-cyan-50"
        />
      </div>

      {/* 快捷操作 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="mb-4">{t.home.quickActions}</h3>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction
            icon={<Wheat className="w-6 h-6 text-amber-600" />}
            label={t.home.feedChickens}
            onClick={() => alert(t.home.feedChickens)}
            color="bg-gradient-to-br from-amber-50 to-yellow-50"
          />
          <QuickAction
            icon={<Trash2 className="w-6 h-6 text-blue-600" />}
            label={t.home.startCleaning}
            onClick={() => alert(t.home.startCleaning)}
            color="bg-gradient-to-br from-blue-50 to-cyan-50"
          />
          <QuickAction
            icon={<Fan className="w-6 h-6 text-green-600" />}
            label={t.home.startVentilation}
            onClick={() => alert(t.home.startVentilation)}
            color="bg-gradient-to-br from-green-50 to-emerald-50"
          />
          <QuickAction
            icon={<Camera className="w-6 h-6 text-purple-600" />}
            label={t.home.capturePhoto}
            onClick={() => alert(t.home.capturePhoto)}
            color="bg-gradient-to-br from-purple-50 to-pink-50"
          />
        </div>
      </div>

      {/* 今日摘要 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-purple-600" />
          <h3>{t.home.todaySummary}</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.home.summary.eggs}</span>
            <span>{stats.eggs || 3} {language === 'zh' ? '枚' : 'pieces'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.home.summary.feedConsumption}</span>
            <span>{stats.feedConsumption || 2.3} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.home.summary.waterConsumption}</span>
            <span>{stats.waterConsumption || 4.8} L</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.home.summary.anomalies}</span>
            <span className="text-orange-600">1 {language === 'zh' ? '次' : 'times'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
