"use client";
import { Calendar, Search, User } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useBlogs } from "@/hooks/use-allBlogs";
import { TBlog } from "@/types/blog";
import Link from "next/link";
export default function PublicBlogs() {
  const [searchTerm, setSearchTerm] = useState("");

  // get all News blogs from database
  const { data: allBlogs, isLoading } = useBlogs();
  const allPublishedBlogs = allBlogs?.filter(
    (blog: TBlog) => blog.status === "published",
  );

  const filteredBlogs = allPublishedBlogs?.filter((blog: TBlog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  isLoading && console.log("Loading...");
  return (
    <div className="min-h-screen container mx-auto px-2 my-10">
      {/* Search and Filter */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">News blogs</h1>
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs by title, keyword, or author..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBlogs?.map((blog: TBlog) => (
          <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer p-0">
              <CardHeader className="px-3 pt-3 pb-0">
                {/* 🖼️ blog Image */}
                <div className="w-full h-full">
                  <img
                    src={blog?.image}
                    alt={blog?.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                </div>

                {/* blog categories or primary keywords */}
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-md px-2 bg-secondary/10">
                    <span className="text-sm">{blog?.primaryKeyword}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{blog?.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {blog?.metaDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col justify-end h-full pt-0 px-3 pb-3">
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

      {filteredBlogs?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No blogs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
