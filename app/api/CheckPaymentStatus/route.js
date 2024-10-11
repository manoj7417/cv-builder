import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { sessionId } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/stripe/check-payment-status', { sessionId }, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error generating feedback" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
