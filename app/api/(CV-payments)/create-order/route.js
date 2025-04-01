import { NextResponse } from "next/server";
import { serverInstance } from '@/lib/serverApi';

export async function POST(request) {
    try {
        // Parse userId and planType from the request body
        const { userId, planType } = await request.json();

        if (!userId || !planType) {
            return NextResponse.json({ success: false, message: "User ID and Plan Type are required" }, { status: 400 });
        }

        // Send userId and planType to backend for order creation
        const { data } = await serverInstance.post("/cv-builder/create-order", { userId, planType }, {
            headers: { "Content-Type": "application/json" },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
