
import { serverInstance } from '@/lib/serverApi';
import { cookies } from 'next/headers';


export async function GET(req,res) {
  try {
    cookies();
    const response = await serverInstance.get(`/coach/all`);
    return new Response(JSON.stringify(response.data), {
      status: response.status || 200,
    });
  } catch (error) {
    const errorMessage = error.response ? error.response.data : { error: "An error occurred" };
    const statusCode = error.response ? error.response.status : 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
    });
  }
}
