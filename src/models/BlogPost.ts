import mongoose, { Schema, type Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  //   createdAt: Date
  //   updatedAt: Date
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
