'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  ExternalLink,
  Camera,
  Video,
  Image as ImageIcon,
  Zap,
  Trophy,
  TrendingUp,
  Award
} from 'lucide-react';

interface UserPost {
  id: string;
  title: string;
  description: string;
  category: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  timestamp: Date;
  status: 'draft' | 'posted' | 'in-progress' | 'completed';
  xpEarned: number;
  ngoResponses: number;
  verified: boolean;
  ngoUpdates?: {
    ngoName: string;
    ngoLogo: string;
    message: string;
    timestamp: Date;
    status: 'interested' | 'in-progress' | 'completed';
  }[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  xpMultiplier: number;
}

const UserPosts = () => {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'posted' | 'in-progress' | 'completed'>('all');

  const categories: Category[] = [
    {
      id: 'animal-health',
      name: 'Animal Health',
      icon: <Heart className="w-4 h-4" />,
      color: 'bg-red-100 text-red-600',
      xpMultiplier: 1.5
    },
    {
      id: 'environment',
      name: 'Environment',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-green-100 text-green-600',
      xpMultiplier: 1.2
    },
    {
      id: 'poverty',
      name: 'Poverty Relief',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-600',
      xpMultiplier: 1.3
    },
    {
      id: 'education',
      name: 'Education',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-600',
      xpMultiplier: 1.1
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-orange-100 text-orange-600',
      xpMultiplier: 1.4
    },
    {
      id: 'children',
      name: 'Children',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-pink-100 text-pink-600',
      xpMultiplier: 1.3
    },
    {
      id: 'women',
      name: 'Women Empowerment',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-indigo-100 text-indigo-600',
      xpMultiplier: 1.2
    },
    {
      id: 'elderly',
      name: 'Elderly Care',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-teal-100 text-teal-600',
      xpMultiplier: 1.1
    }
  ];

  // Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In a real app, this would fetch from your API
        const mockPosts: UserPost[] = [
          {
            id: '1',
            title: 'Injured Dog Found',
            description: 'Found an injured stray dog near the park. It seems to have a broken leg and needs immediate medical attention.',
            category: 'animal-health',
            media: {
              type: 'image',
              url: '/api/placeholder/400/300'
            },
            location: {
              latitude: 12.9716,
              longitude: 77.5946,
              address: 'Cubbon Park, Bangalore',
              city: 'Bangalore',
              state: 'Karnataka',
              country: 'India'
            },
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'completed',
            xpEarned: 75,
            ngoResponses: 2,
            verified: true,
            ngoUpdates: [
              {
                ngoName: 'Animal Welfare Society',
                ngoLogo: '/api/placeholder/100/100',
                message: 'Our vet team has reached the location and provided medical care. The dog is now safe and recovering.',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                status: 'completed'
              }
            ]
          },
          {
            id: '2',
            title: 'Tree Planting Needed',
            description: 'This area needs more trees for better air quality. The existing trees are not enough to combat pollution.',
            category: 'environment',
            media: {
              type: 'image',
              url: '/api/placeholder/400/300'
            },
            location: {
              latitude: 12.9352,
              longitude: 77.6245,
              address: 'Lalbagh Botanical Garden, Bangalore',
              city: 'Bangalore',
              state: 'Karnataka',
              country: 'India'
            },
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            status: 'in-progress',
            xpEarned: 60,
            ngoResponses: 1,
            verified: false,
            ngoUpdates: [
              {
                ngoName: 'Green Earth Foundation',
                ngoLogo: '/api/placeholder/100/100',
                message: 'We are planning a tree plantation drive in this area. Will update you soon with the schedule.',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                status: 'in-progress'
              }
            ]
          },
          {
            id: '3',
            title: 'Homeless Family Needs Help',
            description: 'A family with two children is living on the street and needs basic necessities like food and clothing.',
            category: 'poverty',
            media: {
              type: 'image',
              url: '/api/placeholder/400/300'
            },
            location: {
              latitude: 12.9784,
              longitude: 77.6408,
              address: 'MG Road, Bangalore',
              city: 'Bangalore',
              state: 'Karnataka',
              country: 'India'
            },
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            status: 'posted',
            xpEarned: 65,
            ngoResponses: 0,
            verified: false
          }
        ];

        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-yellow-100 text-yellow-600';
      case 'posted': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'posted': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const totalXP = posts.reduce((sum, post) => sum + post.xpEarned, 0);
  const completedPosts = posts.filter(post => post.status === 'completed').length;
  const totalNGOsHelped = posts.reduce((sum, post) => sum + post.ngoResponses, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-[#4CAF50]">{totalXP}</div>
          <div className="text-sm text-gray-600">Total XP</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">{completedPosts}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-purple-600">{totalNGOsHelped}</div>
          <div className="text-sm text-gray-600">NGOs Helped</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm">
        {[
          { id: 'all', name: 'All', count: posts.length },
          { id: 'posted', name: 'Posted', count: posts.filter(p => p.status === 'posted').length },
          { id: 'in-progress', name: 'In Progress', count: posts.filter(p => p.status === 'in-progress').length },
          { id: 'completed', name: 'Completed', count: posts.filter(p => p.status === 'completed').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              filter === tab.id
                ? 'bg-[#4CAF50] text-white shadow-md'
                : 'text-[#2E7D32] hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{tab.name}</span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const categoryInfo = getCategoryInfo(post.category);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${categoryInfo.color}`}>
                    {categoryInfo.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{post.location.address}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{post.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#4CAF50] font-bold">
                    <Zap className="w-4 h-4" />
                    <span>+{post.xpEarned} XP</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-3 text-sm">{post.description}</p>

              {/* Media Preview */}
              <div className="mb-3">
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  {post.media.type === 'image' ? (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Video className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>

              {/* NGO Responses */}
              {post.ngoResponses > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{post.ngoResponses} NGO(s) responded</span>
                  </div>
                  {post.ngoUpdates && post.ngoUpdates.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {post.ngoUpdates.map((update, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <img
                            src={update.ngoLogo}
                            alt={update.ngoName}
                            className="w-6 h-6 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{update.ngoName}</div>
                            <div className="text-gray-600">{update.message}</div>
                            <div className="text-xs text-gray-500">
                              {update.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Updates</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                {post.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts found</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? "You haven't posted any issues yet. Start by capturing a photo or video of something that needs help!"
              : `No posts with status "${filter}" found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
