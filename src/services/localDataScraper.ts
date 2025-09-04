export interface ScrapedData {
  id: string
  title: string
  content: string
  source: string
  url: string
  timestamp: Date
  category: string
  location: string
  tags: string[]
  author: string
  verified: boolean
}

export class LocalDataScraper {
  // Scrape from local JSON files (simulating real data sources)
  static async scrapeFromLocalSources(): Promise<ScrapedData[]> {
    try {
      const scrapedData: ScrapedData[] = []

      // Simulate scraping from various local sources
      const sources = [
        {
          name: 'Government Data',
          url: 'https://data.gov.in',
          data: this.getGovernmentData()
        },
        {
          name: 'NGO Reports',
          url: 'https://ngosindia.org',
          data: this.getNGOReports()
        },
        {
          name: 'News Sources',
          url: 'https://newsapi.org',
          data: this.getNewsData()
        },
        {
          name: 'Social Media',
          url: 'https://twitter.com',
          data: this.getSocialMediaData()
        }
      ]

      for (const source of sources) {
        console.log(`Scraping data from ${source.name}...`)
        scrapedData.push(...source.data)
      }

      return scrapedData
    } catch (error) {
      console.error('Error scraping local data:', error)
      return []
    }
  }

  // Government data (simulated from data.gov.in)
  private static getGovernmentData(): ScrapedData[] {
    return [
      {
        id: 'gov-1',
        title: 'Street Children Rehabilitation Scheme - New Guidelines',
        content: 'The Ministry of Women and Child Development has issued new guidelines for the Street Children Rehabilitation Scheme. NGOs can now apply for funding up to ₹50 lakhs per project.',
        source: 'Ministry of WCD',
        url: 'https://wcd.nic.in/street-children-scheme',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        category: 'street-children',
        location: 'All India',
        tags: ['government', 'scheme', 'funding', 'rehabilitation'],
        author: 'Government of India',
        verified: true
      },
      {
        id: 'gov-2',
        title: 'Manual Scavenging Elimination - Supreme Court Order',
        content: 'The Supreme Court has directed all states to eliminate manual scavenging within 6 months. States must provide alternative livelihoods and rehabilitation for affected workers.',
        source: 'Supreme Court of India',
        url: 'https://sci.gov.in/manual-scavenging-order',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        category: 'manual-scavenging',
        location: 'All India',
        tags: ['supreme-court', 'legal', 'elimination', 'rehabilitation'],
        author: 'Supreme Court of India',
        verified: true
      },
      {
        id: 'gov-3',
        title: 'Jal Jeevan Mission - Water Crisis Solutions',
        content: 'The Jal Jeevan Mission has allocated ₹3.6 lakh crores for providing safe drinking water to all rural households. Focus on water-scarce regions like Maharashtra and Rajasthan.',
        source: 'Ministry of Jal Shakti',
        url: 'https://jaljeevanmission.gov.in',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        category: 'water-crisis',
        location: 'Rural India',
        tags: ['water', 'rural', 'mission', 'infrastructure'],
        author: 'Ministry of Jal Shakti',
        verified: true
      }
    ]
  }

  // NGO reports (simulated from NGO websites)
  private static getNGOReports(): ScrapedData[] {
    return [
      {
        id: 'ngo-1',
        title: 'CRY Annual Report - 2.5M Children Helped',
        content: 'CRY has released its annual report showing that 2.5 million children have been helped through various programs. Major focus on education, healthcare, and child rights.',
        source: 'CRY - Child Rights and You',
        url: 'https://cry.org/annual-report-2024',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        category: 'children',
        location: 'Multiple States',
        tags: ['annual-report', 'children', 'education', 'healthcare'],
        author: 'CRY India',
        verified: true
      },
      {
        id: 'ngo-2',
        title: 'Goonj - Rural Development Impact Report',
        content: 'Goonj has successfully implemented rural development projects in 500+ villages. Focus on women empowerment, disaster relief, and sustainable livelihoods.',
        source: 'Goonj',
        url: 'https://goonj.org/impact-report',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        category: 'rural-development',
        location: 'Rural India',
        tags: ['rural-development', 'women-empowerment', 'disaster-relief'],
        author: 'Goonj',
        verified: true
      },
      {
        id: 'ngo-3',
        title: 'Teach For India - Education Transformation',
        content: 'Teach For India has placed 1000+ fellows in government schools across 7 cities. Significant improvement in student learning outcomes and teacher training.',
        source: 'Teach For India',
        url: 'https://teachforindia.org/impact-2024',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        category: 'education',
        location: '7 Cities',
        tags: ['education', 'teachers', 'government-schools', 'transformation'],
        author: 'Teach For India',
        verified: true
      }
    ]
  }

  // News data (simulated from news sources)
  private static getNewsData(): ScrapedData[] {
    return [
      {
        id: 'news-1',
        title: 'Child Labor Cases Increase in Garment Industry',
        content: 'Recent raids in Tamil Nadu and Karnataka have revealed an increase in child labor cases. Over 200 children rescued from garment factories in the past month.',
        source: 'The Hindu',
        url: 'https://thehindu.com/child-labor-increase',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        category: 'child-labor',
        location: 'Tamil Nadu, Karnataka',
        tags: ['child-labor', 'garment-industry', 'raids', 'rescue'],
        author: 'The Hindu',
        verified: true
      },
      {
        id: 'news-2',
        title: 'Water Crisis in Maharashtra - 600 Villages Affected',
        content: 'Over 600 villages in Maharashtra are facing severe water shortage. Women are walking 10+ km daily to fetch water, affecting their health and children\'s education.',
        source: 'Times of India',
        url: 'https://timesofindia.com/maharashtra-water-crisis',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
        category: 'water-crisis',
        location: 'Maharashtra',
        tags: ['water-crisis', 'drought', 'rural', 'women-empowerment'],
        author: 'Times of India',
        verified: true
      },
      {
        id: 'news-3',
        title: 'Anti-Dowry Campaign Gains Momentum',
        content: 'Several NGOs have launched a nationwide campaign against dowry. The campaign includes legal aid, counseling services, and awareness programs in rural areas.',
        source: 'Indian Express',
        url: 'https://indianexpress.com/anti-dowry-campaign',
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
        category: 'dowry-system',
        location: 'Multiple Cities',
        tags: ['anti-dowry', 'awareness', 'legal-aid', 'women-rights'],
        author: 'Indian Express',
        verified: true
      }
    ]
  }

