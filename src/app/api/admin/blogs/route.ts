import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

// ✅ GET all posts or filter by category
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Get category from query params
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // If category exists, filter by it; otherwise, get all
    const filter = category ? { category } : {};

    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });

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
    const {
      title,
      category,
      subcategory,
      image,
      content,
      status,
      author,
      primaryKeyword,
      metaTitle,
      metaDescription,
      slug,
      publishDate,
    } = body;
    console.log(body);

    if (!title || !content || !image) {
      return NextResponse.json(
        { success: false, error: "Title, content, and image are required" },
        { status: 400 },
      );
    }

    const post = await BlogPost.create({
      title,
      category,
      subcategory,
      image,
      content,
      status: status || "draft",
      author,
      primaryKeyword,
      metaTitle,
      metaDescription,
      slug,
      publishDate,
    });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 },
    );
  }
}
