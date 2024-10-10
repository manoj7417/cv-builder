import { serverInstance } from '@/lib/serverApi';

export async function POST(req, { params }) {
    try {
        const data = await req.json()
        const { id } = params;
        const response = await serverInstance.post(`/editCoach/details/${id}`, data);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error editing coach info" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}