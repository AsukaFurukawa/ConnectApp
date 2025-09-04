import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserService } from '@/services/userService'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { xpGained, reason } = body

    if (!xpGained || xpGained <= 0) {
      return NextResponse.json({ error: 'Invalid XP amount' }, { status: 400 })
    }

    const result = await UserService.updateUserXP(session.user.id, xpGained)

    // Create notification for XP gain
    if (xpGained > 0) {
      await UserService.createNotification(
        session.user.id,
        'XP Earned! 🎉',
        `You earned ${xpGained} XP for ${reason || 'your activity'}`,
        'achievement'
      )
    }

    // Create level up notification
    if (result.leveledUp) {
      await UserService.createNotification(
        session.user.id,
        'Level Up! 🚀',
        `Congratulations! You reached level ${result.level}`,
        'achievement'
      )
    }

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error updating user XP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
