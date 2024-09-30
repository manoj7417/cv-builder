import { serverInstance } from '@/lib/serverApi';

export async function PATCH(req, res) {
    try {
        const data = await req.formData();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.patch('/user/udpate/profilImage', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error logging in:", error.response || error);
        return new Response(JSON.stringify({ error: "Error updating profile picture" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
