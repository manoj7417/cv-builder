import { serverInstance } from '@/lib/serverApi';

export async function GET(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get(`/user/bookings`, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : { error: "Error getting coach details" };
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
