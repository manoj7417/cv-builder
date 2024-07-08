import { serverInstance } from '@/lib/serverApi';

export async function GET(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get('/analysis/all', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error getting CV analysis data" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
