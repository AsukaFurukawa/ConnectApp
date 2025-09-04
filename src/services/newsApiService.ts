export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  imageUrl?: string
  publishedAt: Date
  source: string
  category: string
  tags: string[]
  location?: string
  relevance: 'high' | 'medium' | 'low'
}

export class NewsApiService {
  // Fetch news from NewsAPI (requires API key)
  static async fetchNewsFromAPI(query: string = 'NGO India social issues'): Promise<NewsArticle[]> {
    try {
      // In production, you would use a real NewsAPI key
      const apiKey = process.env.NEWS_API_KEY || 'demo-key'
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&language=en&sortBy=publishedAt&pageSize=20`
      
      // For demo purposes, return mock data
      const mockNews: NewsArticle[] = [
        {
          id: 'news-1',
          title: 'Government Launches New Scheme for Street Children Rehabilitation',
          description: 'The Ministry of Women and Child Development has launched a comprehensive scheme to provide education and rehabilitation for street children across India.',
          content: 'The new scheme aims to provide shelter, education, and vocational training to street children. NGOs can now apply for funding to run rehabilitation centers.',
          url: 'https://wcd.nic.in/schemes/street-children',
          imageUrl: 'https://picsum.photos/400/300?random=20',
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          source: 'Ministry of WCD',
          category: 'street-children',
          tags: ['government', 'scheme', 'funding', 'education', 'rehabilitation'],
          location: 'New Delhi, India',
          relevance: 'high'
        },
        {
          id: 'news-2',
          title: 'Supreme Court Orders Immediate Action on Manual Scavenging',
          description: 'The Supreme Court has directed all states to take immediate action to eliminate manual scavenging and provide alternative livelihoods.',
          content: 'The court has set a 6-month deadline for states to implement the Prohibition of Employment as Manual Scavengers Act, 2013.',
          url: 'https://sci.gov.in/judgments',
          imageUrl: 'https://picsum.photos/400/300?random=21',
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          source: 'Supreme Court of India',
          category: 'manual-scavenging',
          tags: ['supreme-court', 'legal', 'deadline', 'alternative-livelihood'],
          location: 'New Delhi, India',
          relevance: 'high'
        },
        {
          id: 'news-3',
          title: 'Water Crisis in Maharashtra: 600 Villages Face Severe Shortage',
          description: 'Over 600 villages in Maharashtra are facing severe water shortage, with women walking 10+ km daily to fetch water.',
          content: 'The state government has declared drought in several districts and is providing water tankers to affected villages.',
          url: 'https://maharashtra.gov.in/water-crisis',
          imageUrl: 'https://picsum.photos/400/300?random=22',
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          source: 'Maharashtra Government',
          category: 'water-crisis',
          tags: ['water-shortage', 'drought', 'rural', 'women-empowerment'],
          location: 'Maharashtra, India',
          relevance: 'high'
        },
        {
          id: 'news-4',
          title: 'Child Labor Cases Increase in Garment Industry',
          description: 'Recent raids have revealed an increase in child labor cases in garment factories across Tamil Nadu and Karnataka.',
          content: 'Labor department officials have rescued over 200 children from various factories in the past month.',
          url: 'https://labour.gov.in/child-labor',
          imageUrl: 'https://picsum.photos/400/300?random=23',
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          source: 'Ministry of Labour',
          category: 'child-labor',
          tags: ['child-labor', 'garment-industry', 'rescue', 'tamil-nadu'],
          location: 'Tamil Nadu, India',
          relevance: 'high'
        },
        {
          id: 'news-5',
          title: 'NGOs Launch Anti-Dowry Campaign Across India',
          description: 'Several NGOs have launched a nationwide campaign to raise awareness about the dowry system and provide support to victims.',
          content: 'The campaign includes legal aid, counseling services, and awareness programs in rural and urban areas.',
          url: 'https://ngos-anti-dowry.org',
          imageUrl: 'https://picsum.photos/400/300?random=24',
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          source: 'NGO Alliance',
          category: 'dowry-system',
          tags: ['anti-dowry', 'awareness', 'legal-aid', 'women-rights'],
          location: 'Multiple Cities, India',
          relevance: 'medium'
        }
      ]

      return mockNews
    } catch (error) {
      console.error('Error fetching news from API:', error)
      return []
    }
  }

  // Fetch news from Google News RSS
  static async fetchNewsFromRSS(): Promise<NewsArticle[]> {
    try {
      // In production, you would parse RSS feeds
      const mockRSSNews: NewsArticle[] = [
        {
          id: 'rss-1',
          title: 'Disaster Relief: Flood Victims in Assam Need Immediate Help',
          description: 'Heavy monsoon rains have caused severe flooding in Assam, displacing thousands of families.',
          content: 'The Assam State Disaster Management Authority has set up relief camps and is coordinating with NGOs for rescue operations.',
          url: 'https://assam.gov.in/flood-relief',
          imageUrl: 'https://picsum.photos/400/300?random=25',
          publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          source: 'Assam Government',
          category: 'disaster-relief',
          tags: ['flood', 'disaster-relief', 'assam', 'monsoon'],
          location: 'Assam, India',
          relevance: 'high'
        },
        {
          id: 'rss-2',
          title: 'Menstrual Hygiene Program Launched in Rural Schools',
          description: 'A new program has been launched to provide menstrual hygiene facilities in rural schools across India.',
          content: 'The program includes building proper washrooms, providing sanitary pads, and conducting awareness sessions.',
          url: 'https://education.gov.in/menstrual-hygiene',
          imageUrl: 'https://picsum.photos/400/300?random=26',
          publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          source: 'Ministry of Education',
          category: 'menstrual-hygiene',
          tags: ['menstrual-hygiene', 'rural-schools', 'women-empowerment', 'education'],
          location: 'Rural India',
          relevance: 'medium'
        }
      ]

      return mockRSSNews
    } catch (error) {
      console.error('Error fetching news from RSS:', error)
      return []
    }
  }

  // Fetch news from social media APIs
  static async fetchNewsFromSocialMedia(): Promise<NewsArticle[]> {
    try {
      // In production, you would use Twitter API, Facebook API, etc.
      const mockSocialNews: NewsArticle[] = [
        {
          id: 'social-1',
          title: 'Viral Video: Street Children in Mumbai Need Help',
          description: 'A video showing the plight of street children in Mumbai has gone viral on social media.',
          content: 'The video has garnered over 1 million views and has prompted several NGOs to take action.',
          url: 'https://twitter.com/street-children-mumbai',
          imageUrl: 'https://picsum.photos/400/300?random=27',
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          source: 'Twitter',
          category: 'street-children',
          tags: ['viral', 'social-media', 'mumbai', 'street-children'],
          location: 'Mumbai, India',
          relevance: 'high'
        }
      ]

      return mockSocialNews
    } catch (error) {
      console.error('Error fetching news from social media:', error)
      return []
    }
  }

  // Combine all news sources
  static async getAllNews(): Promise<NewsArticle[]> {
    try {
      const [apiNews, rssNews, socialNews] = await Promise.all([
        this.fetchNewsFromAPI(),
        this.fetchNewsFromRSS(),
        this.fetchNewsFromSocialMedia()
      ])

      // Combine and sort by relevance and date
      const allNews = [...apiNews, ...rssNews, ...socialNews]
        .sort((a, b) => {
          // Sort by relevance first, then by date
          const relevanceOrder = { high: 3, medium: 2, low: 1 }
          const relevanceDiff = relevanceOrder[b.relevance] - relevanceOrder[a.relevance]
          if (relevanceDiff !== 0) return relevanceDiff
          return b.publishedAt.getTime() - a.publishedAt.getTime()
        })

      return allNews
    } catch (error) {
      console.error('Error fetching all news:', error)
      return []
    }
  }

  // Convert news articles to forum posts
  static async convertNewsToForumPosts(): Promise<any[]> {
    try {
      const news = await this.getAllNews()
      
      return news.map(article => ({
        id: `news-${article.id}`,
        title: article.title,
        content: article.description,
        author: {
          id: `source-${article.source.toLowerCase().replace(/\s+/g, '-')}`,
          name: article.source,
          avatar: 'https://picsum.photos/40/40',
          role: 'admin',
          verified: true,
          xp: 0
        },
        category: article.category,
        tags: article.tags,
        location: article.location || 'India',
        timestamp: article.publishedAt,
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 30),
        views: Math.floor(Math.random() * 1000),
        isLiked: false,
        isBookmarked: false,
        isPinned: article.relevance === 'high',
        isResolved: false,
        urgency: article.relevance,
        source: 'api',
        externalUrl: article.url,
        media: article.imageUrl ? [{
          type: 'image',
          url: article.imageUrl
        }] : []
      }))
    } catch (error) {
      console.error('Error converting news to forum posts:', error)
      return []
    }
  }
}
