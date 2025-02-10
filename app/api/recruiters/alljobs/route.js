import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

// Add these exports to prevent static generation attempts
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''
    const sort = searchParams.get('sort') || '-createdAt'
    const status = searchParams.get('status') || ''

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
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        jobs: response.data.data?.jobs || response.data.data || response.data,
        pagination: response.data.data?.pagination || {
          totalPages: Math.ceil((response.data.data?.total || 0) / limit),
          currentPage: parseInt(page),
          totalDocs: response.data.data?.total || 0
        }
      }
    }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('Jobs fetch error:', error.response?.data || error.message)
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch jobs' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 