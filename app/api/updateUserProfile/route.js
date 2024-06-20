import { serverInstance } from '@/lib/serverApi';

export async function PATCH(req, res) {
    try {
        const { data } = await req.json();
        const response = await serverInstance.post('/user/update/userprofiledetails', data);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error logging in:", error.response || error);
        return new Response(JSON.stringify({ error: "Error logging in" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
