import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

// ✅ DELETE — Delete category by ID only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete category" },
      { status: 500 },
    );
  }
}

// ✅ PATCH — Update category (name or subcategories) by ID only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, subcategories, action, subcategory } = await request.json();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    // Handle subcategory actions
    if (action === "add" && subcategory) {
      if (!category.subcategories.includes(subcategory)) {
        category.subcategories.push(subcategory);
      }
    } else if (action === "remove" && subcategory) {
      category.subcategories = category.subcategories.filter(
        (s: string) => s !== subcategory,
      );
    } else if (subcategories) {
      category.subcategories = subcategories;
    }

    // Update category name and regenerate slug if name provided
    if (name) {
      category.name = name;
      category.slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    await category.save();

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update category" },
      { status: 500 },
    );
  }
}
