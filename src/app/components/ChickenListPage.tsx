import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Heart, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Chicken {
  id: number;
  name: string;
  emoji: string;
  age: string;
  health: number;
  mood: string;
  moodEmoji: string;
  activity: number;
  status: 'healthy' | 'warning' | 'sick';
  color: string;
}

interface ChickenListPageProps {
  language: Language;
}

export function ChickenListPage({ language }: ChickenListPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];

  const [chickens] = useState<Chicken[]>([
    {
      id: 1,
      name: language === 'zh' ? '咯咯基' : 'Clucky',
      emoji: '🐥',
      age: language === 'zh' ? '8个月' : '8 months',
      health: 95,
      mood: language === 'zh' ? '开心' : 'Happy',
      moodEmoji: '😊',
      activity: 88,
      status: 'healthy',
      color: 'from-yellow-50 to-amber-50'
    },
    {
      id: 2,
      name: language === 'zh' ? '拉奇' : 'Lucky',
      emoji: '🐓',
      age: language === 'zh' ? '1岁2个月' : '1 year 2 months',
      health: 82,
      mood: language === 'zh' ? '放松' : 'Relaxed',
      moodEmoji: '😌',
      activity: 65,
      status: 'warning',
      color: 'from-gray-50 to-slate-50'
    },
    {
      id: 3,
      name: language === 'zh' ? '布布' : 'BuBu',
      emoji: '🐔',
      age: language === 'zh' ? '10个月' : '10 months',
      health: 92,
      mood: language === 'zh' ? '开心' : 'Happy',
      moodEmoji: '😊',
      activity: 90,
      status: 'healthy',
      color: 'from-orange-50 to-red-50'
    },
    {
      id: 4,
      name: language === 'zh' ? '可可' : 'CoCo',
      emoji: '🐤',
      age: language === 'zh' ? '6个月' : '6 months',
      health: 97,
      mood: language === 'zh' ? '兴奋' : 'Excited',
      moodEmoji: '🤩',
      activity: 95,
      status: 'healthy',
      color: 'from-slate-50 to-gray-50'
    },
    {
      id: 5,
      name: language === 'zh' ? '露露' : 'LuLu',
      emoji: '🐓',
      age: language === 'zh' ? '1岁' : '1 year',
      health: 88,
      mood: language === 'zh' ? '平静' : 'Calm',
      moodEmoji: '😐',
      activity: 72,
      status: 'healthy',
      color: 'from-zinc-50 to-neutral-50'
    },
    {
      id: 6,
      name: language === 'zh' ? '迅猛龙' : 'Menglong Xun',
      emoji: '🐔',
      age: language === 'zh' ? '9个月' : '9 months',
      health: 70,
      mood: language === 'zh' ? '紧张' : 'Nervous',
      moodEmoji: '😰',
      activity: 45,
      status: 'warning',
      color: 'from-red-50 to-rose-50'
    }
  ]);

  const [selectedChicken, setSelectedChicken] = useState<Chicken | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-orange-500';
      case 'sick':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.chickens.title}</h1>
        <p className="text-muted-foreground">{t.chickens.status.replace('{{count}}', chickens.length.toString()).replace('{{healthyCount}}', chickens.filter(c => c.status === 'healthy').length.toString())}</p>
      </div>

      {/* 群体状态概览 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="text-2xl mb-1">😊</div>
          <div className="text-sm text-gray-600">{t.chickens.averageMood}</div>
          <div className="text-xl text-green-600 mt-1">{t.chickens.good}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-1 mb-1">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <div className="text-sm text-gray-600">{t.chickens.averageHealth}</div>
          <div className="text-xl text-pink-600 mt-1">87/100</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-1 mb-1">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm text-gray-600">{t.chickens.averageActivity}</div>
          <div className="text-xl text-blue-600 mt-1">76%</div>
        </motion.div>
      </div>

      {/* 鸡列表 */}
      <div className="space-y-3">
        {chickens.map((chicken, index) => (
          <motion.div
            key={chicken.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => setSelectedChicken(chicken)}
            className={`bg-gradient-to-br ${chicken.color} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* 头像 */}
                <div className="relative">
                  <div className="text-5xl">{chicken.emoji}</div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(chicken.status)} rounded-full border-2 border-white`} />
                </div>

                {/* 信息 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl">{chicken.name}</h3>
                    <span className="text-2xl">{chicken.moodEmoji}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{chicken.age}</div>

                  {/* 指标条 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-pink-500" />
                      <div className="flex-1 bg-white/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${chicken.health >= 90 ? 'bg-green-500' : chicken.health >= 70 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${chicken.health}%` }}
                        />
                      </div>
                      <span className={`text-xs ${getHealthColor(chicken.health)}`}>
                        {chicken.health}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-blue-500" />
                      <div className="flex-1 bg-white/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${chicken.activity}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-600">{chicken.activity}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* 警告提示 */}
            {chicken.status === 'warning' && (
              <div className="mt-3 pt-3 border-t border-orange-200/50 flex items-center gap-2 text-sm text-orange-700">
                <AlertCircle className="w-4 h-4" />
                {t.chickens.activityDecreased}，{t.chickens.suggestAttention}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 详情弹窗（简化版） */}
      {selectedChicken && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedChicken(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-br ${selectedChicken.color} rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl`}
          >
            <div className="text-center mb-6">
              <div className="text-7xl mb-3">{selectedChicken.emoji}</div>
              <h2 className="text-2xl mb-1">{selectedChicken.name}</h2>
              <p className="text-gray-600">{selectedChicken.age}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/70 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t.chickens.healthScore}</span>
                  <span className={`text-xl ${getHealthColor(selectedChicken.health)}`}>
                    {selectedChicken.health}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${selectedChicken.health >= 90 ? 'bg-green-500' : selectedChicken.health >= 70 ? 'bg-orange-500' : 'bg-red-500'}`}
                    style={{ width: `${selectedChicken.health}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t.chickens.activityLevel}</span>
                  <span className="text-xl text-blue-600">{selectedChicken.activity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${selectedChicken.activity}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t.chickens.currentMood}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedChicken.moodEmoji}</span>
                    <span className="text-lg">{selectedChicken.mood}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-4">
                <h4 className="mb-3">{t.chickens.todayData}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.chickens.feedingTimes}</span>
                    <span>8 次</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.chickens.drinkingTimes}</span>
                    <span>12 次</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.chickens.activityDuration}</span>
                    <span>6.5 小时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.chickens.eggsLaid}</span>
                    <span>1 枚</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedChicken(null)}
              className="w-full mt-6 bg-primary text-white py-3 rounded-2xl hover:bg-primary/90 transition-colors"
            >
              {t.chickens.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
