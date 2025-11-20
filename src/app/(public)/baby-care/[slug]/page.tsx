import BlogDetailsPage from "@/app/pages/blog-details-page";
import connectDB from "@/lib/mongodb";
import { generateBlogSEO } from "@/lib/seo";
import BlogPost from "@/models/BlogPost";

async function getBlog(identifier: string) {
  await connectDB();
  const blog = await BlogPost.findOne({ slug: identifier }).lean();
  return JSON.parse(JSON.stringify(blog));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string; slug?: string }>;
}) {
  const { id, slug } = await params;
  const identifier = id || slug;

  const blog = await getBlog(identifier || "");
  const url = `https://parent-nestly.vercel.app/${blog?.category.toLowerCase().replace(" ", "-")}/${identifier}`;

  return generateBlogSEO(blog, url);
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id?: string; slug?: string }>;
}) {
  const { id, slug } = await params;
  const identifier = id || slug;

  const blog = await getBlog(identifier || "");

  return <BlogDetailsPage blog={blog} />;
}
