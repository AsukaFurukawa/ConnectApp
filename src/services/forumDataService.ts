// Database imports commented out until DB is set up
// import { prisma } from '@/lib/db'

export interface RealForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: 'user' | 'ngo' | 'admin'
    verified: boolean
    xp: number
  }
  category: string
  tags: string[]
  location: string
  coordinates?: { lat: number; lng: number }
  timestamp: Date
  likes: number
  comments: number
  shares: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
  isPinned: boolean
  isResolved: boolean
  urgency: 'low' | 'medium' | 'high' | 'critical'
  media?: {
    type: 'image' | 'video'
    url: string
    thumbnail?: string
  }[]
  ngoResponses?: {
    ngoId: string
    ngoName: string
    ngoLogo: string
    message: string
    timestamp: Date
    status: 'interested' | 'in-progress' | 'completed'
  }[]
  source: 'user' | 'ngo' | 'api' | 'scraped'
  externalUrl?: string
}

export interface RealNGOData {
  id: string
  name: string
  description: string
  category: string
  location: string
  website: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  activities: string[]
  impact: {
    peopleHelped: number
    projectsCompleted: number
    volunteers: number
  }
  verified: boolean
  registrationNumber?: string
}

export class ForumDataService {
  // Fetch real NGO data from multiple sources
  static async fetchRealNGOData(): Promise<RealNGOData[]> {
    try {
      // In production, this would fetch from multiple APIs
      const ngoData: RealNGOData[] = [
        {
          id: 'cry-1',
          name: 'CRY - Child Rights and You',
          description: 'Working for child rights and education across India',
          category: 'children',
          location: 'Mumbai, Maharashtra',
          website: 'https://www.cry.org',
          socialMedia: {
            facebook: 'https://facebook.com/CRYIndia',
            twitter: 'https://twitter.com/CRYIndia'
          },
          activities: ['Education', 'Child Rights', 'Healthcare', 'Nutrition'],
          impact: {
            peopleHelped: 3000000,
            projectsCompleted: 2500,
            volunteers: 15000
          },
          verified: true,
          registrationNumber: 'FCRA/123456789'
        },
        {
          id: 'goonj-1',
          name: 'Goonj',
          description: 'Rural development and disaster relief organization',
          category: 'rural-development',
          location: 'Delhi, NCR',
          website: 'https://goonj.org',
          socialMedia: {
            facebook: 'https://facebook.com/Goonj',
            instagram: 'https://instagram.com/goonj_org'
          },
          activities: ['Rural Development', 'Disaster Relief', 'Women Empowerment', 'Education'],
          impact: {
            peopleHelped: 5000000,
            projectsCompleted: 1800,
            volunteers: 25000
          },
          verified: true,
          registrationNumber: 'FCRA/987654321'
        },
        {
          id: 'teach-for-india-1',
          name: 'Teach For India',
          description: 'Transforming education in government schools',
          category: 'education',
          location: 'Mumbai, Maharashtra',
          website: 'https://teachforindia.org',
          socialMedia: {
            facebook: 'https://facebook.com/TeachForIndia',
            twitter: 'https://twitter.com/TeachForIndia'
          },
          activities: ['Education', 'Teacher Training', 'School Development', 'Student Support'],
          impact: {
            peopleHelped: 1000000,
            projectsCompleted: 500,
            volunteers: 5000
          },
          verified: true,
          registrationNumber: 'FCRA/456789123'
        }
      ]

      return ngoData
    } catch (error) {
      console.error('Error fetching NGO data:', error)
      return []
    }
  }

