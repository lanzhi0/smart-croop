import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Wifi, 
  Moon,
  ChevronRight,
  ChevronDown,
  LogOut,
  Info,
  HelpCircle,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { Language, translations } from '@/app/i18n/translations';

interface SettingsPageProps {
  language: Language;
  changeLanguage: (language: Language) => void;
}

export function SettingsPage({ language, changeLanguage }: SettingsPageProps) {
  const [showAutomationSettings, setShowAutomationSettings] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    videoUnderstanding: 'ms-72ed56c5-4dd0-4298-a99a-9f983fae79ac',
    speechRecognition: '400c8a717cf49aa624509a41c8d7bf86',
    speechSynthesis: '400c8a717cf49aa624509a41c8d7bf86'
  });
  const [showApiKeys, setShowApiKeys] = useState({
    videoUnderstanding: false,
    speechRecognition: false,
    speechSynthesis: false
  });
  const [isSaving, setIsSaving] = useState(false);
  // 语言选择状态
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  // 发音人选择状态
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>(
    localStorage.getItem('ttsSpeaker') || 'x5_lingfeiyi_flow'
  );
  
  // 发音人列表
  const speakers = [
    { value: 'x6_xiaoqiChat_pro', label: '聆小琪' },
    { value: 'x5_EnUs_Lila_flow', label: 'Lila (English)' },
    { value: 'x6_waiguodashu_pro', label: '歪国人' },
    { value: 'x6_feizheChat_pro', label: '聆飞哲' }
  ];

  // 获取当前语言的翻译
  const t = translations[language];

  // 动态生成设置列表，根据当前语言显示对应的文本
  const settingsSections = [
    {
      title: t.settings.accountSettings,
      items: [
        { icon: <User className="w-5 h-5" />, label: t.settings.personalInfo, value: language === 'zh' ? '张三' : 'Zhang San', color: 'text-blue-600', id: 'personalInfo' },
        { icon: <Shield className="w-5 h-5" />, label: t.settings.privacyAndSecurity, value: '', color: 'text-green-600', id: 'privacyAndSecurity' }
      ]
    },
    {
      title: t.settings.farmConfiguration,
      items: [
        { icon: <Wifi className="w-5 h-5" />, label: t.settings.deviceConnection, value: language === 'zh' ? '已连接 3 台' : '3 devices connected', color: 'text-purple-600', id: 'deviceConnection' },
        { icon: <SettingsIcon className="w-5 h-5" />, label: t.settings.automationSettings, value: '', color: 'text-orange-600', id: 'automationSettings' }
      ]
    },
    {
      title: t.settings.notificationPreferences,
      items: [
        { icon: <Bell className="w-5 h-5" />, label: t.settings.pushNotifications, value: language === 'zh' ? '已开启' : 'Enabled', color: 'text-pink-600', id: 'pushNotifications' },
        { icon: <Moon className="w-5 h-5" />, label: t.settings.doNotDisturb, value: '22:00 - 07:00', color: 'text-indigo-600', id: 'doNotDisturb' }
      ]
    },
    {
      title: t.settings.helpAndSupport,
      items: [
        { icon: <HelpCircle className="w-5 h-5" />, label: t.settings.userGuide, value: '', color: 'text-cyan-600', id: 'userGuide' },
        { icon: <Info className="w-5 h-5" />, label: t.settings.aboutApp, value: 'v2.1.0', color: 'text-gray-600', id: 'aboutApp' }
      ]
    }
  ];

  const handleSaveApiKey = async (keyType: keyof typeof apiKeys) => {
    setIsSaving(true);
    try {
      // 模拟API调用，保存API密钥
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`保存${keyType} API密钥:`, apiKeys[keyType]);
      alert(t.common.saveSuccess);
    } catch (error) {
      console.error('保存API密钥失败:', error);
      alert(t.common.saveFailed);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleApiKeyVisibility = (keyType: keyof typeof showApiKeys) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }));
  };

  // 处理语言变更
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as Language);
  };

  // 确定语言变更
  const confirmLanguageChange = () => {
    changeLanguage(selectedLanguage);
    alert(language === 'zh' ? '语言设置已更新！' : 'Language settings updated!');
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.settings.title}</h1>
        <p className="text-gray-500">{t.settings.subtitle}</p>
      </div>

      {/* 用户卡片 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">
            🐔
          </div>
          <div className="flex-1">
            <h2 className="text-xl mb-1">Smart Chicken Farm</h2>
            <p className="text-sm text-gray-600">{t.settings.userCard.memberLevel}{t.settings.userCard.premiumMember}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-green-200">
          <div className="text-center">
            <div className="text-2xl text-green-600 mb-1">6</div>
            <div className="text-xs text-gray-600">{t.settings.userCard.chickens}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 mb-1">95</div>
            <div className="text-xs text-gray-600">{t.settings.userCard.eggsThisMonth}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-blue-600 mb-1">92</div>
            <div className="text-xs text-gray-600">{t.settings.userCard.healthScore}</div>
          </div>
        </div>
      </motion.div>

      {/* 设置列表 */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm text-gray-500 mb-3 px-1">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                    onClick={() => {
                      if (item.id === 'automationSettings') {
                        setShowAutomationSettings(!showAutomationSettings);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={item.color}>{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-sm text-gray-500">{item.value}</span>
                      )}
                      {item.id === 'automationSettings' ? (
                        showAutomationSettings ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </motion.button>
                  
                  {/* 自动化设置详细内容 */}
                  {item.id === 'automationSettings' && showAutomationSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="border-t border-gray-100 pt-4 space-y-4">
                        {/* 视频理解API密钥 */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t.settings.automation.videoUnderstandingApiKey}</h4>
                          <div className="relative">
                            <input
                              type={showApiKeys.videoUnderstanding ? 'text' : 'password'}
                              value={apiKeys.videoUnderstanding}
                              onChange={(e) => setApiKeys(prev => ({
                                ...prev,
                                videoUnderstanding: e.target.value
                              }))}
                              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={t.settings.automation.enterApiKey}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => toggleApiKeyVisibility('videoUnderstanding')}
                            >
                              {showApiKeys.videoUnderstanding ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSaveApiKey('videoUnderstanding')}
                            disabled={isSaving}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <span>{t.common.saving}</span>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>{t.common.save}</span>
                              </>
                            )}
                          </motion.button>
                        </div>

                        {/* 语音识别API密钥 */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t.settings.automation.speechRecognitionApiKey}</h4>
                          <div className="relative">
                            <input
                              type={showApiKeys.speechRecognition ? 'text' : 'password'}
                              value={apiKeys.speechRecognition}
                              onChange={(e) => setApiKeys(prev => ({
                                ...prev,
                                speechRecognition: e.target.value
                              }))}
                              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={t.settings.automation.enterApiKey}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => toggleApiKeyVisibility('speechRecognition')}
                            >
                              {showApiKeys.speechRecognition ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSaveApiKey('speechRecognition')}
                            disabled={isSaving}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <span>{t.common.saving}</span>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>{t.common.save}</span>
                              </>
                            )}
                          </motion.button>
                        </div>

                        {/* 语音合成API密钥 */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t.settings.automation.speechSynthesisApiKey}</h4>
                          <div className="relative">
                            <input
                              type={showApiKeys.speechSynthesis ? 'text' : 'password'}
                              value={apiKeys.speechSynthesis}
                              onChange={(e) => setApiKeys(prev => ({
                                ...prev,
                                speechSynthesis: e.target.value
                              }))}
                              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={t.settings.automation.enterApiKey}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => toggleApiKeyVisibility('speechSynthesis')}
                            >
                              {showApiKeys.speechSynthesis ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSaveApiKey('speechSynthesis')}
                            disabled={isSaving}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <span>{t.common.saving}</span>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>{t.common.save}</span>
                              </>
                            )}
                          </motion.button>
                        </div>

                        {/* 语言设置 */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t.settings.automation.language}</h4>
                          <div className="relative">
                            <select
                              value={selectedLanguage}
                              onChange={handleLanguageChange}
                              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="zh">中文</option>
                              <option value="en">English</option>
                            </select>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={confirmLanguageChange}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <span>{t.common.confirm}</span>
                          </motion.button>
                        </div>

                        {/* 发音人选择 */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">发音人选择</h4>
                          <div className="relative">
                            <select
                              value={selectedSpeaker}
                              onChange={(e) => setSelectedSpeaker(e.target.value)}
                              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {speakers.map(speaker => (
                                <option key={speaker.value} value={speaker.value}>
                                  {speaker.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              // 保存发音人设置
                              localStorage.setItem('ttsSpeaker', selectedSpeaker);
                              alert(t.common.saveSuccess);
                            }}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>{t.common.save}</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-left"
        >
          <div className="text-3xl mb-2">📚</div>
          <div className="text-sm">{t.settings.quickActions.chickenGuide}</div>
          <div className="text-xs text-gray-600 mt-1">{t.settings.quickActions.beginnerGuide}</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-left"
        >
          <div className="text-3xl mb-2">🎁</div>
          <div className="text-sm">{t.settings.quickActions.membershipCenter}</div>
          <div className="text-xs text-gray-600 mt-1">{t.settings.quickActions.exclusiveBenefits}</div>
        </motion.button>
      </div>

      {/* 数据统计 */}
      <div className="mt-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-5 shadow-sm">
        <h3 className="mb-4">{t.settings.statistics.usageStatistics}</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.settings.statistics.totalUsageDays}</span>
            <span className="text-lg text-orange-600">127 {language === 'zh' ? '天' : 'days'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.settings.statistics.totalEggRecords}</span>
            <span className="text-lg text-orange-600">360 {language === 'zh' ? '枚' : 'pieces'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.settings.statistics.aiAlerts}</span>
            <span className="text-lg text-orange-600">28 {language === 'zh' ? '次' : 'times'}</span>
          </div>
          <div className="pt-3 border-t border-orange-200 text-xs text-gray-600">
            {t.settings.statistics.usageMessage}
          </div>
        </div>
      </div>

      {/* 退出登录 */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-gradient-to-br from-red-50 to-pink-50 text-red-600 rounded-2xl p-4 flex items-center justify-center gap-2 shadow-sm"
      >
        <LogOut className="w-5 h-5" />
        <span>{t.settings.logout}</span>
      </motion.button>

      {/* 版权信息 */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>{t.settings.copyright}</p>
        <p className="mt-1">{t.settings.copyrightMessage}</p>
      </div>
    </div>
  );
}
