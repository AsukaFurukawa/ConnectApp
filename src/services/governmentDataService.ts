export interface GovernmentData {
  id: string
  title: string
  description: string
  department: string
  category: string
  location: string
  publishedAt: Date
  url: string
  type: 'scheme' | 'policy' | 'announcement' | 'report' | 'order'
  status: 'active' | 'draft' | 'closed'
  targetAudience: string[]
  budget?: number
  deadline?: Date
}

export class GovernmentDataService {
  // Fetch data from Ministry of Women and Child Development
  static async fetchWCDData(): Promise<GovernmentData[]> {
    try {
      const wcdData: GovernmentData[] = [
        {
          id: 'wcd-1',
          title: 'Scheme for Street Children',
          description: 'Comprehensive scheme for the welfare and rehabilitation of street children',
          department: 'Ministry of Women and Child Development',
          category: 'street-children',
          location: 'All India',
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          url: 'https://wcd.nic.in/schemes/street-children',
          type: 'scheme',
          status: 'active',
          targetAudience: ['NGOs', 'State Governments', 'Child Welfare Committees'],
          budget: 500000000, // 50 crores
          deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
        },
        {
          id: 'wcd-2',
          title: 'Protection of Children from Sexual Offences (POCSO) Act Implementation',
          description: 'Guidelines for effective implementation of POCSO Act across all states',
          department: 'Ministry of Women and Child Development',
          category: 'children',
          location: 'All India',
          publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          url: 'https://wcd.nic.in/pocso-guidelines',
          type: 'policy',
          status: 'active',
          targetAudience: ['Police', 'Judiciary', 'NGOs', 'Child Welfare Committees']
        }
      ]

      return wcdData
    } catch (error) {
      console.error('Error fetching WCD data:', error)
      return []
    }
  }

  // Fetch data from Ministry of Labour and Employment
  static async fetchLabourData(): Promise<GovernmentData[]> {
    try {
      const labourData: GovernmentData[] = [
        {
          id: 'labour-1',
          title: 'Child Labour (Prohibition and Regulation) Act Amendment',
          description: 'Recent amendments to strengthen child labour laws and enforcement',
          department: 'Ministry of Labour and Employment',
          category: 'child-labor',
          location: 'All India',
          publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          url: 'https://labour.gov.in/child-labour-amendment',
          type: 'policy',
          status: 'active',
          targetAudience: ['Employers', 'NGOs', 'Labour Inspectors', 'State Governments']
        },
        {
          id: 'labour-2',
          title: 'Manual Scavenging Prohibition Act Implementation',
          description: 'Guidelines for elimination of manual scavenging and rehabilitation of workers',
          department: 'Ministry of Labour and Employment',
          category: 'manual-scavenging',
          location: 'All India',
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          url: 'https://labour.gov.in/manual-scavenging',
          type: 'policy',
          status: 'active',
          targetAudience: ['Municipal Corporations', 'NGOs', 'State Governments']
        }
      ]

      return labourData
    } catch (error) {
      console.error('Error fetching Labour data:', error)
      return []
    }
  }

