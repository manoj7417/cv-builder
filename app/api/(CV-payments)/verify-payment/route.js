import { NextResponse } from "next/server";
import { serverInstance } from '@/lib/serverApi';

export async function POST(request) {
    try {
        // Parse the request body
        const { orderId, paymentId, signature, userId } = await request.json();

        // Ensure the necessary fields are present
        if (!orderId || !paymentId || !signature || !userId) {
            return NextResponse.json(
                { success: false, message: "Missing required fields: orderId, paymentId, signature, userId" },
                { status: 400 }
            );
        }

        // Send the data to the backend to verify the payment
        const { data } = await serverInstance.post("/cv-builder/verify-payment", { orderId, paymentId, signature, userId }, {
            headers: { "Content-Type": "application/json" },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
