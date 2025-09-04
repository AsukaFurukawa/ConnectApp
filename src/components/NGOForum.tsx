'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark, 
  Flag, 
  MoreHorizontal,
  Search,
  Filter,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Star,
  ThumbsUp,
  Reply,
  Send,
  Image as ImageIcon,
  Video,
  Link,
  AlertCircle,
  CheckCircle,
  Eye,
  MessageSquare,
  Calendar,
  Tag,
  User,
  Award,
  Zap,
  X
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'ngo' | 'admin';
    verified: boolean;
    xp: number;
  };
  category: string;
  tags: string[];
  location: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isPinned: boolean;
  isResolved: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }[];
  ngoResponses?: {
    ngoId: string;
    ngoName: string;
    ngoLogo: string;
    message: string;
    timestamp: Date;
    status: 'interested' | 'in-progress' | 'completed';
  }[];
}

interface ForumComment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'ngo' | 'admin';
    verified: boolean;
  };
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies?: ForumComment[];
}

const NGOForum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [activePost, setActivePost] = useState<ForumPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Posts', icon: '🌍' },
    { id: 'animal-health', name: 'Animal Health', icon: '🐾' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'poverty', name: 'Poverty Relief', icon: '🤝' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'children', name: 'Children', icon: '👶' },
    { id: 'women', name: 'Women Empowerment', icon: '👩' },
    { id: 'elderly', name: 'Elderly Care', icon: '👴' },
    { id: 'street-children', name: 'Street Children', icon: '🚸' },
    { id: 'manual-scavenging', name: 'Manual Scavenging', icon: '🧹' },
    { id: 'child-labor', name: 'Child Labor', icon: '👷‍♂️' },
    { id: 'dowry-system', name: 'Anti-Dowry', icon: '💍' },
    { id: 'caste-discrimination', name: 'Social Equality', icon: '⚖️' },
    { id: 'rural-development', name: 'Rural Development', icon: '🏘️' },
    { id: 'water-crisis', name: 'Water Crisis', icon: '💧' },
    { id: 'slum-rehabilitation', name: 'Slum Rehabilitation', icon: '🏠' },
    { id: 'menstrual-hygiene', name: 'Menstrual Hygiene', icon: '🩸' },
    { id: 'disaster-relief', name: 'Disaster Relief', icon: '🚨' },
    { id: 'discussion', name: 'General Discussion', icon: '💬' },
    { id: 'success-stories', name: 'Success Stories', icon: '🎉' }
  ];

  // Fetch real data
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true)
        
        // Fetch from scraped data
        const response = await fetch('/api/forum/scraped')
        const data = await response.json()
        
        if (data.success) {
          // Convert timestamp strings to Date objects
          const postsWithDates = data.data.map((post: any) => ({
            ...post,
            timestamp: new Date(post.timestamp)
          }))
          setPosts(postsWithDates)
        } else {
          // Fallback to mock data
          const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Street Children Need Education Support in Dharavi',
        content: 'Found 15 children aged 6-12 years living on the streets near Dharavi station. They want to study but have no access to schools. Looking for NGOs who can help with education and rehabilitation.',
        author: {
          id: 'user1',
          name: 'Priya Sharma',
          avatar: '/api/placeholder/40/40',
          role: 'user',
          verified: true,
          xp: 1250
        },
        category: 'street-children',
        tags: ['urgent', 'education', 'dharavi', 'rehabilitation'],
        location: 'Dharavi, Mumbai',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 34,
        comments: 12,
        shares: 8,
        views: 189,
        isLiked: false,
        isBookmarked: false,
        isPinned: true,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }],
        ngoResponses: [
          {
            ngoId: 'ngo1',
            ngoName: 'CRY - Child Rights and You',
            ngoLogo: '/api/placeholder/100/100',
            message: 'We have a program specifically for street children in Mumbai. Our team will visit tomorrow.',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            status: 'in-progress'
          }
        ]
      },
      {
        id: '2',
        title: 'Manual Scavenging - Help End This Practice',
        content: 'Despite being banned, manual scavenging still exists in many parts of India. We need to create awareness and provide alternative livelihoods. Join our campaign to end this practice.',
        author: {
          id: 'ngo2',
          name: 'Safai Karamchari Andolan',
          avatar: '/api/placeholder/40/40',
          role: 'ngo',
          verified: true,
          xp: 0
        },
        category: 'manual-scavenging',
        tags: ['awareness', 'livelihood', 'campaign', 'social-justice'],
        location: 'Multiple Cities, India',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 67,
        comments: 23,
        shares: 45,
        views: 456,
        isLiked: true,
        isBookmarked: true,
        isPinned: false,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '3',
        title: 'Water Crisis in Rural Maharashtra - Immediate Help Needed',
        content: 'Villages in Beed district are facing severe water shortage. Women are walking 5+ km daily to fetch water. We need water tankers and long-term solutions like borewells.',
        author: {
          id: 'user3',
          name: 'Sunil Patil',
          avatar: '/api/placeholder/40/40',
          role: 'user',
          verified: true,
          xp: 2340
        },
        category: 'water-crisis',
        tags: ['urgent', 'rural', 'water-shortage', 'women-empowerment'],
        location: 'Beed District, Maharashtra',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 89,
        comments: 34,
        shares: 67,
        views: 567,
        isLiked: false,
        isBookmarked: false,
        isPinned: true,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '4',
        title: 'Child Labor in Garment Industry - Rescue Mission',
        content: 'Found 8 children aged 10-14 working in a garment factory in Tirupur. They work 12+ hours daily for ₹50. Need immediate rescue and rehabilitation support.',
        author: {
          id: 'user4',
          name: 'Meera Krishnan',
          avatar: '/api/placeholder/40/40',
          role: 'user',
          verified: true,
          xp: 1780
        },
        category: 'child-labor',
        tags: ['urgent', 'rescue', 'garment-industry', 'tirupur'],
        location: 'Tirupur, Tamil Nadu',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 156,
        comments: 45,
        shares: 89,
        views: 789,
        isLiked: true,
        isBookmarked: true,
        isPinned: true,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '5',
        title: 'Menstrual Hygiene Awareness in Rural Schools',
        content: 'Many girls in rural schools drop out due to lack of menstrual hygiene facilities. We\'re providing sanitary pads and building proper washrooms. Need volunteers for awareness sessions.',
        author: {
          id: 'ngo3',
          name: 'Goonj',
          avatar: '/api/placeholder/40/40',
          role: 'ngo',
          verified: true,
          xp: 0
        },
        category: 'menstrual-hygiene',
        tags: ['women-empowerment', 'education', 'rural', 'volunteers'],
        location: 'Rural Schools, Multiple States',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        likes: 234,
        comments: 67,
        shares: 123,
        views: 1234,
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '6',
        title: 'Success Story: 50 Families Rehabilitated from Slums',
        content: 'Amazing achievement! We successfully rehabilitated 50 families from Dharavi slums to proper housing. Children are now going to school and families have stable income. This is what community support can achieve!',
        author: {
          id: 'ngo4',
          name: 'Mumbai Slum Rehabilitation Authority',
          avatar: '/api/placeholder/40/40',
          role: 'ngo',
          verified: true,
          xp: 0
        },
        category: 'success-stories',
        tags: ['success', 'slum-rehabilitation', 'housing', 'education'],
        location: 'Dharavi, Mumbai',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        likes: 345,
        comments: 89,
        shares: 234,
        views: 2345,
        isLiked: true,
        isBookmarked: false,
        isPinned: false,
        isResolved: true,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '7',
        title: 'Anti-Dowry Campaign - Break the Silence',
        content: 'Dowry is still a major issue in many parts of India. We\'re organizing awareness campaigns and providing legal support to victims. Join us to end this practice.',
        author: {
          id: 'ngo5',
          name: 'Women\'s Rights Foundation',
          avatar: '/api/placeholder/40/40',
          role: 'ngo',
          verified: true,
          xp: 0
        },
        category: 'dowry-system',
        tags: ['awareness', 'legal-support', 'women-rights', 'campaign'],
        location: 'Multiple Cities, India',
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
        likes: 456,
        comments: 123,
        shares: 345,
        views: 3456,
        isLiked: false,
        isBookmarked: true,
        isPinned: false,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      },
      {
        id: '8',
        title: 'Disaster Relief - Flood Victims Need Help',
        content: 'Heavy rains have caused flooding in Assam. Thousands of families are displaced and need immediate relief - food, water, shelter, and medical aid. Every contribution counts.',
        author: {
          id: 'ngo6',
          name: 'Disaster Relief Foundation',
          avatar: '/api/placeholder/40/40',
          role: 'ngo',
          verified: true,
          xp: 0
        },
        category: 'disaster-relief',
        tags: ['urgent', 'flood-relief', 'assam', 'emergency'],
        location: 'Assam, India',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        likes: 567,
        comments: 234,
        shares: 456,
        views: 4567,
        isLiked: true,
        isBookmarked: true,
        isPinned: true,
        isResolved: false,
        media: [{
          type: 'image',
          url: '/api/placeholder/400/300'
        }]
      }
    ];
    setPosts(mockPosts)
  }
      } catch (error) {
        console.error('Error fetching forum data:', error)
        // Fallback to mock data
        const mockPosts: ForumPost[] = [
          {
            id: '1',
            title: 'Street Children Need Education Support in Dharavi',
            content: 'Found 15 children aged 6-12 years living on the streets near Dharavi station. They want to study but have no access to schools. Looking for NGOs who can help with education and rehabilitation.',
            author: {
              id: 'user1',
              name: 'Priya Sharma',
              avatar: '/api/placeholder/40/40',
              role: 'user',
              verified: true,
              xp: 1250
            },
            category: 'street-children',
            tags: ['urgent', 'education', 'dharavi', 'rehabilitation'],
            location: 'Dharavi, Mumbai',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 34,
            comments: 12,
            shares: 8,
            views: 189,
            isLiked: false,
            isBookmarked: false,
            isPinned: true,
            isResolved: false,
            media: [{
              type: 'image',
              url: '/api/placeholder/400/300'
            }],
            ngoResponses: [
              {
                ngoId: 'ngo1',
                ngoName: 'CRY - Child Rights and You',
                ngoLogo: '/api/placeholder/100/100',
                message: 'We have a program specifically for street children in Mumbai. Our team will visit tomorrow.',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                status: 'in-progress'
              }
            ]
          }
        ]
        setPosts(mockPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchRealData()
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setActivePost(post);
      setShowComments(true);
    }
  };

  const submitComment = () => {
    if (!newComment.trim() || !activePost) return;

    const comment: ForumComment = {
      id: Date.now().toString(),
      postId: activePost.id,
      content: newComment,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: '/api/placeholder/40/40',
        role: 'user',
        verified: true
      },
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, comment]);
    setPosts(prev => prev.map(post => 
      post.id === activePost.id 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
    setNewComment('');
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ngo': return 'bg-green-100 text-green-600';
      case 'admin': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#2E7D32] mb-2 font-fun">🇮🇳 India NGO Forum</h1>
        <p className="text-[#66BB6A] text-sm font-clean">Connect, discuss, and make a difference together</p>
        <div className="mt-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-semibold text-gray-800">India-Specific Causes</h3>
          </div>
          <p className="text-sm text-gray-600">
            Addressing unique challenges like manual scavenging, dowry system, caste discrimination, 
            street children, and rural development that are specific to India's social landscape.
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/forum/scraped', { method: 'GET' })
                    const data = await response.json()
                    if (data.success) {
                      alert(`Scraped ${data.count} posts from local sources!`)
                      window.location.reload()
                    }
                  } catch (error) {
                    alert('Error scraping data')
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                🕷️ Scrape Local Data
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/forum/scraped?source=https://data.gov.in', { method: 'GET' })
                    const data = await response.json()
                    if (data.success) {
                      alert(`Scraped ${data.count} government posts!`)
                      window.location.reload()
                    }
                  } catch (error) {
                    alert('Error scraping government data')
                  }
                }}
                className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
              >
                🏛️ Gov Data
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            <div className="text-xs text-gray-500">
              📊 Data Sources: Government APIs, NGO Reports, News Sites, Social Media
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts, discussions, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#4CAF50] text-white shadow-md'
                  : 'bg-white text-[#2E7D32] border border-gray-200 hover:shadow-sm'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {[
            { id: 'recent', name: 'Recent', icon: <Clock className="w-4 h-4" /> },
            { id: 'popular', name: 'Popular', icon: <Heart className="w-4 h-4" /> },
            { id: 'trending', name: 'Trending', icon: <TrendingUp className="w-4 h-4" /> }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                sortBy === option.id
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white text-[#2E7D32] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* India-Specific Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>🚨</span>
          Urgent India Causes - Take Action Now
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🚸', label: 'Street Children', count: '2.5M+', color: 'bg-red-100 text-red-600' },
            { icon: '👷‍♂️', label: 'Child Labor', count: '10M+', color: 'bg-orange-100 text-orange-600' },
            { icon: '🧹', label: 'Manual Scavenging', count: '1.2M+', color: 'bg-purple-100 text-purple-600' },
            { icon: '💧', label: 'Water Crisis', count: '600M+', color: 'bg-blue-100 text-blue-600' }
          ].map((cause) => (
            <div key={cause.label} className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-2 ${cause.color}`}>
                {cause.icon}
              </div>
              <div className="text-sm font-medium text-gray-800">{cause.label}</div>
              <div className="text-xs text-gray-600">{cause.count} affected</div>
            </div>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => {
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
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                      {post.author.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author.role)}`}>
                        {post.author.role.toUpperCase()}
                      </span>
                      {post.isPinned && <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">PINNED</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{categoryInfo.icon}</span>
                      <span>{categoryInfo.name}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{post.location}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isResolved && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Resolved</span>
                    </div>
                  )}
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h4 className="font-bold text-lg mb-2">{post.title}</h4>
              <p className="text-gray-600 mb-3">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Media */}
              {post.media && post.media.length > 0 && (
                <div className="mb-3">
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    {post.media[0].type === 'image' ? (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    ) : (
                      <Video className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                </div>
              )}

              {/* NGO Responses */}
              {post.ngoResponses && post.ngoResponses.length > 0 && (
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">NGO Responses ({post.ngoResponses.length})</span>
                  </div>
                  {post.ngoResponses.map((response, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <img
                        src={response.ngoLogo}
                        alt={response.ngoName}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{response.ngoName}</div>
                        <div className="text-gray-600">{response.message}</div>
                        <div className="text-xs text-gray-500">
                          {response.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleComment(post.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{post.views}</span>
                  </button>
                </div>
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`transition-colors ${
                    post.isBookmarked ? 'text-[#4CAF50]' : 'text-gray-500 hover:text-[#4CAF50]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && activePost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-t-2xl w-full max-w-md max-h-[80vh] flex flex-col"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Comments</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.filter(c => c.postId === activePost.id).map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        {comment.author.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                        <span className="text-xs text-gray-500">
                          {comment.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                  <button
                    onClick={submitComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#2E7D32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NGOForum;
