'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Gift, 
  Users, 
  TrendingUp, 
  Award, 
  Sparkles,
  Crown,
  Lock,
  Unlock,
  DollarSign,
  CreditCard,
  ShoppingBag,
  Heart,
  Leaf,
  Zap,
  Target,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Share2,
  Download,
  ExternalLink,
  Plus,
  Minus,
  Eye,
  Filter,
  Search,
  Crown as CrownIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  DollarSign as DollarSignIcon,
  CreditCard as CreditCardIcon,
  ShoppingBag as ShoppingBagIcon,
  Heart as HeartIcon,
  Leaf as LeafIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  BarChart3 as BarChart3Icon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Share2 as Share2Icon,
  Download as DownloadIcon,
  ExternalLink as ExternalLinkIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Eye as EyeIcon,
  Filter as FilterIcon,
  Search as SearchIcon
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'premium';
  xpRequired: number;
  unlocked: boolean;
  progress: number;
  premium?: boolean;
  revenueShare?: number;
}

interface SustainableBrand {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  discount: string;
  rating: number;
  sustainabilityScore: number;
  xpRequired: number;
  premium?: boolean;
  commission?: number;
  minPurchase?: number;
  exclusive?: boolean;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: number;
  rank: number;
  premium?: boolean;
  revenue?: number;
  investorScore?: number;
}

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
}

