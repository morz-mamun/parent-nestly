"use client";
import { ArrowRight, Clock, Eye, MessageCircle, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { useBlogs } from "@/hooks/use-allBlogs";
import { TBlog } from "@/types/blog";
import Link from "next/link";

export default function LatestArticles() {
  const { data: allBlogs, isLoading } = useBlogs();

  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  // Dynamic category colors map
  const categoryColors: Record<string, string> = {
    "Baby Care": "bg-pink-500/10 text-pink-600",
    "Parenting Life": "bg-blue-500/10 text-blue-600",
    "Early Learning": "bg-green-500/10 text-green-600",
    "Product Guides": "bg-yellow-500/10 text-yellow-600",
    // Add based on your categories
  };

  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="space-y-12">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Clock className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Latest</span>{" "}
            <span className="text-primary">Articles</span>
          </h2>
          <p className="max-w-lg mx-auto text-lg text-muted-foreground text-pretty">
            Stay up-to-date with our latest parenting guides, expert product
            reviews, and real-life tips for raising confident, healthy kids at
            every stage.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <p className="text-center text-muted-foreground text-sm">
            Loading...
          </p>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPublishedBlogs?.slice(0, 3).map((article: TBlog) => (
            <Link
              href={`/blogs/${article.slug}`}
              key={article._id}
              className="group"
            >
              <article
                key={article._id}
                className="group bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Article Image */}
                <div className="overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="p-4 space-y-4">
                  <p
                    className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${categoryColors[article.category] || "bg-gray-200 text-gray-600"}`}
                  >
                    {article.category}
                  </p>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors text-balance">
                      {`${article.title.slice(0, 70)} ...`}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 h-12">
                      {article.metaDescription || "No description available."}
                    </p>
                  </div>

                  {/* Article Meta */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article?.readTime || "5 min read"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views || "1.2K"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article?.comments || "10"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {article.author
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "A"}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {article.author || "Unknown"}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer group-hover:bg-primary/10 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-right">
          <Link href="/blogs">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer group bg-transparent"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
