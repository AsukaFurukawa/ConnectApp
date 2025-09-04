import { NextRequest, NextResponse } from 'next/server';

// Simple web scraper for NGO websites
export async function POST(request: NextRequest) {
  try {
    const { url, selectors } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // For now, we'll return mock data based on the URL
    // In a real implementation, you would use Puppeteer or similar to scrape the website
    
    let scrapedData = {};

    // Mock scraping based on known NGO websites
    if (url.includes('teachforindia.org')) {
      scrapedData = {
        ngoName: 'Teach For India',
        logo: 'https://teachforindia.org/wp-content/uploads/2020/08/TFI-Logo.png',
        activities: [
          {
            title: 'Digital Learning Initiative',
            description: 'Transforming education through technology in government schools',
            date: '2024-01-20',
            impact: '500+ students trained in digital skills',
            images: ['https://teachforindia.org/wp-content/uploads/2024/01/digital-learning.jpg']
          }
        ],
        volunteerOpportunities: [
          {
            title: 'English Teaching Volunteers',
            description: 'Teach English to underprivileged children',
            volunteersNeeded: 30,
            duration: '6 months',
            skills: ['English', 'Teaching', 'Patience']
          }
        ],
        fundraisers: [
          {
            title: 'Digital Learning Centers',
            description: 'Set up digital learning centers in rural schools',
            targetAmount: 2500000,
            raisedAmount: 1800000,
            endDate: '2024-03-15'
          }
        ]
      };
    } else if (url.includes('cry.org')) {
      scrapedData = {
        ngoName: 'CRY - Child Rights and You',
        logo: 'https://www.cry.org/wp-content/themes/cry/images/logo.png',
        activities: [
          {
            title: 'Education Support Program',
            description: 'Supporting education for underprivileged children',
            date: '2024-01-18',
            impact: '300 children receiving quality education',
            images: ['https://www.cry.org/wp-content/uploads/2024/01/education-support.jpg']
          }
        ],
        volunteerOpportunities: [
          {
            title: 'Child Education Support',
            description: 'Help children with homework and basic skills',
            volunteersNeeded: 25,
            duration: '4 months',
            skills: ['Teaching', 'Patience', 'Child Psychology']
          }
        ],
        fundraisers: [
          {
            title: 'Education for 1000 Children',
            description: 'Provide education support to 1000 slum children',
            targetAmount: 1500000,
            raisedAmount: 950000,
            endDate: '2024-03-30'
          }
        ]
      };
    } else if (url.includes('goonj.org')) {
      scrapedData = {
        ngoName: 'Goonj',
        logo: 'https://goonj.org/wp-content/uploads/2020/08/goonj-logo.png',
        activities: [
          {
            title: 'Cloth Collection Drive',
            description: 'Massive cloth collection and distribution drive',
            date: '2024-01-15',
            impact: '5000+ kg clothes distributed to needy families',
            images: ['https://goonj.org/wp-content/uploads/2024/01/cloth-drive.jpg']
          }
        ],
        volunteerOpportunities: [
          {
            title: 'Cloth Collection Volunteers',
            description: 'Help collect and sort clothes for distribution',
            volunteersNeeded: 12,
            duration: '3 months',
            skills: ['Organization', 'Physical Work', 'Teamwork']
          }
        ],
        fundraisers: [
          {
            title: 'Rural Development Fund',
            description: 'Support rural communities with essential supplies',
            targetAmount: 2000000,
            raisedAmount: 1400000,
            endDate: '2024-04-20'
          }
        ]
      };
    } else if (url.includes('bangaloremedicaltrust.org')) {
      scrapedData = {
        ngoName: 'Bangalore Medical Trust',
        logo: 'https://bangaloremedicaltrust.org/images/logo.png',
        activities: [
          {
            title: 'Free Health Camp',
            description: 'Comprehensive health checkup for senior citizens',
            date: '2024-01-12',
            impact: '250+ senior citizens received free healthcare',
            images: ['https://bangaloremedicaltrust.org/images/health-camp.jpg']
          }
        ],
        volunteerOpportunities: [
          {
            title: 'Medical Camp Support',
            description: 'Support medical camps with registration and crowd management',
            volunteersNeeded: 20,
            duration: '2 weeks',
            skills: ['Organization', 'Communication', 'Basic Medical Knowledge']
          }
        ],
        fundraisers: [
          {
            title: 'Mobile Health Clinic',
            description: 'Set up mobile health clinic for slum communities',
            targetAmount: 1200000,
            raisedAmount: 750000,
            endDate: '2024-02-28'
          }
        ]
      };
    } else if (url.includes('animalwelfaretrust.org')) {
      scrapedData = {
        ngoName: 'Animal Welfare Trust',
        logo: 'https://animalwelfaretrust.org/images/logo.png',
        activities: [
          {
            title: 'Street Animal Rescue',
            description: 'Rescue and medical care for injured street animals',
            date: '2024-01-10',
            impact: '75+ street animals rescued and treated',
            images: ['https://animalwelfaretrust.org/images/rescue.jpg']
          }
        ],
        volunteerOpportunities: [
          {
            title: 'Animal Care Volunteers',
            description: 'Help with feeding and caring for rescued animals',
            volunteersNeeded: 15,
            duration: 'Ongoing',
            skills: ['Animal Care', 'Patience', 'Physical Stamina']
          }
        ],
        fundraisers: [
          {
            title: 'Animal Shelter Expansion',
            description: 'Expand shelter to accommodate 300+ more animals',
            targetAmount: 1800000,
            raisedAmount: 1200000,
            endDate: '2024-05-10'
          }
        ]
      };
    } else {
      // Generic response for unknown websites
      scrapedData = {
        ngoName: 'Unknown NGO',
        logo: '/api/placeholder/100/100',
        activities: [],
        volunteerOpportunities: [],
        fundraisers: [],
        error: 'Website not recognized. Please provide a known NGO website URL.'
      };
    }

    return NextResponse.json({
      success: true,
      url,
      data: scrapedData,
      timestamp: new Date().toISOString(),
      note: 'This is mock data. In production, this would scrape the actual website.'
    });

  } catch (error) {
    console.error('Error scraping website:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to list supported NGO websites
export async function GET() {
  const supportedWebsites = [
    {
      name: 'Teach For India',
      url: 'https://teachforindia.org',
      category: 'Education',
      description: 'Transforming education in government schools'
    },
    {
      name: 'CRY - Child Rights and You',
      url: 'https://www.cry.org',
      category: 'Children',
      description: 'Working for child rights and education'
    },
    {
      name: 'Goonj',
      url: 'https://goonj.org',
      category: 'Poverty Relief',
      description: 'Rural development and disaster relief'
    },
    {
      name: 'Bangalore Medical Trust',
      url: 'https://bangaloremedicaltrust.org',
      category: 'Healthcare',
      description: 'Healthcare services for underprivileged'
    },
    {
      name: 'Animal Welfare Trust',
      url: 'https://animalwelfaretrust.org',
      category: 'Animal Welfare',
      description: 'Rescue and care for street animals'
    }
  ];

  return NextResponse.json({
    success: true,
    supportedWebsites,
    total: supportedWebsites.length,
    note: 'These are the NGO websites currently supported for data scraping.'
  });
}
