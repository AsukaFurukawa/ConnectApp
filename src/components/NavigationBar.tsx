'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Trophy, Heart, Camera, Gift, Users, Globe, Target, Sparkles, Home } from 'lucide-react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  const tabs = [
    { id: 'landing', icon: Home, label: 'Home' },
    { id: 'ai', icon: MessageCircle, label: 'AI Assistant' },
    { id: 'impact', icon: Trophy, label: 'Impact XP' },
    { id: 'ngo', icon: Heart, label: 'NGO Activities' },
    { id: 'forum', icon: Users, label: 'Forum' },
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
    { id: 'showcase', icon: Globe, label: 'Impact' },
    { id: 'causes', icon: Target, label: 'Causes' },
  ];

  const getColorClass = (isActive: boolean) => {
    if (isActive) {
      return 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg border-2 border-transparent';
    }
    return 'bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 hover:bg-white hover:border-green-300 hover:text-green-600 hover:shadow-md';
  };

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-lg mobile-nav safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      suppressHydrationWarning
    >
      <div className="flex justify-around items-center px-3 py-4 safe-area-left safe-area-right">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 ${getColorClass(isActive)}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              <Icon size={22} className="mb-1" />
              <span className="text-xs font-medium font-clean">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default NavigationBar;

