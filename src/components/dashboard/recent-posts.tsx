import { MoreVertical, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogs } from "@/hooks/use-allBlogs";
import { TBlog } from "@/types/blog";
import Link from "next/link";

export function RecentPosts() {
  const { data: allBlogs = [], isLoading, error, refetch } = useBlogs();
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Your latest blog content
          </p>
        </div>
        <Link href="/admin/dashboard/blogs">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allBlogs?.slice(0, 2).map((post: TBlog) => (
            <div
              key={post._id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base leading-tight hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="font-normal">
                    {post.primaryKeyword}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />0 views
                  </span>
                  <span>0 comments</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "outline"
                    }
                    className="text-xs"
                  >
                    {post.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
