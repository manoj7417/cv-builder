import { serverInstance } from '@/lib/serverApi';

export async function POST(request) {
    try {
        const data = await request.json();
        const token = await request.headers.get('Authorization');
        const response = await serverInstance.post('/coach/syncCalendar', data, {
            headers: {
                Authorization: token
            }
        });
        return new Response(JSON.stringify(response.data), { status: response.status });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}