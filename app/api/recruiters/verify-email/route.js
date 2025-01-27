import { NextResponse } from 'next/server'
import axios from 'axios'
import { serverInstance } from '@/lib/serverApi'

export async function POST(request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({
        status: 'error',
        message: 'Token is required'
      }, { status: 400 })
    }

    const response = await serverInstance.post(`/recruiters/verify-email`, 
      { token },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return NextResponse.json(response.data)

  } catch (error) {
    console.error('Email verification error:', error)
    if (error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status })
    }
    return NextResponse.json({
      status: 'error',
      message: 'Failed to verify email'
    }, { status: 500 })
  }
} 