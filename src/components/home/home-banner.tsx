"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  BookOpen,
  User,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBlogs } from "@/hooks/use-allBlogs";
import { TBlog } from "@/types/blog";

export function HomeBanner() {
  const [currentArticle, setCurrentArticle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const { data: allBlogs, isLoading } = useBlogs();

  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlay || !allPublishedBlogs?.length) return;
    const interval = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % allPublishedBlogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, allPublishedBlogs]);

  const nextArticle = () => {
    if (allPublishedBlogs)
      setCurrentArticle((prev) => (prev + 1) % allPublishedBlogs.length);
  };

  const prevArticle = () => {
    if (allPublishedBlogs)
      setCurrentArticle(
        (prev) =>
          (prev - 1 + (allPublishedBlogs?.length || 0)) %
          allPublishedBlogs.length,
      );
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 pt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Trending insights & stories
              </div>

              <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Parenting Made Simpler,</span>{" "}
                <span className="text-primary">Smarter and Kinder.</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Discover parenting tips, expert-backed guides, and trusted
                product reviews, all thoughtfully curated by ParentNestly to
                support today&apos;s moms, dads, and caregivers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog">
                <Button size="lg" className="group">
                  Start Reading
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Readers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-2xl font-bold">1.2K+</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div className="relative bg-card border rounded-3xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevArticle}
                  className="w-8 h-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextArticle}
                  className="w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Loader State */}
              {isLoading || !allPublishedBlogs?.length ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-6 bg-muted rounded w-full"></div>
                  <div className="h-6 bg-muted rounded w-4/5"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ) : (
                // Smooth Transition
                <AnimatePresence mode="wait">
                  <motion.div
                    key={allPublishedBlogs[currentArticle]._id}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Featured Blog</div>
                        <div className="text-sm text-muted-foreground">
                          {allPublishedBlogs[currentArticle].readTime ||
                            "5 min read"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold h-12">
                        {allPublishedBlogs[currentArticle].title.slice(0, 80) +
                          (allPublishedBlogs[currentArticle].title.length > 80
                            ? " ..."
                            : "")}
                      </h3>
                      <p className="text-muted-foreground h-12">
                        {allPublishedBlogs[currentArticle].metaDescription ||
                          "Explore this article for more insights..."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center justify-between text-sm text-gray-500 gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {allPublishedBlogs[currentArticle]?.author ||
                            "Unknown"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(
                            allPublishedBlogs[currentArticle]?.publishDate,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                      <Link
                        href={`/${allPublishedBlogs[currentArticle].category.toLowerCase().split(" ").join("-")}/${allPublishedBlogs[currentArticle].slug}`}
                      >
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-8 right-8 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-8 left-8 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
