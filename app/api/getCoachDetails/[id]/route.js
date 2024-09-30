import { serverInstance } from '@/lib/serverApi';

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const response = await serverInstance.get(`/coach/getcoachbyId/${id}`);
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
