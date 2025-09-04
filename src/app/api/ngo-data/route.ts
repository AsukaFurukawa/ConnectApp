import { NextRequest, NextResponse } from 'next/server';

// Mock real NGO data - In production, this would come from actual APIs
const realNGOData = {
  activities: [
    {
      id: 'darpan-1',
      ngoName: 'Teach For India',
      ngoLogo: 'https://picsum.photos/100/100?random=13',
      title: 'Digital Literacy Program in Bangalore Schools',
      description: 'Upcoming digital literacy program across 15 government schools in Bangalore. We will train 750+ students in computer skills and digital tools.',
      category: 'education',
      location: 'Bangalore, Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2025-09-15',
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2'
      ],
      videos: [],
      likes: 234,
      comments: 45,
      shares: 12,
      impact: '750+ students trained in digital skills',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://teachforindia.org'
    },
    {
      id: 'giveindia-1',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: 'https://picsum.photos/100/100?random=14',
      title: 'Education for 1000 Children in Delhi Slums',
      description: 'Upcoming Education for All program to provide quality education, school supplies, and nutrition to 1000 underprivileged children in Delhi slums.',
      category: 'children',
      location: 'Delhi, NCR',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      date: '2025-09-20',
      images: [
        'https://picsum.photos/400/300?random=3',
        'https://picsum.photos/400/300?random=4'
      ],
      videos: [],
      likes: 892,
      comments: 156,
      shares: 67,
      impact: '1000+ children receiving education',
      verified: true,
      source: 'giveindia',
      externalUrl: 'https://www.cry.org'
    },
    {
      id: 'goonj-1',
      ngoName: 'Goonj',
      ngoLogo: 'https://picsum.photos/100/100?random=15',
      title: 'Cloth for Work - Rural Development Initiative',
      description: 'Upcoming Cloth for Work initiative to distribute 50,000 pieces of clothing to rural communities in exchange for community work like building roads, schools, and water conservation projects.',
      category: 'rural',
      location: 'Chennai, Tamil Nadu',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      date: '2025-09-25',
      images: [
        'https://picsum.photos/400/300?random=5',
        'https://picsum.photos/400/300?random=6'
      ],
      videos: [],
      likes: 567,
      comments: 89,
      shares: 34,
      impact: '50,000+ clothing items distributed',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://goonj.org'
    },
    {
      id: 'bmt-1',
      ngoName: 'Bangalore Medical Trust',
      ngoLogo: 'https://picsum.photos/100/100?random=16',
      title: 'Free Health Camp for Senior Citizens',
      description: 'Upcoming comprehensive health checkup camp for 200+ senior citizens in Indiranagar. We will provide free consultations, medicines, and health awareness sessions.',
      category: 'healthcare',
      location: 'Bangalore, Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2025-09-30',
      images: [
        'https://picsum.photos/400/300?random=7',
        'https://picsum.photos/400/300?random=8'
      ],
      videos: [],
      likes: 456,
      comments: 78,
      shares: 23,
      impact: '200+ senior citizens received healthcare',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://bangaloremedicaltrust.org'
    }
  ],
  volunteers: [
    {
      id: 'vol-1',
      ngoName: 'Teach For India',
      ngoLogo: 'https://picsum.photos/100/100?random=17',
      title: 'English Teaching Volunteers Needed',
      description: 'Looking for passionate volunteers to teach English to underprivileged children in Bangalore government schools. No prior teaching experience required.',
      category: 'education',
      location: 'Bangalore, Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2025-09-10',
      volunteersNeeded: 25,
      volunteersApplied: 12,
      duration: '6 months',
      skills: ['English', 'Teaching', 'Patience', 'Communication'],
      images: ['https://picsum.photos/400/300?random=9'],
      videos: [],
      urgent: true,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://teachforindia.org/volunteer'
    },
    {
      id: 'vol-2',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: 'https://picsum.photos/100/100?random=18',
      title: 'Child Rights Awareness Campaign',
      description: 'Join our campaign to raise awareness about child rights in Delhi communities. Help organize workshops, distribute materials, and engage with parents.',
      category: 'children',
      location: 'Delhi, NCR',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      date: '2025-09-12',
      volunteersNeeded: 15,
      volunteersApplied: 8,
      duration: '3 months',
      skills: ['Communication', 'Community Outreach', 'Child Psychology', 'Event Management'],
      images: ['https://picsum.photos/400/300?random=10'],
      videos: [],
      urgent: false,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://www.cry.org/volunteer'
    },
    {
      id: 'vol-3',
      ngoName: 'Goonj',
      ngoLogo: 'https://picsum.photos/100/100?random=19',
      title: 'Rural Development Project Volunteers',
      description: 'Support our rural development initiatives in Tamil Nadu. Help with community mobilization, project coordination, and impact assessment.',
      category: 'rural',
      location: 'Chennai, Tamil Nadu',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      date: '2025-09-18',
      volunteersNeeded: 20,
      volunteersApplied: 15,
      duration: '4 months',
      skills: ['Project Management', 'Community Development', 'Data Collection', 'Communication'],
      images: ['https://picsum.photos/400/300?random=11'],
      videos: [],
      urgent: false,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://goonj.org/volunteer'
    }
  ],
  fundraisers: [
    {
      id: 'fund-1',
      ngoName: 'Teach For India',
      ngoLogo: 'https://picsum.photos/100/100?random=20',
      title: 'Digital Learning Centers for Rural Schools',
      description: 'Help us set up digital learning centers in 25 rural schools around Bangalore. Each center will have computers, projectors, and educational software.',
      category: 'education',
      location: 'Bangalore, Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      targetAmount: 2500000,
      raisedAmount: 1800000,
      endDate: '2025-10-15',
      images: ['https://picsum.photos/400/300?random=12'],
      videos: [],
      donors: 1247,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://teachforindia.org/donate'
    },
    {
      id: 'fund-2',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: 'https://picsum.photos/100/100?random=21',
      title: 'Emergency Relief for Flood-Affected Children',
      description: 'Support children affected by recent floods in Kerala. Funds will be used for emergency shelter, food, medical care, and educational support.',
      category: 'children',
      location: 'Kerala',
      coordinates: { lat: 10.8505, lng: 76.2711 },
      targetAmount: 5000000,
      raisedAmount: 3200000,
      endDate: '2025-10-20',
      images: ['https://picsum.photos/400/300?random=13'],
      videos: [],
      donors: 2156,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://www.cry.org/donate'
    },
    {
      id: 'fund-3',
      ngoName: 'Goonj',
      ngoLogo: 'https://picsum.photos/100/100?random=22',
      title: 'Winter Relief for Himalayan Communities',
      description: 'Provide warm clothing, blankets, and essential supplies to communities in the Himalayan region facing harsh winter conditions.',
      category: 'rural',
      location: 'Himachal Pradesh',
      coordinates: { lat: 31.1048, lng: 77.1734 },
      targetAmount: 1500000,
      raisedAmount: 950000,
      endDate: '2025-10-25',
      images: ['https://picsum.photos/400/300?random=14'],
      videos: [],
      donors: 892,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://goonj.org/donate'
    }
  ]
};

// Filter data based on query parameters
function filterData(data: any[], locationFilter?: string, categoryFilter?: string) {
  let filtered = data;
  
  if (locationFilter) {
    filtered = filtered.filter(item => 
      item.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }
  
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(item => 
      item.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }
  
  return filtered;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    const type = searchParams.get('type') || 'all';

    let responseData: any = {};

    if (type === 'all' || type === 'activities') {
      responseData.activities = filterData(realNGOData.activities, location || undefined, category || undefined);
    }

    if (type === 'all' || type === 'volunteers') {
      responseData.volunteers = filterData(realNGOData.volunteers, location || undefined, category || undefined);
    }

    if (type === 'all' || type === 'fundraisers') {
      responseData.fundraisers = filterData(realNGOData.fundraisers, location || undefined, category || undefined);
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString(),
      filters: {
        location,
        category,
        type
      }
    });

  } catch (error) {
    console.error('Error in NGO data API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch NGO data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}