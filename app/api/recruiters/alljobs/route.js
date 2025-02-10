import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export const runtime = 'edge' // Use edge runtime
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Use URL constructor to safely parse the URL
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const token = searchParams.get('token')
    
    // Rest of params
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
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-store'
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        jobs: response.data.data?.jobs || response.data.data || [],
        pagination: {
          totalPages: Math.ceil((response.data.data?.total || 0) / limit),
          currentPage: parseInt(page),
          totalDocs: response.data.data?.total || 0
        }
      }
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'CDN-Cache-Control': 'no-store'
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