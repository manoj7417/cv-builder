import { serverInstance } from '@/lib/serverApi';

export async function PATCH(req, res) {
    try {
        const data = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.patch('/user/update/userprofiledetails', data, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error updating user profile" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
