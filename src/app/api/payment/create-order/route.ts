import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PaymentService } from '@/services/paymentService'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { rewardId, xpCost, deliveryAddress } = body

    if (!rewardId || !xpCost || !deliveryAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Process reward redemption
    const result = await PaymentService.processRewardRedemption(
      session.user.id,
      rewardId,
      xpCost,
      deliveryAddress
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Create payment order (for XP-based rewards, we might not need actual payment)
    // But we'll create an order for tracking purposes
    const paymentOrder = await PaymentService.createPaymentOrder({
      amount: 0, // XP-based rewards are free
      currency: 'INR',
      receipt: result.orderId!,
      notes: {
        userId: session.user.id,
        rewardId,
        xpCost
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        orderId: result.orderId,
        paymentOrder
      }
    })
  } catch (error) {
    console.error('Error creating payment order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
