export async function GET(req) {
  const timestamp = req.nextUrl.searchParams.get('_t'); // Retrieve the timestamp


  try {
    const response = await serverInstance.get(`/coach/all`, {
      params: { _t: timestamp },  // Pass timestamp to backend for unique cache-busting
    });
    
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
