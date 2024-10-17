import { serverInstance } from '@/lib/serverApi';

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const token = req.headers.get('Authorization');
        const response = await serverInstance.delete(`/coach/deleteProgram/${id}`, {
            headers: {
                Authorization: token
            }
        })
        return new Response({
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error deleting coach program" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}