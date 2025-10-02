import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

// GET all posts
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve posts" },
      { status: 500 },
    );
  }
}

// POST create new post
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("body:", body);
    const { title, image, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 },
      );
    }

    const post = await BlogPost.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error("[v0] Error creating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 },
    );
  }
}
