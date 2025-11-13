import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import mongoose from "mongoose";

/// GET single post by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    let post;

    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findById(id);
    } else {
      // If not valid ObjectId, treat it as a slug
      post = await BlogPost.findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Error while fetching single post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // notice it's a Promise
) {
  try {
    await connectDB();
    // Await params before using
    const { id } = await params;
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 },
    );
  }
}

// patch update post
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // notice it's a Promise
) {
  try {
    await connectDB();

    // Await params before using
    const { id } = await params;

    const body = await request.json();
    const newData = body;
    const post = await BlogPost.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 },
    );
  }
}
