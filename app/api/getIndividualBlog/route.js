import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { id } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get(`/blog/get/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : { error: "Error getting blog details" };
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