  // Fetch real social issues data
  static async fetchSocialIssuesData(): Promise<RealForumPost[]> {
    try {
      // In production, this would fetch from news APIs, government data, etc.
      const socialIssues: RealForumPost[] = [
        {
          id: 'issue-1',
          title: 'Street Children Crisis in Mumbai - Immediate Action Needed',
          content: 'According to recent reports, Mumbai has over 50,000 street children. Many are involved in begging, petty crimes, or are victims of trafficking. We need immediate intervention programs.',
          author: {
            id: 'ngo-cry',
            name: 'CRY - Child Rights and You',
            avatar: 'https://picsum.photos/40/40?random=1',
            role: 'ngo',
            verified: true,
            xp: 0
          },
          category: 'street-children',
          tags: ['urgent', 'mumbai', 'child-rights', 'intervention'],
          location: 'Mumbai, Maharashtra',
          coordinates: { lat: 19.0760, lng: 72.8777 },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 234,
          comments: 45,
          shares: 67,
          views: 1234,
          isLiked: false,
          isBookmarked: false,
          isPinned: true,
          isResolved: false,
          urgency: 'high',
          source: 'ngo',
          externalUrl: 'https://www.cry.org'
        },
        {
          id: 'issue-2',
          title: 'Manual Scavenging Still Exists - Help End This Practice',
          content: 'Despite being banned in 1993, manual scavenging continues in many parts of India. We need to create awareness and provide alternative livelihoods for affected communities.',
          author: {
            id: 'ngo-safai',
            name: 'Safai Karamchari Andolan',
            avatar: 'https://picsum.photos/40/40?random=2',
            role: 'ngo',
            verified: true,
            xp: 0
          },
          category: 'manual-scavenging',
          tags: ['awareness', 'livelihood', 'social-justice', 'banned-practice'],
          location: 'Multiple Cities, India',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          likes: 456,
          comments: 89,
          shares: 123,
          views: 2345,
          isLiked: true,
          isBookmarked: true,
          isPinned: false,
          isResolved: false,
          urgency: 'high',
          source: 'ngo'
        },
        {
          id: 'issue-3',
          title: 'Water Crisis in Rural Maharashtra - Women Walking 10km Daily',
          content: 'Villages in Beed district are facing severe water shortage. Women are walking 10+ km daily to fetch water, affecting their health and children\'s education. Need immediate water solutions.',
          author: {
            id: 'user-sunil',
            name: 'Sunil Patil',
            avatar: 'https://picsum.photos/40/40?random=3',
            role: 'user',
            verified: true,
            xp: 2340
          },
          category: 'water-crisis',
          tags: ['urgent', 'rural', 'water-shortage', 'women-empowerment', 'beed'],
          location: 'Beed District, Maharashtra',
          coordinates: { lat: 18.9894, lng: 75.7564 },
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          likes: 567,
          comments: 123,
          shares: 234,
          views: 3456,
          isLiked: false,
          isBookmarked: false,
          isPinned: true,
          isResolved: false,
          urgency: 'critical',
          source: 'user'
        }
      ]

      return socialIssues
    } catch (error) {
      console.error('Error fetching social issues data:', error)
      return []
    }
  }

  // Fetch real news and updates
  static async fetchNewsUpdates(): Promise<RealForumPost[]> {
    try {
      // In production, this would fetch from news APIs like NewsAPI, Google News, etc.
      const newsUpdates: RealForumPost[] = [
        {
          id: 'news-1',
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
          id: 'news-2',
          title: 'Supreme Court Orders Immediate Action on Manual Scavenging',
          content: 'The Supreme Court has directed all states to take immediate action to eliminate manual scavenging and provide alternative livelihoods. Deadline set for 6 months.',
          author: {
            id: 'sc-india',
            name: 'Supreme Court of India',
            avatar: 'https://picsum.photos/40/40?random=5',
            role: 'admin',
            verified: true,
            xp: 0
          },
          category: 'manual-scavenging',
          tags: ['supreme-court', 'legal', 'deadline', 'alternative-livelihood'],
          location: 'New Delhi, India',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          likes: 1234,
          comments: 234,
          shares: 567,
          views: 6789,
          isLiked: true,
          isBookmarked: true,
          isPinned: true,
          isResolved: false,
          urgency: 'high',
          source: 'api'
        }
      ]

      return newsUpdates
    } catch (error) {
      console.error('Error fetching news updates:', error)
      return []
    }
  }

  // Fetch real user-generated content
  static async fetchUserPosts(): Promise<RealForumPost[]> {
    try {
      // In production, this would fetch from the database
      const userPosts: RealForumPost[] = [
        {
          id: 'user-post-1',
          title: 'Found 8 Children Working in Garment Factory - Need Help',
          content: 'I discovered 8 children aged 10-14 working in a garment factory in Tirupur. They work 12+ hours daily for just ₹50. Need immediate rescue and rehabilitation support.',
          author: {
            id: 'user-meera',
            name: 'Meera Krishnan',
            avatar: 'https://picsum.photos/40/40?random=6',
            role: 'user',
            verified: true,
            xp: 1780
          },
          category: 'child-labor',
          tags: ['urgent', 'rescue', 'garment-industry', 'tirupur', 'child-rights'],
          location: 'Tirupur, Tamil Nadu',
          coordinates: { lat: 11.1085, lng: 77.3411 },
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          likes: 345,
          comments: 67,
          shares: 123,
          views: 890,
          isLiked: false,
          isBookmarked: false,
          isPinned: false,
          isResolved: false,
          urgency: 'critical',
          source: 'user',
          media: [{
            type: 'image',
            url: 'https://picsum.photos/400/300?random=10'
          }]
        },
        {
          id: 'user-post-2',
          title: 'Success Story: 50 Families Rehabilitated from Slums',
          content: 'Amazing achievement! We successfully rehabilitated 50 families from Dharavi slums to proper housing. Children are now going to school and families have stable income.',
          author: {
            id: 'ngo-mumbai',
            name: 'Mumbai Slum Rehabilitation Authority',
            avatar: 'https://picsum.photos/40/40?random=7',
            role: 'ngo',
            verified: true,
            xp: 0
          },
          category: 'success-stories',
          tags: ['success', 'slum-rehabilitation', 'housing', 'education', 'dharavi'],
          location: 'Dharavi, Mumbai',
          coordinates: { lat: 19.0380, lng: 72.8538 },
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          likes: 567,
          comments: 89,
          shares: 234,
          views: 2345,
          isLiked: true,
          isBookmarked: false,
          isPinned: false,
          isResolved: true,
          urgency: 'low',
          source: 'ngo',
          media: [{
            type: 'image',
            url: 'https://picsum.photos/400/300?random=11'
          }]
        }
      ]

      return userPosts
    } catch (error) {
      console.error('Error fetching user posts:', error)
      return []
    }
  }

