import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

// Add these exports to prevent static generation attempts
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  try {
    // Use searchParams in a way that works with static generation
    const url = new URL(request.url)
    const searchParams = url.searchParams
    
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''
    const sort = searchParams.get('sort') || '-createdAt'
    const status = searchParams.get('status') || ''
    const token = searchParams.get('token') || ''   

    const response = await serverInstance.get('/recruiters/alljobs', {
      params: {
        page,
        limit,
        search,
        type,
        location,
        sort,
        status,
        token
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        jobs: response.data.data?.jobs || response.data.data || [],
        pagination: {
          totalPages: response.data.data?.pagination?.totalPages || Math.ceil((response.data.data?.total || 0) / limit),
          currentPage: parseInt(page),
          totalDocs: response.data.data?.pagination?.totalDocs || response.data.data?.total || response.data.total || 0
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