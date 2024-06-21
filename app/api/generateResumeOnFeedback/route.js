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
        console.log(error)
        return new Response(JSON.stringify({ error: "Error generating feedback" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
