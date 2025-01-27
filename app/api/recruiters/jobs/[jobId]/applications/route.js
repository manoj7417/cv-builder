import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { jobId } = params
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10

    const response = await serverInstance.get(`recruiters/jobs/${jobId}/applications`, {
      params: { page, limit }
    })

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch applications' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 