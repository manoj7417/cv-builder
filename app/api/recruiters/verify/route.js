import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const token = request.headers.get('token')
    
    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

   
    const response = await serverInstance.get('/recruiters/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })


    // Handle different response structures
    const recruiter = response.data.recruiter || 
                     response.data.data?.recruiter || 
                     response.data.data || 
                     response.data;

    // Return the recruiter data
    return NextResponse.json({
      success: true,
      recruiter: {
        name: recruiter.name,
        email: recruiter.email,
        company: recruiter.company,
        position: recruiter.position,
        // Add any other fields you need
      }
    })

  } catch (error) {
    console.error('Verify error:', error.response?.data || error.message)
    
    // If token is invalid or expired
    if (error.response?.status === 401) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: error.response?.data?.message || 'Authentication failed' },
      { status: error.response?.status || 500 }
    )
  }
}