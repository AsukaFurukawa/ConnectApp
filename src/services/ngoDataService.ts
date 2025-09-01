// NGO Data Service - Dummy Data for Bangalore
export interface RealNGOActivity {
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
  source: 'ngo-darpan' | 'giveindia' | 'social-media' | 'government';
  externalUrl?: string;
}

export interface RealVolunteerRequest {
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
  source: 'ngo-darpan' | 'volunteer-platform' | 'social-media';
  applicationUrl?: string;
}

export interface RealFundraiser {
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
  source: 'giveindia' | 'ketto' | 'milaap' | 'ngo-darpan';
  donationUrl?: string;
}

class NGODataService {
  // Dummy NGO Activities for Bangalore
  private dummyActivities: RealNGOActivity[] = [
    {
      id: '1',
      ngoName: 'Teach For India',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Digital Literacy Program at Government Schools',
      description: 'Successfully completed digital literacy training for 500+ students across 10 government schools in Bangalore. Students learned basic computer skills, internet safety, and digital tools.',
      category: 'education',
      location: 'Lalbagh, Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2024-01-15',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: [],
      likes: 234,
      comments: 45,
      shares: 12,
      impact: '500+ students trained in digital skills',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://teachforindia.org'
    },
    {
      id: '2',
      ngoName: 'Green Earth Foundation',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Tree Plantation Drive in Cubbon Park',
      description: 'Organized a massive tree plantation drive in collaboration with BBMP, planting 1000+ native trees across Cubbon Park to improve air quality and biodiversity.',
      category: 'environment',
      location: 'Cubbon Park, Bangalore',
      coordinates: { lat: 12.9762, lng: 77.5913 },
      date: '2024-01-10',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      likes: 567,
      comments: 89,
      shares: 34,
      impact: '1000+ trees planted in Cubbon Park',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://greenearthfoundation.org'
    },
    {
      id: '3',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Education Support for Slum Children',
      description: 'Provided educational support, school supplies, and nutrition to 300 underprivileged children in Electronic City slums. Children now have access to quality education.',
      category: 'children',
      location: 'Electronic City, Bangalore',
      coordinates: { lat: 12.8458, lng: 77.6658 },
      date: '2024-01-08',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: [],
      likes: 892,
      comments: 156,
      shares: 67,
      impact: '300+ children receiving education support',
      verified: true,
      source: 'giveindia',
      externalUrl: 'https://cry.org'
    },
    {
      id: '4',
      ngoName: 'Goonj',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Cloth Collection Drive Success',
      description: 'Amazing response to our cloth collection drive! Collected 2000+ kg of clothes that will be distributed to rural communities and disaster-affected areas.',
      category: 'poverty',
      location: 'Koramangala, Bangalore',
      coordinates: { lat: 12.9349, lng: 77.6057 },
      date: '2024-01-05',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: [],
      likes: 1234,
      comments: 234,
      shares: 89,
      impact: '2000+ kg clothes collected for distribution',
      verified: true,
      source: 'social-media',
      externalUrl: 'https://goonj.org'
    },
    {
      id: '5',
      ngoName: 'Bangalore Medical Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Free Health Camp for Senior Citizens',
      description: 'Organized comprehensive health checkup camp for 200+ senior citizens in Indiranagar. Provided free consultations, medicines, and health awareness sessions.',
      category: 'healthcare',
      location: 'Indiranagar, Bangalore',
      coordinates: { lat: 12.9789, lng: 77.6408 },
      date: '2024-01-03',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: [],
      likes: 456,
      comments: 78,
      shares: 23,
      impact: '200+ senior citizens received healthcare',
      verified: true,
      source: 'government',
      externalUrl: 'https://bangaloremedicaltrust.org'
    },
    {
      id: '6',
      ngoName: 'Animal Welfare Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Street Animal Rescue and Care',
      description: 'Rescued and provided medical care to 50+ injured street animals across Whitefield. Animals received treatment, vaccination, and were released back safely.',
      category: 'animals',
      location: 'Whitefield, Bangalore',
      coordinates: { lat: 12.9692, lng: 77.7499 },
      date: '2024-01-01',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      likes: 789,
      comments: 123,
      shares: 45,
      impact: '50+ street animals rescued and treated',
      verified: true,
      source: 'social-media',
      externalUrl: 'https://animalwelfaretrust.org'
    }
  ];

