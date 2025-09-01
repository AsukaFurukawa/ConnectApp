'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  Leaf, 
  Award, 
  Target, 
  Calendar,
  Clock,
  Star,
  Zap,
  Gift,
  Trophy,
  BarChart3,
  Activity,
  Globe,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Eye,
  Share2,
  Download,
  Filter,
  Search,
  Plus,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  DollarSign,
  Crown,
  TrendingDown,
  PieChart,
  MapPin,
  CalendarDays,
  Users2,
  Building2,
  Coins,
  Wallet,
  CreditCard,
  Lock,
  Unlock,
  Sparkle,
  Target as TargetIcon,
  BarChart,
  LineChart,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Gift as GiftIcon,
  Star as StarIcon,
  Zap as ZapIcon,
  Crown as CrownIcon,
  DollarSign as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  PieChart as PieChartIcon,
  MapPin as MapPinIcon,
  CalendarDays as CalendarDaysIcon,
  Users2 as Users2Icon,
  Building2 as Building2Icon,
  Coins as CoinsIcon,
  Wallet as WalletIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Sparkle as SparkleIcon
} from 'lucide-react';

interface ImpactActivity {
  id: string;
  type: 'volunteer' | 'donation' | 'environment' | 'community' | 'education';
  title: string;
  description: string;
  xpEarned: number;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  impact: {
    peopleHelped: number;
    hoursSpent: number;
    moneyRaised: number;
    treesPlanted: number;
  };
  location: string;
  category: string;
  verified: boolean;
  premium?: boolean;
  revenue?: number;
  investorInterest?: number;
}

interface ImpactStats {
  totalXP: number;
  level: number;
  rank: string;
  totalActivities: number;
  totalPeopleHelped: number;
  totalHoursSpent: number;
  totalMoneyRaised: number;
  totalTreesPlanted: number;
  streakDays: number;
  badgesEarned: number;
  impactScore: number;
  // Premium stats
  premiumTier: 'free' | 'pro' | 'enterprise';
  monthlyRevenue: number;
  investorScore: number;
  socialROI: number;
  communityReach: number;
  brandValue: number;
  sustainabilityIndex: number;
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

interface InvestorMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  premium: boolean;
}

