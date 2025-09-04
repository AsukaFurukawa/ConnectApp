import { prisma } from '@/lib/db'

export interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  xp: number
  level: number
  streak: number
  location: any
  totalImpact: any
  referralCode: string
  referralCount: number
  totalSpent: number
  vipStatus: boolean
  nextVipMilestone: number
  createdAt: Date
  lastActive: Date
  badges: UserBadge[]
  rank: number
  tier: string
}

export interface UserBadge {
  id: string
  progress: number
  unlockedAt: Date | null
  badge: {
    id: string
    name: string
    description: string
    icon: string
    emoji: string
    rarity: string
    category: string
    xpReward: number
    color: string
    gradient: string
    maxProgress: number
  }
}

export class UserService {
  // Get user profile with all related data
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userBadges: {
            include: { badge: true }
          },
          leaderboard: true
        }
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        location: user.location,
        totalImpact: user.totalImpact,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        totalSpent: user.totalSpent,
        vipStatus: user.vipStatus,
        nextVipMilestone: user.nextVipMilestone,
        createdAt: user.createdAt,
        lastActive: user.lastActive,
        badges: user.userBadges,
        rank: user.leaderboard?.rank || 0,
        tier: user.leaderboard?.tier || 'bronze'
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Update user XP and level
  static async updateUserXP(userId: string, xpGained: number): Promise<{ xp: number; level: number; leveledUp: boolean }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) throw new Error('User not found')

      const newXP = user.xp + xpGained
      const newLevel = Math.floor(newXP / 100) + 1 // 100 XP per level
      const leveledUp = newLevel > user.level

      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel,
          lastActive: new Date()
        }
      })

      // Update leaderboard if leveled up
      if (leveledUp) {
        await this.updateLeaderboard(userId)
      }

      return { xp: newXP, level: newLevel, leveledUp }
    } catch (error) {
      console.error('Error updating user XP:', error)
      throw error
    }
  }

  // Update user streak
  static async updateUserStreak(userId: string): Promise<number> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) throw new Error('User not found')

      const lastActive = new Date(user.lastActive)
      const today = new Date()
      const diffTime = today.getTime() - lastActive.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      let newStreak = user.streak

      if (diffDays === 1) {
        // Consecutive day
        newStreak = user.streak + 1
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1
      }
      // If diffDays === 0, same day, keep current streak

      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: newStreak,
          lastActive: new Date()
        }
      })

      return newStreak
    } catch (error) {
      console.error('Error updating user streak:', error)
      throw error
    }
  }

  // Update user location
  static async updateUserLocation(userId: string, location: { lat: number; lng: number; city: string; state: string }): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { location }
      })
    } catch (error) {
      console.error('Error updating user location:', error)
      throw error
    }
  }

  // Update user impact metrics
  static async updateUserImpact(userId: string, impact: { treesPlanted?: number; co2Saved?: number; plasticRecycled?: number; waterSaved?: number }): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) throw new Error('User not found')

      const currentImpact = user.totalImpact as any
      const newImpact = {
        treesPlanted: (currentImpact.treesPlanted || 0) + (impact.treesPlanted || 0),
        co2Saved: (currentImpact.co2Saved || 0) + (impact.co2Saved || 0),
        plasticRecycled: (currentImpact.plasticRecycled || 0) + (impact.plasticRecycled || 0),
        waterSaved: (currentImpact.waterSaved || 0) + (impact.waterSaved || 0)
      }

      await prisma.user.update({
        where: { id: userId },
        data: { totalImpact: newImpact }
      })

      // Update leaderboard
      await this.updateLeaderboard(userId)
    } catch (error) {
      console.error('Error updating user impact:', error)
      throw error
    }
  }

  // Update leaderboard rankings
  static async updateLeaderboard(userId: string): Promise<void> {
    try {
      // Get all users sorted by XP
      const users = await prisma.user.findMany({
        orderBy: { xp: 'desc' },
        include: { leaderboard: true }
      })

      // Update rankings
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const rank = i + 1
        const tier = this.calculateTier(user.xp)

        if (user.leaderboard) {
          await prisma.leaderboardEntry.update({
            where: { userId: user.id },
            data: { rank, tier }
          })
        } else {
          await prisma.leaderboardEntry.create({
            data: {
              userId: user.id,
              rank,
              tier,
              achievements: []
            }
          })
        }
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error)
      throw error
    }
  }

  // Calculate user tier based on XP
  static calculateTier(xp: number): string {
    if (xp >= 10000) return 'diamond'
    if (xp >= 5000) return 'platinum'
    if (xp >= 2000) return 'gold'
    if (xp >= 500) return 'silver'
    return 'bronze'
  }

  // Get leaderboard data
  static async getLeaderboard(limit: number = 50): Promise<any[]> {
    try {
      const leaderboard = await prisma.leaderboardEntry.findMany({
        take: limit,
        orderBy: { rank: 'asc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              xp: true,
              level: true,
              streak: true,
              totalImpact: true,
              lastActive: true
            }
          }
        }
      })

      return leaderboard.map(entry => ({
        id: entry.user.id,
        name: entry.user.name || 'Anonymous',
        avatar: entry.user.image || '👤',
        xp: entry.user.xp,
        level: entry.user.level,
        rank: entry.rank,
        badges: 0, // Will be calculated separately
        streak: entry.user.streak,
        totalImpact: entry.user.totalImpact,
        isCurrentUser: false, // Will be set by frontend
        isOnline: this.isUserOnline(entry.user.lastActive),
        lastActive: entry.user.lastActive,
        achievements: entry.achievements,
        tier: entry.tier
      }))
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      return []
    }
  }

  // Check if user is online (active within last 5 minutes)
  static isUserOnline(lastActive: Date): boolean {
    const now = new Date()
    const diffMinutes = (now.getTime() - lastActive.getTime()) / (1000 * 60)
    return diffMinutes <= 5
  }

  // Create notification for user
  static async createNotification(userId: string, title: string, message: string, type: string): Promise<void> {
    try {
      await prisma.notification.create({
        data: {
          userId,
          title,
          message,
          type
        }
      })
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  }

  // Get user notifications
  static async getUserNotifications(userId: string, limit: number = 20): Promise<any[]> {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit
      })
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }
      })
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  }
}
