import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '@/services/notificationService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, category, media, location } = body;
    
    if (!description || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create post data
    const postData = {
      id: Date.now().toString(),
      title: title || `${category} Issue`,
      description,
      category,
      media,
      location,
      timestamp: new Date(),
      status: 'posted' as const,
      xpEarned: 0, // Will be calculated based on category
      ngoResponses: 0,
      verified: false
    };

    // Calculate XP based on category
    const categoryMultipliers: { [key: string]: number } = {
      'animal-health': 1.5,
      'environment': 1.2,
      'poverty': 1.3,
      'education': 1.1,
      'healthcare': 1.4,
      'children': 1.3,
      'women': 1.2,
      'elderly': 1.1
    };

    const baseXP = 50;
    const multiplier = categoryMultipliers[category] || 1;
    postData.xpEarned = Math.round(baseXP * multiplier);

    // Send notifications to nearby NGOs
    const notifications = await notificationService.notifyNGOs(postData);
    postData.ngoResponses = notifications.length;

    // In a real app, you would save the post to your database here
    console.log('Post created:', postData);
    console.log('Notifications sent:', notifications);

    return NextResponse.json({
      success: true,
      post: postData,
      notifications: notifications,
      message: `Post created successfully! ${notifications.length} NGOs have been notified.`
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (postId) {
      // Get specific post
      // In a real app, this would fetch from your database
      const mockPost = {
        id: postId,
        title: 'Sample Post',
        description: 'This is a sample post',
        category: 'animal-health',
        media: {
          type: 'image',
          url: '/api/placeholder/400/300'
        },
        location: {
          latitude: 12.9716,
          longitude: 77.5946,
          address: 'Bangalore, Karnataka',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India'
        },
        timestamp: new Date(),
        status: 'posted',
        xpEarned: 75,
        ngoResponses: 3,
        verified: false
      };

      // Get notifications for this post
      const notifications = await notificationService.getPostNotifications(postId);

      return NextResponse.json({
        success: true,
        post: mockPost,
        notifications
      });
    }

    if (userId) {
      // Get user's posts
      // In a real app, this would fetch from your database
      const mockPosts = [
        {
          id: '1',
          title: 'Injured Dog Found',
          description: 'Found an injured stray dog near the park',
          category: 'animal-health',
          media: {
            type: 'image',
            url: '/api/placeholder/400/300'
          },
          location: {
            latitude: 12.9716,
            longitude: 77.5946,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'completed',
          xpEarned: 75,
          ngoResponses: 2,
          verified: true
        },
        {
          id: '2',
          title: 'Tree Planting Needed',
          description: 'Area needs more trees for better air quality',
          category: 'environment',
          media: {
            type: 'image',
            url: '/api/placeholder/400/300'
          },
          location: {
            latitude: 12.9352,
            longitude: 77.6245,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'in-progress',
          xpEarned: 60,
          ngoResponses: 1,
          verified: false
        }
      ];

      return NextResponse.json({
        success: true,
        posts: mockPosts
      });
    }

    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
