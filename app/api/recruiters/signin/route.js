import { serverInstance } from '@/lib/serverApi';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await serverInstance.post('/recruiters/login', body);

    if (!response.data.token) {
      throw new Error('No token received from server');
    }

    // Create response object with token
    return NextResponse.json({
      success: true,
      token: response.data.token,
      user: response.data.user || response.data.recruiter
    });

  } catch (error) {
    console.error('Signin error:', error.response?.data || error.message);
    return NextResponse.json(
      { message: error.response?.data?.message || 'Signin failed' },
      { status: error.response?.status || 500 }
    );
  }
} 