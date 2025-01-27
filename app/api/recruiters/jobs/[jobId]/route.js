import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PUT(request, { params }) {
  try {
    const { jobId } = params
    const body = await request.json()
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const response = await serverInstance.put(`/recruiters/jobs/${jobId}`, body, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to update job' 
      },
      { status: error.response?.status || 500 }
    )
  }
}

export async function GET(request, { params }) {
  try {
    const { jobId } = params
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const response = await serverInstance.get(`/recruiters/jobs/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.response?.data?.message || 'Failed to fetch job'
      },
      { status: error.response?.status || 500 }
    )
  }
} 