// app/api/coupon/apply/route.ts
import { serverInstance } from '@/lib/serverApi';

export async function POST(req) {
    try {
        // 1. Get authorization token
        const token = req.headers.get('Authorization');
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'Authorization header missing' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // 2. Parse request body
        const { code } = await req.json();

        // 3. Forward request to backend service
        const response = await serverInstance.post('/coupon/apply', {
            code
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        // 4. Return successful response
        return new Response(
            JSON.stringify(response.data),
            {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        // 5. Handle errors consistently
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data || {
            error: "Error applying coupon"
        };

        return new Response(
            JSON.stringify(errorMessage),
            {
                status: statusCode,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}