  // Dummy Volunteer Requests for Bangalore
  private dummyVolunteerRequests: RealVolunteerRequest[] = [
    {
      id: 'vol-1',
      ngoName: 'Teach For India',
      ngoLogo: '/api/placeholder/40/40',
      title: 'English Teaching Volunteers Needed',
      description: 'Looking for passionate volunteers to teach English to underprivileged children in government schools. No prior teaching experience required. Training will be provided.',
      category: 'education',
      location: 'Lalbagh, Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2024-01-20',
      volunteersNeeded: 25,
      volunteersApplied: 12,
      duration: '6 months',
      skills: ['English', 'Teaching', 'Patience', 'Communication'],
      images: ['/api/placeholder/400/300'],
      urgent: true,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://teachforindia.org/volunteer'
    },
    {
      id: 'vol-2',
      ngoName: 'Green Earth Foundation',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Environmental Awareness Campaign Volunteers',
      description: 'Help us spread environmental awareness in schools and communities. Volunteers will conduct workshops on waste management, recycling, and sustainable living.',
      category: 'environment',
      location: 'Cubbon Park, Bangalore',
      coordinates: { lat: 12.9762, lng: 77.5913 },
      date: '2024-01-18',
      volunteersNeeded: 15,
      volunteersApplied: 8,
      duration: '3 months',
      skills: ['Public Speaking', 'Environmental Knowledge', 'Creativity'],
      images: ['/api/placeholder/400/300'],
      urgent: false,
      verified: true,
      source: 'ngo-darpan',
      applicationUrl: 'https://greenearthfoundation.org/volunteer'
    },
    {
      id: 'vol-3',
      ngoName: 'Bangalore Medical Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Medical Camp Support Volunteers',
      description: 'Urgent need for volunteers to support our upcoming medical camps. Help with registration, crowd management, and basic health screenings.',
      category: 'healthcare',
      location: 'Indiranagar, Bangalore',
      coordinates: { lat: 12.9789, lng: 77.6408 },
      date: '2024-01-16',
      volunteersNeeded: 20,
      volunteersApplied: 5,
      duration: '2 weeks',
      skills: ['Organization', 'Communication', 'Basic Medical Knowledge'],
      images: ['/api/placeholder/400/300'],
      urgent: true,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://bangaloremedicaltrust.org/volunteer'
    },
    {
      id: 'vol-4',
      ngoName: 'Animal Welfare Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Animal Care and Feeding Volunteers',
      description: 'Looking for animal lovers to help with feeding, cleaning, and caring for rescued animals at our shelter. Perfect for those who love animals!',
      category: 'animals',
      location: 'Whitefield, Bangalore',
      coordinates: { lat: 12.9692, lng: 77.7499 },
      date: '2024-01-14',
      volunteersNeeded: 10,
      volunteersApplied: 15,
      duration: 'Ongoing',
      skills: ['Animal Care', 'Patience', 'Physical Stamina'],
      images: ['/api/placeholder/400/300'],
      urgent: false,
      verified: true,
      source: 'social-media',
      applicationUrl: 'https://animalwelfaretrust.org/volunteer'
    },
    {
      id: 'vol-5',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Child Education Support Volunteers',
      description: 'Help children with homework, reading, and basic skills. Volunteers will work with children in slum areas to improve their educational outcomes.',
      category: 'children',
      location: 'Electronic City, Bangalore',
      coordinates: { lat: 12.8458, lng: 77.6658 },
      date: '2024-01-12',
      volunteersNeeded: 30,
      volunteersApplied: 18,
      duration: '4 months',
      skills: ['Teaching', 'Patience', 'Child Psychology', 'Creativity'],
      images: ['/api/placeholder/400/300'],
      urgent: false,
      verified: true,
      source: 'ngo-darpan',
      applicationUrl: 'https://cry.org/volunteer'
    }
  ];

