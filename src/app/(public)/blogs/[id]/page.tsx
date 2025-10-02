import BlogDetailsPage from "@/app/pages/blog-details-page";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailsPage id={id} />;
}
