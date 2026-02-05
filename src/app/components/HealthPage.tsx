import { motion } from 'motion/react';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Thermometer,
  Wind,
  Droplets
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Language, translations } from '../i18n/translations';

interface HealthPageProps {
  language: Language;
}

export function HealthPage({ language }: HealthPageProps) {
  // 获取当前语言的翻译
  const t = translations[language];
  const healthTrendData = [
    { date: '01/25', score: 88 },
    { date: '01/26', score: 90 },
    { date: '01/27', score: 87 },
    { date: '01/28', score: 91 },
    { date: '01/29', score: 89 },
    { date: '01/30', score: 92 },
    { date: '01/31', score: 90 }
  ];

  const healthRadarData = [
    { subject: language === 'zh' ? '活动力' : 'Vitality', value: 92, fullMark: 100 },
    { subject: language === 'zh' ? '食欲' : 'Appetite', value: 88, fullMark: 100 },
    { subject: language === 'zh' ? '精神状态' : 'Mental State', value: 95, fullMark: 100 },
    { subject: language === 'zh' ? '羽毛状态' : 'Feather Condition', value: 85, fullMark: 100 },
    { subject: language === 'zh' ? '呼吸状况' : 'Breathing Condition', value: 90, fullMark: 100 },
    { subject: language === 'zh' ? '排泄正常' : 'Normal Excretion', value: 93, fullMark: 100 }
  ];

  const riskData = [
    { name: language === 'zh' ? '呼吸道感染' : 'Respiratory Infection', risk: 15, color: '#fbbf24' },
    { name: language === 'zh' ? '肠道疾病' : 'Intestinal Disease', risk: 8, color: '#34d399' },
    { name: language === 'zh' ? '寄生虫' : 'Parasites', risk: 5, color: '#34d399' },
    { name: language === 'zh' ? '营养不良' : 'Malnutrition', risk: 12, color: '#fbbf24' }
  ];

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">{t.health.title}</h1>
        <p className="text-muted-foreground">{t.health.status}</p>
      </div>

      {/* 整体健康评分 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-6 h-6 text-green-600" />
              <h2>{t.health.flockHealthScore}</h2>
            </div>
            <p className="text-sm text-gray-600">{t.health.basedOnAnalysis}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl text-green-600 mb-1">90</div>
            <div className="text-sm text-gray-600">{t.health.good}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">{t.health.immunity}</span>
            </div>
            <div className="text-2xl text-blue-600">{t.health.excellent}</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">{t.health.growthStatus}</span>
            </div>
            <div className="text-2xl text-green-600">{t.health.normal}</div>
          </div>
        </div>
      </motion.div>

      {/* 健康趋势图 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.health.healthTrend}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={healthTrendData}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7cb342" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7cb342" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#7cb342" 
              strokeWidth={3}
              fill="url(#healthGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 健康雷达图 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="mb-4">{t.health.healthDimensionAnalysis}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={healthRadarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Radar 
              name="健康指标" 
              dataKey="value" 
              stroke="#7cb342" 
              fill="#7cb342" 
              fillOpacity={0.5} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 疾病风险预警 */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h3>{t.health.diseaseRiskAssessment}</h3>
        </div>
        <div className="space-y-3">
          {riskData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm" style={{ color: item.color }}>
                  {item.risk}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${item.risk}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 环境健康指标 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">{t.health.temperature}</span>
          </div>
          <div className="text-3xl text-orange-600 mb-1">22°C</div>
          <div className="text-xs text-green-600">✓ {t.health.suitable}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">{t.health.humidity}</span>
          </div>
          <div className="text-3xl text-blue-600 mb-1">65%</div>
          <div className="text-xs text-green-600">✓ {t.health.suitable}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">{t.health.airQuality}</span>
          </div>
          <div className="text-3xl text-green-600 mb-1">{t.health.excellentAir}</div>
          <div className="text-xs text-green-600">✓ {t.health.normalCo2}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-600">{t.health.ammoniaLevel}</span>
          </div>
          <div className="text-3xl text-green-600 mb-1">{t.health.low}</div>
          <div className="text-xs text-green-600">✓ {t.health.safeRange}</div>
        </motion.div>
      </div>

      {/* AI 健康建议 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-sm">
        <h3 className="mb-4">{t.health.aiHealthAdvice}</h3>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-3 text-sm">
            <div className="text-purple-700 mb-1">{t.health.nutritionAdvice}</div>
            <p className="text-gray-700">{t.health.vitaminCSupplement}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3 text-sm">
            <div className="text-blue-700 mb-1">{t.health.drinkingAdvice}</div>
            <p className="text-gray-700">{t.health.keepHydrated}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3 text-sm">
            <div className="text-green-700 mb-1">{t.health.environmentAdvice}</div>
            <p className="text-gray-700">{t.health.ventilationAdvice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
