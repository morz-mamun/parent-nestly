"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const featuredArticles = [
  {
    id: 1,
    title: "The Future of Digital Storytelling",
    description:
      "Exploring how emerging technologies are reshaping the way we create, share, and experience stories in the digital age.",
    readTime: "5 min read",
    views: "2.4K views",
    likes: "156 likes",
    comments: "23 comments",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "AI-Powered Content Creation",
    description:
      "Discover how artificial intelligence is revolutionizing content creation and what it means for creators and businesses.",
    readTime: "7 min read",
    views: "3.1K views",
    likes: "289 likes",
    comments: "45 comments",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Building Sustainable Communities",
    description:
      "Learn the strategies and principles behind creating thriving, long-lasting online communities that engage and inspire.",
    readTime: "6 min read",
    views: "1.8K views",
    likes: "124 likes",
    comments: "31 comments",
    icon: Users,
  },
];

export function HomeBanner() {
  const [currentArticle, setCurrentArticle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % featuredArticles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Next/Prev do not stop autoplay
  const nextArticle = () => {
    setCurrentArticle((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevArticle = () => {
    setCurrentArticle(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length,
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
                {"Trending insights & stories"}
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Discover Ideas That</span>{" "}
                <span className="text-primary">Inspire</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Explore thought-provoking articles, expert insights, and
                creative perspectives that shape the future of innovation and
                design.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Start Reading
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
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

              {/* Smooth Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredArticles[currentArticle].id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      {(() => {
                        const Icon = featuredArticles[currentArticle].icon;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <div className="font-semibold">Featured Article</div>
                      <div className="text-sm text-muted-foreground">
                        {featuredArticles[currentArticle].readTime}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      {featuredArticles[currentArticle].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {featuredArticles[currentArticle].description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredArticles[currentArticle].views}</span>
                      <span>{featuredArticles[currentArticle].likes}</span>
                      <span>{featuredArticles[currentArticle].comments}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-8 right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-8 left-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
