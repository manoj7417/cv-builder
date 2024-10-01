import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/atsCheck', data, {
            headers: {
                Authorization: token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const status = error.response?.status ||  500;
        const errorMessage = error.response?.data?.message ||
            (error.request ? "No response received from the server" : error.message);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
