import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

// Add these route segment configs
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request) {
  try {
    // Parse URL using standard URL API
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || 1
    const limit = url.searchParams.get('limit') || 10
    const search = url.searchParams.get('search') || ''
    const type = url.searchParams.get('type') || ''
    const location = url.searchParams.get('location') || ''
    const sort = url.searchParams.get('sort') || '-createdAt'
    const status = url.searchParams.get('status') || ''
    const token = url.searchParams.get('token') || ''   

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