import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Palette,
  Lightbulb,
  Rocket,
  Heart,
  Globe,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Technology",
    description: "Latest trends in tech and innovation",
    icon: Code,
    articleCount: "245 articles",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    id: 2,
    name: "Design",
    description: "Creative insights and visual inspiration",
    icon: Palette,
    articleCount: "189 articles",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    id: 3,
    name: "Innovation",
    description: "Breakthrough ideas and future thinking",
    icon: Lightbulb,
    articleCount: "156 articles",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  },
  {
    id: 4,
    name: "Startup",
    description: "Entrepreneurship and business growth",
    icon: Rocket,
    articleCount: "203 articles",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    id: 5,
    name: "Lifestyle",
    description: "Personal development and wellness",
    icon: Heart,
    articleCount: "167 articles",
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
  },
  {
    id: 6,
    name: "Global",
    description: "World trends and cultural insights",
    icon: Globe,
    articleCount: "134 articles",
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
  },
];
export default function ExploreOurCategory() {
  return (
    <section className="my-36 max-w-screen-xl mx-auto">
      <div className="space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Globe className="w-4 h-4" />
            Find Your Interests
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Explore Our</span>{" "}
            <span className="text-primary">Categories</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground text-pretty">
            Dive deep into topics that matter to you. From cutting-edge
            technology to creative design, find your passion and expand your
            knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center ${category.color}`}
                    >
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.articleCount}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary/10 transition-colors"
                    >
                      Explore
                      <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        <div className="text-right">
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer group bg-transparent"
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
