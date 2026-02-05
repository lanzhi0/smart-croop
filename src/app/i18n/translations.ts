// 定义支持的语言类型
export type Language = 'zh' | 'en';

// 定义翻译文本的接口
export interface Translation {
  // 通用
  common: {
    save: string;
    saving: string;
    saveSuccess: string;
    saveFailed: string;
    confirm: string;
    cancel: string;
    
    // 导航栏
    home: string;
    chickens: string;
    health: string;
    eggs: string;
    feeding: string;
    data: string;
    settings: string;
  };
  
  // 首页
  home: {
    // 头部
    greeting: string;
    status: string;
    
    // AI智能提醒
    aiAlert: string;
    alerts: {
      highTemperature: string;
      lowActivity: string;
    };
    
    // 实时监控
    liveMonitoring: string;
    monitoring: string;
    online: string;
    mainView: string;
    coopView: string;
    doubleClick: string;
    aiBehavior: string;
    eating: string;
    happy: string;
    startMonitoring: string;
    requestingPermission: string;
    screenshot: string;
    stopMonitoring: string;
    hint: string;
    
    // AI视频问答
    aiVideoQa: string;
    open: string;
    close: string;
    inputQuestion: string;
    sendQuestion: string;
    analyzing: string;
    voiceQuestion: string;
    stopRecording: string;
    recording: string;
    aiAnswer: string;
    playVoice: string;
    qaHint: string;
    
    // 鸡群情绪状态
    chickenEmotions: string;
    emotions: {
      happy: string;
      relaxed: string;
      nervous: string;
      panic: string;
    };
    
    // 核心指标
    coreMetrics: string;
    activity: string;
    healthScore: string;
    feed: string;
    water: string;
    
    // 快捷操作
    quickActions: string;
    feedChickens: string;
    startCleaning: string;
    startVentilation: string;
    capturePhoto: string;
    
    // 今日摘要
    todaySummary: string;
    summary: {
      eggs: string;
      feedConsumption: string;
      waterConsumption: string;
      anomalies: string;
    };
  };
  
  // 鸡群页面
  chickens: {
    // 头部
    title: string;
    status: string;
    healthyCount: string;
    
    // 群体状态概览
    groupStatus: string;
    averageMood: string;
    averageHealth: string;
    averageActivity: string;
    good: string;
    
    // 鸡列表
    chickenName: string;
    age: string;
    health: string;
    activity: string;
    
    // 警告提示
    activityDecreased: string;
    suggestAttention: string;
    
    // 详情弹窗
    healthScore: string;
    activityLevel: string;
    currentMood: string;
    todayData: string;
    feedingTimes: string;
    drinkingTimes: string;
    activityDuration: string;
    eggsLaid: string;
    close: string;
  };
  
  // 健康监测页面
  health: {
    // 头部
    title: string;
    status: string;
    
    // 整体健康评分
    flockHealthScore: string;
    basedOnAnalysis: string;
    good: string;
    
    // 健康维度
    immunity: string;
    growthStatus: string;
    excellent: string;
    normal: string;
    
    // 健康趋势
    healthTrend: string;
    
    // 健康维度分析
    healthDimensionAnalysis: string;
    vitality: string;
    appetite: string;
    mentalState: string;
    featherCondition: string;
    breathingCondition: string;
    excretionNormal: string;
    
    // 疾病风险
    diseaseRiskAssessment: string;
    respiratoryInfection: string;
    intestinalDisease: string;
    parasites: string;
    malnutrition: string;
    
    // 环境健康指标
    environmentalHealth: string;
    temperature: string;
    humidity: string;
    airQuality: string;
    ammoniaLevel: string;
    suitable: string;
    excellentAir: string;
    normalCo2: string;
    low: string;
    safeRange: string;
    
    // AI健康建议
    aiHealthAdvice: string;
    nutritionAdvice: string;
    vitaminCSupplement: string;
    drinkingAdvice: string;
    keepHydrated: string;
    environmentAdvice: string;
    ventilationAdvice: string;
  };
  
  // 产蛋监测页面
  eggs: {
    // 头部
    title: string;
    status: string;
    
    // 今日产蛋
    todayEggs: string;
    realTimeUpdate: string;
    pieces: string;
    
    // 累计数据
    weeklyTotal: string;
    monthlyTotal: string;
    layingRate: string;
    
    // 产蛋趋势
    layingTrend: string;
    dailyAverage: string;
    comparedToLastWeek: string;
    
    // 蛋品质分析
    eggQualityAnalysis: string;
    normalEgg: string;
    softShellEgg: string;
    brokenEgg: string;
    deformedEgg: string;
    
    // 异常检测
    anomalyDetection: string;
    increasedSoftShellEggs: string;
    calciumSupplementAdvice: string;
    aiSuggestion: string;
    calciumOrVitaminDDeficiency: string;
    
    // 产蛋排行
    layingRanking: string;
    
    // 产蛋预测
    aiLayingPrediction: string;
    tomorrowPrediction: string;
    weeklyPrediction: string;
    peakLayingTime: string;
    morningPeak: string;
  };
  
