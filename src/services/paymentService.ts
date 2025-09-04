import Razorpay from 'razorpay'
import { prisma } from '@/lib/db'

export interface PaymentRequest {
  amount: number
  currency: string
  receipt: string
  notes: {
    userId: string
    rewardId: string
    xpCost: number
  }
}

export interface PaymentResponse {
  id: string
  amount: number
  currency: string
  status: string
  orderId: string
  paymentId?: string
}

export class PaymentService {
  private static razorpay: Razorpay

  static initialize() {
    if (!this.razorpay) {
      this.razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!
      })
    }
  }

  // Create payment order
  static async createPaymentOrder(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      this.initialize()

      const order = await this.razorpay.orders.create({
        amount: paymentRequest.amount * 100, // Convert to paise
        currency: paymentRequest.currency,
        receipt: paymentRequest.receipt,
        notes: paymentRequest.notes
      })

      return {
        id: order.id,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: order.status,
        orderId: order.id
      }
    } catch (error) {
      console.error('Error creating payment order:', error)
      throw error
    }
  }

  // Verify payment
  static async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      this.initialize()

      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(orderId + '|' + paymentId)
        .digest('hex')

      return expectedSignature === signature
    } catch (error) {
      console.error('Error verifying payment:', error)
      return false
    }
  }

  // Process reward redemption
  static async processRewardRedemption(
    userId: string,
    rewardId: string,
    xpCost: number,
    deliveryAddress: any
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    try {
      // Check if user has enough XP
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return { success: false, error: 'User not found' }
      }

      if (user.xp < xpCost) {
        return { success: false, error: 'Insufficient XP' }
      }

      // Get reward details
      const reward = await prisma.reward.findUnique({
        where: { id: rewardId }
      })

      if (!reward) {
        return { success: false, error: 'Reward not found' }
      }

      if (reward.availability === 'out-of-stock') {
        return { success: false, error: 'Reward out of stock' }
      }

      // Create user reward record
      const userReward = await prisma.userReward.create({
        data: {
          userId,
          rewardId,
          xpSpent: xpCost,
          status: 'pending',
          deliveryAddress
        }
      })

      // Deduct XP from user
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: user.xp - xpCost,
          totalSpent: user.totalSpent + xpCost
        }
      })

      // Update reward availability if limited
      if (reward.availability === 'limited') {
        // In a real system, you'd track stock levels
        // For now, we'll just mark as processing
      }

      return { success: true, orderId: userReward.id }
    } catch (error) {
      console.error('Error processing reward redemption:', error)
      return { success: false, error: 'Internal server error' }
    }
  }

  // Update reward status
  static async updateRewardStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'completed' | 'cancelled',
    trackingId?: string
  ): Promise<void> {
    try {
      await prisma.userReward.update({
        where: { id: orderId },
        data: {
          status,
          trackingId
        }
      })
    } catch (error) {
      console.error('Error updating reward status:', error)
      throw error
    }
  }

  // Get user's reward history
  static async getUserRewards(userId: string): Promise<any[]> {
    try {
      const userRewards = await prisma.userReward.findMany({
        where: { userId },
        include: {
          reward: true
        },
        orderBy: { redeemedAt: 'desc' }
      })

      return userRewards.map(userReward => ({
        id: userReward.id,
        reward: userReward.reward,
        xpSpent: userReward.xpSpent,
        status: userReward.status,
        trackingId: userReward.trackingId,
        redeemedAt: userReward.redeemedAt,
        deliveryAddress: userReward.deliveryAddress
      }))
    } catch (error) {
      console.error('Error fetching user rewards:', error)
      return []
    }
  }

  // Get all rewards
  static async getAllRewards(category?: string): Promise<any[]> {
    try {
      const where: any = {}
      
      if (category && category !== 'all') {
        where.category = category
      }

      const rewards = await prisma.reward.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      })

      return rewards
    } catch (error) {
      console.error('Error fetching rewards:', error)
      return []
    }
  }

  // Create reward
  static async createReward(rewardData: {
    name: string
    description: string
    brand: string
    xpCost: number
    availability: string
    images: string[]
    category: string
    sustainabilityScore: number
    realBrandId?: string
  }): Promise<any> {
    try {
      const reward = await prisma.reward.create({
        data: rewardData
      })

      return reward
    } catch (error) {
      console.error('Error creating reward:', error)
      throw error
    }
  }

  // Update reward
  static async updateReward(rewardId: string, updateData: any): Promise<any> {
    try {
      const reward = await prisma.reward.update({
        where: { id: rewardId },
        data: updateData
      })

      return reward
    } catch (error) {
      console.error('Error updating reward:', error)
      throw error
    }
  }

  // Delete reward
  static async deleteReward(rewardId: string): Promise<void> {
    try {
      await prisma.reward.delete({
        where: { id: rewardId }
      })
    } catch (error) {
      console.error('Error deleting reward:', error)
      throw error
    }
  }
}
