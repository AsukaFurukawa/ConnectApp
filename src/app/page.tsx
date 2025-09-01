'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationBar from '@/components/NavigationBar';
import AIAssistant from '@/components/AIAssistant';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'ai':
        return <AIAssistant />;
      case 'impact':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#C5E1A5] to-[#9CCC65] rounded-full flex items-center justify-center shadow-pastel">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-lg font-bold text-[#2E7D32] mb-2 font-fun">Impact XP</h2>
              <p className="text-[#66BB6A] text-sm font-clean">Your impact points will appear here</p>
            </div>
          </div>
        );
      case 'ngo':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#A5D6A7] to-[#66BB6A] rounded-full flex items-center justify-center shadow-pastel">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="text-lg font-bold text-[#2E7D32] mb-2 font-fun">NGO Activities</h2>
              <p className="text-[#66BB6A] text-sm font-clean">NGO activities and request status will appear here</p>
            </div>
          </div>
        );
      case 'camera':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#CCF0DF] to-[#A8DBCA] rounded-full flex items-center justify-center shadow-pastel">
                <span className="text-2xl">📸</span>
              </div>
              <h2 className="text-lg font-bold text-[#2E7D32] mb-2 font-fun">Camera</h2>
              <p className="text-[#66BB6A] text-sm font-clean">Camera functionality will be implemented here</p>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#C7E9C0] to-[#76C58C] rounded-full flex items-center justify-center shadow-pastel">
                <span className="text-2xl">🎁</span>
              </div>
              <h2 className="text-lg font-bold text-[#2E7D32] mb-2 font-fun">Brands & Rewards</h2>
              <p className="text-[#66BB6A] text-sm font-clean">Sustainable brands and rewards will appear here</p>
            </div>
          </div>
        );
      default:
        return <AIAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#E0F2F1] via-[#E1F5FE] to-[#FFF8E1] bg-fixed">
      {/* Main Content - No Header */}
      <main className="flex-1 pb-28 md:pb-32 min-h-screen">
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
