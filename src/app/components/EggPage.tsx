import { motion } from 'motion/react';
import { Egg, TrendingUp, AlertCircle, Calendar, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Language, translations } from '../i18n/translations';

interface EggPageProps {
  language: Language;
}

export function EggPage({ language }: EggPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const dailyEggData = [
    { date: '01/25', count: 2 },
    { date: '01/26', count: 3 },
    { date: '01/27', count: 0 },
    { date: '01/28', count: 10 },
    { date: '01/29', count: 4 },
    { date: '01/30', count: 1 },
    { date: '01/31', count: 1 }
  ];

  const eggQualityData = [
    { name: language === 'zh' ? '正常蛋' : 'Normal Egg', value: 90, color: '#7cb342' },
    { name: language === 'zh' ? '软壳蛋' : 'Soft Shell Egg', value: 5, color: '#ffa726' },
    { name: language === 'zh' ? '破损蛋' : 'Broken Egg', value: 5, color: '#ef5350' },
    { name: language === 'zh' ? '畸形蛋' : 'Deformed Egg', value: 0, color: '#ab47bc' }
  ];

  const chickenEggData = [
    {name: language === 'zh' ? '咯咯基' : 'Clucky', count: 25 },
    { name: language === 'zh' ? '布布' : 'BuBu', count: 22 },
    {  name: language === 'zh' ? '拉奇' : 'Lucky', count: 18 },
    {  name: language === 'zh' ? '可可' : 'CoCo', count: 15 },
    { name: language === 'zh' ? '露露' : 'LuLu', count: 10 },
    { name: language === 'zh' ? '迅猛龙' : 'Menglong Xun', count: 10 }
  ];

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.eggs.title}</h1>
        <p className="text-muted-foreground">{t.eggs.status}</p>
      </div>

      {/* 今日产蛋概览 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Egg className="w-6 h-6 text-amber-600" />
              <h2>{t.eggs.todayEggs}</h2>
            </div>
            <p className="text-sm text-gray-600">{t.eggs.realTimeUpdate}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl text-amber-600 mb-1">3</div>
            <div className="text-sm text-gray-600">{t.eggs.pieces}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/70 rounded-2xl p-3">
            <div className="text-xs text-gray-600 mb-1">{t.eggs.weeklyTotal}</div>
            <div className="text-2xl text-green-600">21</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-3">
            <div className="text-xs text-gray-600 mb-1">{t.eggs.monthlyTotal}</div>
            <div className="text-2xl text-blue-600">95</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-3">
            <div className="text-xs text-gray-600 mb-1">{t.eggs.layingRate}</div>
            <div className="text-2xl text-purple-600">72%</div>
          </div>
        </div>
      </motion.div>

      {/* 产蛋趋势 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3>{t.eggs.layingTrend}</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dailyEggData}>
            <defs>
              <linearGradient id="eggGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffa726" stopOpacity={1}/>
                <stop offset="100%" stopColor="#ffb74d" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="url(#eggGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-center text-sm text-gray-600">
          {t.eggs.dailyAverage}：<span className="text-green-600">3 {t.eggs.pieces}</span> | 
          {t.eggs.comparedToLastWeek}：<span className="text-green-600">+14%</span>
        </div>
      </div>

      {/* 蛋品质分析 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.eggs.eggQualityAnalysis}</h3>
        <div className="flex items-center justify-center mb-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={eggQualityData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {eggQualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {eggQualityData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.name}</span>
              <span className="ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 异常产蛋提醒 */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 mb-6 shadow-sm border border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="mb-2 text-orange-900">{t.eggs.anomalyDetection}</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-white/70 rounded-xl p-3">
                <div className="text-orange-800 mb-1">{t.eggs.increasedSoftShellEggs}</div>
                <p className="text-gray-700">{t.eggs.calciumSupplementAdvice}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3">
                <div className="text-blue-800 mb-1">{t.eggs.aiSuggestion}</div>
                <p className="text-gray-700">{t.eggs.calciumOrVitaminDDeficiency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 个体产蛋排行 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-600" />
          <h3>{t.eggs.layingRanking}</h3>
        </div>
        <div className="space-y-3">
          {chickenEggData.map((chicken, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span>{chicken.name}</span>
                  <span className="text-amber-600">{chicken.count} {t.eggs.pieces}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${(chicken.count / 30) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 产蛋预测 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3>{t.eggs.aiLayingPrediction}</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.eggs.tomorrowPrediction}</span>
            <span className="text-lg text-purple-600">2 {t.eggs.pieces}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.eggs.weeklyPrediction}</span>
            <span className="text-lg text-purple-600">3-5 {t.eggs.pieces}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.eggs.peakLayingTime}</span>
            <span className="text-lg text-purple-600">{t.eggs.morningPeak}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
