import { serverInstance } from '@/lib/serverApi';

export async function GET(req, res) {
    try {
        const response = await serverInstance.get('/coach/programs')
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error getting programs" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}