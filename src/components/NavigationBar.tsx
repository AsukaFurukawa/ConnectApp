'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Trophy, Heart, Camera, Gift } from 'lucide-react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  const tabs = [
    { id: 'ai', icon: MessageCircle, label: 'AI Assistant' },
    { id: 'impact', icon: Trophy, label: 'Impact XP' },
    { id: 'ngo', icon: Heart, label: 'NGO Activities' },
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
  ];

  const getColorClass = (isActive: boolean) => {
    if (isActive) {
      return 'bg-gradient-to-r from-[#A5D6A7]/40 to-[#B1E8D6]/40 border-[#66BB6A] text-[#2E7D32] shadow-pastel-lg';
    }
    return 'bg-gradient-to-r from-[#A5D6A7]/20 to-[#B1E8D6]/20 border-[#A5D6A7]/50 text-[#66BB6A] hover:from-[#A5D6A7]/30 hover:to-[#B1E8D6]/30 hover:border-[#66BB6A] hover:shadow-pastel';
  };

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#A5D6A7]/30 to-[#B1E8D6]/30 backdrop-blur-xl border-t border-[#A5D6A7]/40 shadow-pastel-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      suppressHydrationWarning
    >
      <div className="flex justify-around items-center px-3 py-4">
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

