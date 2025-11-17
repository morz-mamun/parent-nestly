import { TBlog } from "@/types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, User } from "lucide-react";

export default function BlogCard({ blog }: { blog: TBlog }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer p-0">
      <CardHeader className="p-0">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={blog?.image || "/placeholder.svg"}
            alt={blog?.title}
            className="w-full h-full object-cover rounded-t-md"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-end h-full pt-0 pb-3 px-3 space-y-3">
        <div className="flex items-center justify-start gap-2">
          <div className="rounded-md px-2 bg-primary/30">
            <span className="text-sm font-medium">{blog?.category}</span>
          </div>
          <div className="rounded-md px-2 bg-secondary/30">
            <span className="text-sm capitalize font-medium">
              {blog?.subcategory?.split("-").join(" ")}
            </span>
          </div>
        </div>
        <CardTitle className="h-10">{`${blog?.title.slice(0, 85) + (blog?.title.length > 80 ? "..." : "")}`}</CardTitle>
        {/* <CardDescription className="h-12 border">
          {blog?.metaDescription}
        </CardDescription> */}
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
  );
}
