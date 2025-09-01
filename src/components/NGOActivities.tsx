'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Camera, 
  Video,
  Share2,
  Bookmark,
  MessageCircle,
  TrendingUp,
  Target,
  Globe,
  Star,
  MapPin as MapPinIcon,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { ngoDataService, RealNGOActivity, RealVolunteerRequest, RealFundraiser } from '@/services/ngoDataService';

// Using real data types from service
type NGOActivity = RealNGOActivity;
type VolunteerRequest = RealVolunteerRequest;
type Fundraiser = RealFundraiser;

const NGOActivities = () => {
  const [activeTab, setActiveTab] = useState<'activities' | 'volunteers' | 'fundraisers'>('activities');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{ city: string; state: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Categories
  const categories = [
    { id: 'all', name: 'All', icon: '🌍' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'poverty', name: 'Poverty Relief', icon: '🤝' },
    { id: 'children', name: 'Children', icon: '👶' },
    { id: 'women', name: 'Women Empowerment', icon: '👩' },
    { id: 'disaster', name: 'Disaster Relief', icon: '🚨' },
    { id: 'animals', name: 'Animal Welfare', icon: '🐾' },
    { id: 'elderly', name: 'Elderly Care', icon: '👴' }
  ];

  // Real data from multiple sources
  const [activities, setActivities] = useState<NGOActivity[]>([]);
  const [volunteerRequests, setVolunteerRequests] = useState<VolunteerRequest[]>([]);
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);

  // Data fetching functions
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [activitiesData, volunteersData, fundraisersData] = await Promise.all([
        ngoDataService.getRealActivities(locationFilter, selectedCategory === 'all' ? undefined : selectedCategory),
        ngoDataService.getRealVolunteerRequests(locationFilter, selectedCategory === 'all' ? undefined : selectedCategory),
        ngoDataService.getRealFundraisers(locationFilter, selectedCategory === 'all' ? undefined : selectedCategory)
      ]);

      setActivities(activitiesData);
      setVolunteerRequests(volunteersData);
      setFundraisers(fundraisersData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching NGO data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user location on component mount
  useEffect(() => {
    const getUserLocation = async () => {
      const location = await ngoDataService.getUserLocation();
      if (location) {
        setUserLocation({ city: location.city, state: location.state });
        setLocationFilter(`${location.city}, ${location.state}`);
      }
    };

    getUserLocation();
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [selectedCategory, locationFilter]);

  // Filter functions
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || activity.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const filteredVolunteers = volunteerRequests.filter(volunteer => {
    const matchesCategory = selectedCategory === 'all' || volunteer.category === selectedCategory;
    const matchesSearch = volunteer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || volunteer.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const filteredFundraisers = fundraisers.filter(fundraiser => {
    const matchesCategory = selectedCategory === 'all' || fundraiser.category === selectedCategory;
    const matchesSearch = fundraiser.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fundraiser.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || fundraiser.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '🌍';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#E0F2F1] to-[#E1F5FE] p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[#2E7D32] font-fun">NGO Activities</h1>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#2E7D32] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#66BB6A] text-sm font-clean">Discover amazing work by NGOs and find ways to help</p>
          {userLocation && (
            <div className="flex items-center gap-2 text-sm text-[#2E7D32]">
              <MapPinIcon className="w-4 h-4" />
              <span>📍 {userLocation.city}, {userLocation.state}</span>
            </div>
          )}
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search NGOs, activities, or causes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent shadow-sm"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-[#2E7D32] font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {showFilters && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>
          )}
        </div>

        {/* Categories */}
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
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl p-1 mb-6 shadow-sm">
        {[
          { id: 'activities', name: 'Activities', icon: '📋', count: filteredActivities.length },
          { id: 'volunteers', name: 'Volunteer Requests', icon: '🤝', count: filteredVolunteers.length },
          { id: 'fundraisers', name: 'Fundraisers', icon: '💰', count: filteredFundraisers.length }
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
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {activeTab === 'activities' && (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={activity.ngoLogo}
                      alt={activity.ngoName}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div className="flex-1">
                                             <div className="flex items-center gap-2">
                         <h3 className="font-semibold text-[#2E7D32]">{activity.ngoName}</h3>
                         {activity.verified && <Star className="w-4 h-4 text-[#FFD700] fill-current" />}
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                           activity.source === 'ngo-darpan' ? 'bg-blue-100 text-blue-800' :
                           activity.source === 'giveindia' ? 'bg-green-100 text-green-800' :
                           activity.source === 'social-media' ? 'bg-purple-100 text-purple-800' :
                           'bg-gray-100 text-gray-800'
                         }`}>
                           {activity.source.replace('-', ' ').toUpperCase()}
                         </span>
                       </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{getCategoryIcon(activity.category)}</span>
                        <span>{categories.find(c => c.id === activity.category)?.name}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-lg mb-2">{activity.title}</h4>
                  <p className="text-gray-600 mb-3">{activity.description}</p>

                  {/* Impact */}
                  <div className="bg-[#E8F5E9] rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                      <span className="font-semibold text-[#2E7D32]">Impact:</span>
                      <span className="text-[#4CAF50]">{activity.impact}</span>
                    </div>
                  </div>

                  {/* Media */}
                  {activity.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {activity.images.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Activity ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{activity.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{activity.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-[#4CAF50] transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{activity.shares}</span>
                      </button>
                    </div>
                                         <div className="flex items-center gap-2">
                       <button 
                         className="text-[#4CAF50] hover:text-[#2E7D32] transition-colors"
                         title="Save activity"
                         aria-label="Save activity"
                       >
                         <Bookmark className="w-4 h-4" />
                       </button>
                       {activity.externalUrl && (
                         <a
                           href={activity.externalUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-[#4CAF50] hover:text-[#2E7D32] transition-colors"
                           title="View on original platform"
                         >
                           <ExternalLink className="w-4 h-4" />
                         </a>
                       )}
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              {filteredVolunteers.map((volunteer) => (
                <motion.div
                  key={volunteer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-xl p-4 shadow-sm border ${
                    volunteer.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={volunteer.ngoLogo}
                      alt={volunteer.ngoName}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div className="flex-1">
                                             <div className="flex items-center gap-2">
                         <h3 className="font-semibold text-[#2E7D32]">{volunteer.ngoName}</h3>
                         {volunteer.verified && <Star className="w-4 h-4 text-[#FFD700] fill-current" />}
                         {volunteer.urgent && (
                           <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                             URGENT
                           </span>
                         )}
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                           volunteer.source === 'ngo-darpan' ? 'bg-blue-100 text-blue-800' :
                           volunteer.source === 'volunteer-platform' ? 'bg-orange-100 text-orange-800' :
                           'bg-gray-100 text-gray-800'
                         }`}>
                           {volunteer.source.replace('-', ' ').toUpperCase()}
                         </span>
                       </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{getCategoryIcon(volunteer.category)}</span>
                        <span>{categories.find(c => c.id === volunteer.category)?.name}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{volunteer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-lg mb-2">{volunteer.title}</h4>
                  <p className="text-gray-600 mb-3">{volunteer.description}</p>

                  {/* Volunteer Stats */}
                  <div className="bg-[#E3F2FD] rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-[#2196F3]" />
                          <span className="text-sm font-medium text-[#1976D2]">
                            {volunteer.volunteersApplied}/{volunteer.volunteersNeeded} volunteers
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-[#2196F3]" />
                          <span className="text-sm text-[#1976D2]">{volunteer.duration}</span>
                        </div>
                      </div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2196F3] rounded-full"
                          style={{
                            width: `${(volunteer.volunteersApplied / volunteer.volunteersNeeded) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {volunteer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2E7D32] transition-colors">
                        Apply Now
                      </button>
                      {volunteer.applicationUrl && (
                        <a
                          href={volunteer.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4CAF50] hover:text-[#2E7D32] transition-colors"
                          title="View on original platform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-gray-500 hover:text-[#4CAF50] transition-colors"
                        title="Share volunteer request"
                        aria-label="Share volunteer request"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-[#4CAF50] transition-colors"
                        title="Save volunteer request"
                        aria-label="Save volunteer request"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'fundraisers' && (
            <div className="space-y-4">
              {filteredFundraisers.map((fundraiser) => (
                <motion.div
                  key={fundraiser.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={fundraiser.ngoLogo}
                      alt={fundraiser.ngoName}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#2E7D32]">{fundraiser.ngoName}</h3>
                        {fundraiser.verified && <Star className="w-4 h-4 text-[#FFD700] fill-current" />}
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          fundraiser.source === 'giveindia' ? 'bg-green-100 text-green-800' :
                          fundraiser.source === 'ketto' ? 'bg-yellow-100 text-yellow-800' :
                          fundraiser.source === 'milaap' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {fundraiser.source.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{getCategoryIcon(fundraiser.category)}</span>
                        <span>{categories.find(c => c.id === fundraiser.category)?.name}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{fundraiser.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-lg mb-2">{fundraiser.title}</h4>
                  <p className="text-gray-600 mb-3">{fundraiser.description}</p>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#2E7D32]">
                        {formatAmount(fundraiser.raisedAmount)} raised
                      </span>
                      <span className="text-sm text-gray-500">
                        of {formatAmount(fundraiser.targetAmount)}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full"
                        style={{
                          width: `${getProgressPercentage(fundraiser.raisedAmount, fundraiser.targetAmount)}%`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{fundraiser.donors} donors</span>
                      <span>Ends {new Date(fundraiser.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Media */}
                  {fundraiser.images.length > 0 && (
                    <div className="mb-3">
                      <img
                        src={fundraiser.images[0]}
                        alt="Fundraiser"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2E7D32] transition-colors">
                        Donate Now
                      </button>
                      {fundraiser.donationUrl && (
                        <a
                          href={fundraiser.donationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4CAF50] hover:text-[#2E7D32] transition-colors"
                          title="View on original platform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-gray-500 hover:text-[#4CAF50] transition-colors"
                        title="Share fundraiser"
                        aria-label="Share fundraiser"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-[#4CAF50] transition-colors"
                        title="Save fundraiser"
                        aria-label="Save fundraiser"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {((activeTab === 'activities' && filteredActivities.length === 0) ||
        (activeTab === 'volunteers' && filteredVolunteers.length === 0) ||
        (activeTab === 'fundraisers' && filteredFundraisers.length === 0)) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default NGOActivities;