  // 饲喂管理页面
  feeding: {
    // 头部
    title: string;
    status: string;
    
    // 余量监测
    feedRemaining: string;
    waterRemaining: string;
    remainingAmount: string;
    suggestRefill: string;
    waterLow: string;
    suggestAddWater: string;
    
    // 快捷投喂
    quickFeeding: string;
    feedChickens: string;
    addWater: string;
    feedMedicine: string;
    
    // 消耗趋势
    feedConsumption: string;
    waterConsumption: string;
    todayConsumption: string;
    perChickenAverage: string;
    
    // 自动投喂计划
    autoFeedingPlan: string;
    settings: string;
    completed: string;
    pending: string;
    running: string;
    
    // 采食异常
    feedingAnomaly: string;
    reducedIntake: string;
    observeHealth: string;
    
    // 成本分析
    costAnalysis: string;
    todayFeedCost: string;
    weeklyTotal: string;
    estimatedMonthly: string;
    costSaved: string;
    feedEfficiencyImproved: string;
  };
  
  // 数据分析页面
  data: {
    // 头部
    title: string;
    status: string;
    
    // 核心指标
    averageActivity: string;
    weeklyEggProduction: string;
    weeklyFeedConsumption: string;
    feedConversionRate: string;
    comparedToLastWeek: string;
    eggsPerKgFeed: string;
    
    // 活跃时间分布
    activityTimeDistribution: string;
    morning: string;
    afternoon: string;
    evening: string;
    activityPeak: string;
    bestObservationTime: string;
    morningPeriod: string;
    
    // 行为分析
    behaviorAnalysis: string;
    feeding: string;
    drinking: string;
    resting: string;
    walking: string;
    socializing: string;
    preening: string;
    mostFrequent: string;
    lessFrequent: string;
    
    // 月度趋势对比
    monthlyTrendComparison: string;
    eggs: string;
    feed: string;
    water: string;
    
    // AI智能报告
    aiSmartReport: string;
    todayReport: string;
    dailySummary: string;
    weeklyReport: string;
    weeklyAnalysis: string;
    monthlyReport: string;
    monthlyAnalysis: string;
    
    // AI数据洞察
    aiDataInsights: string;
    productionTrend: string;
    productionInsight: string;
    healthStatus: string;
    healthInsight: string;
    efficiencyOptimization: string;
    efficiencyInsight: string;
  };
  
  // 设置页面
  settings: {
    title: string;
    subtitle: string;
    accountSettings: string;
    personalInfo: string;
    privacyAndSecurity: string;
    farmConfiguration: string;
    deviceConnection: string;
    automationSettings: string;
    notificationPreferences: string;
    pushNotifications: string;
    doNotDisturb: string;
    helpAndSupport: string;
    userGuide: string;
    aboutApp: string;
    
    // 自动化设置
    automation: {
      videoUnderstandingApiKey: string;
      speechRecognitionApiKey: string;
      speechSynthesisApiKey: string;
      enterApiKey: string;
      language: string;
      selectLanguage: string;
    };
    
    // 用户卡片
    userCard: {
      memberLevel: string;
      premiumMember: string;
      chickens: string;
      eggsThisMonth: string;
      healthScore: string;
    };
    
    // 快捷操作
    quickActions: {
      chickenGuide: string;
      beginnerGuide: string;
      membershipCenter: string;
      exclusiveBenefits: string;
    };
    
    // 数据统计
    statistics: {
      usageStatistics: string;
      totalUsageDays: string;
      totalEggRecords: string;
      aiAlerts: string;
      usageMessage: string;
    };
    
    // 退出登录
    logout: string;
    
    // 版权信息
    copyright: string;
    copyrightMessage: string;
  };
}

