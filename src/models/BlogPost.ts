import mongoose, { Schema, type Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  image: string;
  author: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    author: {
      type: String,
      required: false,
      trim: true,
    },
    primaryKeyword: {
      type: String,
      required: [true, "Please provide a primary keyword"],
      trim: true,
    },
    metaTitle: {
      type: String,
      required: false,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: false,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
