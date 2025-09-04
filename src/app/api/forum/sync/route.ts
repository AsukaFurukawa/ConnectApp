import { NextRequest, NextResponse } from 'next/server'
import { ForumDataService } from '@/services/forumDataService'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting forum data sync...')
    
    // For now, just simulate sync without DB operations
    const [socialIssues, newsData, govData] = await Promise.all([
      ForumDataService.fetchSocialIssuesData(),
      NewsApiService.convertNewsToForumPosts(),
      GovernmentDataService.convertGovernmentDataToForumPosts()
    ])
    
    const totalRecords = socialIssues.length + newsData.length + govData.length
    
    return NextResponse.json({
      success: true,
      message: 'Forum data synced successfully',
      data: {
        totalRecords,
        socialIssues: socialIssues.length,
        newsData: newsData.length,
        governmentData: govData.length
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error syncing forum data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync forum data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get sync status
    const [socialIssues, newsData, govData] = await Promise.all([
      ForumDataService.fetchSocialIssuesData(),
      NewsApiService.convertNewsToForumPosts(),
      GovernmentDataService.convertGovernmentDataToForumPosts()
    ])
    
    const totalPosts = socialIssues.length + newsData.length + govData.length
    
    return NextResponse.json({
      success: true,
      data: {
        totalPosts,
        lastSync: new Date().toISOString(),
        sources: ['ngo', 'news', 'government', 'social-issues'],
        categories: [
          'street-children',
          'manual-scavenging',
          'child-labor',
          'water-crisis',
          'dowry-system',
          'caste-discrimination',
          'rural-development',
          'slum-rehabilitation',
          'menstrual-hygiene',
          'disaster-relief'
        ],
        breakdown: {
          socialIssues: socialIssues.length,
          newsData: newsData.length,
          governmentData: govData.length
        }
      }
    })
  } catch (error) {
    console.error('Error getting sync status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get sync status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
