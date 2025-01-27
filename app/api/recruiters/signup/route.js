import { serverInstance } from '@/lib/serverApi';

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await serverInstance.post('/recruiters/signup', data);
    
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error.response?.data || { error: "Error creating account" };
    const statusCode = error.response?.status || 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 