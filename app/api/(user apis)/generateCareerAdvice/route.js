import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/generateCareerAdvice', data, {
            headers: {
                'Authorization': token
            }
        });
        // Return only the relevant data from the response
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // Safely extract the error message and status code
        const errorMessage = error.response ? error.response.data : { error: "Error generating career advice" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
