import { NextRequest, NextResponse } from 'next/server'
import { LocalDataScraper } from '@/services/localDataScraper'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const source = searchParams.get('source')

    console.log('🕷️ Starting local data scraping...')

    let scrapedPosts

    if (source) {
      // Scrape from specific source
      scrapedPosts = await LocalDataScraper.scrapeFromWebsite(source)
    } else {
      // Scrape from all local sources
      scrapedPosts = await LocalDataScraper.convertToForumPosts()
    }

    // Filter by category if specified
    if (category && category !== 'all') {
      scrapedPosts = scrapedPosts.filter(post => post.category === category)
    }

    // Filter by location if specified
    if (location) {
      scrapedPosts = scrapedPosts.filter(post => 
        post.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Sort by timestamp
    scrapedPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    console.log(`✅ Scraped ${scrapedPosts.length} posts successfully`)

    return NextResponse.json({
      success: true,
      data: scrapedPosts,
      count: scrapedPosts.length,
      filters: {
        category: category || 'all',
        location: location || 'all',
        source: source || 'all-local-sources'
      },
      sources: LocalDataScraper.getAvailableSources(),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error scraping local data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to scrape local data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sources, categories, locations } = body

    console.log('🕷️ Starting multi-source scraping...')

    const allScrapedData: any[] = []

    // Scrape from specified sources
    if (sources && sources.length > 0) {
      for (const source of sources) {
        const data = await LocalDataScraper.scrapeFromWebsite(source)
        allScrapedData.push(...data)
      }
    } else {
      // Scrape from all sources
      const data = await LocalDataScraper.convertToForumPosts()
      allScrapedData.push(...data)
    }

    // Filter by categories if specified
    let filteredData = allScrapedData
    if (categories && categories.length > 0) {
      filteredData = filteredData.filter(item => 
        categories.includes(item.category)
      )
    }

    // Filter by locations if specified
    if (locations && locations.length > 0) {
      filteredData = filteredData.filter(item => 
        locations.some((location: string) => 
          item.location.toLowerCase().includes(location.toLowerCase())
        )
      )
    }

    // Sort by timestamp
    filteredData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    console.log(`✅ Multi-source scraping completed: ${filteredData.length} posts`)

    return NextResponse.json({
      success: true,
      data: filteredData,
      count: filteredData.length,
      filters: {
        sources: sources || 'all',
        categories: categories || 'all',
        locations: locations || 'all'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error in multi-source scraping:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to scrape from multiple sources',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
