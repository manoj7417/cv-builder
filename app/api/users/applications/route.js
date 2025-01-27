import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10

    if (!userId) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'User ID is required' 
        },
        { status: 400 }
      )
    }

    // Make request to backend
    const response = await serverInstance.get('recruiters/applications', {
      params: {
        userId,
        page,
        limit
      }
    })

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    console.error('Applications fetch error:', error.response?.data || error.message)
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch applications' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 