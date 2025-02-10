import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force dynamic route
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request) {
  try {
    // Use searchParams from nextUrl
    const { searchParams } = request.nextUrl
    
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const status = searchParams.get('status') || ''

    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Make API request
    const response = await serverInstance.get('/recruiters/applications', {
      params: {
        page: parseInt(page),
        limit: parseInt(limit),
        status
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json(response.data)

  } catch (error) {
    console.error('Applications fetch error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch applications' },
      { status: error.status || 500 }
    )
  }
} 