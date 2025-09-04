'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Users, 
  TreePine, 
  Globe, 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Target,
  Award,
  Zap,
  Shield,
  Star,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface Cause {
  id: string;
  title: string;
  description: string;
  impact: string;
  image: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  progress: number;
  target: string;
  current: string;
  color: string;
}

interface LiveUpdate {
  id: string;
  type: 'donation' | 'volunteer' | 'impact' | 'achievement';
  message: string;
  location: string;
  timestamp: Date;
  amount?: number;
  icon: React.ReactNode;
}

const CauseShowcase = () => {
  const [activeCause, setActiveCause] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const causes: Cause[] = [
    {
      id: 'education',
      title: 'Education for All',
      description: 'Providing quality education to underprivileged children across India. Every child deserves access to learning opportunities that will shape their future.',
      impact: 'Transform lives through education',
      image: 'https://picsum.photos/600/400?random=200',
      category: 'Education',
      urgency: 'high',
      progress: 75,
      target: '100,000 children',
      current: '75,000 children',
      color: 'blue'
    },
    {
      id: 'environment',
      title: 'Green Earth Initiative',
      description: 'Combatting climate change through tree planting, waste reduction, and sustainable practices. Building a greener future for generations to come.',
      impact: 'Fight climate change together',
      image: 'https://picsum.photos/600/400?random=201',
      category: 'Environment',
      urgency: 'high',
      progress: 60,
      target: '1 million trees',
      current: '600,000 trees',
      color: 'green'
    },
    {
      id: 'animals',
      title: 'Animal Rescue Network',
      description: 'Saving and rehabilitating street animals, providing medical care, and finding loving homes. Every animal deserves compassion and care.',
      impact: 'Save lives, one animal at a time',
      image: 'https://picsum.photos/600/400?random=202',
      category: 'Animal Welfare',
      urgency: 'medium',
      progress: 45,
      target: '50,000 animals',
      current: '22,500 animals',
      color: 'pink'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Access',
      description: 'Bringing essential healthcare services to remote communities. Ensuring everyone has access to medical care regardless of their location.',
      impact: 'Health is a fundamental right',
      image: 'https://picsum.photos/600/400?random=203',
      category: 'Healthcare',
      urgency: 'high',
      progress: 80,
      target: '500,000 people',
      current: '400,000 people',
      color: 'red'
    }
  ];

  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([
    {
      id: 'update-1',
      type: 'donation',
      message: 'Sarah donated ₹500 for education supplies',
      location: 'Mumbai, India',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      amount: 500,
      icon: <Heart className="w-4 h-4 text-pink-600" />
    },
    {
      id: 'update-2',
      type: 'volunteer',
      message: 'Rajesh volunteered for tree planting drive',
      location: 'Delhi, India',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      icon: <TreePine className="w-4 h-4 text-green-600" />
    },
    {
      id: 'update-3',
      type: 'impact',
      message: '50 children received school supplies',
      location: 'Bangalore, India',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      icon: <Users className="w-4 h-4 text-blue-600" />
    },
    {
      id: 'update-4',
      type: 'achievement',
      message: 'Community reached 1M impact points!',
      location: 'Global',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      icon: <Award className="w-4 h-4 text-yellow-600" />
    }
  ]);

  // Auto-rotate causes
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveCause((prev) => (prev + 1) % causes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, causes.length]);

  // Add new live updates
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const types: LiveUpdate['type'][] = ['donation', 'volunteer', 'impact', 'achievement'];
        const messages = [
          'New volunteer joined the community',
          'Impact milestone reached',
          'Donation received for education',
          'Tree planting event completed',
          'Animal rescue successful',
          'Healthcare camp organized'
        ];
        const locations = ['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India', 'Kolkata, India'];

        const newUpdate: LiveUpdate = {
          id: `update-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          timestamp: new Date(),
          amount: Math.floor(Math.random() * 1000) + 100,
          icon: <Zap className="w-4 h-4 text-purple-600" />
        };

        setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🌟 Our Causes</h1>
              <p className="text-gray-600 mt-1">Making a difference, one action at a time</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'} Updates
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🤝 Together, We Can Change the World
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every action you take creates a ripple effect of positive change. Join our community of changemakers 
            and be part of something bigger than yourself. Your impact matters, and together, we can build a better future.
          </p>
        </motion.div>

        {/* Causes Carousel */}
        <div className="mb-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCause}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-96 lg:h-auto">
                    <img
                      src={causes[activeCause].image}
                      alt={causes[activeCause].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(causes[activeCause].urgency)}`}>
                        {causes[activeCause].urgency.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                        {causes[activeCause].category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {causes[activeCause].title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {causes[activeCause].description}
                    </p>
                    
                    {/* Progress Section */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>{causes[activeCause].current}</span>
                        <span>{causes[activeCause].target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full bg-${causes[activeCause].color}-500 transition-all duration-1000`}
                          style={{ width: `${causes[activeCause].progress}%` }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-2xl font-bold text-gray-900">{causes[activeCause].progress}%</span>
                      </div>
                    </div>

                    {/* Impact Statement */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-blue-600" />
                        <span className="font-semibold text-gray-900">{causes[activeCause].impact}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <Heart className="w-5 h-5" />
                        Support This Cause
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {causes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCause(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeCause ? 'bg-blue-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Updates Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Updates Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-xl font-bold text-gray-900">Live Community Updates</h3>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {liveUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {update.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{update.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{update.location}</span>
                        <Clock className="w-3 h-3 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-500">{formatTimeAgo(update.timestamp)}</span>
                      </div>
                    </div>
                    {update.amount && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{update.amount}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Today's Impact</h3>
              <div className="space-y-4">
                {[
                  { label: 'Actions Taken', value: '1,247', icon: <Zap className="w-5 h-5 text-yellow-500" /> },
                  { label: 'Lives Impacted', value: '3,892', icon: <Heart className="w-5 h-5 text-pink-500" /> },
                  { label: 'Trees Planted', value: '156', icon: <TreePine className="w-5 h-5 text-green-500" /> },
                  { label: 'Animals Rescued', value: '23', icon: <Users className="w-5 h-5 text-blue-500" /> }
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {stat.icon}
                      <span className="font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">🎯 Join the Movement</h3>
              <p className="mb-4 opacity-90">
                Be part of something bigger. Every action counts, and together we can create real change.
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                <Sparkles className="w-5 h-5" />
                Start Making Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseShowcase;
