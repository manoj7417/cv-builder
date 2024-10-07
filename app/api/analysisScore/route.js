import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { id } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get(`/analysis/score/${id}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200 ,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error forgetting password" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
