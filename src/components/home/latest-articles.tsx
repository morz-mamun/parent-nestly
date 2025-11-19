"use client";
import { ArrowRight, Clock, Eye, MessageCircle, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { useBlogs } from "@/hooks/use-allBlogs";
import { TBlog } from "@/types/blog";
import Link from "next/link";
import Loading from "../shared/loading";
import BlogCard from "../cards/blog-card";

export default function LatestArticles() {
  const { data: allBlogs, isLoading } = useBlogs("Parenting Life");

  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  return (
    <section className="max-w-screen-2xl mx-auto px-4">
      <div className="space-y-12">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Clock className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Parenting Life</span>{" "}
            <span className="text-primary">Picks</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            Stay up-to-date with our latest parenting guides, expert product
            reviews, and real-life tips for raising confident, healthy kids at
            every stage.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && <Loading />}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {allPublishedBlogs?.slice(0, 4).map((blog: TBlog) => (
            <Link
              href={`/parenting-life/${blog.slug}`}
              key={blog._id}
              className="group"
            >
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-right">
          <Link href="/parenting-life">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer group bg-transparent"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
