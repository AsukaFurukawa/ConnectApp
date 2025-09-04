import { prisma } from '@/lib/db'

export interface RealNGOActivity {
  id: string
  ngoName: string
  ngoLogo?: string
  title: string
  description: string
  category: string
  location: string
  coordinates: { lat: number; lng: number }
  date: string
  images: string[]
  videos: string[]
  likes: number
  comments: number
  shares: number
  impact: string
  verified: boolean
  source: string
  externalUrl?: string
}

export interface RealVolunteerRequest {
  id: string
  ngoName: string
  ngoLogo?: string
  title: string
  description: string
  category: string
  location: string
  coordinates: { lat: number; lng: number }
  startDate: string
  endDate?: string
  skillsRequired: string[]
  timeCommitment: string
  images: string[]
  videos: string[]
  applicationUrl?: string
  externalUrl?: string
}

export interface RealFundraiser {
  id: string
  ngoName: string
  ngoLogo?: string
  title: string
  description: string
  category: string
  location: string
  coordinates: { lat: number; lng: number }
  targetAmount: number
  currentAmount: number
  endDate: string
  images: string[]
  videos: string[]
  donationUrl?: string
  externalUrl?: string
}

export class RealNGODataService {
  // Fetch data from Darpan API (Government of India NGO Registry)
  static async fetchFromDarpan(location?: string, category?: string): Promise<RealNGOActivity[]> {
    try {
      // In production, this would make actual API calls to Darpan
      // For now, we'll simulate with enhanced mock data
      const darpanData: RealNGOActivity[] = [
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
          source: 'darpan',
          externalUrl: 'https://teachforindia.org'
        }
      ]

      return this.filterData(darpanData, location, category)
    } catch (error) {
      console.error('Error fetching from Darpan:', error)
      return []
    }
  }

  // Fetch data from GiveIndia API
  static async fetchFromGiveIndia(location?: string, category?: string): Promise<RealNGOActivity[]> {
    try {
      // In production, this would make actual API calls to GiveIndia
      const giveIndiaData: RealNGOActivity[] = [
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
        }
      ]

      return this.filterData(giveIndiaData, location, category)
    } catch (error) {
      console.error('Error fetching from GiveIndia:', error)
      return []
    }
  }

  // Fetch data from Ketto API
  static async fetchFromKetto(location?: string, category?: string): Promise<RealFundraiser[]> {
    try {
      // In production, this would make actual API calls to Ketto
      const kettoData: RealFundraiser[] = [
        {
          id: 'ketto-1',
          ngoName: 'Goonj',
          ngoLogo: 'https://picsum.photos/100/100?random=15',
          title: 'Rural Development Initiative in Rajasthan',
          description: 'Upcoming comprehensive rural development program focusing on water conservation, education, and women empowerment in 20 villages of Rajasthan.',
          category: 'rural-development',
          location: 'Rajasthan, India',
          coordinates: { lat: 26.2389, lng: 73.0243 },
          targetAmount: 500000,
          currentAmount: 125000,
          endDate: '2025-10-30',
          images: [
            'https://picsum.photos/400/300?random=5',
            'https://picsum.photos/400/300?random=6'
          ],
          videos: [],
          donationUrl: 'https://ketto.org/fundraiser/goonj-rural-development',
          externalUrl: 'https://goonj.org'
        }
      ]

      return this.filterData(kettoData, location, category)
    } catch (error) {
      console.error('Error fetching from Ketto:', error)
      return []
    }
  }

  // Web scraping for NGO websites
  static async scrapeNGOWebsite(url: string): Promise<RealNGOActivity[]> {
    try {
      // In production, this would use a web scraping service like Puppeteer or Cheerio
      // For now, we'll return mock data based on the URL
      const mockData: RealNGOActivity[] = []

      if (url.includes('teachforindia.org')) {
        mockData.push({
          id: 'scraped-tfi-1',
          ngoName: 'Teach For India',
          ngoLogo: 'https://picsum.photos/100/100?random=16',
          title: 'Fellowship Program 2025',
          description: 'Join our 2-year fellowship program to transform education in government schools across India.',
          category: 'education',
          location: 'Multiple Cities, India',
          coordinates: { lat: 19.0760, lng: 72.8777 },
          date: '2025-10-01',
          images: ['https://picsum.photos/400/300?random=7'],
          videos: [],
          likes: 150,
          comments: 25,
          shares: 8,
          impact: '500+ fellows impacting 10,000+ students',
          verified: true,
          source: 'website-scraping',
          externalUrl: url
        })
      }

      return mockData
    } catch (error) {
      console.error('Error scraping NGO website:', error)
      return []
    }
  }

  // Store data in database
  static async storeNGOData(data: RealNGOActivity[]): Promise<void> {
    try {
      for (const activity of data) {
        await prisma.nGOActivity.upsert({
          where: { id: activity.id },
          update: {
            ngoName: activity.ngoName,
            ngoLogo: activity.ngoLogo,
            title: activity.title,
            description: activity.description,
            category: activity.category,
            location: activity.location,
            coordinates: activity.coordinates,
            date: new Date(activity.date),
            images: activity.images,
            videos: activity.videos,
            likes: activity.likes,
            comments: activity.comments,
            shares: activity.shares,
            impact: activity.impact,
            verified: activity.verified,
            source: activity.source,
            externalUrl: activity.externalUrl
          },
          create: {
            id: activity.id,
            ngoName: activity.ngoName,
            ngoLogo: activity.ngoLogo,
            title: activity.title,
            description: activity.description,
            category: activity.category,
            location: activity.location,
            coordinates: activity.coordinates,
            date: new Date(activity.date),
            images: activity.images,
            videos: activity.videos,
            likes: activity.likes,
            comments: activity.comments,
            shares: activity.shares,
            impact: activity.impact,
            verified: activity.verified,
            source: activity.source,
            externalUrl: activity.externalUrl
          }
        })
      }
    } catch (error) {
      console.error('Error storing NGO data:', error)
      throw error
    }
  }

  // Get data from database
  static async getNGODataFromDB(location?: string, category?: string): Promise<RealNGOActivity[]> {
    try {
      const where: any = {}
      
      if (location) {
        where.location = {
          contains: location,
          mode: 'insensitive'
        }
      }
      
      if (category && category !== 'all') {
        where.category = category
      }

      const activities = await prisma.nGOActivity.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 50
      })

      return activities.map(activity => ({
        id: activity.id,
        ngoName: activity.ngoName,
        ngoLogo: activity.ngoLogo,
        title: activity.title,
        description: activity.description,
        category: activity.category,
        location: activity.location,
        coordinates: activity.coordinates as { lat: number; lng: number },
        date: activity.date.toISOString().split('T')[0],
        images: activity.images,
        videos: activity.videos,
        likes: activity.likes,
        comments: activity.comments,
        shares: activity.shares,
        impact: activity.impact,
        verified: activity.verified,
        source: activity.source,
        externalUrl: activity.externalUrl
      }))
    } catch (error) {
      console.error('Error fetching NGO data from DB:', error)
      return []
    }
  }

  // Filter data by location and category
  private static filterData<T extends { location: string; category: string }>(
    data: T[],
    location?: string,
    category?: string
  ): T[] {
    let filtered = data

    if (location) {
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    return filtered
  }

  // Sync data from all sources
  static async syncAllNGOData(): Promise<void> {
    try {
      console.log('Starting NGO data sync...')

      // Fetch from all sources
      const [darpanData, giveIndiaData, kettoData] = await Promise.all([
        this.fetchFromDarpan(),
        this.fetchFromGiveIndia(),
        this.fetchFromKetto()
      ])

      // Store in database
      await Promise.all([
        this.storeNGOData(darpanData),
        this.storeNGOData(giveIndiaData),
        this.storeNGOData(kettoData)
      ])

      console.log('NGO data sync completed successfully')
    } catch (error) {
      console.error('Error syncing NGO data:', error)
      throw error
    }
  }
}