const ImpactXP = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'analytics' | 'goals' | 'premium' | 'investors'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year' | 'all'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Enhanced Impact Stats with Premium Features
  const impactStats: ImpactStats = {
    totalXP: 2847,
    level: 15,
    rank: 'Impact Champion',
    totalActivities: 47,
    totalPeopleHelped: 156,
    totalHoursSpent: 89,
    totalMoneyRaised: 12500,
    totalTreesPlanted: 23,
    streakDays: 12,
    badgesEarned: 6,
    impactScore: 94,
    // Premium stats
    premiumTier: 'free',
    monthlyRevenue: 2500,
    investorScore: 87,
    socialROI: 340,
    communityReach: 2500,
    brandValue: 15000,
    sustainabilityIndex: 92
  };

  // Premium Features
  const premiumFeatures: PremiumFeature[] = [
    {
      id: 'pro',
      name: 'Pro Impact',
      description: 'Perfect for growing NGOs and social enterprises',
      price: 29,
      features: [
        'Advanced Analytics Dashboard',
        'Investor Pitch Deck Generator',
        'Revenue Tracking & Forecasting',
        'Premium Impact Reports',
        'Priority Support',
        'Custom Branding'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Impact',
      description: 'For large NGOs and corporate social responsibility',
      price: 99,
      features: [
        'Everything in Pro',
        'AI-Powered Impact Prediction',
        'Investor Matching System',
        'White-label Solutions',
        'API Access',
        'Dedicated Account Manager',
        'Custom Integrations'
      ],
      recommended: true
    }
  ];

  // Investor Metrics
  const investorMetrics: InvestorMetric[] = [
    { metric: 'Social ROI', value: 340, change: 12.5, trend: 'up', premium: true },
    { metric: 'Community Reach', value: 2500, change: 8.2, trend: 'up', premium: true },
    { metric: 'Brand Value', value: 15000, change: 15.3, trend: 'up', premium: true },
    { metric: 'Sustainability Index', value: 92, change: 3.1, trend: 'up', premium: true },
    { metric: 'Investor Interest Score', value: 87, change: 5.7, trend: 'up', premium: true },
    { metric: 'Monthly Revenue', value: 2500, change: 18.4, trend: 'up', premium: true }
  ];

  // Enhanced Impact Activities with Premium Data
  const impactActivities: ImpactActivity[] = [
    {
      id: '1',
      type: 'volunteer',
      title: 'Teaching English at Local School',
      description: 'Helped 15 students improve their English speaking skills',
      xpEarned: 150,
      date: '2024-01-15',
      status: 'completed',
      impact: {
        peopleHelped: 15,
        hoursSpent: 4,
        moneyRaised: 0,
        treesPlanted: 0
      },
      location: 'Bangalore Public School',
      category: 'Education',
      verified: true,
      premium: true,
      revenue: 500,
      investorInterest: 85
    },
    {
      id: '2',
      type: 'donation',
      title: 'Flood Relief Donation',
      description: 'Donated ₹5,000 for flood relief in Kerala',
      xpEarned: 200,
      date: '2024-01-10',
      status: 'completed',
      impact: {
        peopleHelped: 50,
        hoursSpent: 0,
        moneyRaised: 5000,
        treesPlanted: 0
      },
      location: 'Kerala',
      category: 'Disaster Relief',
      verified: true,
      premium: true,
      revenue: 1200,
      investorInterest: 92
    },
    {
      id: '3',
      type: 'environment',
      title: 'Tree Plantation Drive',
      description: 'Planted 10 trees in Cubbon Park',
      xpEarned: 100,
      date: '2024-01-08',
      status: 'completed',
      impact: {
        peopleHelped: 0,
        hoursSpent: 3,
        moneyRaised: 0,
        treesPlanted: 10
      },
      location: 'Cubbon Park, Bangalore',
      category: 'Environment',
      verified: true,
      premium: false,
      revenue: 0,
      investorInterest: 78
    },
    {
      id: '4',
      type: 'community',
      title: 'Blood Donation Camp',
      description: 'Organized blood donation camp at local hospital',
      xpEarned: 300,
      date: '2024-01-05',
      status: 'completed',
      impact: {
        peopleHelped: 25,
        hoursSpent: 6,
        moneyRaised: 0,
        treesPlanted: 0
      },
      location: 'City Hospital, Bangalore',
      category: 'Healthcare',
      verified: true,
      premium: true,
      revenue: 800,
      investorInterest: 88
    },
    {
      id: '5',
      type: 'education',
      title: 'Digital Literacy Workshop',
      description: 'Teaching basic computer skills to senior citizens',
      xpEarned: 180,
      date: '2024-01-20',
      status: 'in-progress',
      impact: {
        peopleHelped: 8,
        hoursSpent: 2,
        moneyRaised: 0,
        treesPlanted: 0
      },
      location: 'Senior Citizens Center',
      category: 'Education',
      verified: false,
      premium: true,
      revenue: 400,
      investorInterest: 82
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'volunteer': return <Users className="w-5 h-5" />;
      case 'donation': return <Heart className="w-5 h-5" />;
      case 'environment': return <Leaf className="w-5 h-5" />;
      case 'community': return <Globe className="w-5 h-5" />;
      case 'education': return <Award className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'volunteer': return 'bg-blue-100 text-blue-600';
      case 'donation': return 'bg-red-100 text-red-600';
      case 'environment': return 'bg-green-100 text-green-600';
      case 'community': return 'bg-purple-100 text-purple-600';
      case 'education': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-yellow-100 text-yellow-600';
      case 'planned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredActivities = impactActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <motion.div 
        className="p-6 text-center border-b border-emerald-200 bg-gradient-to-r from-emerald-100 to-teal-100 backdrop-blur-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">🌟 Impact XP Dashboard</h1>
        <p className="text-emerald-600 text-sm">Track your social impact and earn rewards!</p>
      </motion.div>

      {/* Main Stats Card */}
      <motion.div 
        className="mx-6 mt-6 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Level {impactStats.level}</h2>
              <p className="text-emerald-600 font-medium">{impactStats.rank}</p>
              <p className="text-sm text-gray-600">{impactStats.totalXP} Total XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-600">{impactStats.impactScore}</div>
            <div className="text-sm text-gray-500">Impact Score</div>
            {impactStats.premiumTier !== 'free' && (
              <div className="flex items-center justify-center mt-2">
                <Crown className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-xs text-yellow-600 font-medium uppercase">{impactStats.premiumTier}</span>
              </div>
            )}
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Next Level: {impactStats.level + 1}</span>
            <span>{impactStats.totalXP % 200}/200 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(impactStats.totalXP % 200) / 2}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Users />, label: 'People Helped', value: impactStats.totalPeopleHelped },
            { icon: <Clock />, label: 'Hours Spent', value: impactStats.totalHoursSpent },
            { icon: <Heart />, label: 'Money Raised', value: `₹${impactStats.totalMoneyRaised.toLocaleString()}` },
            { icon: <Leaf />, label: 'Trees Planted', value: impactStats.totalTreesPlanted }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="text-emerald-600 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Premium Stats Preview */}
        {impactStats.premiumTier === 'free' && (
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  Unlock Premium Analytics
                </h3>
                <p className="text-sm text-yellow-700">Get detailed revenue tracking, investor metrics, and advanced insights</p>
              </div>
              <button 
                onClick={() => setShowPremiumModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Tab Navigation */}
      <div className="mx-6 mt-6 flex space-x-2 overflow-x-auto">
        {[
          { id: 'overview', name: 'Overview', icon: '📊' },
          { id: 'activities', name: 'Activities', icon: '📝' },
          { id: 'analytics', name: 'Analytics', icon: '📈' },
          { id: 'goals', name: 'Goals', icon: '🎯' },
          { id: 'premium', name: 'Premium', icon: '👑' },
          { id: 'investors', name: 'Investors', icon: '💰' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-emerald-200 hover:bg-emerald-50'
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Recent Achievements */}
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 text-emerald-500 mr-2" />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'Reached Level 15', xp: 150, date: '2 days ago' },
                    { title: 'Completed 10 Volunteer Activities', xp: 100, date: '1 week ago' },
                    { title: 'Helped 100+ People', xp: 200, date: '2 weeks ago' }
                  ].map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div>
                        <div className="font-medium text-gray-800">{achievement.title}</div>
                        <div className="text-sm text-gray-600">{achievement.date}</div>
                      </div>
                      <div className="text-emerald-600 font-bold">+{achievement.xp} XP</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact Streak */}
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  Impact Streak
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">{impactStats.streakDays}</div>
                  <div className="text-gray-600">Days of continuous impact</div>
                  <div className="mt-4 flex justify-center space-x-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < Math.min(impactStats.streakDays, 7) 
                            ? 'bg-yellow-400' 
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Search and Filter */}
              <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-md">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <select 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    aria-label="Filter activities by type"
                  >
                    <option>All Types</option>
                    <option>Volunteer</option>
                    <option>Donation</option>
                    <option>Environment</option>
                    <option>Community</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>

              {/* Activities List */}
              <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
                          {getTypeIcon(activity.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">+{activity.xpEarned} XP</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                        {activity.premium && (
                          <div className="flex items-center justify-center mt-1">
                            <Crown className="w-3 h-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-yellow-600">Premium</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {activity.impact.peopleHelped > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{activity.impact.peopleHelped}</div>
                          <div className="text-xs text-gray-600">People Helped</div>
                        </div>
                      )}
                      {activity.impact.hoursSpent > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{activity.impact.hoursSpent}h</div>
                          <div className="text-xs text-gray-600">Hours Spent</div>
                        </div>
                      )}
                      {activity.impact.moneyRaised > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">₹{activity.impact.moneyRaised}</div>
                          <div className="text-xs text-gray-600">Money Raised</div>
                        </div>
                      )}
                      {activity.impact.treesPlanted > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{activity.impact.treesPlanted}</div>
                          <div className="text-xs text-gray-600">Trees Planted</div>
                        </div>
                      )}
                    </div>

                    {/* Premium Metrics */}
                    {activity.premium && (
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">₹{activity.revenue}</div>
                          <div className="text-xs text-gray-600">Revenue Generated</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{activity.investorInterest}%</div>
                          <div className="text-xs text-gray-600">Investor Interest</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>{activity.location}</span>
                        <span>{activity.category}</span>
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {activity.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                        <span>{activity.verified ? 'Verified' : 'Pending'}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Analytics Overview */}
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-emerald-500 mr-2" />
                  Impact Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Monthly Progress</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'XP Earned', value: 847, change: '+12%', trend: 'up' },
                        { label: 'Activities', value: 12, change: '+8%', trend: 'up' },
                        { label: 'People Helped', value: 45, change: '+15%', trend: 'up' },
                        { label: 'Hours Spent', value: 28, change: '-5%', trend: 'down' }
                      ].map((metric, index) => (
                        <div key={metric.label} className="flex items-center justify-between">
                          <span className="text-gray-600">{metric.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{metric.value}</span>
                            <div className={`flex items-center text-sm ${
                              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {metric.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                              <span>{metric.change}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Impact Distribution</h4>
                    <div className="space-y-3">
                      {[
                        { type: 'Volunteer', percentage: 40, color: 'bg-blue-500' },
                        { type: 'Donation', percentage: 25, color: 'bg-red-500' },
                        { type: 'Environment', percentage: 20, color: 'bg-green-500' },
                        { type: 'Community', percentage: 15, color: 'bg-purple-500' }
                      ].map((item, index) => (
                        <div key={item.type} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${item.color}`} />
                          <span className="text-gray-600 flex-1">{item.type}</span>
                          <span className="font-semibold">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Current Goals */}
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-emerald-500 mr-2" />
                  Current Goals
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Reach Level 20', progress: 75, target: 'Level 20', current: 'Level 15', xpReward: 500 },
                    { title: 'Help 200 People', progress: 78, target: '200', current: '156', xpReward: 300 },
                    { title: 'Plant 50 Trees', progress: 46, target: '50', current: '23', xpReward: 250 },
                    { title: 'Complete 100 Activities', progress: 47, target: '100', current: '47', xpReward: 400 }
                  ].map((goal, index) => (
                    <motion.div
                      key={goal.title}
                      className="border border-gray-200 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                        <span className="text-emerald-600 font-bold">+{goal.xpReward} XP</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>{goal.current} / {goal.target}</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
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
                      } ${plan.recommended ? 'ring-2 ring-emerald-400' : ''}`}
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
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600">
                        Get Started
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'investors' && (
            <motion.div
              key="investors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Investor Dashboard */}
              <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 text-emerald-500 mr-2" />
                  Investor Dashboard
                </h3>
                
                {/* Premium Lock Warning */}
                {impactStats.premiumTier === 'free' && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-yellow-800 flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          Premium Feature
                        </h4>
                        <p className="text-sm text-yellow-700">Upgrade to Pro or Enterprise to access investor metrics and analytics</p>
                      </div>
                      <button 
                        onClick={() => setShowPremiumModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                )}

                {/* Investor Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {investorMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.metric}
                      className={`p-4 rounded-lg border ${
                        metric.premium && impactStats.premiumTier === 'free'
                          ? 'border-gray-200 bg-gray-50 opacity-50'
                          : 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-700 text-sm">{metric.metric}</h4>
                        {metric.premium && impactStats.premiumTier === 'free' && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">
                        {metric.metric === 'Monthly Revenue' ? `₹${metric.value.toLocaleString()}` : metric.value}
                      </div>
                      <div className={`flex items-center text-sm ${
                        metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : 
                         metric.trend === 'down' ? <ArrowDown className="w-3 h-3 mr-1" /> : null}
                        <span>{metric.change}%</span>
                      </div>
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
              <p className="text-gray-600 mb-6">Unlock advanced analytics, investor metrics, and revenue tracking</p>
              
              <div className="space-y-3 mb-6">
                {premiumFeatures.map((plan) => (
                  <div key={plan.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      <span className="text-lg font-bold">₹{plan.price}/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
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

export default ImpactXP;
