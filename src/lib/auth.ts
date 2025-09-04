import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Fetch additional user data from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            userBadges: {
              include: { badge: true }
            },
            leaderboard: true
          }
        })
        
        if (dbUser) {
          session.user.xp = dbUser.xp
          session.user.level = dbUser.level
          session.user.streak = dbUser.streak
          session.user.badges = dbUser.userBadges
          session.user.rank = dbUser.leaderboard?.rank || 0
          session.user.tier = dbUser.leaderboard?.tier || 'bronze'
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Create user profile if it doesn't exist
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! }
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email!,
            image: user.image,
            xp: 0,
            level: 1,
            streak: 0,
            referralCode: Math.random().toString(36).substring(2, 15),
            totalImpact: {
              treesPlanted: 0,
              co2Saved: 0,
              plasticRecycled: 0,
              waterSaved: 0
            }
          }
        })

        // Create leaderboard entry
        await prisma.leaderboardEntry.create({
          data: {
            userId: user.id,
            rank: 999, // Will be updated by ranking system
            tier: 'bronze',
            achievements: []
          }
        })
      }

      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
}
