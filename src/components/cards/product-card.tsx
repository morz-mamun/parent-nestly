import { TProduct } from "@/types/product";
import { ExternalLink, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductCard({ product }: { product: TProduct }) {
  return (
    <div
      key={product._id}
      className="group bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-muted/20">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* Product Content */}
      <div className="px-4 py-6 space-y-4">
        <div className="space-y-3">
          <h3 className="h-10 text-lg font-bold leading-tight group-hover:text-primary transition-colors text-pretty">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </span>
          </div>
        </div>

        {/* Check on Amazon Button */}
        <Button className="cursor-pointer w-full group bg-primary hover:bg-primary/80 text-white border-0">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Check on Amazon
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