// 中文翻译
export const zh: Translation = {
  common: {
    save: '保存',
    saving: '保存中...',
    saveSuccess: '保存成功！',
    saveFailed: '保存失败，请重试',
    confirm: '确定',
    cancel: '取消',
    
    // 导航栏
    home: '首页',
    chickens: '鸡群',
    health: '健康',
    eggs: '产蛋',
    feeding: '投喂',
    data: '数据',
    settings: '设置',
  },
  
  // 首页
  home: {
    // 头部
    greeting: '早上好 👋',
    status: '您的鸡宝宝们状态良好',
    
    // AI智能提醒
    aiAlert: 'AI 智能提醒',
    alerts: {
      highTemperature: '鸡舍温度偏高，建议开启通风',
      lowActivity: '迅猛龙今日活动量较昨日减少15%',
    },
    
    // 实时监控
    liveMonitoring: '实时监控',
    monitoring: '监控中',
    online: '在线',
    mainView: '主视角：小黄',
    coopView: '全景：鸡舍内部',
    doubleClick: '双击切换视角',
    aiBehavior: 'AI 行为识别:',
    eating: '进食中',
    happy: '😊 开心',
    startMonitoring: '开始监控',
    requestingPermission: '请求权限中...',
    screenshot: '截图',
    stopMonitoring: '停止监控',
    hint: '提示：双击视频可切换主视角与鸡舍全景',
    
    // AI视频问答
    aiVideoQa: 'AI视频问答',
    open: '开启',
    close: '关闭',
    inputQuestion: '请输入您的问题（例如：视频中鸡的状态如何？）',
    sendQuestion: '发送问题',
    analyzing: '分析中...',
    voiceQuestion: '语音提问',
    stopRecording: '停止录音',
    recording: '正在录音...',
    aiAnswer: 'AI回答：',
    playVoice: '播放语音',
    qaHint: '提示：AI视频问答功能需要摄像头开启并运行一段时间，以便积累足够的视频数据进行分析。',
    
    // 鸡群情绪状态
    chickenEmotions: '鸡群情绪状态',
    emotions: {
      happy: '开心',
      relaxed: '放松',
      nervous: '紧张',
      panic: '恐慌',
    },
    
    // 核心指标
    coreMetrics: '核心指标',
    activity: '活跃度',
    healthScore: '健康评分',
    feed: '饲料余量',
    water: '饮水余量',
    
    // 快捷操作
    quickActions: '快捷操作',
    feedChickens: '启动投喂',
    startCleaning: '启动清理',
    startVentilation: '开启通风',
    capturePhoto: '抓拍照片',
    
    // 今日摘要
    todaySummary: '今日摘要',
    summary: {
      eggs: '产蛋数量',
      feedConsumption: '饲料消耗',
      waterConsumption: '饮水消耗',
      anomalies: '异常行为',
    },
  },
  
  // 鸡群页面
  chickens: {
    // 头部
    title: '我的鸡宝宝们 🐔',
    status: '共 {{count}} 只鸡，{{healthyCount}} 只健康',
    healthyCount: '健康',
    
    // 群体状态概览
    groupStatus: '群体状态概览',
    averageMood: '平均情绪',
    averageHealth: '平均健康',
    averageActivity: '平均活跃',
    good: '良好',
    
    // 鸡列表
    chickenName: '鸡名',
    age: '年龄',
    health: '健康',
    activity: '活跃度',
    
    // 警告提示
    activityDecreased: '活动量较昨日下降',
    suggestAttention: '建议关注',
    
    // 详情弹窗
    healthScore: '健康评分',
    activityLevel: '活跃度',
    currentMood: '当前情绪',
    todayData: '今日数据',
    feedingTimes: '进食次数',
    drinkingTimes: '饮水次数',
    activityDuration: '活动时长',
    eggsLaid: '产蛋',
    close: '关闭',
  },
  
  // 健康监测页面
  health: {
    // 头部
    title: '健康监测 💚',
    status: '实时追踪鸡群健康状况',
    
    // 整体健康评分
    flockHealthScore: '鸡群健康评分',
    basedOnAnalysis: '基于多维度AI分析',
    good: '良好',
    
    // 健康维度
    immunity: '免疫力',
    growthStatus: '生长状态',
    excellent: '优秀',
    normal: '正常',
    
    // 健康趋势
    healthTrend: '健康评分趋势（7天）',
    
    // 健康维度分析
    healthDimensionAnalysis: '健康维度分析',
    vitality: '活动力',
    appetite: '食欲',
    mentalState: '精神状态',
    featherCondition: '羽毛状态',
    breathingCondition: '呼吸状况',
    excretionNormal: '排泄正常',
    
    // 疾病风险
    diseaseRiskAssessment: '疾病风险评估',
    respiratoryInfection: '呼吸道感染',
    intestinalDisease: '肠道疾病',
    parasites: '寄生虫',
    malnutrition: '营养不良',
    
    // 环境健康指标
    environmentalHealth: '环境健康指标',
    temperature: '温度',
    humidity: '湿度',
    airQuality: '空气质量',
    ammoniaLevel: '氨气浓度',
    suitable: '适宜',
    excellentAir: '优',
    normalCo2: 'CO₂ 正常',
    low: '低',
    safeRange: '安全范围',
    
    // AI健康建议
    aiHealthAdvice: 'AI 健康建议',
    nutritionAdvice: '✨ 营养建议',
    vitaminCSupplement: '建议增加维生素C补充，增强免疫力',
    drinkingAdvice: '💧 饮水建议',
    keepHydrated: '今日气温较高，注意保持充足饮水',
    environmentAdvice: '🌱 环境建议',
    ventilationAdvice: '午后建议开启通风系统，保持空气流通',
  },
  
  // 产蛋监测页面
  eggs: {
    // 头部
    title: '产蛋监测 🥚',
    status: '智能追踪产蛋情况',
    
    // 今日产蛋
    todayEggs: '今日产蛋',
    realTimeUpdate: '实时统计更新',
    pieces: '枚',
    
    // 累计数据
    weeklyTotal: '本周累计',
    monthlyTotal: '本月累计',
    layingRate: '产蛋率',
    
    // 产蛋趋势
    layingTrend: '产蛋趋势（7天）',
    dailyAverage: '日均产蛋',
    comparedToLastWeek: '较上周',
    
    // 蛋品质分析
    eggQualityAnalysis: '蛋品质分析（本周）',
    normalEgg: '正常蛋',
    softShellEgg: '软壳蛋',
    brokenEgg: '破损蛋',
    deformedEgg: '畸形蛋',
    
    // 异常检测
    anomalyDetection: '异常检测',
    increasedSoftShellEggs: '⚠️ 软壳蛋增多',
    calciumSupplementAdvice: '过去3天检测到1枚软壳蛋，建议补充钙质',
    aiSuggestion: '💡 AI 建议',
    calciumOrVitaminDDeficiency: '可能是缺钙或维生素D不足，建议增加贝壳粉喂养',
    
    // 产蛋排行
    layingRanking: '产蛋排行榜（本月）',
    
    // 产蛋预测
    aiLayingPrediction: 'AI 产蛋预测',
    tomorrowPrediction: '明日预测',
    weeklyPrediction: '本周预计',
    peakLayingTime: '产蛋高峰期',
    morningPeak: '上午 8-11点',
  },
  
  // 饲喂管理页面
  feeding: {
    // 头部
    title: '饲喂管理 🌾',
    status: '智能投喂与消耗监测',
    
    // 余量监测
    feedRemaining: '饲料余量',
    waterRemaining: '饮水余量',
    remainingAmount: '剩余约',
    suggestRefill: '建议补充饲料',
    waterLow: '水量偏低',
    suggestAddWater: '建议补充',
    
    // 快捷投喂
    quickFeeding: '快捷投喂',
    feedChickens: '投喂饲料',
    addWater: '补充饮水',
    feedMedicine: '投喂药物',
    
    // 消耗趋势
    feedConsumption: '饲料消耗（今日）',
    waterConsumption: '饮水消耗（今日）',
    todayConsumption: '今日消耗',
    perChickenAverage: '平均每只',
    
    // 自动投喂计划
    autoFeedingPlan: '自动投喂计划',
    settings: '设置',
    completed: '已完成',
    pending: '待执行',
    running: '运行中',
    
    // 采食异常
    feedingAnomaly: '采食异常',
    reducedIntake: '⚠️ 迅猛龙今日进食量减少',
    observeHealth: '较昨日减少35%，建议观察健康状况',
    
    // 成本分析
    costAnalysis: '成本分析',
    todayFeedCost: '今日饲料成本',
    weeklyTotal: '本周累计',
    estimatedMonthly: '预计月度',
    costSaved: '💡 相比上月节约 8%',
    feedEfficiencyImproved: '饲料利用率提升',
  },
  
  // 数据分析页面
  data: {
    // 头部
    title: '数据分析 📊',
    status: '智能数据洞察与报告',
    
    // 核心指标
    averageActivity: '平均活跃度',
    weeklyEggProduction: '周产蛋量',
    weeklyFeedConsumption: '周饲料消耗',
    feedConversionRate: '饲料转化率',
    comparedToLastWeek: '较上周',
    eggsPerKgFeed: '蛋/kg 饲料',
    
    // 活跃时间分布
    activityTimeDistribution: '活跃时间分布（7天）',
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
    activityPeak: '活跃高峰',
    bestObservationTime: '最佳观察时间',
    morningPeriod: '上午时段',
    
    // 行为分析
    behaviorAnalysis: '行为分析（本周）',
    feeding: '进食',
    drinking: '饮水',
    resting: '休息',
    walking: '行走',
    socializing: '社交',
    preening: '梳理',
    mostFrequent: '最频繁',
    lessFrequent: '较少',
    
    // 月度趋势对比
    monthlyTrendComparison: '月度趋势对比',
    eggs: '产蛋量(枚)',
    feed: '饲料(kg)',
    water: '饮水',
    
    // AI智能报告
    aiSmartReport: 'AI 智能报告',
    todayReport: '📅 今日报告',
    dailySummary: '全面汇总今日数据与AI分析',
    weeklyReport: '📊 本周报告',
    weeklyAnalysis: '周度趋势分析与健康评估',
    monthlyReport: '📈 月度报告',
    monthlyAnalysis: '月度经营分析与优化建议',
    
    // AI数据洞察
    aiDataInsights: 'AI 数据洞察',
    productionTrend: '📈 产量趋势',
    productionInsight: '本周产蛋量稳步上升，预计下周可达25枚，建议保持当前饲喂方案',
    healthStatus: '💚 健康状况',
    healthInsight: '鸡群整体健康状况良好，活跃度高于平均水平15%',
    efficiencyOptimization: '⚡ 效率优化',
    efficiencyInsight: '饲料转化率较上月提升8%，建议继续优化饲喂时间分布',
  },
  
  settings: {
    title: '设置 ⚙️',
    subtitle: '管理您的应用偏好',
    accountSettings: '账户设置',
    personalInfo: '个人信息',
    privacyAndSecurity: '隐私与安全',
    farmConfiguration: '鸡舍配置',
    deviceConnection: '设备连接',
    automationSettings: '自动化设置',
    notificationPreferences: '通知偏好',
    pushNotifications: '推送通知',
    doNotDisturb: '勿扰模式',
    helpAndSupport: '帮助与支持',
    userGuide: '使用帮助',
    aboutApp: '关于应用',
    
    // 自动化设置
    automation: {
      videoUnderstandingApiKey: '视频理解API密钥',
      speechRecognitionApiKey: '语音识别(语音转文字)API密钥',
      speechSynthesisApiKey: '语音合成(文字转语音)API密钥',
      enterApiKey: '请输入API密钥',
      language: '语言',
      selectLanguage: '请选择语言',
    },
    
    // 用户卡片
    userCard: {
      memberLevel: '会员等级：',
      premiumMember: '高级会员 ⭐',
      chickens: '鸡宝宝',
      eggsThisMonth: '本月产蛋',
      healthScore: '健康评分',
    },
    
    // 快捷操作
    quickActions: {
      chickenGuide: '养鸡指南',
      beginnerGuide: '新手教程与技巧',
      membershipCenter: '会员中心',
      exclusiveBenefits: '专享权益与福利',
    },
    
    // 数据统计
    statistics: {
      usageStatistics: '使用统计',
      totalUsageDays: '累计使用天数',
      totalEggRecords: '累计产蛋记录',
      aiAlerts: 'AI 预警次数',
      usageMessage: '🎉 您已使用应用 4 个月，坚持得很好！',
    },
    
    // 退出登录
    logout: '退出登录',
    
    // 版权信息
    copyright: '© 2026 智能鸡舍 AI',
    copyrightMessage: '用科技守护每一只鸡的幸福 🐔💚',
  },
};

