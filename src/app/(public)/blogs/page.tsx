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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useBlogs } from "@/hooks/use-allBlogs";
import type { TBlog } from "@/types/blog";
import Link from "next/link";
import Loading from "@/components/shared/loading";
import Banner from "@/components/shared/banner";
import { blogBannerData } from "@/constants/banner/blog-banner-data";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all"); // ✅ explicitly string

  const { data: allBlogs, isLoading } = useBlogs();

  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  // ✅ Categories strictly typed as string[]
  const categories: string[] = useMemo(() => {
    const uniqueCategories = new Set<string>(
      allPublishedBlogs?.map((blog: TBlog) => blog?.category) || [],
    );
    return Array.from(uniqueCategories);
  }, [allPublishedBlogs]);

  // Filter blogs based on search and active tab
  const filteredBlogs = useMemo(() => {
    return allPublishedBlogs?.filter((blog: TBlog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeTab === "all" || blog.category === activeTab;

      return matchesSearch && matchesCategory;
    });
  }, [allPublishedBlogs, searchTerm, activeTab]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <Banner data={blogBannerData} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val: string) => setActiveTab(val)} // ✅ typed callback
          className="w-full"
        >
          <div className="flex items-center justify-between gap-4 mb-8">
            <TabsList className="inline-flex h-auto p-1 bg-primary/10 backdrop-blur">
              <TabsTrigger
                value="all"
                className="px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                All Posts
              </TabsTrigger>
              {categories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category}
                  className="px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="w-[350px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blogs by title, keyword, or author..."
                  className="pl-12 h-12 text-base shadow-sm"
                />
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBlogs?.map((blog: TBlog) => (
                <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer p-0">
                    <CardHeader className="p-0">
                      {/* 🖼️ blog Image */}
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={blog?.image}
                          alt={blog?.title}
                          className="w-full h-full object-cover rounded-t-md"
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-col justify-end h-full pt-0 pb-3 px-3 space-y-3">
                      {/* blog categories or primary keywords */}
                      <div className="flex items-center justify-between">
                        <div className="rounded-md px-2 bg-secondary/10">
                          <span className="text-sm">
                            {blog?.primaryKeyword}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {blog?.title}
                      </CardTitle>
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
                <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
