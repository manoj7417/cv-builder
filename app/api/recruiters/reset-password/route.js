import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    
    const response = await serverInstance.post('/recruiters/forgot-password', body)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Password reset error:', error.response?.data || error.message)
    return NextResponse.json(
      { message: error.response?.data?.message || 'Failed to send reset link' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const response = await serverInstance.post('/recruiters/reset-password', body)
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Failed to reset password' },
      { status: error.response?.status || 500 }
    )
  }
} 