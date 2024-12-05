import { serverInstance } from '@/lib/serverApi';
export async function GET(req, res) {
    try {
        const response = await serverInstance.get("/google/auth/signup")
        return new Response(JSON.stringify(response.data), {
            status: response.status,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
} 