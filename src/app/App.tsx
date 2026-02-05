import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Users, Heart, Egg, Wheat, BarChart3, Settings } from 'lucide-react';
import { HomePage } from '@/app/components/HomePage';
import { ChickenListPage } from '@/app/components/ChickenListPage';
import { HealthPage } from '@/app/components/HealthPage';
import { EggPage } from '@/app/components/EggPage';
import { FeedingPage } from '@/app/components/FeedingPage';
import { DataPage } from '@/app/components/DataPage';
import { SettingsPage } from '@/app/components/SettingsPage';
import { CameraTestPage } from '@/app/components/CameraTestPage';
import { Language, translations } from '@/app/i18n/translations';

type Page = 'home' | 'chickens' | 'health' | 'eggs' | 'feeding' | 'data' | 'settings' | 'camera-test';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  onClick: () => void;
  language: Language;
}

const NavItem = ({ icon, label, page, currentPage, onClick, language }: NavItemProps) => {
  const isActive = currentPage === page;
  
  // 根据语言获取标签文本
  const getLabelText = () => {
    const lang = translations[language];
    switch (label) {
      case '首页':
      case 'Home':
        return lang.common.home;
      case '鸡群':
      case 'Chickens':
        return lang.common.chickens;
      case '健康':
      case 'Health':
        return lang.common.health;
      case '产蛋':
      case 'Eggs':
        return lang.common.eggs;
      case '投喂':
      case 'Feeding':
        return lang.common.feeding;
      case '数据':
      case 'Data':
        return lang.common.data;
      case '设置':
      case 'Settings':
        return lang.common.settings;
      default:
        return label;
    }
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 relative flex-1"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          y: isActive ? -2 : 0
        }}
        className={`relative ${isActive ? 'text-primary' : 'text-gray-400'}`}
      >
        {icon}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
          />
        )}
      </motion.div>
      <span className={`text-xs ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        {getLabelText()}
      </span>
    </motion.button>
  );
};

export default function App() {
  // 从localStorage加载初始语言，默认为中文
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'zh';
  });
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // 语言切换函数
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage language={language} />;
      case 'chickens':
        return <ChickenListPage language={language} />;
      case 'health':
        return <HealthPage language={language} />;
      case 'eggs':
        return <EggPage language={language} />;
      case 'feeding':
        return <FeedingPage language={language} />;
      case 'data':
        return <DataPage language={language} />;
      case 'settings':
        return <SettingsPage language={language} changeLanguage={changeLanguage} />;
      case 'camera-test':
        return <CameraTestPage language={language} />;
      default:
        return <HomePage language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* 底部导航栏 */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
      >
        <div className="max-w-6xl mx-auto px-2 py-3">
          <div className="flex items-center justify-around">
            <NavItem
              icon={<Home className="w-6 h-6" />}
              label="首页"
              page="home"
              currentPage={currentPage}
              onClick={() => setCurrentPage('home')}
              language={language}
            />
            <NavItem
              icon={<Users className="w-6 h-6" />}
              label="鸡群"
              page="chickens"
              currentPage={currentPage}
              onClick={() => setCurrentPage('chickens')}
              language={language}
            />
            <NavItem
              icon={<Heart className="w-6 h-6" />}
              label="健康"
              page="health"
              currentPage={currentPage}
              onClick={() => setCurrentPage('health')}
              language={language}
            />
            <NavItem
              icon={<Egg className="w-6 h-6" />}
              label="产蛋"
              page="eggs"
              currentPage={currentPage}
              onClick={() => setCurrentPage('eggs')}
              language={language}
            />
            <NavItem
              icon={<Wheat className="w-6 h-6" />}
              label="投喂"
              page="feeding"
              currentPage={currentPage}
              onClick={() => setCurrentPage('feeding')}
              language={language}
            />
            <NavItem
              icon={<BarChart3 className="w-6 h-6" />}
              label="数据"
              page="data"
              currentPage={currentPage}
              onClick={() => setCurrentPage('data')}
              language={language}
            />
            <NavItem
              icon={<Settings className="w-6 h-6" />}
              label="设置"
              page="settings"
              currentPage={currentPage}
              onClick={() => setCurrentPage('settings')}
              language={language}
            />
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
