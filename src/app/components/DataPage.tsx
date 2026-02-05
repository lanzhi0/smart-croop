import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  FileText,
  Activity,
  Egg,
  Wheat
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Language, translations } from '../i18n/translations';

interface DataPageProps {
  language: Language;
}

export function DataPage({ language }: DataPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const activityTrendData = [
    { date: '01/25', morning: 85, afternoon: 78, evening: 65 },
    { date: '01/26', morning: 88, afternoon: 82, evening: 70 },
    { date: '01/27', morning: 82, afternoon: 75, evening: 68 },
    { date: '01/28', morning: 90, afternoon: 85, evening: 72 },
    { date: '01/29', morning: 87, afternoon: 80, evening: 69 },
    { date: '01/30', morning: 92, afternoon: 88, evening: 75 },
    { date: '01/31', morning: 89, afternoon: 83, evening: 71 }
  ];

  const weeklyComparisonData = [
    { week: language === 'zh' ? '第1周' : 'Week 1', eggs: 31, feed: 15.2, water: 32.5 },
    { week: language === 'zh' ? '第2周' : 'Week 2', eggs: 25, feed: 15.8, water: 33.1 },
    { week: language === 'zh' ? '第3周' : 'Week 3', eggs: 18, feed: 15.5, water: 32.8 },
    { week: language === 'zh' ? '第4周' : 'Week 4', eggs: 21, feed: 16.1, water: 33.6 }
  ];

  const behaviorAnalysisData = [
    { behavior: language === 'zh' ? '进食' : 'Feeding', frequency: 92, fullMark: 100 },
    { behavior: language === 'zh' ? '饮水' : 'Drinking', frequency: 88, fullMark: 100 },
    { behavior: language === 'zh' ? '休息' : 'Resting', frequency: 85, fullMark: 100 },
    { behavior: language === 'zh' ? '行走' : 'Walking', frequency: 78, fullMark: 100 },
    { behavior: language === 'zh' ? '社交' : 'Socializing', frequency: 65, fullMark: 100 },
    { behavior: language === 'zh' ? '梳理' : 'Preening', frequency: 72, fullMark: 100 }
  ];

  const generateReport = (type: string) => {
    alert(`正在生成${type}报告...`);
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.data.title}</h1>
        <p className="text-muted-foreground">{t.data.status}</p>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">{t.data.averageActivity}</span>
          </div>
          <div className="text-3xl text-green-600 mb-1">82%</div>
          <div className="text-xs text-green-600">↑ {t.data.comparedToLastWeek} +5%</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Egg className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-gray-600">{t.data.weeklyEggProduction}</span>
          </div>
          <div className="text-3xl text-amber-600 mb-1">21</div>
          <div className="text-xs text-amber-600">↑ {t.data.comparedToLastWeek} +14%</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Wheat className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">{t.data.weeklyFeedConsumption}</span>
          </div>
          <div className="text-3xl text-orange-600 mb-1">16.1 kg</div>
          <div className="text-xs text-red-600">↑ {t.data.comparedToLastWeek} +3%</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">{t.data.feedConversionRate}</span>
          </div>
          <div className="text-3xl text-blue-600 mb-1">5.2</div>
          <div className="text-xs text-blue-600">{t.data.eggsPerKgFeed}</div>
        </motion.div>
      </div>

      {/* 活跃时间分布 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.data.activityTimeDistribution}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activityTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="morning" 
              stroke="#fbbf24" 
              strokeWidth={2}
              name={t.data.morning}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="afternoon" 
              stroke="#7cb342" 
              strokeWidth={2}
              name={t.data.afternoon}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="evening" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name={t.data.evening}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 text-center text-sm text-gray-600">
          {t.data.activityPeak}：<span className="text-amber-600">{t.data.morningPeriod} 8-11点</span> | 
          {t.data.bestObservationTime}：<span className="text-green-600">{t.data.morningPeriod}</span>
        </div>
      </div>

      {/* 行为分析雷达图 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.data.behaviorAnalysis}</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={behaviorAnalysisData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="behavior" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Radar 
              name="行为频率" 
              dataKey="frequency" 
              stroke="#7cb342" 
              fill="#7cb342" 
              fillOpacity={0.5} 
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center">
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-green-600 mb-1">{t.data.mostFrequent}</div>
            <div>{t.data.feeding}{language === 'zh' ? '行为' : ''}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-blue-600 mb-1">{t.data.mostFrequent}</div>
            <div>{t.data.drinking}{language === 'zh' ? '行为' : ''}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2">
            <div className="text-orange-600 mb-1">{t.data.lessFrequent}</div>
            <div>{t.data.socializing}{language === 'zh' ? '行为' : ''}</div>
          </div>
        </div>
      </div>

      {/* 周度对比 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.data.monthlyTrendComparison}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="eggs" fill="#fbbf24" name={t.data.eggs} radius={[8, 8, 0, 0]} />
            <Bar yAxisId="right" dataKey="feed" fill="#7cb342" name={t.data.feed} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI 智能报告 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-purple-600" />
          <h3>{t.data.aiSmartReport}</h3>
        </div>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('日报')}
            className="w-full bg-white/70 hover:bg-white rounded-xl p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1">{t.data.todayReport}</div>
                <div className="text-xs text-gray-600">{t.data.dailySummary}</div>
              </div>
              <Download className="w-5 h-5 text-purple-600" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('周报')}
            className="w-full bg-white/70 hover:bg-white rounded-xl p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1">{t.data.weeklyReport}</div>
                <div className="text-xs text-gray-600">{t.data.weeklyAnalysis}</div>
              </div>
              <Download className="w-5 h-5 text-purple-600" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('月报')}
            className="w-full bg-white/70 hover:bg-white rounded-xl p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1">{t.data.monthlyReport}</div>
                <div className="text-xs text-gray-600">{t.data.monthlyAnalysis}</div>
              </div>
              <Download className="w-5 h-5 text-purple-600" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* AI 洞察 */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3>{t.data.aiDataInsights}</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="bg-white/70 rounded-xl p-3">
            <div className="text-blue-700 mb-1">{t.data.productionTrend}</div>
            <p className="text-gray-700">{t.data.productionInsight}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <div className="text-green-700 mb-1">{t.data.healthStatus}</div>
            <p className="text-gray-700">{t.data.healthInsight}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <div className="text-orange-700 mb-1">{t.data.efficiencyOptimization}</div>
            <p className="text-gray-700">{t.data.efficiencyInsight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
