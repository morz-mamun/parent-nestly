import mongoose, { Schema, type Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  slug: string;
  subcategories: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    subcategories: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

// Avoid model overwrite during hot reload in Next.js
export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
