import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface CameraTestPageProps {
  language: Language;
}

export function CameraTestPage({ language }: CameraTestPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'unknown' | 'granted' | 'denied' | 'error'>('unknown');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useState<HTMLVideoElement | null>(null);

  const testCameraPermission = async () => {
    setIsTesting(true);
    setTestResult('unknown');
    setErrorMessage('');

    try {
      // 检查浏览器是否支持getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('您的浏览器不支持摄像头调用功能');
      }

      // 尝试获取摄像头权限
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' 
        },
        audio: false 
      });

      setStream(mediaStream);
      setTestResult('granted');
      setIsTesting(false);
    } catch (error: any) {
      console.error('Camera permission error:', error);
      setIsTesting(false);

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setTestResult('denied');
        setErrorMessage('摄像头权限被拒绝，请在浏览器设置中允许摄像头访问');
      } else if (error.name === 'NotFoundError') {
        setTestResult('error');
        setErrorMessage('未找到可用的摄像头设备');
      } else if (error.name === 'NotSupportedError') {
        setTestResult('error');
        setErrorMessage('当前环境不支持摄像头调用，请使用HTTPS协议');
      } else {
        setTestResult('error');
        setErrorMessage(error.message || '未知错误');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setTestResult('unknown');
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-4">摄像头权限测试</h1>
        <p className="text-gray-600 mb-6">
          此页面用于测试摄像头权限和安全规范，确保您的浏览器能够正确处理摄像头访问请求。
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={testCameraPermission}
          disabled={isTesting || testResult === 'granted'}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-sm hover:shadow-md transition-all mb-6"
        >
          <Camera className="w-5 h-5" />
          {isTesting ? '测试中...' : '测试摄像头权限'}
        </motion.button>

        {testResult !== 'unknown' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 ${testResult === 'granted' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
          >
            <div className="flex items-start gap-3">
              {testResult === 'granted' ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${testResult === 'granted' ? 'text-green-800' : 'text-red-800'}`}>
                  {testResult === 'granted' ? '摄像头权限测试通过' : '摄像头权限测试失败'}
                </h3>
                {testResult !== 'granted' && (
                  <p className="text-red-700 text-sm">
                    {errorMessage}
                  </p>
                )}
                {testResult === 'granted' && (
                  <p className="text-green-700 text-sm">
                    摄像头权限已成功获取，您可以正常使用监控功能。
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {stream && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="font-medium mb-3">摄像头预览</h3>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                srcObject={stream}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopCamera}
              className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <XCircle className="w-5 h-5" />
              停止预览
            </motion.button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-yellow-800 mb-2">安全规范说明</h3>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• 摄像头调用需要通过HTTPS协议进行</li>
                <li>• 需要用户主动点击按钮触发摄像头调用</li>
                <li>• 浏览器会向用户请求摄像头访问权限</li>
                <li>• 请确保在浏览器设置中允许此网站访问摄像头</li>
                <li>• 在本地开发环境中，某些浏览器可能会限制摄像头访问</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}