  // Fetch data from Ministry of Jal Shakti (Water Resources)
  static async fetchWaterData(): Promise<GovernmentData[]> {
    try {
      const waterData: GovernmentData[] = [
        {
          id: 'water-1',
          title: 'Jal Jeevan Mission - Har Ghar Jal',
          description: 'Mission to provide safe and adequate drinking water to all rural households',
          department: 'Ministry of Jal Shakti',
          category: 'water-crisis',
          location: 'Rural India',
          publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          url: 'https://jaljeevanmission.gov.in',
          type: 'scheme',
          status: 'active',
          targetAudience: ['State Governments', 'NGOs', 'Rural Communities'],
          budget: 3600000000000, // 3.6 lakh crores
          deadline: new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000) // 4 years
        },
        {
          id: 'water-2',
          title: 'Water Conservation and Management Guidelines',
          description: 'Guidelines for water conservation and sustainable water management practices',
          department: 'Ministry of Jal Shakti',
          category: 'water-crisis',
          location: 'All India',
          publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          url: 'https://jaljeevanmission.gov.in/water-conservation',
          type: 'policy',
          status: 'active',
          targetAudience: ['State Governments', 'NGOs', 'Farmers', 'Industries']
        }
      ]

      return waterData
    } catch (error) {
      console.error('Error fetching Water data:', error)
      return []
    }
  }

  // Fetch data from Ministry of Rural Development
  static async fetchRuralData(): Promise<GovernmentData[]> {
    try {
      const ruralData: GovernmentData[] = [
        {
          id: 'rural-1',
          title: 'Pradhan Mantri Awas Yojana (PMAY) - Rural',
          description: 'Scheme to provide pucca houses to all rural households',
          department: 'Ministry of Rural Development',
          category: 'rural-development',
          location: 'Rural India',
          publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          url: 'https://pmaymis.gov.in',
          type: 'scheme',
          status: 'active',
          targetAudience: ['Rural Households', 'State Governments', 'NGOs'],
          budget: 2000000000000, // 2 lakh crores
          deadline: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000) // 2 years
        },
        {
          id: 'rural-2',
          title: 'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission',
          description: 'Mission to reduce poverty by enabling poor households to access gainful self-employment',
          department: 'Ministry of Rural Development',
          category: 'rural-development',
          location: 'Rural India',
          publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          url: 'https://nrlmsk.gov.in',
          type: 'scheme',
          status: 'active',
          targetAudience: ['Rural Women', 'NGOs', 'State Governments'],
          budget: 1000000000000 // 1 lakh crore
        }
      ]

      return ruralData
    } catch (error) {
      console.error('Error fetching Rural data:', error)
      return []
    }
  }

  // Fetch data from Ministry of Social Justice and Empowerment
  static async fetchSocialJusticeData(): Promise<GovernmentData[]> {
    try {
      const socialJusticeData: GovernmentData[] = [
        {
          id: 'social-1',
          title: 'Prevention of Atrocities Act Implementation',
          description: 'Guidelines for effective implementation of SC/ST Prevention of Atrocities Act',
          department: 'Ministry of Social Justice and Empowerment',
          category: 'caste-discrimination',
          location: 'All India',
          publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          url: 'https://socialjustice.gov.in/atrocities-act',
          type: 'policy',
          status: 'active',
          targetAudience: ['Police', 'Judiciary', 'NGOs', 'State Governments']
        },
        {
          id: 'social-2',
          title: 'National Action Plan for Drug Demand Reduction',
          description: 'Comprehensive action plan to address drug abuse and addiction',
          department: 'Ministry of Social Justice and Empowerment',
          category: 'social-issues',
          location: 'All India',
          publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
          url: 'https://socialjustice.gov.in/drug-demand-reduction',
          type: 'policy',
          status: 'active',
          targetAudience: ['NGOs', 'State Governments', 'Educational Institutions']
        }
      ]

      return socialJusticeData
    } catch (error) {
      console.error('Error fetching Social Justice data:', error)
      return []
    }
  }

  // Combine all government data
  static async getAllGovernmentData(): Promise<GovernmentData[]> {
    try {
      const [wcdData, labourData, waterData, ruralData, socialJusticeData] = await Promise.all([
        this.fetchWCDData(),
        this.fetchLabourData(),
        this.fetchWaterData(),
        this.fetchRuralData(),
        this.fetchSocialJusticeData()
      ])

      // Combine and sort by date
      const allData = [...wcdData, ...labourData, ...waterData, ...ruralData, ...socialJusticeData]
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())

      return allData
    } catch (error) {
      console.error('Error fetching all government data:', error)
      return []
    }
  }

  // Convert government data to forum posts
  static async convertGovernmentDataToForumPosts(): Promise<any[]> {
    try {
      const govData = await this.getAllGovernmentData()
      
      return govData.map(data => ({
        id: `gov-${data.id}`,
        title: data.title,
        content: data.description,
        author: {
          id: `gov-${data.department.toLowerCase().replace(/\s+/g, '-')}`,
          name: data.department,
          avatar: 'https://picsum.photos/40/40',
          role: 'admin',
          verified: true,
          xp: 0
        },
        category: data.category,
        tags: [data.type, ...data.targetAudience.map(audience => audience.toLowerCase())],
        location: data.location,
        timestamp: data.publishedAt,
        likes: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 2000),
        isLiked: false,
        isBookmarked: false,
        isPinned: data.status === 'active',
        isResolved: false,
        urgency: data.status === 'active' ? 'high' : 'medium',
        source: 'api',
        externalUrl: data.url,
        media: []
      }))
    } catch (error) {
      console.error('Error converting government data to forum posts:', error)
      return []
    }
  }
}
