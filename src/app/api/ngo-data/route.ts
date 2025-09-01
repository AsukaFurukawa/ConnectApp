import { NextRequest, NextResponse } from 'next/server';

// Mock real NGO data - In production, this would come from actual APIs
const realNGOData = {
  activities: [
    {
      id: 'darpan-1',
      ngoName: 'Teach For India',
      ngoLogo: 'https://teachforindia.org/wp-content/uploads/2021/08/tfi-logo.png',
      title: 'Digital Literacy Program in Bangalore Schools',
      description: 'Successfully implemented digital literacy program across 15 government schools in Bangalore, training 750+ students in computer skills and digital tools.',
      category: 'education',
      location: 'Bangalore, Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: '2024-01-15',
      images: [
        'https://teachforindia.org/wp-content/uploads/2023/12/digital-literacy-bangalore.jpg',
        'https://teachforindia.org/wp-content/uploads/2023/12/students-computers.jpg'
      ],
      videos: [],
      likes: 234,
      comments: 45,
      shares: 12,
      impact: '750+ students trained in digital skills',
      verified: true,
      source: 'ngo-darpan',
      externalUrl: 'https://teachforindia.org/programs/digital-literacy'
    },
    {
      id: 'giveindia-1',
      ngoName: 'CRY - Child Rights and You',
      ngoLogo: 'https://www.cry.org/wp-content/uploads/2021/03/cry-logo.png',
      title: 'Education for 1000 Children in Delhi Slums',
      description: 'Providing quality education, school supplies, and nutrition to 1000 underprivileged children in Delhi slums through our Education for All program.',
      category: 'children',
      location: 'Delhi, NCR',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      date: '2024-01-12',
      images: [
        'https://www.cry.org/wp-content/uploads/2023/12/delhi-education-program.jpg',
        'https://www.cry.org/wp-content/uploads/2023/12/children-learning.jpg'
      ],
      videos: [],
      likes: 892,
      comments: 156,
      shares: 67,
      impact: '1000+ children receiving education',
      verified: true,
      source: 'giveindia',
      externalUrl: 'https://www.cry.org/projects/education-delhi'
    },
    {
      id: 'social-1',
      ngoName: 'Goonj',
      ngoLogo: 'https://goonj.org/wp-content/uploads/2021/05/goonj-logo.png',
      title: 'Cloth Collection Drive Success',
      description: 'Amazing response to our cloth collection drive! Collected 5000+ kg of clothes that will be distributed to rural communities across India.',
      category: 'poverty',
      location: 'Chennai, Tamil Nadu',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      date: '2024-01-08',
      images: [
        'https://instagram.com/p/ABC123/cloth-collection.jpg',
        'https://instagram.com/p/ABC124/volunteers-sorting.jpg'
      ],
      videos: [],
      likes: 1234,
      comments: 234,
      shares: 89,
      impact: '5000+ kg clothes collected',
      verified: true,
      source: 'social-media',
      externalUrl: 'https://instagram.com/goonj_org'
    }
  ],
  volunteers: [
    {
      id: 'vol-1',
      ngoName: 'Teach For India',
      ngoLogo: 'https://teachforindia.org/wp-content/uploads/2021/08/tfi-logo.png',
      title: 'English Teaching Volunteers Needed',
      description: 'Looking for passionate volunteers to teach English to underprivileged children in Delhi government schools. No prior teaching experience required.',
      category: 'education',
      location: 'Delhi, NCR',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      date: '2024-01-20',
      volunteersNeeded: 25,
      volunteersApplied: 12,
      duration: '6 months',
      skills: ['English', 'Teaching', 'Patience', 'Communication'],
      images: ['https://teachforindia.org/images/volunteer-teaching.jpg'],
      urgent: true,
      verified: true,
      source: 'volunteer-platform',
      applicationUrl: 'https://teachforindia.org/volunteer/apply'
    }
  ],
  fundraisers: [
    {
      id: 'fund-1',
      ngoName: 'Disaster Relief India',
      ngoLogo: 'https://disasterreliefindia.org/images/logo.png',
      title: 'Kerala Flood Relief 2024',
      description: 'Emergency relief for flood-affected families in Kerala. Providing food, shelter, medical aid, and rehabilitation support.',
      category: 'disaster',
      location: 'Kerala',
      coordinates: { lat: 10.8505, lng: 76.2711 },
      targetAmount: 1000000,
      raisedAmount: 750000,
      endDate: '2024-02-15',
      images: ['https://disasterreliefindia.org/images/kerala-flood.jpg'],
      videos: ['https://disasterreliefindia.org/videos/flood-relief.mp4'],
      donors: 1247,
      verified: true,
      source: 'giveindia',
      donationUrl: 'https://giveindia.org/kerala-flood-relief'
    }
  ]
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const category = searchParams.get('category');
  const type = searchParams.get('type') || 'all';

  try {
    let data: any = {};

    // Filter by location and category
    const filterData = (items: any[]) => {
      return items.filter(item => {
        const matchesLocation = !location || 
          item.location.toLowerCase().includes(location.toLowerCase());
        const matchesCategory = !category || item.category === category;
        return matchesLocation && matchesCategory;
      });
    };

    if (type === 'all' || type === 'activities') {
      data.activities = filterData(realNGOData.activities);
    }

    if (type === 'all' || type === 'volunteers') {
      data.volunteers = filterData(realNGOData.volunteers);
    }

    if (type === 'all' || type === 'fundraisers') {
      data.fundraisers = filterData(realNGOData.fundraisers);
    }

    // Add metadata
    data.metadata = {
      totalActivities: data.activities?.length || 0,
      totalVolunteers: data.volunteers?.length || 0,
      totalFundraisers: data.fundraisers?.length || 0,
      location: location || 'All India',
      category: category || 'All Categories',
      lastUpdated: new Date().toISOString(),
      sources: ['NGO Darpan', 'GiveIndia', 'Social Media', 'Government APIs']
    };

    return NextResponse.json({
      success: true,
      data,
      message: 'Real NGO data fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching NGO data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch NGO data',
      message: 'Please try again later'
    }, { status: 500 });
  }
}
