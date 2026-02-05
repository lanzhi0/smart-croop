import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wheat, 
  Droplets, 
  Play, 
  Clock, 
  TrendingDown,
  Calendar,
  AlertCircle,
  Settings,
  Pill
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language, translations } from '../i18n/translations';

interface FeedingPageProps {
  language: Language;
}

export function FeedingPage({ language }: FeedingPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const [feedLevel, setFeedLevel] = useState(65);
  const [waterLevel, setWaterLevel] = useState(42);

  const feedConsumptionData = [
    { time: '00:00', amount: 0.1 },
    { time: '06:00', amount: 0.8 },
    { time: '09:00', amount: 0.6 },
    { time: '12:00', amount: 0.5 },
    { time: '15:00', amount: 0.4 },
    { time: '18:00', amount: 0.7 },
    { time: '21:00', amount: 0.2 },
    { time: '24:00', amount: 0.1 }
  ];

  const waterConsumptionData = [
    { time: '06:00', amount: 1.2 },
    { time: '09:00', amount: 0.9 },
    { time: '12:00', amount: 1.5 },
    { time: '15:00', amount: 1.1 },
    { time: '18:00', amount: 0.8 },
    { time: '21:00', amount: 0.5 }
  ];

  const scheduleFeeding = (type: string) => {
    alert(`${type === 'feed' ? '饲料' : type === 'water' ? '饮水' : '药物'}投喂已启动`);
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.feeding.title}</h1>
        <p className="text-muted-foreground">{t.feeding.status}</p>
      </div>

      {/* 余量监测卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 饲料余量 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wheat className="w-5 h-5 text-amber-600" />
            <h3>{t.feeding.feedRemaining}</h3>
          </div>
          <div className="relative mb-4">
            <div className="w-full h-32 bg-white/70 rounded-2xl overflow-hidden relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${feedLevel}%` }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-yellow-400"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl text-amber-700 z-10">{feedLevel}%</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {t.feeding.remainingAmount} <span className="text-amber-600">6.5 kg</span>
          </div>
          {feedLevel < 50 && (
            <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-xl p-2">
              <AlertCircle className="w-4 h-4" />
              {t.feeding.suggestRefill}
            </div>
          )}
        </motion.div>

        {/* 饮水余量 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-blue-600" />
            <h3>{t.feeding.waterRemaining}</h3>
          </div>
          <div className="relative mb-4">
            <div className="w-full h-32 bg-white/70 rounded-2xl overflow-hidden relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${waterLevel}%` }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-cyan-400"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl text-blue-700 z-10">{waterLevel}%</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {t.feeding.remainingAmount} <span className="text-blue-600">8.4 L</span>
          </div>
          {waterLevel < 50 && (
            <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-xl p-2">
              <AlertCircle className="w-4 h-4" />
              {t.feeding.waterLow}，{t.feeding.suggestAddWater}
            </div>
          )}
        </motion.div>
      </div>

      {/* 快捷投喂按钮 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scheduleFeeding('feed')}
          className="bg-gradient-to-br from-amber-500 to-yellow-500 text-white rounded-2xl p-4 shadow-md"
        >
          <Wheat className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm">{t.feeding.feedChickens}</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scheduleFeeding('water')}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-4 shadow-md"
        >
          <Droplets className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm">{t.feeding.addWater}</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scheduleFeeding('medicine')}
          className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-md"
        >
          <Pill className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm">{t.feeding.feedMedicine}</div>
        </motion.button>
      </div>

      {/* 饲料消耗趋势 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-amber-600" />
          <h3>{t.feeding.feedConsumption}</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={feedConsumptionData}>
            <defs>
              <linearGradient id="feedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'kg', position: 'insideLeft', fontSize: 12 }} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#fbbf24" 
              strokeWidth={2}
              fill="url(#feedGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 text-center text-sm text-gray-600">
          {t.feeding.todayConsumption}：<span className="text-amber-600">2.3 kg</span> | 
          {t.feeding.perChickenAverage}：<span className="text-amber-600">383 g</span>
        </div>
      </div>

      {/* 饮水消耗趋势 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-5 h-5 text-blue-600" />
          <h3>{t.feeding.waterConsumption}</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={waterConsumptionData}>
            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'L', position: 'insideLeft', fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="amount" fill="url(#waterGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-center text-sm text-gray-600">
          {t.feeding.todayConsumption}：<span className="text-blue-600">4.8 L</span> | 
          {t.feeding.perChickenAverage}：<span className="text-blue-600">800 ml</span>
        </div>
      </div>

      {/* 自动投喂计划 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            <h3>{t.feeding.autoFeedingPlan}</h3>
          </div>
          <button className="text-primary text-sm flex items-center gap-1">
            <Settings className="w-4 h-4" />
            {t.feeding.settings}
          </button>
        </div>
        <div className="space-y-3">
          {[
            { time: '07:00', type: language === 'zh' ? '饲料' : 'Feed', amount: '500g', status: '已完成' },
            { time: '12:00', type: language === 'zh' ? '饲料' : 'Feed', amount: '500g', status: '已完成' },
            { time: '18:00', type: language === 'zh' ? '饲料' : 'Feed', amount: '500g', status: '待执行' },
            { time: language === 'zh' ? '每2小时' : 'Every 2 hours', type: language === 'zh' ? '饮水检查' : 'Water Check', amount: language === 'zh' ? '自动补充' : 'Auto refill', status: '运行中' }
          ].map((schedule, index) => (
            <div key={index} className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm mb-1">{schedule.time} - {schedule.type}</div>
                  <div className="text-xs text-gray-600">{schedule.amount}</div>
                </div>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${
                schedule.status === '已完成' ? 'bg-green-100 text-green-700' :
                schedule.status === '运行中' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {schedule.status === '已完成' ? t.feeding.completed : 
                 schedule.status === '运行中' ? t.feeding.running : 
                 t.feeding.pending}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 采食异常提醒 */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 shadow-sm border border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="mb-2 text-orange-900">{t.feeding.feedingAnomaly}</h3>
            <div className="bg-white/70 rounded-xl p-3 text-sm">
              <div className="text-orange-800 mb-1">{t.feeding.reducedIntake}</div>
              <p className="text-gray-700">{t.feeding.observeHealth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 饲料成本分析 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 mt-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3>{t.feeding.costAnalysis}</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.feeding.todayFeedCost}</span>
            <span className="text-lg text-purple-600">¥18.40</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.feeding.weeklyTotal}</span>
            <span className="text-lg text-purple-600">¥128.80</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.feeding.estimatedMonthly}</span>
            <span className="text-lg text-purple-600">¥552.00</span>
          </div>
          <div className="pt-3 border-t border-purple-200 text-xs text-gray-600">
            {t.feeding.costSaved}，{t.feeding.feedEfficiencyImproved}
          </div>
        </div>
      </div>
    </div>
  );
}
