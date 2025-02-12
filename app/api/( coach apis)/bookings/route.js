import { serverInstance } from '@/lib/serverApi';

export async function GET(req) {
    try {
        const token = req.headers.get('Authorization');
        
        if (!token) {
            return new Response(JSON.stringify({ error: 'No authorization token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await serverInstance.get('/coach/bookings', {
            headers: { 'Authorization': token }
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Booking API error:', error);
        const status = error.response?.status || 500;
        const message = error.response?.data || { error: "Error getting bookings details" };
        
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