const Rewards = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'brands' | 'premium'>('badges');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [userXp] = useState(2847);
  const [userLevel] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);

  // Enhanced Badges with Premium Features
  const badges: Badge[] = [
    // Free Badges
    { id: '1', name: 'First Steps', description: 'Complete your first activity', icon: '🌟', rarity: 'common', xpRequired: 0, unlocked: true, progress: 100 },
    { id: '2', name: 'Helping Hand', description: 'Help 10 people', icon: '🤝', rarity: 'common', xpRequired: 100, unlocked: true, progress: 100 },
    { id: '3', name: 'Tree Hugger', description: 'Plant 5 trees', icon: '🌳', rarity: 'rare', xpRequired: 200, unlocked: true, progress: 100 },
    { id: '4', name: 'Educator', description: 'Complete 5 education activities', icon: '📚', rarity: 'rare', xpRequired: 300, unlocked: false, progress: 60 },
    { id: '5', name: 'Community Hero', description: 'Reach level 10', icon: '🏆', rarity: 'epic', xpRequired: 500, unlocked: true, progress: 100 },
    { id: '6', name: 'Impact Champion', description: 'Reach level 15', icon: '👑', rarity: 'legendary', xpRequired: 1000, unlocked: true, progress: 100 },
    
    // Premium Badges
    { id: '7', name: 'Revenue Generator', description: 'Generate ₹10,000 in revenue', icon: '💰', rarity: 'premium', xpRequired: 1500, unlocked: false, progress: 25, premium: true, revenueShare: 5 },
    { id: '8', name: 'Investor Magnet', description: 'Attract 5 investor interests', icon: '🎯', rarity: 'premium', xpRequired: 2000, unlocked: false, progress: 40, premium: true, revenueShare: 10 },
    { id: '9', name: 'Brand Ambassador', description: 'Partner with 3 sustainable brands', icon: '⭐', rarity: 'premium', xpRequired: 2500, unlocked: false, progress: 0, premium: true, revenueShare: 15 },
    { id: '10', name: 'Social Entrepreneur', description: 'Create sustainable impact worth ₹50,000', icon: '🚀', rarity: 'premium', xpRequired: 3000, unlocked: false, progress: 15, premium: true, revenueShare: 20 }
  ];

  // Enhanced Sustainable Brands with Revenue Sharing
  const sustainableBrands: SustainableBrand[] = [
    // Free Brands
    { id: '1', name: 'EcoThreads', description: 'Sustainable clothing made from organic cotton', logo: '/api/placeholder/60/60', category: 'Fashion', discount: '15% off', rating: 4.5, sustainabilityScore: 85, xpRequired: 100 },
    { id: '2', name: 'GreenHome', description: 'Eco-friendly home products and decor', logo: '/api/placeholder/60/60', category: 'Home', discount: '20% off', rating: 4.3, sustainabilityScore: 90, xpRequired: 200 },
    { id: '3', name: 'PureFoods', description: 'Organic and locally sourced food products', logo: '/api/placeholder/60/60', category: 'Food', discount: '10% off', rating: 4.7, sustainabilityScore: 88, xpRequired: 150 },
    
    // Premium Brands with Commission
    { id: '4', name: 'LuxuryEco', description: 'Premium sustainable luxury products', logo: '/api/placeholder/60/60', category: 'Luxury', discount: '25% off', rating: 4.8, sustainabilityScore: 95, xpRequired: 500, premium: true, commission: 8, minPurchase: 5000, exclusive: true },
    { id: '5', name: 'TechGreen', description: 'Sustainable technology and gadgets', logo: '/api/placeholder/60/60', category: 'Technology', discount: '30% off', rating: 4.6, sustainabilityScore: 92, xpRequired: 800, premium: true, commission: 12, minPurchase: 3000 },
    { id: '6', name: 'WellnessPure', description: 'Natural wellness and beauty products', logo: '/api/placeholder/60/60', category: 'Wellness', discount: '18% off', rating: 4.4, sustainabilityScore: 87, xpRequired: 600, premium: true, commission: 10, minPurchase: 2000 },
    { id: '7', name: 'InvestorConnect', description: 'Connect with impact investors and get funding', logo: '/api/placeholder/60/60', category: 'Investment', discount: 'Free Consultation', rating: 4.9, sustainabilityScore: 98, xpRequired: 1000, premium: true, commission: 5, minPurchase: 10000, exclusive: true }
  ];

  // Enhanced Leaderboard with Premium Features
  const leaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Sarah Johnson', avatar: '/api/placeholder/40/40', xp: 5847, level: 25, badges: 12, rank: 1, premium: true, revenue: 45000, investorScore: 95 },
    { id: '2', name: 'Rajesh Kumar', avatar: '/api/placeholder/40/40', xp: 4923, level: 22, badges: 10, rank: 2, premium: true, revenue: 38000, investorScore: 88 },
    { id: '3', name: 'Maria Garcia', avatar: '/api/placeholder/40/40', xp: 4156, level: 20, badges: 9, rank: 3, premium: false, revenue: 12000, investorScore: 72 },
    { id: '4', name: 'You', avatar: '/api/placeholder/40/40', xp: 2847, level: 15, badges: 6, rank: 4, premium: false, revenue: 2500, investorScore: 87 },
    { id: '5', name: 'David Chen', avatar: '/api/placeholder/40/40', xp: 2654, level: 14, badges: 7, rank: 5, premium: true, revenue: 18000, investorScore: 82 }
  ];

  // Premium Features
  const premiumFeatures: PremiumFeature[] = [
    {
      id: 'pro',
      name: 'Pro Rewards',
      description: 'Unlock exclusive badges and premium brand partnerships',
      price: 19,
      features: [
        'Exclusive Premium Badges',
        'Revenue Sharing (5-20%)',
        'Premium Brand Partnerships',
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Rewards',
      description: 'For NGOs and social enterprises seeking maximum impact',
      price: 49,
      features: [
        'Everything in Pro',
        'Investor Matching System',
        'White-label Solutions',
        'API Access',
        'Dedicated Account Manager',
        'Custom Integrations',
        'Revenue Optimization'
      ],
      recommended: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-600';
      case 'rare': return 'bg-blue-100 text-blue-600';
      case 'epic': return 'bg-purple-100 text-purple-600';
      case 'legendary': return 'bg-yellow-100 text-yellow-600';
      case 'premium': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-200';
      case 'rare': return 'shadow-blue-200';
      case 'epic': return 'shadow-purple-200';
      case 'legendary': return 'shadow-yellow-200';
      case 'premium': return 'shadow-orange-200';
      default: return 'shadow-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <motion.div 
        className="p-6 text-center border-b border-pink-200 bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-purple-700 mb-2">🎁 Rewards & Partnerships</h1>
        <p className="text-purple-600 text-sm">Earn badges, partner with sustainable brands, and unlock premium features!</p>
      </motion.div>

      {/* User Stats */}
      <motion.div 
        className="mx-6 mt-6 p-6 bg-white rounded-2xl shadow-lg border border-pink-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Level {userLevel}</h2>
              <p className="text-purple-600 font-medium">{userXp} XP</p>
              <p className="text-sm text-gray-600">{badges.filter(b => b.unlocked).length} Badges Earned</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">₹2,500</div>
            <div className="text-sm text-gray-500">Monthly Revenue</div>
            <div className="text-xs text-green-600">+18.4% this month</div>
          </div>
        </div>

        {/* Premium Upgrade Prompt */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-yellow-800 flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Unlock Premium Rewards
              </h3>
              <p className="text-sm text-yellow-700">Get exclusive badges, revenue sharing, and premium brand partnerships</p>
            </div>
            <button 
              onClick={() => setShowPremiumModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
            >
              Upgrade
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="mx-6 mt-6 flex space-x-2">
        {[
          { id: 'badges', name: 'Badges', icon: '🏆' },
          { id: 'leaderboard', name: 'Leaderboard', icon: '📊' },
          { id: 'brands', name: 'Brands', icon: '🛍️' },
          { id: 'premium', name: 'Premium', icon: '👑' }
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
              className="space-y-4"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 ${
                    badge.unlocked 
                      ? 'border-green-200 shadow-lg' 
                      : 'border-gray-200 shadow-md'
                  } ${badge.premium ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        badge.unlocked ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-200'
                      } ${getRarityGlow(badge.rarity)}`}>
                        {badge.unlocked ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center">
                          {badge.name}
                          {badge.premium && <Crown className="w-4 h-4 text-yellow-500 ml-2" />}
                        </h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity.toUpperCase()}
                          </span>
                          {badge.revenueShare && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                              {badge.revenueShare}% Revenue Share
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">+{badge.xpRequired} XP</div>
                      {!badge.unlocked && (
                        <div className="text-sm text-gray-500">
                          {badge.progress}% Complete
                        </div>
                      )}
                    </div>
                  </div>

                  {!badge.unlocked && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  )}

                  {badge.premium && !badge.unlocked && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lock className="w-4 h-4 text-yellow-500 mr-2" />
                          <span className="text-sm text-yellow-700">Premium Badge - Upgrade to unlock</span>
                        </div>
                        <button 
                          onClick={() => setShowPremiumModal(true)}
                          className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded text-xs font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
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
              <div className="bg-white rounded-xl p-6 border border-pink-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  Top Impact Makers
                </h3>
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${
                        entry.name === 'You' 
                          ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            {entry.rank}
                          </div>
                          {entry.premium && (
                            <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 flex items-center">
                            {entry.name}
                            {entry.premium && <Crown className="w-3 h-3 text-yellow-500 ml-1" />}
                          </h4>
                          <p className="text-sm text-gray-600">Level {entry.level} • {entry.badges} Badges</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">{entry.xp} XP</div>
                        {entry.revenue && (
                          <div className="text-sm text-green-600">₹{entry.revenue.toLocaleString()}</div>
                        )}
                        {entry.investorScore && (
                          <div className="text-xs text-blue-600">Score: {entry.investorScore}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              {sustainableBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 ${
                    brand.premium 
                      ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' 
                      : 'border-gray-200 shadow-md'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center">
                          {brand.name}
                          {brand.premium && <Crown className="w-4 h-4 text-yellow-500 ml-2" />}
                          {brand.exclusive && <Star className="w-4 h-4 text-purple-500 ml-1" />}
                        </h3>
                        <p className="text-sm text-gray-600">{brand.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                            {brand.category}
                          </span>
                          {brand.premium && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
                              Premium
                            </span>
                          )}
                          {brand.exclusive && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                              Exclusive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{brand.discount}</div>
                      <div className="text-sm text-gray-600">Rating: {brand.rating}⭐</div>
                      {brand.commission && (
                        <div className="text-xs text-blue-600">{brand.commission}% Commission</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{brand.sustainabilityScore}%</div>
                      <div className="text-xs text-gray-600">Sustainability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{brand.xpRequired}</div>
                      <div className="text-xs text-gray-600">XP Required</div>
                    </div>
                    {brand.minPurchase && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">₹{brand.minPurchase}</div>
                        <div className="text-xs text-gray-600">Min Purchase</div>
                      </div>
                    )}
                    {brand.commission && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{brand.commission}%</div>
                        <div className="text-xs text-gray-600">Commission</div>
                      </div>
                    )}
                  </div>

                  {brand.premium && (
                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          <span className="text-sm text-yellow-700">Premium Partnership - Upgrade to access</span>
                        </div>
                        <button 
                          onClick={() => setShowPremiumModal(true)}
                          className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded text-xs font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                      Shop Now
                    </button>
                                         <div className="flex items-center space-x-2">
                       <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Share brand">
                         <Share2 className="w-4 h-4" />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Add to favorites">
                         <Heart className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'premium' && (
            <motion.div
              key="premium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Premium Features */}
              <div className="bg-white rounded-xl p-6 border border-pink-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                  Premium Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {premiumFeatures.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        plan.popular 
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
                          : 'border-gray-200 bg-white'
                      } ${plan.recommended ? 'ring-2 ring-purple-400' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      {plan.recommended && (
                        <div className="absolute -top-3 right-4">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                        <div className="text-3xl font-bold text-gray-800">
                          ₹{plan.price}
                          <span className="text-sm text-gray-600 font-normal">/month</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                        Get Started
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="text-center">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Upgrade to Premium</h3>
              <p className="text-gray-600 mb-6">Unlock exclusive badges, revenue sharing, and premium partnerships</p>
              
              <div className="space-y-3 mb-6">
                {premiumFeatures.map((plan) => (
                  <div key={plan.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      <span className="text-lg font-bold">₹{plan.price}/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                      Choose {plan.name}
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setShowPremiumModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Rewards;
