import { serverInstance } from '@/lib/serverApi'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { jobId } = params
    const formData = await request.formData()
    
    // Create a new FormData object for the backend
    const backendFormData = new FormData()
    
    // Append all form fields
    for (const [key, value] of formData.entries()) {
      if (key === 'cv' && value instanceof File) {
        // Handle file upload
        backendFormData.append('cv', value, value.name)
      } else {
        backendFormData.append(key, value)
      }
    }

    // Make request to backend
    const response = await serverInstance.post(`/recruiters/jobs/${jobId}/apply`, backendFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return NextResponse.json({
      status: 'success',
      data: response.data
    })
  } catch (error) {
    console.error('Application error:', error.response?.data || error.message)
    return NextResponse.json(
      { 
        status: 'error',
        message: error.response?.data?.message || 'Failed to submit application' 
      },
      { status: error.response?.status || 500 }
    )
  }
} 