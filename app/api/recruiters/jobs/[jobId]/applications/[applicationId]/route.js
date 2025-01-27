import { NextResponse } from 'next/server'
import { serverInstance } from '@/lib/serverApi'

export async function PUT(request, { params }) {
  try {
    const { jobId, applicationId } = params
    const { status } = await request.json()
    const token = request.headers.get('Authorization')?.split(' ')[1]

    if (!token) {
      return NextResponse.json({
        status: 'error',
        message: 'Authorization token is required'
      }, { status: 401 })
    }

    // Call the backend API to update application status
    const response = await serverInstance.put(`recruiters/jobs/${jobId}`, {
      data: {
        applicationId,
        status
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return NextResponse.json(response.data)

  } catch (error) {
    console.error('Application status update error:', error)
    if (error.response) {
      return NextResponse.json(error.response.data, { 
        status: error.response.status 
      })
    }
    return NextResponse.json({
      status: 'error',
      message: 'Failed to update application status'
    }, { status: 500 })
  }
} 