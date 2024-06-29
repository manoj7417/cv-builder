import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { message } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/aicounselling', { message }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error)
        console.error("Error generating ai counselling response", error.response || error);
        return new Response(JSON.stringify({ error: "Error generating ai counselling response" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
