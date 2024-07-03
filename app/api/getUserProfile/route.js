import { serverInstance } from '@/lib/serverApi';

export async function GET(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get('/user/getUserProfile', {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error getting user details" }), {
            status: error.response.status || 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
