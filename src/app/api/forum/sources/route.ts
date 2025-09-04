import { NextRequest, NextResponse } from 'next/server'
import { ForumDataService } from '@/services/forumDataService'
import { NewsApiService } from '@/services/newsApiService'
import { GovernmentDataService } from '@/services/governmentDataService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') || 'all'

    let data: any[] = []

    switch (source) {
      case 'ngo':
        data = await ForumDataService.fetchRealNGOData()
        break
      case 'news':
        data = await NewsApiService.convertNewsToForumPosts()
        break
      case 'government':
        data = await GovernmentDataService.convertGovernmentDataToForumPosts()
        break
      case 'social-issues':
        data = await ForumDataService.fetchSocialIssuesData()
        break
      case 'all':
        const [ngoData, newsData, govData, socialData] = await Promise.all([
          ForumDataService.fetchRealNGOData(),
          NewsApiService.convertNewsToForumPosts(),
          GovernmentDataService.convertGovernmentDataToForumPosts(),
          ForumDataService.fetchSocialIssuesData()
        ])
        data = [...ngoData, ...newsData, ...govData, ...socialData]
        break
      default:
        return NextResponse.json(
          { error: 'Invalid source parameter' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      source,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching data from sources:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch data from sources',
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

    const allData: any[] = []

    // Fetch from specified sources
    if (sources.includes('ngo') || sources.includes('all')) {
      const ngoData = await ForumDataService.fetchRealNGOData()
      allData.push(...ngoData)
    }

    if (sources.includes('news') || sources.includes('all')) {
      const newsData = await NewsApiService.convertNewsToForumPosts()
      allData.push(...newsData)
    }

    if (sources.includes('government') || sources.includes('all')) {
      const govData = await GovernmentDataService.convertGovernmentDataToForumPosts()
      allData.push(...govData)
    }

    if (sources.includes('social-issues') || sources.includes('all')) {
      const socialData = await ForumDataService.fetchSocialIssuesData()
      allData.push(...socialData)
    }

    // Filter by categories if specified
    let filteredData = allData
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

    return NextResponse.json({
      success: true,
      data: filteredData,
      count: filteredData.length,
      filters: {
        sources,
        categories,
        locations
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error processing data sources request:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process data sources request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
