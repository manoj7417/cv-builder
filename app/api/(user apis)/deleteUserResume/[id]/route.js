import { serverInstance } from '@/lib/serverApi';

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const token = req.headers.get('Authorization')
        const response = await serverInstance.delete(`/resume/delete/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        if (response.status === 204) {
            return new Response(null, { status: 204 });
        }

        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error deleting user resume" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