  // Dummy Fundraisers for Bangalore
  private dummyFundraisers: RealFundraiser[] = [
    {
      id: 'fund-1',
      ngoName: 'Teach For India',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Digital Learning Centers for Rural Schools',
      description: 'Help us set up digital learning centers in 20 rural schools around Bangalore. Each center will have computers, projectors, and educational software.',
      category: 'education',
      location: 'Bangalore Rural',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      targetAmount: 2000000,
      raisedAmount: 1500000,
      endDate: '2024-03-15',
      images: ['/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      donors: 1247,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://giveindia.org/digital-learning-centers'
    },
    {
      id: 'fund-2',
      ngoName: 'Green Earth Foundation',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Urban Forest Project in Bangalore',
      description: 'Creating urban forests in 5 locations across Bangalore to combat air pollution and provide green spaces for communities. Each forest will have 1000+ trees.',
      category: 'environment',
      location: 'Multiple Locations, Bangalore',
      coordinates: { lat: 12.9762, lng: 77.5913 },
      targetAmount: 1500000,
      raisedAmount: 800000,
      endDate: '2024-04-20',
      images: ['/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      donors: 892,
      verified: true,
      source: 'ketto',
      donationUrl: 'https://ketto.org/urban-forest-bangalore'
    },
    {
      id: 'fund-3',
      ngoName: 'Bangalore Medical Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Mobile Health Clinic for Slums',
      description: 'Setting up a mobile health clinic to provide free healthcare services to slum communities in Bangalore. The clinic will visit 10 locations weekly.',
      category: 'healthcare',
      location: 'Bangalore Slums',
      coordinates: { lat: 12.9789, lng: 77.6408 },
      targetAmount: 800000,
      raisedAmount: 450000,
      endDate: '2024-02-28',
      images: ['/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      donors: 567,
      verified: true,
      source: 'milaap',
      donationUrl: 'https://milaap.org/mobile-health-clinic'
    },
    {
      id: 'fund-4',
      ngoName: 'Animal Welfare Trust',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Animal Shelter Expansion Project',
      description: 'Expanding our animal shelter to accommodate 200+ more rescued animals. The new facility will have better medical equipment and rehabilitation areas.',
      category: 'animals',
      location: 'Whitefield, Bangalore',
      coordinates: { lat: 12.9692, lng: 77.7499 },
      targetAmount: 1200000,
      raisedAmount: 900000,
      endDate: '2024-05-10',
      images: ['/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      donors: 734,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://giveindia.org/animal-shelter-expansion'
    },
    {
      id: 'fund-5',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: '/api/placeholder/40/40',
      title: 'Education for 500 Slum Children',
      description: 'Providing quality education, school supplies, and nutrition to 500 underprivileged children in Bangalore slums for one full academic year.',
      category: 'children',
      location: 'Electronic City Slums, Bangalore',
      coordinates: { lat: 12.8458, lng: 77.6658 },
      targetAmount: 1000000,
      raisedAmount: 650000,
      endDate: '2024-03-30',
      images: ['/api/placeholder/400/300'],
      videos: ['/api/placeholder/400/300'],
      donors: 1023,
      verified: true,
      source: 'ketto',
      donationUrl: 'https://ketto.org/education-slum-children'
    }
  ];

  // Fetch NGO activities
  async getRealActivities(location?: string, category?: string): Promise<RealNGOActivity[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredActivities = this.dummyActivities;
    
    if (location) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.category === category
      );
    }
    
    return filteredActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Fetch volunteer requests
  async getRealVolunteerRequests(location?: string, category?: string): Promise<RealVolunteerRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredRequests = this.dummyVolunteerRequests;
    
    if (location) {
      filteredRequests = filteredRequests.filter(request =>
        request.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filteredRequests = filteredRequests.filter(request =>
        request.category === category
      );
    }
    
    return filteredRequests.sort((a, b) => {
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  // Fetch fundraisers
  async getRealFundraisers(location?: string, category?: string): Promise<RealFundraiser[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredFundraisers = this.dummyFundraisers;
    
    if (location) {
      filteredFundraisers = filteredFundraisers.filter(fundraiser =>
        fundraiser.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filteredFundraisers = filteredFundraisers.filter(fundraiser =>
        fundraiser.category === category
      );
    }
    
    return filteredFundraisers.sort((a, b) => {
      // Sort by urgency (ending soon) and then by progress
      const aDaysLeft = this.getDaysLeft(a.endDate);
      const bDaysLeft = this.getDaysLeft(b.endDate);
      if (aDaysLeft < 7 && bDaysLeft >= 7) return -1;
      if (bDaysLeft < 7 && aDaysLeft >= 7) return 1;
      return (b.raisedAmount / b.targetAmount) - (a.raisedAmount / a.targetAmount);
    });
  }

  // Helper methods
  private getDaysLeft(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Get user's location for personalized data
  async getUserLocation(): Promise<{ lat: number; lng: number; city: string; state: string } | null> {
    // Return Bangalore coordinates for demo
    return {
      lat: 12.9716,
      lng: 77.5946,
      city: 'Bangalore',
      state: 'Karnataka'
    };
  }
}

export const ngoDataService = new NGODataService();
