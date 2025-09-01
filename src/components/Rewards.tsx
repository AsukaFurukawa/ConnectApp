'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Heart, 
  Sparkles, 
  Gift, 
  Award, 
  TrendingUp, 
  Users,
  ShoppingBag,
  Leaf,
  Zap,
  Crown,
  Target,
  Medal,
  Coffee,
  ShoppingCart,
  Tag,
  ExternalLink,
  ChevronRight,
  Sparkle
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'volunteer' | 'donation' | 'environment' | 'community' | 'special';
}

interface SustainableBrand {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: 'fashion' | 'food' | 'beauty' | 'home' | 'tech';
  discount: string;
  minXpRequired: number;
  website: string;
  rating: number;
  sustainabilityScore: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  badges: number;
  isCurrentUser: boolean;
}

const Rewards = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'brands'>('badges');
  const [userXp, setUserXp] = useState(2847);
  const [userLevel, setUserLevel] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);

  // Kawaii Badges Data
  const badges: Badge[] = [
    // Common Badges
    {
      id: 'first-volunteer',
      name: '🌸 First Bloom',
      description: 'Completed your first volunteer activity',
      icon: '🌸',
      xpRequired: 100,
      unlocked: true,
      rarity: 'common',
      category: 'volunteer'
    },
    {
      id: 'first-donation',
      name: '💝 Heart of Gold',
      description: 'Made your first donation',
      icon: '💝',
      xpRequired: 150,
      unlocked: true,
      rarity: 'common',
      category: 'donation'
    },
    {
      id: 'eco-warrior',
      name: '🌱 Eco Warrior',
      description: 'Participated in 5 environmental activities',
      icon: '🌱',
      xpRequired: 500,
      unlocked: true,
      rarity: 'common',
      category: 'environment'
    },
    // Rare Badges
    {
      id: 'community-champion',
      name: '🌟 Community Champion',
      description: 'Helped 50+ people in your community',
      icon: '🌟',
      xpRequired: 1000,
      unlocked: true,
      rarity: 'rare',
      category: 'community'
    },
    {
      id: 'donation-master',
      name: '💎 Donation Master',
      description: 'Donated over ₹10,000 to various causes',
      icon: '💎',
      xpRequired: 1500,
      unlocked: true,
      rarity: 'rare',
      category: 'donation'
    },
    {
      id: 'volunteer-veteran',
      name: '🎖️ Volunteer Veteran',
      description: 'Completed 25+ volunteer activities',
      icon: '🎖️',
      xpRequired: 2000,
      unlocked: true,
      rarity: 'rare',
      category: 'volunteer'
    },
    // Epic Badges
    {
      id: 'impact-legend',
      name: '👑 Impact Legend',
      description: 'Reached 10,000+ total impact points',
      icon: '👑',
      xpRequired: 5000,
      unlocked: false,
      rarity: 'epic',
      category: 'special'
    },
    {
      id: 'sustainability-guru',
      name: '🌿 Sustainability Guru',
      description: 'Led 10+ environmental initiatives',
      icon: '🌿',
      xpRequired: 3000,
      unlocked: false,
      rarity: 'epic',
      category: 'environment'
    },
    // Legendary Badges
    {
      id: 'humanitarian-hero',
      name: '🦸‍♀️ Humanitarian Hero',
      description: 'Saved lives through your actions',
      icon: '🦸‍♀️',
      xpRequired: 10000,
      unlocked: false,
      rarity: 'legendary',
      category: 'special'
    },
    {
      id: 'world-changer',
      name: '🌍 World Changer',
      description: 'Created lasting positive change globally',
      icon: '🌍',
      xpRequired: 15000,
      unlocked: false,
      rarity: 'legendary',
      category: 'special'
    }
  ];

  // Sustainable Brands Data
  const sustainableBrands: SustainableBrand[] = [
    {
      id: 'eco-fashion',
      name: 'Green Threads',
      description: 'Sustainable fashion made from organic cotton and recycled materials',
      logo: '/api/placeholder/60/60',
      category: 'fashion',
      discount: '20% OFF',
      minXpRequired: 500,
      website: 'https://greenthreads.com',
      rating: 4.8,
      sustainabilityScore: 95
    },
    {
      id: 'organic-food',
      name: 'Fresh & Pure',
      description: 'Organic food products sourced from local farmers',
      logo: '/api/placeholder/60/60',
      category: 'food',
      discount: '15% OFF',
      minXpRequired: 300,
      website: 'https://freshandpure.com',
      rating: 4.6,
      sustainabilityScore: 92
    },
    {
      id: 'eco-beauty',
      name: 'Nature Glow',
      description: 'Cruelty-free beauty products with natural ingredients',
      logo: '/api/placeholder/60/60',
      category: 'beauty',
      discount: '25% OFF',
      minXpRequired: 800,
      website: 'https://natureglow.com',
      rating: 4.9,
      sustainabilityScore: 98
    },
    {
      id: 'eco-home',
      name: 'Green Living',
      description: 'Eco-friendly home products and sustainable furniture',
      logo: '/api/placeholder/60/60',
      category: 'home',
      discount: '30% OFF',
      minXpRequired: 1000,
      website: 'https://greenliving.com',
      rating: 4.7,
      sustainabilityScore: 94
    },
    {
      id: 'eco-tech',
      name: 'Solar Tech',
      description: 'Renewable energy solutions and eco-friendly gadgets',
      logo: '/api/placeholder/60/60',
      category: 'tech',
      discount: '40% OFF',
      minXpRequired: 1500,
      website: 'https://solartech.com',
      rating: 4.5,
      sustainabilityScore: 96
    },
    {
      id: 'zero-waste',
      name: 'Zero Waste Co.',
      description: 'Zero-waste lifestyle products and reusable items',
      logo: '/api/placeholder/60/60',
      category: 'home',
      discount: '35% OFF',
      minXpRequired: 1200,
      website: 'https://zerowasteco.com',
      rating: 4.8,
      sustainabilityScore: 99
    }
  ];

  // Leaderboard Data
  const leaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'You',
      avatar: '/api/placeholder/40/40',
      xp: 2847,
      rank: 1,
      badges: 6,
      isCurrentUser: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: '/api/placeholder/40/40',
      xp: 2650,
      rank: 2,
      badges: 5,
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      avatar: '/api/placeholder/40/40',
      xp: 2400,
      rank: 3,
      badges: 4,
      isCurrentUser: false
    },
    {
      id: '4',
      name: 'Anjali Patel',
      avatar: '/api/placeholder/40/40',
      xp: 2100,
      rank: 4,
      badges: 4,
      isCurrentUser: false
    },
    {
      id: '5',
      name: 'Vikram Singh',
      avatar: '/api/placeholder/40/40',
      xp: 1950,
      rank: 5,
      badges: 3,
      isCurrentUser: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-200 text-gray-700';
      case 'rare': return 'bg-blue-200 text-blue-700';
      case 'epic': return 'bg-purple-200 text-purple-700';
      case 'legendary': return 'bg-yellow-200 text-yellow-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-300';
      case 'rare': return 'shadow-blue-300';
      case 'epic': return 'shadow-purple-300';
      case 'legendary': return 'shadow-yellow-300';
      default: return 'shadow-gray-300';
    }
  };

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <motion.div 
        className="p-6 text-center border-b border-pink-200 bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-pink-600 mb-2">🎀 Rewards & Achievements</h1>
        <p className="text-pink-500 text-sm">Unlock badges, climb leaderboards, and shop sustainably!</p>
      </motion.div>

      {/* User Stats Card */}
      <motion.div 
        className="mx-6 mt-6 p-4 bg-white rounded-2xl shadow-lg border border-pink-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Level {userLevel}</h3>
              <p className="text-sm text-gray-600">{userXp} XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-pink-600">{unlockedBadges.length}</div>
            <div className="text-xs text-gray-500">Badges Unlocked</div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Next Level: {userLevel + 1}</span>
            <span>{userXp % 200}/200 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userXp % 200) / 2}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="mx-6 mt-6 flex space-x-2">
        {[
          { id: 'badges', name: 'Badges', icon: '🏆' },
          { id: 'leaderboard', name: 'Leaderboard', icon: '📊' },
          { id: 'brands', name: 'Sustainable Brands', icon: '🌿' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-pink-200 hover:bg-pink-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm">{tab.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 mx-6 mt-6 mb-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Unlocked Badges */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
                  Your Achievements ({unlockedBadges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {unlockedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className="bg-white rounded-xl p-4 border border-pink-200 shadow-md hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`text-3xl ${getRarityGlow(badge.rarity)}`}>
                          {badge.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{badge.name}</h4>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Locked Badges */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-purple-500 mr-2" />
                  Upcoming Challenges ({lockedBadges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-60"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl grayscale">
                          {badge.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-600">{badge.name}</h4>
                          <p className="text-sm text-gray-500">{badge.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">Requires {badge.xpRequired} XP</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-pink-400 to-purple-500 h-1 rounded-full"
                                style={{ width: `${Math.min((userXp / badge.xpRequired) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Top Impact Makers
              </h3>
              
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className={`bg-white rounded-xl p-4 border-2 transition-all duration-300 ${
                    entry.isCurrentUser 
                      ? 'border-pink-300 shadow-lg bg-gradient-to-r from-pink-50 to-purple-50' 
                      : 'border-gray-200 hover:border-pink-200'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        index === 0 ? 'bg-yellow-400 text-white' :
                        index === 1 ? 'bg-gray-300 text-white' :
                        index === 2 ? 'bg-orange-400 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                      </div>
                      {entry.isCurrentUser && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">★</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-gray-800">{entry.name}</h4>
                        {entry.isCurrentUser && (
                          <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          {entry.xp} XP
                        </span>
                        <span className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          {entry.badges} Badges
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'brands' && (
            <motion.div
              key="brands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Leaf className="w-5 h-5 text-green-500 mr-2" />
                Sustainable Brands & Rewards
              </h3>
              
              {sustainableBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  className="bg-white rounded-xl p-4 border border-green-200 shadow-md hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <img src={brand.logo} alt={brand.name} className="w-10 h-10 rounded-lg" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{brand.name}</h4>
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full font-medium">
                          {brand.discount}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-yellow-600">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            {brand.rating}
                          </span>
                          <span className="flex items-center text-green-600">
                            <Leaf className="w-4 h-4 mr-1" />
                            {brand.sustainabilityScore}%
                          </span>
                          <span className="text-gray-500">
                            Min {brand.minXpRequired} XP
                          </span>
                        </div>
                        
                        <motion.button
                          className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-medium flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Shop Now</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Rewards;