  // Social media data (simulated from Twitter, Facebook, etc.)
  private static getSocialMediaData(): ScrapedData[] {
    return [
      {
        id: 'social-1',
        title: 'Viral Video: Street Children in Mumbai Need Help',
        content: 'A video showing the plight of street children in Mumbai has gone viral with 1M+ views. Several NGOs have responded with immediate action plans.',
        source: 'Twitter',
        url: 'https://twitter.com/street-children-mumbai',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        category: 'street-children',
        location: 'Mumbai',
        tags: ['viral', 'social-media', 'mumbai', 'street-children'],
        author: '@SocialActivist',
        verified: false
      },
      {
        id: 'social-2',
        title: 'Menstrual Hygiene Awareness Campaign',
        content: 'A grassroots campaign for menstrual hygiene awareness in rural schools has gained traction on social media. Over 50,000 people have shared the campaign.',
        source: 'Facebook',
        url: 'https://facebook.com/menstrual-hygiene-campaign',
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
        category: 'menstrual-hygiene',
        location: 'Rural India',
        tags: ['menstrual-hygiene', 'awareness', 'rural-schools', 'campaign'],
        author: 'Rural Health Initiative',
        verified: true
      },
      {
        id: 'social-3',
        title: 'Disaster Relief - Flood Victims in Assam',
        content: 'Heavy monsoon rains have caused severe flooding in Assam. Social media is being used to coordinate relief efforts and donations for affected families.',
        source: 'Instagram',
        url: 'https://instagram.com/assam-flood-relief',
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
        category: 'disaster-relief',
        location: 'Assam',
        tags: ['flood', 'disaster-relief', 'assam', 'monsoon'],
        author: 'Assam Relief Network',
        verified: true
      }
    ]
  }

  // Convert scraped data to forum post format
  static async convertToForumPosts(): Promise<any[]> {
    try {
      const scrapedData = await this.scrapeFromLocalSources()
      
      return scrapedData.map(data => ({
        id: data.id,
        title: data.title,
        content: data.content,
        author: {
          id: data.author.toLowerCase().replace(/\s+/g, '-'),
          name: data.author,
          avatar: `https://picsum.photos/40/40?random=${data.id}`,
          role: data.source.includes('Government') || data.source.includes('Ministry') ? 'admin' : 
                data.source.includes('CRY') || data.source.includes('Goonj') || data.source.includes('Teach') ? 'ngo' : 'user',
          verified: data.verified,
          xp: Math.floor(Math.random() * 1000)
        },
        category: data.category,
        tags: data.tags,
        location: data.location,
        timestamp: data.timestamp,
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 2000),
        isLiked: false,
        isBookmarked: false,
        isPinned: data.source.includes('Government') || data.source.includes('Supreme Court'),
        isResolved: false,
        urgency: data.category === 'disaster-relief' || data.category === 'child-labor' ? 'critical' : 
                 data.category === 'water-crisis' || data.category === 'street-children' ? 'high' : 'medium',
        source: 'scraped',
        externalUrl: data.url,
        media: [{
          type: 'image',
          url: `https://picsum.photos/400/300?random=${data.id}`
        }]
      }))
    } catch (error) {
      console.error('Error converting scraped data to forum posts:', error)
      return []
    }
  }

  // Scrape from specific websites (simulated)
  static async scrapeFromWebsite(url: string): Promise<ScrapedData[]> {
    try {
      console.log(`Scraping data from ${url}...`)
      
      // Simulate different website scraping based on URL
      if (url.includes('data.gov.in')) {
        return this.getGovernmentData()
      } else if (url.includes('ngosindia.org')) {
        return this.getNGOReports()
      } else if (url.includes('newsapi.org')) {
        return this.getNewsData()
      } else if (url.includes('twitter.com')) {
        return this.getSocialMediaData()
      } else {
        // Generic scraping simulation
        return [{
          id: `scraped-${Date.now()}`,
          title: `Data scraped from ${url}`,
          content: `This is simulated data scraped from ${url}. In a real implementation, this would contain actual scraped content.`,
          source: 'Web Scraper',
          url: url,
          timestamp: new Date(),
          category: 'general',
          location: 'Unknown',
          tags: ['scraped', 'web-data'],
          author: 'Web Scraper',
          verified: false
        }]
      }
    } catch (error) {
      console.error(`Error scraping from ${url}:`, error)
      return []
    }
  }

  // Get all available data sources
  static getAvailableSources(): string[] {
    return [
      'https://data.gov.in',
      'https://ngosindia.org',
      'https://newsapi.org',
      'https://twitter.com',
      'https://facebook.com',
      'https://instagram.com',
      'https://wcd.nic.in',
      'https://labour.gov.in',
      'https://jaljeevanmission.gov.in'
    ]
  }
}
