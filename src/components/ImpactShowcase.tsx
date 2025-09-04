'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Users, 
  TreePine, 
  Droplets, 
  Recycle, 
  Leaf, 
  Globe, 
  TrendingUp,
  Award,
  Target,
  Zap,
  Star,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

interface ImpactMetric {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  image: string;
  impact: string;
  location: string;
  ngo: string;
  category: string;
}

interface LiveImpact {
  id: string;
  type: 'tree_planted' | 'child_educated' | 'animal_rescued' | 'meal_provided';
  location: string;
  timestamp: Date;
  ngo: string;
}

const ImpactShowcase = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stories' | 'live' | 'goals'>('overview');
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Real-time impact metrics
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([
    {
      id: 'trees',
      icon: <TreePine className="w-6 h-6" />,
      label: 'Trees Planted',
      value: 12547,
      unit: 'trees',
      color: 'text-green-600',
      description: 'Contributing to carbon sequestration and biodiversity',
      trend: 'up',
      change: 12.5
    },
    {
      id: 'children',
      icon: <Users className="w-6 h-6" />,
      label: 'Children Helped',
      value: 8932,
      unit: 'children',
      color: 'text-blue-600',
      description: 'Providing education, nutrition, and healthcare',
      trend: 'up',
      change: 8.3
    },
    {
      id: 'animals',
      icon: <Heart className="w-6 h-6" />,
      label: 'Animals Rescued',
      value: 3456,
      unit: 'animals',
      color: 'text-pink-600',
      description: 'Saving and rehabilitating street animals',
      trend: 'up',
      change: 15.2
    },
    {
      id: 'water',
      icon: <Droplets className="w-6 h-6" />,
      label: 'Water Saved',
      value: 125000,
      unit: 'liters',
      color: 'text-cyan-600',
      description: 'Through conservation and recycling programs',
      trend: 'up',
      change: 22.1
    },
    {
      id: 'plastic',
      icon: <Recycle className="w-6 h-6" />,
      label: 'Plastic Recycled',
      value: 45600,
      unit: 'kg',
      color: 'text-purple-600',
      description: 'Preventing plastic from entering oceans',
      trend: 'up',
      change: 18.7
    },
    {
      id: 'co2',
      icon: <Leaf className="w-6 h-6" />,
      label: 'CO₂ Reduced',
      value: 8920,
      unit: 'kg',
      color: 'text-emerald-600',
      description: 'Through sustainable practices and tree planting',
      trend: 'up',
      change: 25.4
    }
  ]);

  // Success stories
  const successStories: SuccessStory[] = [
    {
      id: 'story-1',
      title: 'Digital Education Revolution',
      description: 'Transformed 15 government schools in Bangalore with digital literacy programs, reaching 750+ students.',
      image: 'https://picsum.photos/400/300?random=100',
      impact: '750+ students trained',
      location: 'Bangalore, Karnataka',
      ngo: 'Teach For India',
      category: 'Education'
    },
    {
      id: 'story-2',
      title: 'Street Animal Rescue Network',
      description: 'Established a 24/7 rescue network that has saved over 500 injured animals in the past month.',
      image: 'https://picsum.photos/400/300?random=101',
      impact: '500+ animals rescued',
      location: 'Mumbai, Maharashtra',
      ngo: 'Animal Welfare Trust',
      category: 'Animal Welfare'
    },
    {
      id: 'story-3',
      title: 'Clean Water Initiative',
      description: 'Installed water purification systems in 25 rural villages, providing clean water to 10,000+ people.',
      image: 'https://picsum.photos/400/300?random=102',
      impact: '10,000+ people served',
      location: 'Rajasthan, India',
      ngo: 'Water for All',
      category: 'Healthcare'
    },
    {
      id: 'story-4',
      title: 'Women Empowerment Program',
      description: 'Trained 200 women in sustainable farming techniques, increasing their income by 150%.',
      image: 'https://picsum.photos/400/300?random=103',
      impact: '200+ women empowered',
      location: 'Kerala, India',
      ngo: 'Women for Change',
      category: 'Social Impact'
    }
  ];

  // Live impact feed
  const [liveImpacts, setLiveImpacts] = useState<LiveImpact[]>([
    {
      id: 'live-1',
      type: 'tree_planted',
      location: 'Delhi, India',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      ngo: 'Green Earth Foundation'
    },
    {
      id: 'live-2',
      type: 'child_educated',
      location: 'Chennai, India',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      ngo: 'CRY - Child Rights and You'
    },
    {
      id: 'live-3',
      type: 'animal_rescued',
      location: 'Bangalore, India',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      ngo: 'Animal Welfare Trust'
    }
  ]);

  // Animate metrics
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setImpactMetrics(prev => prev.map(metric => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 5) + 1
        })));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Add new live impacts
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const types: LiveImpact['type'][] = ['tree_planted', 'child_educated', 'animal_rescued', 'meal_provided'];
        const locations = ['Mumbai, India', 'Kolkata, India', 'Hyderabad, India', 'Pune, India'];
        const ngos = ['Teach For India', 'CRY', 'Goonj', 'Animal Welfare Trust'];

        const newImpact: LiveImpact = {
          id: `live-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          timestamp: new Date(),
          ngo: ngos[Math.floor(Math.random() * ngos.length)]
        };

        setLiveImpacts(prev => [newImpact, ...prev.slice(0, 9)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getImpactIcon = (type: LiveImpact['type']) => {
    switch (type) {
      case 'tree_planted': return <TreePine className="w-4 h-4 text-green-600" />;
      case 'child_educated': return <Users className="w-4 h-4 text-blue-600" />;
      case 'animal_rescued': return <Heart className="w-4 h-4 text-pink-600" />;
      case 'meal_provided': return <Heart className="w-4 h-4 text-orange-600" />;
    }
  };

  const getImpactText = (type: LiveImpact['type']) => {
    switch (type) {
      case 'tree_planted': return 'Tree planted';
      case 'child_educated': return 'Child educated';
      case 'animal_rescued': return 'Animal rescued';
      case 'meal_provided': return 'Meal provided';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🌍 Impact Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time impact tracking for our community</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'} Live Updates
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'overview', label: 'Impact Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'stories', label: 'Success Stories', icon: <Award className="w-4 h-4" /> },
            { id: 'live', label: 'Live Impact', icon: <Zap className="w-4 h-4" /> },
            { id: 'goals', label: 'Our Goals', icon: <Target className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Impact Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
                <div className="max-w-4xl">
                  <h2 className="text-3xl font-bold mb-4">🤝 Our Mission</h2>
                  <p className="text-xl leading-relaxed">
                    We're building a world where every act of kindness creates a ripple effect of positive change. 
                    Through technology, community, and compassion, we're connecting people with causes that matter, 
                    making social impact accessible to everyone.
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <span>Global Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>Community Driven</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      <span>Sustainable Future</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                        {metric.icon}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">+{metric.change}%</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">{metric.label}</p>
                    <p className="text-sm text-gray-500">{metric.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Impact Visualization */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Impact Visualization</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">This Month's Impact</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Trees Planted', value: 12547, max: 15000, color: 'bg-green-500' },
                        { label: 'Children Helped', value: 8932, max: 10000, color: 'bg-blue-500' },
                        { label: 'Animals Rescued', value: 3456, max: 4000, color: 'bg-pink-500' },
                        { label: 'Water Saved (L)', value: 125000, max: 150000, color: 'bg-cyan-500' }
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                            <span>{item.label}</span>
                            <span>{item.value.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                              style={{ width: `${(item.value / item.max) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Impact Categories</h4>
                    <div className="space-y-3">
                      {[
                        { category: 'Environmental', percentage: 35, color: 'bg-green-500' },
                        { category: 'Education', percentage: 28, color: 'bg-blue-500' },
                        { category: 'Healthcare', percentage: 20, color: 'bg-red-500' },
                        { category: 'Animal Welfare', percentage: 17, color: 'bg-pink-500' }
                      ].map((item) => (
                        <div key={item.category} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-gray-200">
                            <div
                              className={`w-4 h-4 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item.category}</span>
                          <span className="text-sm text-gray-500 ml-auto">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Stories Tab */}
          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 Success Stories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Real stories of impact from our community. Every action creates a ripple effect of positive change.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                          {story.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                      <p className="text-gray-600 mb-4">{story.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">{story.impact}</p>
                          <p className="text-sm text-gray-500">{story.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{story.ngo}</p>
                          <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Live Impact Tab */}
          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">⚡ Live Impact Feed</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Real-time updates of positive impact happening right now across our community.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold text-gray-900">Live Updates</h3>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {liveImpacts.map((impact, index) => (
                    <motion.div
                      key={impact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {getImpactIcon(impact.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{getImpactText(impact.type)}</p>
                        <p className="text-sm text-gray-600">{impact.location} • {impact.ngo}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(impact.timestamp)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Our Goals</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ambitious targets for creating a better world through technology and community action.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Environmental Impact',
                    description: 'Plant 1 million trees and reduce CO₂ emissions by 50,000 tons',
                    progress: 65,
                    target: '1M trees',
                    current: '650K trees',
                    color: 'green'
                  },
                  {
                    title: 'Education Access',
                    description: 'Provide quality education to 100,000 underprivileged children',
                    progress: 45,
                    target: '100K children',
                    current: '45K children',
                    color: 'blue'
                  },
                  {
                    title: 'Animal Welfare',
                    description: 'Rescue and rehabilitate 50,000 street animals',
                    progress: 30,
                    target: '50K animals',
                    current: '15K animals',
                    color: 'pink'
                  },
                  {
                    title: 'Community Building',
                    description: 'Connect 1 million people with causes they care about',
                    progress: 80,
                    target: '1M users',
                    current: '800K users',
                    color: 'purple'
                  }
                ].map((goal, index) => (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{goal.title}</h3>
                    <p className="text-gray-600 mb-4">{goal.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>{goal.current}</span>
                        <span>{goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full bg-${goal.color}-500 transition-all duration-1000`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{goal.progress}%</span>
                      <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImpactShowcase;
