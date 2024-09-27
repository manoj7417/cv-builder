import { serverInstance } from '@/lib/serverApi';

export async function PATCH(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const data = await req.json();
        const response = await serverInstance.patch('/coach/update', data, {
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
        const message = error.response ? error.response.data : { error: "Error updating coach data" };
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
