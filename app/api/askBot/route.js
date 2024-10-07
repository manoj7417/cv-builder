import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const data = await req.json();
        const response = await serverInstance.post(`/openai/askBot`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error asking bot" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
