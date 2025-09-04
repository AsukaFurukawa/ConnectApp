'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Share2, 
  ExternalLink,
  Star,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Eye,
  Globe,
  Phone,
  Mail,
  Award,
  CheckCircle,
  AlertCircle,
  Play,
  Image as ImageIcon
} from 'lucide-react';

interface NGOActivity {
  id: string;
  ngoName: string;
  ngoLogo: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  images: string[];
  videos: string[];
  likes: number;
  comments: number;
  shares: number;
  impact: string;
  verified: boolean;
  source: string;
  externalUrl?: string;
}

interface VolunteerRequest {
  id: string;
  ngoName: string;
  ngoLogo: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  volunteersNeeded: number;
  volunteersApplied: number;
  duration: string;
  skills: string[];
  images: string[];
  urgent: boolean;
  verified: boolean;
  source: string;
  applicationUrl?: string;
}

interface Fundraiser {
  id: string;
  ngoName: string;
  ngoLogo: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  targetAmount: number;
  raisedAmount: number;
  endDate: string;
  images: string[];
  videos: string[];
  donors: number;
  verified: boolean;
  source: string;
  donationUrl?: string;
}

type NGOItem = NGOActivity | VolunteerRequest | Fundraiser;

interface NGODetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: NGOItem | null;
  type: 'activity' | 'volunteer' | 'fundraiser';
}

const NGODetailModal = ({ isOpen, onClose, item, type }: NGODetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!item) return null;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'education': '📚',
      'healthcare': '🏥',
      'environment': '🌱',
      'poverty': '🤝',
      'children': '👶',
      'women': '👩',
      'disaster': '🚨',
      'animals': '🐾',
      'elderly': '👴'
    };
    return icons[category] || '🌍';
  };

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'ngo-darpan': 'bg-blue-100 text-blue-800',
      'giveindia': 'bg-green-100 text-green-800',
      'social-media': 'bg-purple-100 text-purple-800',
      'government': 'bg-gray-100 text-gray-800',
      'volunteer-platform': 'bg-orange-100 text-orange-800',
      'ketto': 'bg-pink-100 text-pink-800',
      'milaap': 'bg-indigo-100 text-indigo-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
                  <motion.div
          className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.ngoLogo}
                    alt={item.ngoName}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://picsum.photos/48/48?random=logo';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-800">{item.ngoName}</h2>
                      {item.verified && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSourceColor(item.source)}`}>
                        {item.source.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <span>{getCategoryIcon(item.category)}</span>
                      <span className="capitalize">{item.category}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 pb-6 space-y-4">
                        {/* Title and Description */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
            
            {/* Location Tag */}
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                📍 {item.location}
              </span>
            </div>
          </div>

              {/* Media Gallery */}
              {((item.images && item.images.length > 0) || (item.videos && item.videos.length > 0)) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Media Gallery
                  </h3>
                  
                  {/* Main Image/Video */}
                  <div className="relative">
                    {item.images && item.images.length > 0 && (
                      <img
                        src={item.images[activeImageIndex]}
                        alt={`${item.title} - Image ${activeImageIndex + 1}`}
                        className="w-full h-64 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = 'https://picsum.photos/400/256?random=main';
                        }}
                      />
                    )}
                    {item.videos && item.videos.length > 0 && (
                      <div className="relative">
                        <video
                          src={item.videos[0]}
                          controls
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          Video
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {item.images && item.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {item.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                            activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://picsum.photos/64/64?random=thumb';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Type-specific Details */}
              {type === 'activity' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Impact Achieved
                    </h4>
                    <p className="text-green-700">{item.impact}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Activity Date
                    </h4>
                    <p className="text-blue-700">{new Date(item.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              )}

              {type === 'volunteer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Volunteer Requirements
                    </h4>
                    <div className="space-y-2 text-orange-700">
                      <p><strong>Needed:</strong> {item.volunteersNeeded} volunteers</p>
                      <p><strong>Applied:</strong> {item.volunteersApplied} volunteers</p>
                      <p><strong>Duration:</strong> {item.duration}</p>
                      {item.urgent && (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-semibold">Urgent Need</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {type === 'fundraiser' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Fundraising Progress
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(item.raisedAmount)}
                        </span>
                        <span className="text-gray-600">
                          of {formatCurrency(item.targetAmount)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(item.raisedAmount, item.targetAmount)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{item.donors} donors</span>
                        <span>{Math.round(getProgressPercentage(item.raisedAmount, item.targetAmount))}% funded</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Campaign End Date
                      </h4>
                      <p className="text-red-700">
                        {new Date(item.endDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        {getDaysLeft(item.endDate) > 0 
                          ? `${getDaysLeft(item.endDate)} days left`
                          : 'Campaign ended'
                        }
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Campaign Status
                      </h4>
                      <div className="flex items-center gap-2">
                        {getDaysLeft(item.endDate) > 7 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        )}
                        <span className={getDaysLeft(item.endDate) > 7 ? 'text-green-700' : 'text-orange-700'}>
                          {getDaysLeft(item.endDate) > 7 ? 'Active' : 'Ending Soon'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Engagement Stats */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Engagement
                </h4>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">{item.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">{item.comments} comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item.shares} shares</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {type === 'volunteer' && item.applicationUrl && (
                  <a
                    href={item.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Apply to Volunteer
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                
                {type === 'fundraiser' && item.donationUrl && (
                  <a
                    href={item.donationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    Donate Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isLiked 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NGODetailModal;
