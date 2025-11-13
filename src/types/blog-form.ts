export type FormValues = {
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
};
