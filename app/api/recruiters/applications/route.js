import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const searchParams = url.searchParams
    
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const status = searchParams.get('status') || ''

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const response = await serverInstance.get('/recruiters/applications', {
      params: { page, limit, status },
      headers: { Authorization: `Bearer ${token}` }
    })

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
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
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    )
  }
} 