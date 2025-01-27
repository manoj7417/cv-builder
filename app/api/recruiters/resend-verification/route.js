import { NextResponse } from 'next/server'
import axios from 'axios'
import { getServerInstance } from '@/lib/serverInstance'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({
        status: 'error',
        message: 'Email is required'
      }, { status: 400 })
    }

    const serverInstance = getServerInstance()

    const response = await axios.post(`${serverInstance}/recruiters/resend-verification`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return NextResponse.json(response.data)

  } catch (error) {
    console.error('Resend verification error:', error)
    if (error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status })
    }
    return NextResponse.json({
      status: 'error',
      message: 'Failed to resend verification email'
    }, { status: 500 })
  }
} 