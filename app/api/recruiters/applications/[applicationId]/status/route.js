import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { applicationId } = params
    const body = await request.json()
    
    const response = await serverInstance.put(`/recruiters/applications/${applicationId}/status`, body)

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to update application status' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 