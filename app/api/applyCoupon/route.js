import { NextResponse } from "next/server";
import { validCoupons } from "@/constants/coupons";

export async function POST(req) {
  try {
    const { couponCode, planName } = await req.json();

    // Validate the coupon code
    const coupon = validCoupons.find(
      (c) => c.code === couponCode && c.planName === planName
    );

    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid coupon code." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { discount: coupon.discount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing coupon:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
