import { serverInstance } from "@/lib/serverApi";

export async function GET(req, res) {
  try {
    const response = await serverInstance.get('/coach/all');
    console.log(response.data.coaches[15].approvalStatus);
    
    return new Response(JSON.stringify(response.data), {
      status: response.status || 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      },
    });
  } catch (error) {
    const errorMessage = error.response ? error.response.data : { error: "An error occurred" };
    const statusCode = error.response ? error.response.status : 500;
    
    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      },
    });
  }
}
