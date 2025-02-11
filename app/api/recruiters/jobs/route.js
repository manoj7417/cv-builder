import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
export async function GET(request) {
  try {
    // Get token from request headers
    const token = cookies().get('token').value

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    // Get all query parameters
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''


    // Make request to backend with all filters
    const response = await serverInstance.get('/recruiters/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page,
        limit,
        sortBy,
        order,
        search,
        type,
        location
      }
    })


    // Return the entire response data structure
    return NextResponse.json(response.data)
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

export async function POST(request) {
  try {
    const token = request.headers.get('token')
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'No token provided' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const jobData = await request.json()

    const response = await serverInstance.post('/recruiters/jobs', jobData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return new Response(
      JSON.stringify(response.data),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Job posting error:', error.response?.data || error.message)
    const errorMessage = error.response?.data || { message: 'Failed to post job' }
    const statusCode = error.response?.status || 500

    return new Response(
      JSON.stringify(errorMessage),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 