import { serverInstance } from '@/lib/serverApi';

export async function PATCH(req, { params }) {
    try {
        const token = req.headers.get('Authorization');
        const payload = await req.json();
        const { id } = params;
        const response = await serverInstance.patch(`/admin/verifyCoach/${id}`, payload, {
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
        const errorMessage = error.response ? error.response.data : { error: "Error updating in coach data" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}