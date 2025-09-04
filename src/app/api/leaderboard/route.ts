import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/services/userService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const userId = searchParams.get('userId') // For marking current user

    const leaderboard = await UserService.getLeaderboard(limit)

    // Mark current user if userId is provided
    if (userId) {
      leaderboard.forEach(user => {
        if (user.id === userId) {
          user.isCurrentUser = true
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: leaderboard,
      count: leaderboard.length
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
