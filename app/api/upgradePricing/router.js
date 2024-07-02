import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { data } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/stripe/createSubscription', data, {
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
        console.error("Error in upgrading pricing", error.response || error);
        return new Response(JSON.stringify({ error: "Error in upgrading pricing" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
