import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/user/coachPayment', data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status,
        });
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : { error: "Error in fetching program status" };
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}