import { ArrowRight, ExternalLink, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import ProductCard from "../cards/product-card";
import { TProduct } from "@/types/product";

const topProducts: TProduct[] = [
  {
    _id: "1",
    name: "MacBook Pro 16-inch",
    description:
      "Powerful laptop for creative professionals with M3 Pro chip and stunning Liquid Retina XDR display.",
    price: "$2,499",
    originalPrice: "$2,699",
    rating: 4.8,
    reviews: "2,847",
    image: "/macbook-pro-laptop-on-desk.jpg",
    badge: "Editor's Choice",
    badgeColor: "bg-green-500/10 text-green-600 border-green-200",
    discount: "Save $200",
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise canceling wireless headphones with exceptional sound quality and comfort.",
    price: "$349",
    originalPrice: "$399",
    rating: 4.7,
    reviews: "5,234",
    image: "/sony-wireless-headphones-premium-black.jpg",
    badge: "Best Seller",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-200",
    discount: "Save $50",
  },
  {
    _id: "3",
    name: "iPad Pro 12.9-inch",
    description:
      "Ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    price: "$1,099",
    originalPrice: "$1,199",
    rating: 3.9,
    reviews: "1,923",
    image: "/ipad-pro-with-apple-pencil-creative-workspace.jpg",
    badge: "Most Popular",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-200",
    discount: "Save $100",
  },
  {
    _id: "4",
    name: "Logitech MX Master 3S",
    description:
      "Advanced wireless mouse with ultra-fast scrolling, ergonomic design, and multi-device connectivity.",
    price: "$89",
    originalPrice: "$99",
    rating: 4.6,
    reviews: "3,456",
    image: "/logitech-mx-master-mouse-on-desk-setup.jpg",
    badge: "Great Value",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-200",
    discount: "Save $10",
  },
];

export default function TopProducts() {
  return (
    <section className="my-36 max-w-screen-xl mx-auto">
      <div className="space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ShoppingCart className="w-4 h-4" />
            Curated recommendations
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Top Product</span>{" "}
            <span className="text-primary">Picks</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto text-pretty">
            Stay up-to-date with our freshest insights, expert analysis, and
            trending topics that are shaping the industry today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {topProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-right">
          <Button
            variant="outline"
            className="cursor-pointer group bg-transparent"
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
