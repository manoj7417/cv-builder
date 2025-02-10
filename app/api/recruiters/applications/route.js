import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force dynamic
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'edge'

export async function GET(request) {
  try {
    // Use request.nextUrl instead of new URL(request.url)
    const searchParams = request.nextUrl.searchParams
    
    const page = searchParams.get('page') ?? '1'
    const limit = searchParams.get('limit') ?? '10'
    const status = searchParams.get('status') ?? ''

    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { 
          status: 401,
          headers: {
            'Cache-Control': 'no-store, max-age=0'
          }
        }
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
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-store'
      }
    })

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Applications fetch error:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch applications' 
      },
      { 
        status: error.response?.status || 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json'
        }
      }
    )
  }
} 