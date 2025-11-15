export type TBlog = {
  _id: string;
  title: string;
  image: string;
  author: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  publishDate: string;
  category: string;
  subcategory?: string;
  readTime?: string;
  views?: number;
  comments?: number;
  likes?: number;
};
