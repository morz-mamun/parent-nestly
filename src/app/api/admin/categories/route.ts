import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

// ✅ GET all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// ✅ POST create new category
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, subcategories } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 },
      );
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // Check if category already exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 400 },
      );
    }

    const category = await Category.create({
      name,
      slug,
      subcategories: subcategories || [],
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 },
    );
  }
}
