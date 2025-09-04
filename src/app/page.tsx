'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationBar from '@/components/NavigationBar';
import AIAssistant from '@/components/AIAssistant';
import NGOActivities from '@/components/NGOActivities';
import Rewards from '@/components/Rewards';
import ImpactXP from '@/components/ImpactXP';
import CameraComponent from '@/components/CameraComponent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'ai':
        return <AIAssistant />;
      case 'impact':
        return <ImpactXP />;
      case 'ngo':
        return <NGOActivities />;
      case 'camera':
        return <CameraComponent />;
      case 'rewards':
        return <Rewards />;
      default:
        return <AIAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#E0F2F1] via-[#E1F5FE] to-[#FFF8E1] bg-fixed safe-area-top">
      {/* Main Content - No Header */}
      <main className="flex-1 pb-28 md:pb-32 min-h-screen safe-area-left safe-area-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
            suppressHydrationWarning
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;
