import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { message } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/generateResumeOnFeeback', { message }, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.response.status === 400 ? "Insufficient optimizer tokens" : "Error generating feedback" }), {
            status: error.response.status || 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
