import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/subscriber";
import { getWelcomeEmailTemplate } from "@/lib/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Prevent duplicate entries
    const isExisting = await Subscriber.findOne({ email });
    if (isExisting) {
      return NextResponse.json(
        { success: false, error: "Email already subscribed" },
        { status: 409 },
      );
    }

    // Create subscriber
    const newSubscriber = await Subscriber.create({ email });

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "ParentNestly <onboarding@resend.dev>",
      to: email,
      subject:
        "🎉 Welcome to ParentNestly - Start Your Parenting Journey Today!",
      html: getWelcomeEmailTemplate(email),
    });

    if (emailResponse.error) {
      console.error("Email sending failed:", emailResponse.error);
    }

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
