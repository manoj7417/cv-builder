import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const { oldPassword, newPassword } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/user/changepassword', { oldPassword, newPassword }, {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error checking user eligiblity" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
