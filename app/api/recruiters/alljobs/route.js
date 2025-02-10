import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Change runtime to nodejs
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request, { params }) {
  try {
    // Get searchParams directly from request
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    
    if (!token) {
      return new NextResponse(JSON.stringify({
        status: 'error',
        message: 'Authentication token is required'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''
    const sort = searchParams.get('sort') || '-createdAt'
    const status = searchParams.get('status') || ''

    const headersList = headers()
    const host = headersList.get('host')

    const response = await serverInstance.get('/recruiters/alljobs', {
      params: {
        page,
        limit,
        search,
        type,
        location,
        sort,
        status
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Host: host
      }
    })

    return new NextResponse(JSON.stringify({
      status: 'success',
      data: {
        jobs: response.data.data?.jobs || response.data.data || [],
        pagination: {
          totalPages: Math.ceil((response.data.data?.total || 0) / limit),
          currentPage: parseInt(page),
          totalDocs: response.data.data?.total || 0
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Jobs fetch error:', error.response?.data || error.message)
    return new NextResponse(JSON.stringify({
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch jobs'
    }), {
      status: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 