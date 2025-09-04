import { NextRequest, NextResponse } from 'next/server'
import { ForumDataService } from '@/services/forumDataService'
import { NewsApiService } from '@/services/newsApiService'
import { GovernmentDataService } from '@/services/governmentDataService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const source = searchParams.get('source') || 'all'

    let posts

    if (source === 'real') {
      // Fetch real data from external sources
      const [socialIssues, newsData, govData] = await Promise.all([
        ForumDataService.fetchSocialIssuesData(),
        NewsApiService.convertNewsToForumPosts(),
        GovernmentDataService.convertGovernmentDataToForumPosts()
      ])
      posts = [...socialIssues, ...newsData, ...govData]
    } else if (source === 'db') {
      // For now, return mock data since DB isn't set up
      posts = await ForumDataService.fetchSocialIssuesData()
    } else {
      // Fetch from all sources
      const [socialIssues, newsData, govData] = await Promise.all([
        ForumDataService.fetchSocialIssuesData(),
        NewsApiService.convertNewsToForumPosts(),
        GovernmentDataService.convertGovernmentDataToForumPosts()
      ])
      posts = [...socialIssues, ...newsData, ...govData]
    }

    // Filter by category if specified
    if (category && category !== 'all') {
      posts = posts.filter(post => post.category === category)
    }

    // Filter by location if specified
    if (location) {
      posts = posts.filter(post => 
        post.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Sort by timestamp
    posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, location, tags, media, urgency } = body

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, category' },
        { status: 400 }
      )
    }

    // Create new post
    const newPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      author: {
        id: 'current-user', // Would be from session in real app
        name: 'You',
        avatar: 'https://picsum.photos/40/40',
        role: 'user' as const,
        verified: true,
        xp: 0
      },
      category,
      tags: tags || [],
      location: location || 'Unknown Location',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      isPinned: false,
      isResolved: false,
      urgency: urgency || 'medium' as const,
      source: 'user' as const,
      media: media || []
    }

    // For now, just return the post without storing in DB
    // await ForumDataService.storePostsInDB([newPost])

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create forum post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
