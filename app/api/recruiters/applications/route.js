import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
  try {
    // Get the URL search params
    const { searchParams } = new URL(request.url)
    
    // Get the recruiter's ID from the cookie
    const cookieStore = cookies()
    const userDataCookie = cookieStore.get('auth')
    const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null
    const userId = userData?.userdata?._id

    if (!userId) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Unauthorized - Please login first' 
        },
        { status: 401 }
      )
    }

    // Make request to backend with userId
    const response = await serverInstance.get('/recruiters/applications', {
      params: {
        userId,
        page: searchParams.get('page') || 1,
        limit: searchParams.get('limit') || 10
      }
    })
    
    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    console.error('Applications fetch error:', error.response?.data || error.message)
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch applications' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 