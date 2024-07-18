import { serverInstance } from '@/lib/serverApi';

export const dynamic = 'force-dynamic';

export async function GET(req, res) {
    try {
        const token = req.headers.get('Authorization');
        const response = await serverInstance.get('/user/eligiblity/careerCounselling', {
            headers: {
                'Authorization': token
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
        const errorMessage = error.response ? error.response.data : { error: "Error checking user eligiblity" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
