import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { message, type } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/openai/generateResumeOnFeeback', { message, type }, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
        const errorMessage = error.response ? error.response.data : { error: "Error generating feedback" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
