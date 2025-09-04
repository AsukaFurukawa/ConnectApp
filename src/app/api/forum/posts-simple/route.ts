import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const source = searchParams.get('source') || 'all'

    // Mock data for testing
    const mockPosts = [
      {
        id: '1',
        title: 'Street Children Need Education Support in Dharavi',
        content: 'Found 15 children aged 6-12 years living on the streets near Dharavi station. They want to study but have no access to schools. Looking for NGOs who can help with education and rehabilitation.',
        author: {
          id: 'user1',
          name: 'Priya Sharma',
          avatar: 'https://picsum.photos/40/40?random=1',
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
        urgency: 'high',
        source: 'user',
        media: [{
          type: 'image',
          url: 'https://picsum.photos/400/300?random=10'
        }],
        ngoResponses: [
          {
            ngoId: 'ngo1',
            ngoName: 'CRY - Child Rights and You',
            ngoLogo: 'https://picsum.photos/100/100?random=11',
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
          avatar: 'https://picsum.photos/40/40?random=2',
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
        urgency: 'high',
        source: 'ngo',
        media: [{
          type: 'image',
          url: 'https://picsum.photos/400/300?random=12'
        }]
      },
      {
        id: '3',
        title: 'Water Crisis in Rural Maharashtra - Immediate Help Needed',
        content: 'Villages in Beed district are facing severe water shortage. Women are walking 5+ km daily to fetch water. We need water tankers and long-term solutions like borewells.',
        author: {
          id: 'user3',
          name: 'Sunil Patil',
          avatar: 'https://picsum.photos/40/40?random=3',
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
        urgency: 'critical',
        source: 'user',
        media: [{
          type: 'image',
          url: 'https://picsum.photos/400/300?random=13'
        }]
      },
      {
        id: '4',
        title: 'Government Launches New Scheme for Street Children',
        content: 'The Ministry of Women and Child Development has launched a new scheme to provide education and rehabilitation for street children. NGOs can now apply for funding.',
        author: {
          id: 'gov-india',
          name: 'Government of India',
          avatar: 'https://picsum.photos/40/40?random=4',
          role: 'admin',
          verified: true,
          xp: 0
        },
        category: 'street-children',
        tags: ['government', 'scheme', 'funding', 'education'],
        location: 'New Delhi, India',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 789,
        comments: 156,
        shares: 345,
        views: 4567,
        isLiked: false,
        isBookmarked: true,
        isPinned: true,
        isResolved: false,
        urgency: 'medium',
        source: 'api',
        externalUrl: 'https://wcd.nic.in'
      },
      {
        id: '5',
        title: 'Child Labor in Garment Industry - Rescue Mission',
        content: 'Found 8 children aged 10-14 working in a garment factory in Tirupur. They work 12+ hours daily for just ₹50. Need immediate rescue and rehabilitation support.',
        author: {
          id: 'user4',
          name: 'Meera Krishnan',
          avatar: 'https://picsum.photos/40/40?random=5',
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
        urgency: 'critical',
        source: 'user',
        media: [{
          type: 'image',
          url: 'https://picsum.photos/400/300?random=14'
        }]
      }
    ]

    // Filter by category if specified
    let filteredPosts = mockPosts
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }

    // Filter by location if specified
    if (location) {
      filteredPosts = filteredPosts.filter(post => 
        post.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Sort by timestamp
    filteredPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      count: filteredPosts.length,
      filters: {
        category: category || 'all',
        location: location || 'all',
        source
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch forum posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