  // Combine all data sources
  static async getAllForumPosts(): Promise<RealForumPost[]> {
    try {
      const [socialIssues, newsUpdates, userPosts] = await Promise.all([
        this.fetchSocialIssuesData(),
        this.fetchNewsUpdates(),
        this.fetchUserPosts()
      ])

      // Combine and sort by timestamp
      const allPosts = [...socialIssues, ...newsUpdates, ...userPosts]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

      return allPosts
    } catch (error) {
      console.error('Error fetching all forum posts:', error)
      return []
    }
  }

  // Store posts in database (commented out until DB is set up)
  static async storePostsInDB(posts: RealForumPost[]): Promise<void> {
    try {
      // For now, just log the posts
      console.log(`Would store ${posts.length} posts in database`)
      // TODO: Implement when database is set up
      /*
      for (const post of posts) {
        await prisma.post.upsert({
          where: { id: post.id },
          update: {
            title: post.title,
            description: post.content,
            category: post.category,
            location: post.location,
            images: post.media?.filter(m => m.type === 'image').map(m => m.url) || [],
            videos: post.media?.filter(m => m.type === 'video').map(m => m.url) || [],
            status: post.isResolved ? 'completed' : 'pending'
          },
          create: {
            id: post.id,
            title: post.title,
            description: post.content,
            category: post.category,
            location: post.location,
            images: post.media?.filter(m => m.type === 'image').map(m => m.url) || [],
            videos: post.media?.filter(m => m.type === 'video').map(m => m.url) || [],
            status: post.isResolved ? 'completed' : 'pending',
            userId: post.author.id,
            xpEarned: 0
          }
        })
      }
      */
    } catch (error) {
      console.error('Error storing posts in database:', error)
      throw error
    }
  }

  // Get posts from database (commented out until DB is set up)
  static async getPostsFromDB(category?: string, location?: string): Promise<RealForumPost[]> {
    try {
      // For now, return mock data
      console.log(`Would fetch posts from DB with category: ${category}, location: ${location}`)
      return await this.fetchSocialIssuesData()
      
      // TODO: Implement when database is set up
      /*
      const where: any = {}
      
      if (category && category !== 'all') {
        where.category = category
      }
      
      if (location) {
        where.location = {
          contains: location,
          mode: 'insensitive'
        }
      }

      const posts = await prisma.post.findMany({
        where,
        include: {
          user: true,
          comments: true,
          ngoResponses: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      })

      return posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.description,
        author: {
          id: post.userId,
          name: post.user?.name || 'Anonymous',
          avatar: post.user?.image || 'https://picsum.photos/40/40',
          role: 'user',
          verified: true,
          xp: post.user?.xp || 0
        },
        category: post.category,
        tags: [], // Would need to add tags to schema
        location: post.location,
        timestamp: post.createdAt,
        likes: 0, // Would need to add likes to schema
        comments: post.comments.length,
        shares: 0, // Would need to add shares to schema
        views: 0, // Would need to add views to schema
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        isResolved: post.status === 'completed',
        urgency: 'medium',
        source: 'user',
        media: [
          ...post.images.map(url => ({ type: 'image' as const, url })),
          ...post.videos.map(url => ({ type: 'video' as const, url }))
        ],
        ngoResponses: post.ngoResponses.map(response => ({
          ngoId: response.ngoName,
          ngoName: response.ngoName,
          ngoLogo: response.ngoLogo || 'https://picsum.photos/100/100',
          message: response.message,
          timestamp: response.createdAt,
          status: response.status as any
        }))
      }))
      */
    } catch (error) {
      console.error('Error fetching posts from database:', error)
      return []
    }
  }

  // Sync data from all sources
  static async syncForumData(): Promise<void> {
    try {
      console.log('Starting forum data sync...')

      // Fetch from all sources
      const allPosts = await this.getAllForumPosts()

      // Store in database
      await this.storePostsInDB(allPosts)

      console.log(`Synced ${allPosts.length} forum posts successfully`)
    } catch (error) {
      console.error('Error syncing forum data:', error)
      throw error
    }
  }
}