// 英文翻译
export const en: Translation = {
  common: {
    save: 'Save',
    saving: 'Saving...',
    saveSuccess: 'Saved successfully!',
    saveFailed: 'Save failed, please try again',
    confirm: 'Confirm',
    cancel: 'Cancel',
    
    // 导航栏
    home: 'Home',
    chickens: 'Chickens',
    health: 'Health',
    eggs: 'Eggs',
    feeding: 'Feeding',
    data: 'Data',
    settings: 'Settings',
  },
  
  // 首页
  home: {
    // 头部
    greeting: 'Good morning 👋',
    status: 'Your chickens are in good condition',
    
    // AI智能提醒
    aiAlert: 'AI Smart Alert',
    alerts: {
      highTemperature: 'Coop temperature is high, please turn on ventilation',
      lowActivity: 'Menglong Xun\'s activity decreased by 15% compared to yesterday',
    },
    
    // 实时监控
    liveMonitoring: 'Live Monitoring',
    monitoring: 'Monitoring',
    online: 'Online',
    mainView: 'Main View: Xiaohuang',
    coopView: 'Panoramic: Inside Coop',
    doubleClick: 'Double click to switch view',
    aiBehavior: 'AI Behavior Recognition:',
    eating: 'Eating',
    happy: '😊 Happy',
    startMonitoring: 'Start Monitoring',
    requestingPermission: 'Requesting permission...',
    screenshot: 'Screenshot',
    stopMonitoring: 'Stop Monitoring',
    hint: 'Hint: Double click on the video to switch between main view and coop panoramic view',
    
    // AI视频问答
    aiVideoQa: 'AI Video Q&A',
    open: 'Open',
    close: 'Close',
    inputQuestion: 'Please enter your question (e.g., How are the chickens in the video?)',
    sendQuestion: 'Send Question',
    analyzing: 'Analyzing...',
    voiceQuestion: 'Voice Question',
    stopRecording: 'Stop Recording',
    recording: 'Recording...',
    aiAnswer: 'AI Answer:',
    playVoice: 'Play Voice',
    qaHint: 'Hint: AI video Q&A function requires the camera to be turned on and running for a period of time to accumulate enough video data for analysis.',
    
    // 鸡群情绪状态
    chickenEmotions: 'Chicken Emotion Status',
    emotions: {
      happy: 'Happy',
      relaxed: 'Relaxed',
      nervous: 'Nervous',
      panic: 'Panic',
    },
    
    // 核心指标
    coreMetrics: 'Core Metrics',
    activity: 'Activity',
    healthScore: 'Health Score',
    feed: 'Feed Remaining',
    water: 'Water Remaining',
    
    // 快捷操作
    quickActions: 'Quick Actions',
    feedChickens: 'Start Feeding',
    startCleaning: 'Start Cleaning',
    startVentilation: 'Start Ventilation',
    capturePhoto: 'Capture Photo',
    
    // 今日摘要
    todaySummary: 'Today\'s Summary',
    summary: {
      eggs: 'Egg Production',
      feedConsumption: 'Feed Consumption',
      waterConsumption: 'Water Consumption',
      anomalies: 'Abnormal Behaviors',
    },
  },
  
  // 鸡群页面
  chickens: {
    // 头部
    title: 'My Chickens 🐔',
    status: '{{count}} chickens total, {{healthyCount}} healthy',
    healthyCount: 'healthy',
    
    // 群体状态概览
    groupStatus: 'Group Status Overview',
    averageMood: 'Average Mood',
    averageHealth: 'Average Health',
    averageActivity: 'Average Activity',
    good: 'Good',
    
    // 鸡列表
    chickenName: 'Name',
    age: 'Age',
    health: 'Health',
    activity: 'Activity',
    
    // 警告提示
    activityDecreased: 'Activity decreased compared to yesterday',
    suggestAttention: 'Suggest attention',
    
    // 详情弹窗
    healthScore: 'Health Score',
    activityLevel: 'Activity',
    currentMood: 'Current Mood',
    todayData: 'Today\'s Data',
    feedingTimes: 'Feeding Times',
    drinkingTimes: 'Drinking Times',
    activityDuration: 'Activity Duration',
    eggsLaid: 'Eggs Laid',
    close: 'Close',
  },
  
  // 健康监测页面
  health: {
    // 头部
    title: 'Health Monitoring 💚',
    status: 'Real-time tracking of flock health',
    
    // 整体健康评分
    flockHealthScore: 'Flock Health Score',
    basedOnAnalysis: 'Based on multi-dimensional AI analysis',
    good: 'Good',
    
    // 健康维度
    immunity: 'Immunity',
    growthStatus: 'Growth Status',
    excellent: 'Excellent',
    normal: 'Normal',
    
    // 健康趋势
    healthTrend: 'Health Score Trend (7 days)',
    
    // 健康维度分析
    healthDimensionAnalysis: 'Health Dimension Analysis',
    vitality: 'Vitality',
    appetite: 'Appetite',
    mentalState: 'Mental State',
    featherCondition: 'Feather Condition',
    breathingCondition: 'Breathing Condition',
    excretionNormal: 'Normal Excretion',
    
    // 疾病风险
    diseaseRiskAssessment: 'Disease Risk Assessment',
    respiratoryInfection: 'Respiratory Infection',
    intestinalDisease: 'Intestinal Disease',
    parasites: 'Parasites',
    malnutrition: 'Malnutrition',
    
    // 环境健康指标
    environmentalHealth: 'Environmental Health Metrics',
    temperature: 'Temperature',
    humidity: 'Humidity',
    airQuality: 'Air Quality',
    ammoniaLevel: 'Ammonia Level',
    suitable: 'Suitable',
    excellentAir: 'Excellent',
    normalCo2: 'CO₂ Normal',
    low: 'Low',
    safeRange: 'Safe Range',
    
    // AI健康建议
    aiHealthAdvice: 'AI Health Advice',
    nutritionAdvice: '✨ Nutrition Advice',
    vitaminCSupplement: 'Suggest increasing vitamin C supplement to boost immunity',
    drinkingAdvice: '💧 Drinking Advice',
    keepHydrated: 'Today\'s temperature is high, please ensure adequate water supply',
    environmentAdvice: '🌱 Environment Advice',
    ventilationAdvice: 'Suggest turning on ventilation system in the afternoon to maintain air circulation',
  },
  
  // 产蛋监测页面
  eggs: {
    // 头部
    title: 'Egg Monitoring 🥚',
    status: 'Intelligent tracking of egg production',
    
    // 今日产蛋
    todayEggs: 'Today\'s Eggs',
    realTimeUpdate: 'Real-time statistical updates',
    pieces: 'pieces',
    
    // 累计数据
    weeklyTotal: 'Weekly Total',
    monthlyTotal: 'Monthly Total',
    layingRate: 'Laying Rate',
    
    // 产蛋趋势
    layingTrend: 'Laying Trend (7 days)',
    dailyAverage: 'Daily Average',
    comparedToLastWeek: 'Compared to Last Week',
    
    // 蛋品质分析
    eggQualityAnalysis: 'Egg Quality Analysis (This Week)',
    normalEgg: 'Normal Egg',
    softShellEgg: 'Soft Shell Egg',
    brokenEgg: 'Broken Egg',
    deformedEgg: 'Deformed Egg',
    
    // 异常检测
    anomalyDetection: 'Anomaly Detection',
    increasedSoftShellEggs: '⚠️ Increased Soft Shell Eggs',
    calciumSupplementAdvice: '3 soft shell eggs detected in the past 3 days, suggest calcium supplementation',
    aiSuggestion: '💡 AI Suggestion',
    calciumOrVitaminDDeficiency: 'May be calcium or vitamin D deficiency, suggest increasing oyster shell feeding',
    
    // 产蛋排行
    layingRanking: 'Laying Ranking (This Month)',
    
    // 产蛋预测
    aiLayingPrediction: 'AI Laying Prediction',
    tomorrowPrediction: 'Tomorrow\'s Prediction',
    weeklyPrediction: 'This Week\'s Estimate',
    peakLayingTime: 'Peak Laying Time',
    morningPeak: '8-11 AM',
  },
  
  // 饲喂管理页面
  feeding: {
    // 头部
    title: 'Feeding Management 🌾',
    status: 'Intelligent feeding and consumption monitoring',
    
    // 余量监测
    feedRemaining: 'Feed Remaining',
    waterRemaining: 'Water Remaining',
    remainingAmount: 'Approximately',
    suggestRefill: 'Suggest refilling feed',
    waterLow: 'Water level low',
    suggestAddWater: 'Suggest adding water',
    
    // 快捷投喂
    quickFeeding: 'Quick Feeding',
    feedChickens: 'Feed Chickens',
    addWater: 'Add Water',
    feedMedicine: 'Feed Medicine',
    
    // 消耗趋势
    feedConsumption: 'Feed Consumption (Today)',
    waterConsumption: 'Water Consumption (Today)',
    todayConsumption: 'Today\'s Consumption',
    perChickenAverage: 'Per Chicken Average',
    
    // 自动投喂计划
    autoFeedingPlan: 'Auto Feeding Plan',
    settings: 'Settings',
    completed: 'Completed',
    pending: 'Pending',
    running: 'Running',
    
    // 采食异常
    feedingAnomaly: 'Feeding Anomaly',
    reducedIntake: '⚠️ Menglong Xun\'s food intake decreased today',
    observeHealth: 'Decreased by 35% compared to yesterday, suggest observing health condition',
    
    // 成本分析
    costAnalysis: 'Cost Analysis',
    todayFeedCost: 'Today\'s Feed Cost',
    weeklyTotal: 'Weekly Total',
    estimatedMonthly: 'Estimated Monthly',
    costSaved: '💡 Saved 8% compared to last month',
    feedEfficiencyImproved: 'Feed utilization rate improved',
  },
  
  // 数据分析页面
  data: {
    // 头部
    title: 'Data Analysis 📊',
    status: 'Intelligent data insights and reports',
    
    // 核心指标
    averageActivity: 'Average Activity',
    weeklyEggProduction: 'Weekly Egg Production',
    weeklyFeedConsumption: 'Weekly Feed Consumption',
    feedConversionRate: 'Feed Conversion Rate',
    comparedToLastWeek: 'Compared to Last Week',
    eggsPerKgFeed: 'Eggs per kg of feed',
    
    // 活跃时间分布
    activityTimeDistribution: 'Activity Time Distribution (7 days)',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    activityPeak: 'Activity Peak',
    bestObservationTime: 'Best Observation Time',
    morningPeriod: 'Morning Period',
    
    // 行为分析
    behaviorAnalysis: 'Behavior Analysis (This Week)',
    feeding: 'Feeding',
    drinking: 'Drinking',
    resting: 'Resting',
    walking: 'Walking',
    socializing: 'Socializing',
    preening: 'Preening',
    mostFrequent: 'Most Frequent',
    lessFrequent: 'Less Frequent',
    
    // 月度趋势对比
    monthlyTrendComparison: 'Monthly Trend Comparison',
    eggs: 'Egg Production (pieces)',
    feed: 'Feed (kg)',
    water: 'Water',
    
    // AI智能报告
    aiSmartReport: 'AI Smart Reports',
    todayReport: '📅 Today\'s Report',
    dailySummary: 'Comprehensive summary of today\'s data and AI analysis',
    weeklyReport: '📊 This Week\'s Report',
    weeklyAnalysis: 'Weekly trend analysis and health assessment',
    monthlyReport: '📈 Monthly Report',
    monthlyAnalysis: 'Monthly operational analysis and optimization suggestions',
    
    // AI数据洞察
    aiDataInsights: 'AI Data Insights',
    productionTrend: '📈 Production Trend',
    productionInsight: 'Egg production is steadily increasing this week, expected to reach 90 eggs next week, suggest maintaining current feeding plan',
    healthStatus: '💚 Health Status',
    healthInsight: 'The overall health status of the flock is good, with activity 15% above average',
    efficiencyOptimization: '⚡ Efficiency Optimization',
    efficiencyInsight: 'Feed conversion rate increased by 8% compared to last month, suggest continuing to optimize feeding time distribution',
  },
  
  settings: {
    title: 'Settings ⚙️',
    subtitle: 'Manage your app preferences',
    accountSettings: 'Account Settings',
    personalInfo: 'Personal Information',
    privacyAndSecurity: 'Privacy & Security',
    farmConfiguration: 'Farm Configuration',
    deviceConnection: 'Device Connection',
    automationSettings: 'Automation Settings',
    notificationPreferences: 'Notification Preferences',
    pushNotifications: 'Push Notifications',
    doNotDisturb: 'Do Not Disturb',
    helpAndSupport: 'Help & Support',
    userGuide: 'User Guide',
    aboutApp: 'About App',
    
    // 自动化设置
    automation: {
      videoUnderstandingApiKey: 'Video Understanding API Key',
      speechRecognitionApiKey: 'Speech Recognition (Speech-to-Text) API Key',
      speechSynthesisApiKey: 'Speech Synthesis (Text-to-Speech) API Key',
      enterApiKey: 'Please enter API key',
      language: 'Language',
      selectLanguage: 'Please select language',
    },
    
    // 用户卡片
    userCard: {
      memberLevel: 'Membership Level: ',
      premiumMember: 'Premium Member ⭐',
      chickens: 'Chickens',
      eggsThisMonth: 'Eggs This Month',
      healthScore: 'Health Score',
    },
    
    // 快捷操作
    quickActions: {
      chickenGuide: 'Chicken Guide',
      beginnerGuide: 'Beginner Guide & Tips',
      membershipCenter: 'Membership Center',
      exclusiveBenefits: 'Exclusive Benefits',
    },
    
    // 数据统计
    statistics: {
      usageStatistics: 'Usage Statistics',
      totalUsageDays: 'Total Usage Days',
      totalEggRecords: 'Total Egg Records',
      aiAlerts: 'AI Alerts',
      usageMessage: '🎉 You have been using the app for 4 months, keep up the good work!',
    },
    
    // 退出登录
    logout: 'Logout',
    
    // 版权信息
    copyright: '© 2026 Smart Chicken Coop AI',
    copyrightMessage: 'Using technology to protect every chicken\'s happiness 🐔💚',
  },
};

// 导出所有翻译
export const translations = {
  zh,
  en,
};

// 导出默认翻译
export default translations;
