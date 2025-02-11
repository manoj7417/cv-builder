import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Get all query parameters
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''
    const sort = searchParams.get('sort') || '-createdAt'
    const status = searchParams.get('status') || ''
    const token = searchParams.get('token') || ''   

    // Make request to backend
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

    // Ensure we're sending the total count in the response
    const responseData = {
      status: 'success',
      data: {
        jobs: response.data.data?.jobs || response.data.data || [],
        pagination: {
          totalPages: response.data.data?.pagination?.totalPages || Math.ceil((response.data.data?.total || 0) / limit),
          currentPage: parseInt(page),
          totalDocs: response.data.data?.pagination?.totalDocs || response.data.data?.total || response.data.total || 0
        }
      }
    }

    return NextResponse.json(responseData)
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