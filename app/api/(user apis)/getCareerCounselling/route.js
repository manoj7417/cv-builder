import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/generateCounsellingTest', data, {
            headers: {
                'Authorization': token
            }
        });
        
        // Return only the response data, not the whole response object
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error generating career counselling test" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
