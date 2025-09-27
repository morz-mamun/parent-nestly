import { ArrowRight, Clock, Eye, MessageCircle, Calendar } from "lucide-react";
import { Button } from "../ui/button";

const latestArticles = [
  {
    id: 1,
    title: "10 Essential Design Principles for Modern Web Apps",
    excerpt:
      "Master the fundamental design principles that create intuitive and beautiful user experiences in today's digital landscape.",
    author: "Sarah Chen",
    publishDate: "2 days ago",
    readTime: "8 min read",
    views: "4.2K",
    comments: "67",
    category: "Design",
    categoryColor: "bg-purple-500/10 text-purple-600",
    image: "/ai-artificial-intelligence-technology.jpg",
  },
  {
    id: 2,
    title: "The Rise of AI in Content Creation: What Creators Need to Know",
    excerpt:
      "Explore how artificial intelligence is transforming content creation and what it means for the future of creative work.",
    author: "Marcus Rodriguez",
    publishDate: "4 days ago",
    readTime: "6 min read",
    views: "3.8K",
    comments: "45",
    category: "Technology",
    categoryColor: "bg-blue-500/10 text-blue-600",
    image: "/remote-team-collaboration-workspace.jpg",
  },
  {
    id: 3,
    title: "Building Sustainable Startup Culture in Remote Teams",
    excerpt:
      "Learn proven strategies for creating a thriving company culture that scales with remote and hybrid work environments.",
    author: "Emily Watson",
    publishDate: "1 week ago",
    readTime: "10 min read",
    views: "2.9K",
    comments: "38",
    category: "Startup",
    categoryColor: "bg-green-500/10 text-green-600",
    image: "/ai-artificial-intelligence-technology.jpg",
  },
];
export default function LatestArticles() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="space-y-12">
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
            Stay up-to-date with our freshest insights, expert analysis, and
            trending topics that are shaping the industry today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article
              key={article.id}
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
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${article.categoryColor}`}
                >
                  {article.category}
                </p>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors text-balance">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Article Meta */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{article.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {article.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {article.author}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.publishDate}
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

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </article>
          ))}
        </div>

        <div className="text-right">
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer group bg-transparent"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
