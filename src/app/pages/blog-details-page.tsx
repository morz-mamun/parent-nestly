"use client";
import { EmailSubscription } from "@/components/shared/email-subscription";
import Loading from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function BlogDetailsPage({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const parentPath = segments[0] || "blogs"; // fallback if none found

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id || slug],
    queryFn: async () => {
      const url = id ? `/api/admin/blogs/${id}` : `/api/admin/blogs/${slug}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch blog");
      const result = await res.json();
      return result?.data;
    },
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!", {
        description: "You can share it with your friends.",
      });
    }
  };

  if (isLoading) return <Loading text="Loading Blog..." />;

  return (
    <>
      {blog ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <Link href={`/${parentPath}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <article>
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {blog?.readTime || "5"} min read
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {blog?.title || "Loading..."}
                </h1>

                {blog?.image && (
                  <div className="w-full h-96 overflow-hidden">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {blog?.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>By {blog?.author || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(blog?.publishDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </header>

              <Separator className="mb-8" />

              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: blog?.content || "Blog Content",
                }}
              />
            </article>

            <div className="mt-12 text-center">
              <Link href="/blogs">
                <Button>Read More blogs</Button>
              </Link>
            </div>

            {/* Email Subscription */}
            <EmailSubscription />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-4">
              The blog you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href={`/${parentPath}`}>
              <Button>Back to Blogs</Button>
            </Link>
          </Card>
        </div>
      )}
    </>
  );
}
