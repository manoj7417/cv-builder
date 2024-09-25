import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        console.log(token)
        const response = await serverInstance.post('/booking/bookSlot', data, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
        const errorMessage = error.response ? error.response.data : { error: "Error booking slot" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
