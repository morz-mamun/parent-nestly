// Want to create subscribe endpoint for admin to add new subscribers
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import subscriber from "@/models/subscriber";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();
    // Validate email by regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 },
      );
    }
    const newSubscriber = await subscriber.create({ email });
    return NextResponse.json({
      success: true,
      message: "Subscriber created successfully",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create subscriber" },
      { status: 500 },
    );
  }
}
