"use client";

import { Calendar, Search, User } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBlogs } from "@/hooks/use-allBlogs";
import type { TBlog } from "@/types/blog";
import Link from "next/link";
import Loading from "@/components/shared/loading";
import Banner from "@/components/shared/banner";
import { babyCareBannerData } from "@/constants/banner/blog-banner-data";
import { usePathname } from "next/navigation";
import BlogCard from "@/components/cards/blog-card";

export default function BabyCarePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const pathname = usePathname();

  // Split URL path (e.g., "/blogs/baby-care" → ["blogs", "baby-care"])
  const segments = pathname.split("/").filter((seg) => seg !== "");

  // Build breadcrumb list
  const breadcrumbs = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: decodeURIComponent(seg), href };
  });
  // ✅ Fetch only Baby Care blogs
  const { data: allBlogs, isLoading } = useBlogs("Product Guides");

  // ✅ Filter only published blogs
  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  const subcategories = useMemo(() => {
    const unique = new Set(
      allPublishedBlogs?.map((blog: TBlog) => blog.subcategory) || [],
    );
    return Array.from(unique) as string[];
  }, [allPublishedBlogs]);

  // ✅ Search and subcategory filter
  const filteredBlogs = useMemo(() => {
    return allPublishedBlogs?.filter((blog: TBlog) => {
      const matchesSubcategory =
        activeSubcategory === null ||
        activeSubcategory === "all" ||
        blog.subcategory === activeSubcategory;

      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSubcategory && matchesSearch;
    });
  }, [allPublishedBlogs, searchTerm, activeSubcategory]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <Banner data={babyCareBannerData} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Breadcrumbs */}
        <div className="flex justify-between items-center mb-8">
          <nav className="flex justify-center text-sm text-gray-600 dark:text-gray-300 mb-3 space-x-1">
            {/* Home link */}
            <Link
              href="/"
              className="font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center">
                <span className="mx-1 text-gray-400">/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-bold text-gray-800 dark:text-gray-200 capitalize">
                    {item.label.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors capitalize"
                  >
                    {item.label.replace(/-/g, " ")}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          <div className="relative w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Baby Care blogs..."
              className="pl-12 h-12 text-base shadow-sm"
            />
          </div>
        </div>

        {subcategories.length > 0 && (
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveSubcategory("all")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSubcategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              All
            </button>
            {subcategories.map((subcategory: string) => (
              <button
                key={subcategory}
                onClick={() => setActiveSubcategory(subcategory)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all capitalize ${
                  activeSubcategory === subcategory
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs?.map((blog: TBlog) => (
            <Link key={blog?._id} href={`/product-guides/${blog?.slug}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs?.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No Baby Care blogs found
            </h3>
            <p className="text-muted-foreground">
              Try a different search term or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
