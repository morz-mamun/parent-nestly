/* eslint-disable */
"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Baby,
  BookOpen,
  HeartHandshake,
  ShoppingBag,
} from "lucide-react";
import Loading from "../shared/loading";
import { useCategories } from "@/hooks/use-categories";
import Link from "next/link";

// Map icons based on category name
const iconMap: Record<string, any> = {
  "Baby Care": Baby,
  "Early Learning": BookOpen,
  "Parenting Life": HeartHandshake,
  "Product Guides": ShoppingBag,
};

// Optional: Dynamic color based on name (fallback color provided)
const colorMap: Record<string, string> = {
  "Baby Care": "bg-pink-500/10 text-pink-600 border-pink-200",
  "Early Learning": "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  "Parenting Life": "bg-purple-500/10 text-purple-600 border-purple-200",
  "Product Guides": "bg-blue-500/10 text-blue-600 border-blue-200",
};

export default function ExploreOurCategory() {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <Loading text="Loading categories..." />;
  if (error)
    return (
      <div className="text-lg text-center text-red-500">
        Failed to load categories.
      </div>
    );

  return (
    <section className="my-36 max-w-screen-2xl mx-auto px-4">
      <div className="space-y-12">
        {/* Header */}
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
            From baby care to child growth, health, and trusted product tips,
            explore what matters most to every parent, all in one trusted place.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((category: any) => {
            const Icon = iconMap[category.name] || Globe;
            const color =
              colorMap[category.name] ||
              "bg-primary/10 text-primary border-primary/40";

            return (
              <div
                key={category._id}
                className="group relative bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category?.subcategories?.length || 0} subcategories
                    </div>
                  </div>

                  {/* Name & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed capitalize">
                      {category?.description || "No description available."}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-2">
                    <Link href={`/${category.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary/10 transition-colors"
                      >
                        Explore
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Footer Button */}
        {/* <div className="text-right">
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer group bg-transparent"
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
