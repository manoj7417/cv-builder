import { serverInstance } from '@/lib/serverApi';

export async function GET(req, res) {
    try {
        const token = req.headers.get('Authorization')
        const response = await serverInstance.get('/resume/allResume', {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error getting user resues" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
