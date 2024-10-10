import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        
        // Axios request to the backend server
        const response = await serverInstance.post('/openai/atsCheck', data, {
            headers: {
                Authorization: token
            }
        });
        
        // Successful response
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Default status to 500 if not provided
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.message ||
            (error.request ? "No response received from the server" : error.message);

        // Include more error details in development mode
        const errorDetails = process.env.NODE_ENV === 'development' ? error.stack : null;

        return new Response(JSON.stringify({ 
            error: errorMessage,
            details: errorDetails 
        }), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
