'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Star, 
  Leaf, 
  Heart, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Search,
  Filter,
  SortAsc,
  Award,
  Zap,
  Users,
  Globe,
  Recycle,
  Sun,
  Droplets,
  TreePine,
  Package,
  CreditCard,
  Wallet,
  Coins,
  TrendingUp,
  Eye,
  Bookmark,
  Share2,
  MessageCircle,
  Calendar,
  Tag,
  Shield,
  Crown,
  Sparkles
} from 'lucide-react';

interface ImpactReward {
  id: string;
  title: string;
  description: string;
  impactDescription: string; // How this reward creates social impact
  brand: {
    name: string;
    logo: string;
    description: string;
    verified: boolean;
    sustainabilityRating: number;
    category: 'fashion' | 'food' | 'beauty' | 'home' | 'tech' | 'travel' | 'ngo' | 'social-enterprise';
    socialMission: string; // Brand's social mission
    impactPartner: boolean; // Is this brand an impact partner?
    beneficiaryNGO?: string; // Which NGO benefits from this purchase
  };
  category: 'education' | 'healthcare' | 'environment' | 'social-justice' | 'rural-development' | 'women-empowerment' | 'child-welfare' | 'disaster-relief' | 'sustainability';
  xpCost: number;
  originalPrice: number;
  discountPercentage: number;
  finalPrice: number;
  currency: string;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
  stockCount: number;
  images: string[];
  features: string[];
  sustainability: {
    ecoFriendly: boolean;
    carbonNeutral: boolean;
    organic: boolean;
    recycled: boolean;
    fairTrade: boolean;
    localSourced: boolean;
  };
  delivery: {
    freeShipping: boolean;
    estimatedDays: number;
    availableRegions: string[];
  };
  rating: number;
  reviews: number;
  tags: string[];
  expiryDate?: Date;
  isFeatured: boolean;
  isLimited: boolean;
  impact: {
    livesImpacted: number;
    childrenHelped: number;
    familiesSupported: number;
    communitiesReached: number;
    treesPlanted: number;
    co2Saved: number;
    plasticRecycled: number;
    waterSaved: number;
    mealsProvided: number;
    educationHours: number;
    healthcareAccess: number;
  };
  causeAlignment: {
    primaryCause: string;
    secondaryCauses: string[];
    impactStory: string; // Real story of impact
    beneficiary: string; // Who benefits from this purchase
    location: string; // Where the impact happens
  };
  gamification: {
    xpMultiplier: number; // Extra XP for impact purchases
    impactPoints: number; // Special impact points
    unlockRequirement: string; // What unlocks this reward
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    impactBadge?: string; // Special badge for this impact
  };
}

// Keep the old Reward interface for backward compatibility
interface Reward extends ImpactReward {}

interface UserReward {
  id: string;
  rewardId: string;
  reward: Reward;
  redeemedAt: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  deliveryAddress: string;
  xpSpent: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'sustainability' | 'social' | 'achievement' | 'special';
  xpReward: number;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  color: string;
  gradient: string;
}

interface UserProfile {
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: Badge[];
  totalImpact: {
    livesImpacted: number;
    childrenHelped: number;
    familiesSupported: number;
    communitiesReached: number;
    treesPlanted: number;
    co2Saved: number;
    plasticRecycled: number;
    waterSaved: number;
    mealsProvided: number;
    educationHours: number;
    healthcareAccess: number;
  };
  streak: number;
  achievements: string[];
  rank: number;
  totalUsers: number;
  dailyGoal: number;
  dailyProgress: number;
  nextReward: string;
  lastActive: Date;
  referralCode: string;
  referralCount: number;
  totalSpent: number;
  vipStatus: boolean;
  nextVipMilestone: number;
  impactPoints: number; // New: Special points for social impact
  causeAlignment: {
    primaryCause: string;
    secondaryCauses: string[];
    impactScore: number;
    socialImpactLevel: 'beginner' | 'advocate' | 'champion' | 'hero';
  };
  socialImpact: {
    postsCreated: number;
    ngosSupported: number;
    campaignsJoined: number;
    volunteersRecruited: number;
    donationsMade: number;
    awarenessRaised: number;
  };
}

interface LimitedOffer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  timeLeft: number; // in seconds
  stockLeft: number;
  maxStock: number;
  xpCost: number;
  isFlashSale: boolean;
  isExclusive: boolean;
  brand: string;
  image: string;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  expiresAt: Date;
  icon: string;
  category: string;
}

interface ImpactChallenge {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  xpReward: number;
  impactPoints: number;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  expiresAt: Date;
  impact: {
    livesImpacted: number;
    childrenHelped: number;
    familiesSupported: number;
  };
  causeAlignment: {
    primaryCause: string;
    beneficiary: string;
    location: string;
  };
  requirements: string[];
  rewards: string[];
  badge?: string;
}

interface ImpactStory {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  location: string;
  impact: {
    livesImpacted: number;
    childrenHelped: number;
    familiesSupported: number;
  };
  beneficiary: string;
  ngo: string;
  timestamp: Date;
  verified: boolean;
  likes: number;
  shares: number;
  comments: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  rank: number;
  badges: number;
  streak: number;
  totalImpact: {
    treesPlanted: number;
    co2Saved: number;
    plasticRecycled: number;
    waterSaved: number;
  };
  isCurrentUser: boolean;
  isOnline: boolean;
  lastActive: Date;
  achievements: string[];
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

const SustainableRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'impact-deals' | 'challenges' | 'my-rewards' | 'badges' | 'profile' | 'impact-stories' | 'sustainability'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'xp-cost' | 'rating' | 'newest' | 'popular'>('xp-cost');
  const [userXP, setUserXP] = useState(2847);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [limitedOffers, setLimitedOffers] = useState<LimitedOffer[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{[key: string]: number}>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'friends' | 'local'>('all');
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);

  const categories = [
    { id: 'all', name: 'All Impact Rewards', icon: '🎁' },
    { id: 'child-welfare', name: 'Child Welfare', icon: '👶' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'social-justice', name: 'Social Justice', icon: '⚖️' },
    { id: 'rural-development', name: 'Rural Development', icon: '🏘️' },
    { id: 'women-empowerment', name: 'Women Empowerment', icon: '👩' },
    { id: 'disaster-relief', name: 'Disaster Relief', icon: '🚨' },
    { id: 'sustainability', name: 'Sustainability', icon: '♻️' }
  ];

