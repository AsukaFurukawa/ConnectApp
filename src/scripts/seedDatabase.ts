import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')

    // Seed Badges
    console.log('📛 Seeding badges...')
    const badges = [
      {
        id: 'badge-1',
        name: 'Eco Warrior',
        description: 'Complete your first environmental activity',
        icon: '🌱',
        emoji: '🌱',
        rarity: 'common',
        category: 'sustainability',
        xpReward: 50,
        color: 'green',
        gradient: 'from-green-400 to-green-600',
        maxProgress: 100
      },
      {
        id: 'badge-2',
        name: 'Tree Hugger',
        description: 'Plant 5 trees or support tree planting initiatives',
        icon: '🌳',
        emoji: '🌳',
        rarity: 'rare',
        category: 'sustainability',
        xpReward: 100,
        color: 'green',
        gradient: 'from-green-500 to-emerald-600',
        maxProgress: 100
      },
      {
        id: 'badge-3',
        name: 'Social Butterfly',
        description: 'Share 10 posts and engage with the community',
        icon: '🦋',
        emoji: '🦋',
        rarity: 'rare',
        category: 'social',
        xpReward: 75,
        color: 'purple',
        gradient: 'from-purple-400 to-pink-500',
        maxProgress: 100
      },
      {
        id: 'badge-4',
        name: 'Plastic Free Champion',
        description: 'Complete 20 plastic-free activities',
        icon: '♻️',
        emoji: '♻️',
        rarity: 'epic',
        category: 'sustainability',
        xpReward: 200,
        color: 'blue',
        gradient: 'from-blue-400 to-cyan-500',
        maxProgress: 100
      },
      {
        id: 'badge-5',
        name: 'Local Hero',
        description: 'Help 50 people in your local community',
        icon: '🏆',
        emoji: '🏆',
        rarity: 'legendary',
        category: 'achievement',
        xpReward: 500,
        color: 'yellow',
        gradient: 'from-yellow-400 to-orange-500',
        maxProgress: 100
      }
    ]

    for (const badge of badges) {
      await prisma.badge.upsert({
        where: { id: badge.id },
        update: badge,
        create: badge
      })
    }

    // Seed Rewards
    console.log('🎁 Seeding rewards...')
    const rewards = [
      {
        id: 'reward-1',
        name: 'Organic Cotton Tote Bag',
        description: 'Eco-friendly tote bag made from 100% organic cotton',
        brand: 'Green Earth',
        xpCost: 500,
        availability: 'in-stock',
        images: ['https://picsum.photos/400/300?random=20'],
        category: 'fashion',
        sustainabilityScore: 95,
        realBrandId: 'green-earth-001'
      },
      {
        id: 'reward-2',
        name: 'Bamboo Water Bottle',
        description: 'Sustainable bamboo water bottle with stainless steel interior',
        brand: 'EcoLife',
        xpCost: 750,
        availability: 'in-stock',
        images: ['https://picsum.photos/400/300?random=21'],
        category: 'lifestyle',
        sustainabilityScore: 90,
        realBrandId: 'ecolife-002'
      },
      {
        id: 'reward-3',
        name: 'Solar Power Bank',
        description: 'Portable solar charger for your devices',
        brand: 'SunPower',
        xpCost: 1200,
        availability: 'limited',
        images: ['https://picsum.photos/400/300?random=22'],
        category: 'technology',
        sustainabilityScore: 85,
        realBrandId: 'sunpower-003'
      },
      {
        id: 'reward-4',
        name: 'Organic Tea Collection',
        description: 'Premium organic tea collection from local farmers',
        brand: 'Mountain Tea Co.',
        xpCost: 300,
        availability: 'in-stock',
        images: ['https://picsum.photos/400/300?random=23'],
        category: 'food',
        sustainabilityScore: 88,
        realBrandId: 'mountain-tea-004'
      },
      {
        id: 'reward-5',
        name: 'Handmade Soap Set',
        description: 'Natural handmade soaps with essential oils',
        brand: 'Pure Nature',
        xpCost: 400,
        availability: 'in-stock',
        images: ['https://picsum.photos/400/300?random=24'],
        category: 'personal-care',
        sustainabilityScore: 92,
        realBrandId: 'pure-nature-005'
      }
    ]

    for (const reward of rewards) {
      await prisma.reward.upsert({
        where: { id: reward.id },
        update: reward,
        create: reward
      })
    }

    // Seed Challenges
    console.log('🎯 Seeding challenges...')
    const challenges = [
      {
        id: 'challenge-1',
        title: '🌱 Support Local Farmers',
        description: 'Purchase from 3 local sustainable brands this week',
        xpReward: 150,
        maxProgress: 3,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        icon: '🌱',
        category: 'sustainability'
      },
      {
        id: 'challenge-2',
        title: '🤝 Share Your Impact Story',
        description: 'Share your environmental impact story with the community',
        xpReward: 100,
        maxProgress: 1,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        icon: '🤝',
        category: 'social'
      },
      {
        id: 'challenge-3',
        title: '🌿 Choose Sustainable Living',
        description: 'Complete 5 sustainable living activities',
        xpReward: 200,
        maxProgress: 5,
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        icon: '🌿',
        category: 'lifestyle'
      }
    ]

    for (const challenge of challenges) {
      await prisma.challenge.upsert({
        where: { id: challenge.id },
        update: challenge,
        create: challenge
      })
    }

    // Seed NGO Activities
    console.log('🏢 Seeding NGO activities...')
    const ngoActivities = [
      {
        id: 'ngo-activity-1',
        ngoName: 'Teach For India',
        ngoLogo: 'https://picsum.photos/100/100?random=25',
        title: 'Digital Literacy Program in Bangalore Schools',
        description: 'Upcoming digital literacy program across 15 government schools in Bangalore. We will train 750+ students in computer skills and digital tools.',
        category: 'education',
        location: 'Bangalore, Karnataka',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        date: new Date('2025-09-15'),
        images: [
          'https://picsum.photos/400/300?random=26',
          'https://picsum.photos/400/300?random=27'
        ],
        videos: [],
        likes: 234,
        comments: 45,
        shares: 12,
        impact: '750+ students trained in digital skills',
        verified: true,
        source: 'darpan',
        externalUrl: 'https://teachforindia.org'
      },
      {
        id: 'ngo-activity-2',
        ngoName: 'CRY - Child Rights and You',
        ngoLogo: 'https://picsum.photos/100/100?random=28',
        title: 'Education for 1000 Children in Delhi Slums',
        description: 'Upcoming Education for All program to provide quality education, school supplies, and nutrition to 1000 underprivileged children in Delhi slums.',
        category: 'children',
        location: 'Delhi, NCR',
        coordinates: { lat: 28.7041, lng: 77.1025 },
        date: new Date('2025-09-20'),
        images: [
          'https://picsum.photos/400/300?random=29',
          'https://picsum.photos/400/300?random=30'
        ],
        videos: [],
        likes: 892,
        comments: 156,
        shares: 67,
        impact: '1000+ children receiving education',
        verified: true,
        source: 'giveindia',
        externalUrl: 'https://www.cry.org'
      }
    ]

    for (const activity of ngoActivities) {
      await prisma.nGOActivity.upsert({
        where: { id: activity.id },
        update: activity,
        create: activity
      })
    }

    console.log('✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error)
      process.exit(1)
    })
}

export default seedDatabase
