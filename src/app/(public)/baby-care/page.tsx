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
import { blogBannerData } from "@/constants/banner/blog-banner-data";

export default function BabyCarePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch only Baby Care blogs
  const { data: allBlogs, isLoading } = useBlogs("Baby Care");

  // ✅ Filter only published blogs
  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  // ✅ Search filter
  const filteredBlogs = useMemo(() => {
    return allPublishedBlogs?.filter((blog: TBlog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [allPublishedBlogs, searchTerm]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <Banner data={blogBannerData} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="flex justify-end mb-8">
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs?.map((blog: TBlog) => (
            <Link key={blog?._id} href={`/baby-care/${blog?.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer p-0">
                <CardHeader className="p-0">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-full object-cover rounded-t-md"
                    />
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col justify-end h-full pt-0 pb-3 px-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="rounded-md px-2 bg-secondary/10">
                      <span className="text-sm">{blog?.primaryKeyword}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{blog?.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {blog?.metaDescription}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {blog?.author || "Unknown"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog?.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
