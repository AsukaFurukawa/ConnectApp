import { NextRequest, NextResponse } from 'next/server';
import { ngoScraperService } from '@/services/ngoScraperService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'activities', 'volunteers', 'fundraisers'
    const location = searchParams.get('location');
    const category = searchParams.get('category');

    let data;

    switch (type) {
      case 'activities':
        data = await ngoScraperService.scrapeNGOActivities(location || undefined, category || undefined);
        break;
      case 'volunteers':
        data = await ngoScraperService.scrapeVolunteerRequests(location || undefined, category || undefined);
        break;
      case 'fundraisers':
        data = await ngoScraperService.scrapeFundraisers(location || undefined, category || undefined);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter. Use: activities, volunteers, or fundraisers' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      filters: {
        location: location || 'all',
        category: category || 'all'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in scrape-ngo API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, selectors } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    // Scrape multiple websites
    const results = await Promise.all(
      urls.map(async (url: string) => {
        try {
          const data = await ngoScraperService.scrapeWebsite(url, selectors);
          return { url, success: true, data };
        } catch (error) {
          return { url, success: false, error: error.message };
        }
      })
    );

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in scrape-ngo POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
