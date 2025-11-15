import BlogDetailsPage from "@/app/pages/blog-details-page";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id?: string; slug?: string }>;
}) {
  const { id, slug } = await params;
  return <BlogDetailsPage id={id} slug={slug} />;
}
