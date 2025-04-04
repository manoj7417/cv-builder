// app/api/coupon/route.ts
import { serverInstance } from '@/lib/serverApi';
import { NextRequest } from 'next/server';

export async function GET(req) {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await serverInstance.get('/coupon', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        return new Response(JSON.stringify(response.data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data || { error: "Error fetching coupon" };

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}