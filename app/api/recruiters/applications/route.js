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
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'
    const limit = url.searchParams.get('limit') || '10' 
    const status = url.searchParams.get('status') || ''

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({
        status: 'error',
        message: 'Authentication required'
      }, { status: 401 })
    }

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

    return NextResponse.json({
      status: 'success',
      data: response.data
    })

  } catch (error) {
    console.error('Applications fetch error:', error.response?.data || error.message)
    return NextResponse.json({
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch applications'
    }, { status: error.response?.status || 500 })
  }
} 