  // Mock data
  useEffect(() => {
    const mockRewards: Reward[] = [
      {
        id: '1',
        title: 'Education Kit for Street Children',
        description: 'Complete education kit including books, stationery, and learning materials for street children in Mumbai.',
        impactDescription: 'Your purchase provides education materials for 2 street children for 3 months, helping them access quality education and break the cycle of poverty.',
        brand: {
          name: 'CRY - Child Rights and You',
          logo: '/api/placeholder/100/100',
          description: 'Leading NGO working for child rights and education across India',
          verified: true,
          sustainabilityRating: 4.9,
          category: 'ngo',
          socialMission: 'Ensuring every child has access to quality education and a safe childhood',
          impactPartner: true,
          beneficiaryNGO: 'CRY'
        },
        category: 'child-welfare',
        xpCost: 800,
        originalPrice: 2500,
        discountPercentage: 20,
        finalPrice: 2000,
        currency: 'INR',
        availability: 'in-stock',
        stockCount: 25,
        images: ['/api/placeholder/400/400'],
        features: ['Complete Education Kit', '3 Months Supply', 'Age-Appropriate Materials', 'Local Language Support'],
        sustainability: {
          ecoFriendly: true,
          carbonNeutral: true,
          organic: false,
          recycled: true,
          fairTrade: true,
          localSourced: true
        },
        delivery: {
          freeShipping: true,
          estimatedDays: 3,
          availableRegions: ['India']
        },
        rating: 4.9,
        reviews: 156,
        tags: ['education', 'children', 'street-children', 'ngo'],
        isFeatured: true,
        isLimited: false,
        impact: {
          livesImpacted: 2,
          childrenHelped: 2,
          familiesSupported: 2,
          communitiesReached: 1,
          treesPlanted: 0,
          co2Saved: 0,
          plasticRecycled: 0,
          waterSaved: 0,
          mealsProvided: 0,
          educationHours: 180,
          healthcareAccess: 0
        },
        causeAlignment: {
          primaryCause: 'Child Education',
          secondaryCauses: ['Street Children', 'Poverty Alleviation', 'Social Justice'],
          impactStory: 'Meet Priya, 8, who lives on the streets of Mumbai. With this education kit, she can now attend informal classes and dream of becoming a teacher.',
          beneficiary: 'Street Children in Mumbai',
          location: 'Dharavi, Mumbai'
        },
        gamification: {
          xpMultiplier: 2.0,
          impactPoints: 100,
          unlockRequirement: 'Complete 5 child welfare posts',
          rarity: 'epic',
          impactBadge: 'Education Champion'
        }
      },
      {
        id: '2',
        title: 'Water Purification System for Rural Families',
        description: 'Portable water purification system that provides clean drinking water to rural families in water-scarce regions.',
        impactDescription: 'Your purchase provides clean drinking water to 5 rural families for 6 months, preventing waterborne diseases and improving health outcomes.',
        brand: {
          name: 'Goonj',
          logo: '/api/placeholder/100/100',
          description: 'Rural development and disaster relief organization',
          verified: true,
          sustainabilityRating: 4.8,
          category: 'ngo',
          socialMission: 'Transforming rural India through sustainable development and disaster relief',
          impactPartner: true,
          beneficiaryNGO: 'Goonj'
        },
        category: 'rural-development',
        xpCost: 1200,
        originalPrice: 5000,
        discountPercentage: 30,
        finalPrice: 3500,
        currency: 'INR',
        availability: 'in-stock',
        stockCount: 15,
        images: ['/api/placeholder/400/400'],
        features: ['Portable Design', '6 Months Supply', 'Easy Maintenance', 'Local Language Manual'],
        sustainability: {
          ecoFriendly: true,
          carbonNeutral: true,
          organic: false,
          recycled: true,
          fairTrade: true,
          localSourced: true
        },
        delivery: {
          freeShipping: true,
          estimatedDays: 5,
          availableRegions: ['India']
        },
        rating: 4.8,
        reviews: 89,
        tags: ['water-crisis', 'rural-development', 'healthcare', 'ngo'],
        isFeatured: true,
        isLimited: true,
        impact: {
          livesImpacted: 25,
          childrenHelped: 15,
          familiesSupported: 5,
          communitiesReached: 2,
          treesPlanted: 0,
          co2Saved: 0,
          plasticRecycled: 0,
          waterSaved: 1800,
          mealsProvided: 0,
          educationHours: 0,
          healthcareAccess: 25
        },
        causeAlignment: {
          primaryCause: 'Water Crisis',
          secondaryCauses: ['Rural Development', 'Healthcare', 'Women Empowerment'],
          impactStory: 'Meet Sunita from Beed district, Maharashtra. She used to walk 10km daily for water. Now she has clean water at home and can focus on her children\'s education.',
          beneficiary: 'Rural Families in Water-Scarce Regions',
          location: 'Beed District, Maharashtra'
        },
        gamification: {
          xpMultiplier: 2.5,
          impactPoints: 150,
          unlockRequirement: 'Complete 3 water crisis posts',
          rarity: 'legendary',
          impactBadge: 'Water Warrior'
        }
      },
      {
        id: '3',
        title: 'Menstrual Hygiene Kit for Rural Girls',
        description: 'Complete menstrual hygiene kit including sanitary pads, education materials, and washroom facilities for rural school girls.',
        impactDescription: 'Your purchase provides menstrual hygiene support to 10 rural school girls for 6 months, helping them stay in school and break taboos.',
        brand: {
          name: 'Women\'s Rights Foundation',
          logo: '/api/placeholder/100/100',
          description: 'NGO working for women empowerment and menstrual hygiene awareness',
          verified: true,
          sustainabilityRating: 4.9,
          category: 'ngo',
          socialMission: 'Empowering women and girls through education, health, and rights awareness',
          impactPartner: true,
          beneficiaryNGO: 'Women\'s Rights Foundation'
        },
        category: 'women-empowerment',
        xpCost: 1000,
        originalPrice: 4000,
        discountPercentage: 25,
        finalPrice: 3000,
        currency: 'INR',
        availability: 'in-stock',
        stockCount: 15,
        images: ['/api/placeholder/400/400'],
        features: ['100% Organic', 'Cruelty-Free', 'Vegan', 'Recyclable Packaging'],
        sustainability: {
          ecoFriendly: true,
          carbonNeutral: false,
          organic: true,
          recycled: true,
          fairTrade: true,
          localSourced: true
        },
        delivery: {
          freeShipping: true,
          estimatedDays: 4,
          availableRegions: ['India']
        },
        rating: 4.8,
        reviews: 234,
        tags: ['menstrual-hygiene', 'women-empowerment', 'rural-development', 'education'],
        isFeatured: true,
        isLimited: false,
        impact: {
          livesImpacted: 50,
          childrenHelped: 50,
          familiesSupported: 25,
          communitiesReached: 3,
          treesPlanted: 0,
          co2Saved: 0,
          plasticRecycled: 0,
          waterSaved: 0,
          mealsProvided: 0,
          educationHours: 300,
          healthcareAccess: 50
        },
        causeAlignment: {
          primaryCause: 'Women Empowerment',
          secondaryCauses: ['Menstrual Hygiene', 'Education', 'Rural Development'],
          impactStory: 'Meet Radha, 14, from rural Rajasthan. She used to miss school during her periods. Now with proper hygiene facilities, she attends school regularly and dreams of becoming a doctor.',
          beneficiary: 'Rural School Girls',
          location: 'Rajasthan, India'
        },
        gamification: {
          xpMultiplier: 2.2,
          impactPoints: 120,
          unlockRequirement: 'Complete 2 women empowerment posts',
          rarity: 'epic',
          impactBadge: 'Women\'s Champion'
        }
      },
      {
        id: '4',
        title: 'Solar Power Bank',
        description: 'Portable solar power bank that charges using sunlight. Perfect for outdoor adventures and reducing carbon footprint.',
        brand: {
          name: 'SunPower',
          logo: '/api/placeholder/100/100',
          description: 'Renewable energy solutions for everyday life',
          verified: true,
          sustainabilityRating: 4.7,
          category: 'tech',
          socialMission: 'Making renewable energy accessible to everyone',
          impactPartner: false
        },
        category: 'sustainability',
        xpCost: 1200,
        originalPrice: 4500,
        discountPercentage: 30,
        finalPrice: 3150,
        currency: 'INR',
        availability: 'limited',
        stockCount: 8,
        images: ['/api/placeholder/400/400'],
        features: ['Solar Charging', 'Waterproof', 'LED Flashlight', 'Fast Charging'],
        sustainability: {
          ecoFriendly: true,
          carbonNeutral: true,
          organic: false,
          recycled: true,
          fairTrade: false,
          localSourced: false
        },
        delivery: {
          freeShipping: true,
          estimatedDays: 5,
          availableRegions: ['India']
        },
        rating: 4.6,
        reviews: 67,
        tags: ['solar', 'power-bank', 'renewable', 'outdoor'],
        isFeatured: false,
        isLimited: true,
        impactDescription: 'Your purchase supports renewable energy adoption and reduces carbon footprint by providing clean solar power solutions.',
        impact: {
          livesImpacted: 1,
          childrenHelped: 0,
          familiesSupported: 1,
          communitiesReached: 0,
          treesPlanted: 0,
          co2Saved: 50,
          plasticRecycled: 0,
          waterSaved: 0,
          mealsProvided: 0,
          educationHours: 0,
          healthcareAccess: 0
        },
        causeAlignment: {
          primaryCause: 'Environment',
          secondaryCauses: ['Renewable Energy', 'Carbon Reduction'],
          impactStory: 'This solar power bank helps reduce dependence on fossil fuels and promotes clean energy adoption in daily life.',
          beneficiary: 'Environment and Users',
          location: 'India'
        },
        gamification: {
          xpMultiplier: 1.5,
          impactPoints: 50,
          unlockRequirement: 'Complete 1 environmental post',
          rarity: 'common'
        }
      }
    ];

    const mockUserRewards: UserReward[] = [
      {
        id: 'ur1',
        rewardId: '1',
        reward: mockRewards[0],
        redeemedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'delivered',
        trackingNumber: 'TRK123456789',
        deliveryAddress: '123 Main St, Bangalore, Karnataka',
        xpSpent: 500
      },
      {
        id: 'ur2',
        rewardId: '2',
        reward: mockRewards[1],
        redeemedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'shipped',
        trackingNumber: 'TRK987654321',
        deliveryAddress: '123 Main St, Bangalore, Karnataka',
        xpSpent: 300
      }
    ];

    // Mock badge data
    const mockBadges: Badge[] = [
      {
        id: 'eco-warrior',
        name: 'Eco Warrior',
        description: 'Complete 10 sustainable actions',
        icon: '🌱',
        emoji: '🌱',
        rarity: 'common',
        category: 'sustainability',
        xpReward: 100,
        unlockedAt: new Date(),
        color: 'green',
        gradient: 'from-green-400 to-green-600'
      },
      {
        id: 'tree-hugger',
        name: 'Tree Hugger',
        description: 'Plant 5 trees through the app',
        icon: '🌳',
        emoji: '🌳',
        rarity: 'rare',
        category: 'sustainability',
        xpReward: 250,
        unlockedAt: new Date(),
        color: 'emerald',
        gradient: 'from-emerald-400 to-emerald-600'
      },
      {
        id: 'plastic-free',
        name: 'Plastic Free Champion',
        description: 'Avoid plastic for 30 days',
        icon: '♻️',
        emoji: '♻️',
        rarity: 'epic',
        category: 'sustainability',
        xpReward: 500,
        progress: 15,
        maxProgress: 30,
        color: 'blue',
        gradient: 'from-blue-400 to-blue-600'
      },
      {
        id: 'social-butterfly',
        name: 'Social Butterfly',
        description: 'Share 20 posts about sustainability',
        icon: '🦋',
        emoji: '🦋',
        rarity: 'rare',
        category: 'social',
        xpReward: 300,
        progress: 8,
        maxProgress: 20,
        color: 'purple',
        gradient: 'from-purple-400 to-purple-600'
      },
      {
        id: 'local-hero',
        name: 'Local Hero',
        description: 'Support 10 local sustainable brands',
        icon: '🏆',
        emoji: '🏆',
        rarity: 'legendary',
        category: 'achievement',
        xpReward: 1000,
        color: 'yellow',
        gradient: 'from-yellow-400 to-yellow-600'
      }
    ];

    // Mock impact-driven offers
    const mockLimitedOffers: LimitedOffer[] = [
      {
        id: 'impact-1',
        title: '🌱 Partner with Local Farmers',
        description: 'Support sustainable agriculture! This organic cotton t-shirt directly benefits 5 farming families in rural Karnataka.',
        originalPrice: 2500,
        discountPrice: 2000,
        discountPercentage: 20,
        timeLeft: 86400, // 24 hours
        stockLeft: 8,
        maxStock: 15,
        xpCost: 600,
        isFlashSale: false,
        isExclusive: false,
        brand: 'FarmConnect',
        image: 'https://picsum.photos/300/200?random=impact1'
      },
      {
        id: 'impact-2',
        title: '🤝 Women Empowerment Collection',
        description: 'Handcrafted by women artisans! Each purchase supports skill development programs for 10 underprivileged women.',
        originalPrice: 1800,
        discountPrice: 1500,
        discountPercentage: 17,
        timeLeft: 172800, // 48 hours
        stockLeft: 5,
        maxStock: 12,
        xpCost: 400,
        isFlashSale: false,
        isExclusive: false,
        brand: 'WomenRise',
        image: 'https://picsum.photos/300/200?random=impact2'
      },
      {
        id: 'impact-3',
        title: '🌿 Ocean Cleanup Initiative',
        description: 'Made from recycled ocean plastic! This eco-bag removes 1kg of plastic waste from our oceans with every purchase.',
        originalPrice: 800,
        discountPrice: 600,
        discountPercentage: 25,
        timeLeft: 259200, // 72 hours
        stockLeft: 12,
        maxStock: 20,
        xpCost: 300,
        isFlashSale: false,
        isExclusive: false,
        brand: 'OceanGuard',
        image: 'https://picsum.photos/300/200?random=impact3'
      }
    ];

    // Mock daily challenges
    const mockDailyChallenges: DailyChallenge[] = [
      {
        id: 'daily-1',
        title: '🌱 Support Local Farmers',
        description: 'Help a farming family by purchasing their organic produce',
        xpReward: 150,
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        icon: '🌾',
        category: 'community'
      },
      {
        id: 'daily-2',
        title: '🤝 Share Your Impact Story',
        description: 'Inspire others by sharing how you\'re making a difference',
        xpReward: 100,
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        icon: '📢',
        category: 'awareness'
      },
      {
        id: 'daily-3',
        title: '🌿 Choose Sustainable Living',
        description: 'Make an eco-friendly choice that benefits the environment',
        xpReward: 200,
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        icon: '♻️',
        category: 'sustainability'
      }
    ];

    // Mock user profile with addictive elements
    const mockUserProfile: UserProfile = {
      level: 15,
      xp: 2847,
      xpToNextLevel: 153,
      badges: mockBadges.filter(badge => badge.unlockedAt),
      totalImpact: {
        livesImpacted: 25,
        childrenHelped: 15,
        familiesSupported: 8,
        communitiesReached: 3,
        treesPlanted: 12,
        co2Saved: 45.6,
        plasticRecycled: 89,
        waterSaved: 234.5,
        mealsProvided: 50,
        educationHours: 200,
        healthcareAccess: 12
      },
      streak: 7,
      achievements: ['First Redeem', 'Eco Warrior', 'Tree Hugger'],
      rank: 1247,
      totalUsers: 50000,
      dailyGoal: 500,
      dailyProgress: 320,
      nextReward: 'Free shipping on next order',
      lastActive: new Date(),
      referralCode: 'ECO2025',
      referralCount: 3,
      totalSpent: 12500,
      vipStatus: false,
      nextVipMilestone: 20000,
      impactPoints: 1250,
      causeAlignment: {
        primaryCause: 'Child Welfare',
        secondaryCauses: ['Education', 'Environment'],
        impactScore: 85,
        socialImpactLevel: 'champion'
      },
      socialImpact: {
        postsCreated: 12,
        ngosSupported: 5,
        campaignsJoined: 8,
        volunteersRecruited: 3,
        donationsMade: 7,
        awarenessRaised: 150
      }
    };

    setRewards(mockRewards);
    setUserRewards(mockUserRewards);
    setBadges(mockBadges);
    setUserProfile(mockUserProfile);
    setLimitedOffers(mockLimitedOffers);
    setDailyChallenges(mockDailyChallenges);
    
    // Mock leaderboard data
    const mockLeaderboard: LeaderboardUser[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: '👩‍💼',
        xp: 15420,
        level: 28,
        rank: 1,
        badges: 15,
        streak: 45,
        totalImpact: {
          treesPlanted: 25,
          co2Saved: 120.5,
          plasticRecycled: 180,
          waterSaved: 450.2
        },
        isCurrentUser: false,
        isOnline: true,
        lastActive: new Date(),
        achievements: ['Eco Warrior', 'Tree Hugger', 'Plastic Free Champion', 'Social Butterfly'],
        tier: 'diamond'
      },
      {
        id: '2',
        name: 'Rajesh Kumar',
        avatar: '👨‍🌾',
        xp: 12850,
        level: 24,
        rank: 2,
        badges: 12,
        streak: 32,
        totalImpact: {
          treesPlanted: 18,
          co2Saved: 95.3,
          plasticRecycled: 145,
          waterSaved: 380.7
        },
        isCurrentUser: false,
        isOnline: true,
        lastActive: new Date(),
        achievements: ['Eco Warrior', 'Tree Hugger', 'Local Hero'],
        tier: 'platinum'
      },
      {
        id: '3',
        name: 'Maria Garcia',
        avatar: '👩‍🎨',
        xp: 11200,
        level: 22,
        rank: 3,
        badges: 10,
        streak: 28,
        totalImpact: {
          treesPlanted: 15,
          co2Saved: 78.9,
          plasticRecycled: 120,
          waterSaved: 320.1
        },
        isCurrentUser: false,
        isOnline: false,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        achievements: ['Eco Warrior', 'Social Butterfly'],
        tier: 'gold'
      },
      {
        id: '4',
        name: 'You',
        avatar: '👤',
        xp: 2847,
        level: 15,
        rank: 4,
        badges: 2,
        streak: 7,
        totalImpact: {
          treesPlanted: 12,
          co2Saved: 45.6,
          plasticRecycled: 89,
          waterSaved: 234.5
        },
        isCurrentUser: true,
        isOnline: true,
        lastActive: new Date(),
        achievements: ['Eco Warrior', 'Tree Hugger'],
        tier: 'silver'
      },
      {
        id: '5',
        name: 'David Chen',
        avatar: '👨‍💻',
        xp: 2650,
        level: 14,
        rank: 5,
        badges: 1,
        streak: 5,
        totalImpact: {
          treesPlanted: 8,
          co2Saved: 32.1,
          plasticRecycled: 65,
          waterSaved: 180.3
        },
        isCurrentUser: false,
        isOnline: true,
        lastActive: new Date(),
        achievements: ['Eco Warrior'],
        tier: 'bronze'
      }
    ];
    
    setLeaderboard(mockLeaderboard);
    
    // Initialize timer for limited offers
    const initialTimeLeft: {[key: string]: number} = {};
    mockLimitedOffers.forEach(offer => {
      initialTimeLeft[offer.id] = offer.timeLeft;
    });
    setTimeLeft(initialTimeLeft);

    // Mock impact stories data
    const mockImpactStories: ImpactStory[] = [
      {
        id: 'story-1',
        title: 'From Street to School: Priya\'s Journey',
        content: 'Priya, 8, lived on the streets of Mumbai until she received an education kit through our platform. Today, she\'s the top student in her class and dreams of becoming a teacher.',
        image: 'https://picsum.photos/400/300?random=story1',
        category: 'child-welfare',
        location: 'Dharavi, Mumbai',
        impact: {
          livesImpacted: 1,
          childrenHelped: 1,
          familiesSupported: 1
        },
        beneficiary: 'Priya, 8 years old',
        ngo: 'CRY - Child Rights and You',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        verified: true,
        likes: 234,
        shares: 45,
        comments: 23
      },
      {
        id: 'story-2',
        title: 'Clean Water Changes Everything',
        content: 'Sunita from Beed district used to walk 10km daily for water. With the water purification system, she now has clean water at home and can focus on her children\'s education.',
        image: 'https://picsum.photos/400/300?random=story2',
        category: 'rural-development',
        location: 'Beed District, Maharashtra',
        impact: {
          livesImpacted: 25,
          childrenHelped: 15,
          familiesSupported: 5
        },
        beneficiary: 'Sunita and 5 rural families',
        ngo: 'Goonj',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        verified: true,
        likes: 189,
        shares: 67,
        comments: 34
      },
      {
        id: 'story-3',
        title: 'Breaking Menstrual Taboos',
        content: 'Rural school girls in Rajasthan now have access to menstrual hygiene facilities. School attendance has increased by 40% and girls are no longer dropping out.',
        image: 'https://picsum.photos/400/300?random=story3',
        category: 'women-empowerment',
        location: 'Rajasthan',
        impact: {
          livesImpacted: 50,
          childrenHelped: 50,
          familiesSupported: 25
        },
        beneficiary: '50 rural school girls',
        ngo: 'Women\'s Rights Foundation',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        verified: true,
        likes: 156,
        shares: 89,
        comments: 45
      }
    ];

    setImpactStories(mockImpactStories);
    setLoading(false);
  }, []);

  // Timer effect for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTimeLeft = {...prev};
        Object.keys(newTimeLeft).forEach(key => {
          if (newTimeLeft[key] > 0) {
            newTimeLeft[key] -= 1;
          }
        });
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredRewards = rewards.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedRewards = [...filteredRewards].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.xpCost - a.xpCost; // Assuming higher XP cost = newer
      case 'popular':
        return b.reviews - a.reviews;
      default:
        return a.xpCost - b.xpCost;
    }
  });

  const handleRedeem = (reward: Reward) => {
    if (userXP >= reward.xpCost) {
      setSelectedReward(reward);
      setShowModal(true);
    } else {
      alert('Insufficient XP! You need more Impact XP to redeem this reward.');
    }
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;

    const newUserReward: UserReward = {
      id: Date.now().toString(),
      rewardId: selectedReward.id,
      reward: selectedReward,
      redeemedAt: new Date(),
      status: 'pending',
      deliveryAddress: '123 Main St, Bangalore, Karnataka', // In real app, get from user profile
      xpSpent: selectedReward.xpCost
    };

    setUserRewards(prev => [...prev, newUserReward]);
    setUserXP(prev => prev - selectedReward.xpCost);
    setShowModal(false);
    setSelectedReward(null);
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completeChallenge = (challengeId: string) => {
    setDailyChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, progress: challenge.maxProgress, isCompleted: true }
        : challenge
    ));
    setUserXP(prev => prev + 150); // Add XP reward
    setShowStreakModal(true);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'from-purple-400 to-pink-400';
      case 'platinum': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-200 to-gray-400';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return '💎';
      case 'platinum': return '🏆';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '🏅';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'bg-green-100 text-green-600';
      case 'limited': return 'bg-yellow-100 text-yellow-600';
      case 'out-of-stock': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'confirmed': return 'bg-yellow-100 text-yellow-600';
      case 'pending': return 'bg-gray-100 text-gray-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
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
        <h1 className="text-2xl font-bold text-[#2E7D32] mb-2 font-fun">🎁 Sustainable Rewards</h1>
        <p className="text-[#66BB6A] text-sm font-clean">Redeem your Impact XP for eco-friendly products</p>
      </div>

      {/* XP Balance */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Your Impact XP</h3>
            <p className="text-sm opacity-90">Available for redemption</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userXP.toLocaleString()}</div>
            <div className="text-sm opacity-90">XP</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm overflow-x-auto">
        {[
          { id: 'browse', name: 'Browse Rewards', icon: '🛍️' },
          { id: 'impact-deals', name: 'Impact Deals', icon: '🤝' },
          { id: 'challenges', name: 'Daily Challenges', icon: '🎯' },
          { id: 'my-rewards', name: 'My Rewards', icon: '📦' },
          { id: 'badges', name: 'Badges', icon: '🏆' },
          { id: 'profile', name: 'Profile', icon: '👤' },
          { id: 'impact-stories', name: 'Impact Stories', icon: '📖' },
          { id: 'sustainability', name: 'Impact', icon: '🌱' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-[#4CAF50] text-white shadow-md'
                : 'text-[#2E7D32] hover:bg-gray-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Browse Rewards Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rewards, brands, or categories..."
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
                { id: 'xp-cost', name: 'XP Cost', icon: <Zap className="w-4 h-4" /> },
                { id: 'rating', name: 'Rating', icon: <Star className="w-4 h-4" /> },
                { id: 'newest', name: 'Newest', icon: <Clock className="w-4 h-4" /> },
                { id: 'popular', name: 'Popular', icon: <TrendingUp className="w-4 h-4" /> }
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

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={reward.brand.logo}
                      alt={reward.brand.name}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{reward.brand.name}</h3>
                      <div className="flex items-center gap-2">
                        {reward.brand.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{reward.brand.sustainabilityRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {reward.isFeatured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium mb-1 block">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(reward.availability)}`}>
                      {reward.availability}
                    </span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>

                {/* Product Info */}
                <h4 className="font-bold text-lg mb-2">{reward.title}</h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{reward.description}</p>
                
                {/* Impact Description */}
                {reward.impactDescription && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-sm">🌟</div>
                      <p className="text-green-800 text-xs leading-relaxed">{reward.impactDescription}</p>
                    </div>
                  </div>
                )}

                {/* Impact Metrics */}
                {reward.impact && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-blue-600 text-sm">📊</div>
                      <span className="text-blue-800 text-xs font-semibold">Impact Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {reward.impact.livesImpacted > 0 && (
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{reward.impact.livesImpacted}</div>
                          <div className="text-blue-700">Lives Impacted</div>
                        </div>
                      )}
                      {reward.impact.childrenHelped > 0 && (
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{reward.impact.childrenHelped}</div>
                          <div className="text-blue-700">Children Helped</div>
                        </div>
                      )}
                      {reward.impact.familiesSupported > 0 && (
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{reward.impact.familiesSupported}</div>
                          <div className="text-blue-700">Families Supported</div>
                        </div>
                      )}
                      {reward.impact.educationHours > 0 && (
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{reward.impact.educationHours}</div>
                          <div className="text-blue-700">Education Hours</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Brand Info */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">🏢</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{reward.brand.name}</div>
                    {reward.brand.impactPartner && (
                      <div className="text-xs text-green-600 font-medium">🤝 Impact Partner</div>
                    )}
                  </div>
                </div>

                {/* Sustainability Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {reward.sustainability.ecoFriendly && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">🌱 Eco</span>
                  )}
                  {reward.sustainability.organic && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">🌿 Organic</span>
                  )}
                  {reward.sustainability.recycled && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">♻️ Recycled</span>
                  )}
                  {reward.sustainability.fairTrade && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">🤝 Fair Trade</span>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#4CAF50]">{reward.xpCost} XP</span>
                      <span className="text-sm text-gray-500">+ ₹{reward.finalPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">₹{reward.originalPrice}</span>
                      <span className="text-sm text-green-600 font-medium">{reward.discountPercentage}% off</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{reward.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">{reward.reviews} reviews</div>
                  </div>
                </div>

                {/* Gamification Elements */}
                {reward.gamification && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-gray-600">XP Multiplier: {reward.gamification.xpMultiplier}x</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-500">🎯</span>
                        <span className="text-gray-600">{reward.gamification.impactPoints} Impact Points</span>
                      </div>
                    </div>
                    {reward.gamification.rarity !== 'common' && (
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reward.gamification.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                          reward.gamification.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                          reward.gamification.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {reward.gamification.rarity === 'rare' ? '🔵 Rare' :
                           reward.gamification.rarity === 'epic' ? '🟣 Epic' :
                           reward.gamification.rarity === 'legendary' ? '🟡 Legendary' :
                           '⚪ Common'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={userXP < reward.xpCost || reward.availability === 'out-of-stock'}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    userXP >= reward.xpCost && reward.availability !== 'out-of-stock'
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {userXP < reward.xpCost 
                    ? `Need ${reward.xpCost - userXP} more XP`
                    : reward.availability === 'out-of-stock'
                    ? 'Out of Stock'
                    : '🌟 Create Impact'
                  }
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Impact Deals Tab */}
      {activeTab === 'impact-deals' && (
        <div className="space-y-6">
          {/* Impact Deals Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🤝 Impact Deals</h3>
                <p className="text-green-100">Support causes you care about while getting great products! 🌱</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{limitedOffers.length}</div>
                <div className="text-sm opacity-90">Active Causes</div>
              </div>
            </div>
          </div>

          {/* Limited Offers */}
          <div className="space-y-4">
            {limitedOffers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-xl p-4 shadow-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50"
              >
                {/* Impact Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                    🌱 Impact Partner
                  </span>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                    🤝 Social Cause
                  </span>
                </div>

                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{offer.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                    
                    {/* Impact Information */}
                    <div className="bg-green-100 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Your Impact</span>
                      </div>
                      <p className="text-xs text-green-700 mb-2">{offer.description}</p>
                      <div className="flex items-center gap-4 text-xs text-green-600">
                        <span>🌱 Sustainable</span>
                        <span>🤝 Fair Trade</span>
                        <span>👥 Community Support</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-green-600">{offer.xpCost} XP</span>
                      <span className="text-sm text-gray-500">+ ₹{offer.discountPrice}</span>
                      <span className="text-sm text-gray-400 line-through">₹{offer.originalPrice}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                        {offer.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600">
                          Available for {Math.floor((timeLeft[offer.id] || 0) / 3600)} more hours
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{offer.stockLeft} available</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleRedeem(offer as any)}
                      disabled={userXP < offer.xpCost || offer.stockLeft === 0}
                      className={`w-full py-3 rounded-lg font-bold transition-all ${
                        userXP >= offer.xpCost && offer.stockLeft > 0
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userXP < offer.xpCost 
                        ? `Need ${offer.xpCost - userXP} more XP`
                        : offer.stockLeft === 0
                        ? 'Fully Funded! 🎉'
                        : 'Support This Cause! 🤝'
                      }
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {/* Challenges Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🎯 Daily Challenges</h3>
                <p className="text-blue-100">Complete challenges to earn XP and maintain your streak!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{dailyChallenges.filter(c => c.isCompleted).length}/{dailyChallenges.length}</div>
                <div className="text-sm opacity-90">Completed</div>
              </div>
            </div>
          </div>

          {/* Daily Goal Progress */}
          {userProfile && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">🎯 Daily Goal</h4>
                <span className="text-sm text-gray-600">{userProfile.dailyProgress}/{userProfile.dailyGoal} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all"
                  style={{ width: `${(userProfile.dailyProgress / userProfile.dailyGoal) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {userProfile.dailyGoal - userProfile.dailyProgress} XP to reach your daily goal!
              </p>
            </div>
          )}

          {/* Challenges List */}
          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                  challenge.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Challenge Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    challenge.isCompleted ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {challenge.isCompleted ? '✅' : challenge.icon}
                  </div>

                  {/* Challenge Info */}
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-1 ${challenge.isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                      {challenge.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                    
                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              challenge.isCompleted 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-blue-400 to-purple-400'
                            }`}
                            style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                  </div>

                  {/* XP Reward */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{challenge.xpReward} XP</div>
                    <button
                      onClick={() => completeChallenge(challenge.id)}
                      disabled={challenge.isCompleted}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        challenge.isCompleted
                          ? 'bg-green-100 text-green-600 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {challenge.isCompleted ? 'Completed! 🎉' : 'Complete'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Badge Stats */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🏆 Your Badge Collection</h3>
                <p className="text-purple-100">Keep earning to unlock more badges!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{userProfile?.badges.length || 0}</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer hover:shadow-lg ${
                  badge.unlockedAt ? 'border-green-200' : 'border-gray-200 opacity-60'
                }`}
                onClick={() => {
                  setSelectedBadge(badge);
                  setShowBadgeModal(true);
                }}
              >
                {/* Badge Icon */}
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                  badge.unlockedAt ? `bg-gradient-to-r ${badge.gradient} text-white` : 'bg-gray-200 text-gray-400'
                }`}>
                  {badge.unlockedAt ? badge.emoji : '🔒'}
                </div>

                {/* Badge Info */}
                <div className="text-center">
                  <h4 className={`font-bold text-sm mb-1 ${badge.unlockedAt ? 'text-gray-800' : 'text-gray-400'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-xs mb-2 ${badge.unlockedAt ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>
                  
                  {/* Rarity Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-600' :
                    badge.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                    badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {badge.rarity}
                  </span>

                  {/* Progress Bar */}
                  {badge.progress && badge.maxProgress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {badge.progress}/{badge.maxProgress}
                      </p>
                    </div>
                  )}
                </div>

                {/* Unlocked Badge */}
                {badge.unlockedAt && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Leaderboard Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">🏆 Community Leaderboard</h3>
              <div className="flex gap-2">
                {[
                  { id: 'all', name: 'Global', icon: '🌍' },
                  { id: 'friends', name: 'Friends', icon: '👥' },
                  { id: 'local', name: 'Local', icon: '📍' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setLeaderboardFilter(filter.id as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      leaderboardFilter === filter.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {leaderboard.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-xl p-4 shadow-lg border-2 ${
                    user.isCurrentUser ? 'border-green-300 bg-green-50' : 'border-gray-200'
                  } ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* User Avatar */}
                  <div className="text-center mb-3">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${
                      user.isCurrentUser ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {user.avatar}
                    </div>
                    <h4 className={`font-bold text-sm ${user.isCurrentUser ? 'text-green-800' : 'text-gray-800'}`}>
                      {user.name}
                    </h4>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-xs">{getTierIcon(user.tier)}</span>
                      <span className="text-xs text-gray-600 capitalize">{user.tier}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Level</span>
                      <span className="font-bold text-blue-600">{user.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">XP</span>
                      <span className="font-bold text-green-600">{user.xp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Badges</span>
                      <span className="font-bold text-purple-600">{user.badges}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Streak</span>
                      <span className="font-bold text-orange-600">{user.streak} 🔥</span>
                    </div>
                  </div>

                  {/* Online Status */}
                  {user.isOnline && (
                    <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Full Leaderboard */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800">Complete Rankings</h4>
              </div>
              <div className="divide-y divide-gray-200">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                      user.isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-8 text-center">
                      <span className={`text-lg font-bold ${
                        user.rank <= 3 ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {getRankIcon(user.rank)}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        user.isCurrentUser ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {user.avatar}
                      </div>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className={`font-semibold ${user.isCurrentUser ? 'text-green-800' : 'text-gray-800'}`}>
                          {user.name}
                        </h5>
                        {user.isCurrentUser && (
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            You
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{getTierIcon(user.tier)} {user.tier}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                        <span>Level {user.level}</span>
                        <span>{user.xp.toLocaleString()} XP</span>
                        <span>{user.badges} badges</span>
                        <span>{user.streak} 🔥</span>
                      </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.totalImpact.treesPlanted} 🌳
                      </div>
                      <div className="text-xs text-gray-600">
                        {user.totalImpact.co2Saved}kg CO₂
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievement Showcase */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">🌟 Recent Achievements</h4>
              <div className="flex gap-2 overflow-x-auto">
                {leaderboard.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex-shrink-0 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl mb-1">
                      {user.avatar}
                    </div>
                    <div className="text-xs text-gray-600">{user.name}</div>
                    <div className="text-xs font-medium text-purple-600">
                      {user.achievements[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impact Stories Tab */}
      {activeTab === 'impact-stories' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📖 Impact Stories</h2>
            <p className="text-gray-600">Real stories of change created through our platform</p>
          </div>

          {/* Stories Grid */}
          <div className="grid gap-6">
            {impactStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{story.location}</span>
                          <span>•</span>
                          <span>{story.category}</span>
                          {story.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {story.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{story.content}</p>

                    {/* Impact Metrics */}
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">🌟 Impact Created</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">{story.impact.livesImpacted}</div>
                          <div className="text-xs text-green-700">Lives Impacted</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">{story.impact.childrenHelped}</div>
                          <div className="text-xs text-green-700">Children Helped</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">{story.impact.familiesSupported}</div>
                          <div className="text-xs text-green-700">Families Supported</div>
                        </div>
                      </div>
                    </div>

                    {/* Story Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          <span>{story.shares}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">Beneficiary: {story.beneficiary}</div>
                        <div>NGO: {story.ngo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Be Part of the Change</h3>
            <p className="text-green-100 mb-4">
              Your purchases create real impact. Join thousands of users making a difference in India.
            </p>
            <button
              onClick={() => setActiveTab('browse')}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Browse Impact Rewards
            </button>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && userProfile && (
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-xl font-bold">Level {userProfile.level} Eco Champion</h3>
                <p className="text-blue-100">Keep making a difference! 🌟</p>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Experience Progress</h4>
              <span className="text-sm text-gray-600">{userProfile.xp} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${((userProfile.xp % 1000) / 1000) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {userProfile.xpToNextLevel} XP to next level
            </p>
          </div>

          {/* Impact Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">🌍 Your Impact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProfile.totalImpact.treesPlanted}</div>
                <div className="text-sm text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userProfile.totalImpact.co2Saved}kg</div>
                <div className="text-sm text-gray-600">CO2 Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userProfile.totalImpact.plasticRecycled}</div>
                <div className="text-sm text-gray-600">Plastic Recycled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userProfile.totalImpact.waterSaved}L</div>
                <div className="text-sm text-gray-600">Water Saved</div>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">🔥 Daily Streak</h4>
                <p className="text-sm text-gray-600">Keep the momentum going!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-500">{userProfile.streak}</div>
                <div className="text-sm text-gray-600">days</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Rewards Tab */}
      {activeTab === 'my-rewards' && (
        <div className="space-y-4">
          {userRewards.map((userReward) => (
            <motion.div
              key={userReward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{userReward.reward.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userReward.status)}`}>
                      {userReward.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{userReward.reward.brand.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Redeemed: {userReward.redeemedAt.toLocaleDateString()}</span>
                    <span>XP Spent: {userReward.xpSpent}</span>
                    {userReward.trackingNumber && (
                      <span>Tracking: {userReward.trackingNumber}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Sustainability Tab */}
      {activeTab === 'sustainability' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🌱 Our Sustainability Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1,247</div>
                <div className="text-sm text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.3K</div>
                <div className="text-sm text-gray-600">CO2 Saved (kg)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">856</div>
                <div className="text-sm text-gray-600">Plastic Bottles Recycled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4.2K</div>
                <div className="text-sm text-gray-600">Liters Water Saved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Sustainability Standards</h3>
            <div className="space-y-3">
              {[
                { icon: '🌱', name: 'Eco-Friendly Materials', description: 'All products use sustainable, biodegradable materials' },
                { icon: '♻️', name: 'Recycled Content', description: 'Products contain recycled materials where possible' },
                { icon: '🤝', name: 'Fair Trade', description: 'Supporting ethical labor practices and fair wages' },
                { icon: '🌿', name: 'Organic Certification', description: 'Organic products are certified by recognized bodies' },
                { icon: '🏠', name: 'Local Sourcing', description: 'Supporting local communities and reducing transportation' },
                { icon: '☀️', name: 'Carbon Neutral', description: 'Offsetting carbon emissions through verified programs' }
              ].map((standard, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-2xl">{standard.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{standard.name}</h4>
                    <p className="text-sm text-gray-600">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      <AnimatePresence>
        {showModal && selectedReward && (
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
                <Gift className="w-12 h-12 text-[#4CAF50] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Redeem Reward</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to redeem this reward?</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800">{selectedReward.title}</h4>
                  <p className="text-sm text-gray-600">{selectedReward.brand.name}</p>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="text-lg font-bold text-[#4CAF50]">{selectedReward.xpCost} XP</span>
                    <span className="text-sm text-gray-500">+ ₹{selectedReward.finalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRedeem}
                    className="flex-1 py-3 bg-[#4CAF50] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
                  >
                    Confirm Redeem
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Modal */}
      <AnimatePresence>
        {showBadgeModal && selectedBadge && (
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
                {/* Badge Icon */}
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl ${
                  selectedBadge.unlockedAt ? `bg-gradient-to-r ${selectedBadge.gradient} text-white` : 'bg-gray-200 text-gray-400'
                }`}>
                  {selectedBadge.unlockedAt ? selectedBadge.emoji : '🔒'}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedBadge.name}</h3>
                <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
                
                {/* Badge Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Rarity:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedBadge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-600' :
                      selectedBadge.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                      selectedBadge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedBadge.rarity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">XP Reward:</span>
                    <span className="text-sm font-medium text-green-600">+{selectedBadge.xpReward} XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm font-medium text-gray-800 capitalize">{selectedBadge.category}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {selectedBadge.progress && selectedBadge.maxProgress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {selectedBadge.progress}/{selectedBadge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowBadgeModal(false)}
                  className="w-full py-3 bg-[#4CAF50] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
                >
                  {selectedBadge.unlockedAt ? 'Awesome! 🎉' : 'Keep Going! 💪'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak Celebration Modal */}
      <AnimatePresence>
        {showStreakModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Challenge Completed!</h3>
              <p className="text-gray-600 mb-4">You earned +150 XP! Keep up the great work!</p>
              <div className="bg-green-100 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-green-600">+150 XP</div>
                <div className="text-sm text-green-600">Added to your balance</div>
              </div>
              <button
                onClick={() => setShowStreakModal(false)}
                className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Awesome! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUpModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Level Up!</h3>
              <p className="text-gray-600 mb-4">Congratulations! You've reached a new level!</p>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold text-blue-600">Level 16</div>
                <div className="text-sm text-blue-600">New rewards unlocked!</div>
              </div>
              <button
                onClick={() => setShowLevelUpModal(false)}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Amazing! 🎊
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Referral Modal */}
      <AnimatePresence>
        {showReferralModal && userProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Invite Friends!</h3>
              <p className="text-gray-600 mb-4">Share your referral code and earn rewards together!</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="text-lg font-bold text-gray-800 mb-2">Your Referral Code</div>
                <div className="text-2xl font-mono bg-white rounded border-2 border-dashed border-gray-300 p-2">
                  {userProfile.referralCode}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                You've referred {userProfile.referralCount} friends! 🎉
              </div>
              <button
                onClick={() => setShowReferralModal(false)}
                className="w-full py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
              >
                Share Now! 📱
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SustainableRewards;
