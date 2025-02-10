import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Route Segment Config
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request) {
  try {
    // Use URLSearchParams to parse query parameters
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'
    const limit = url.searchParams.get('limit') || '10' 
    const status = url.searchParams.get('status') || ''

    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Authentication required' }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
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
        Authorization: `Bearer ${token}`
      }
    })

    // Return response with proper headers
    return new NextResponse(
      JSON.stringify(response.data),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

  } catch (error) {
    console.error('Applications fetch error:', error)
    return new NextResponse(
      JSON.stringify({ 
        message: error.message || 'Failed to fetch applications'
      }),
      {
        status: error.status || 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
} 