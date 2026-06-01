"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  brand?: string | null;
}

export function ProductCard({
  id,
  name,
  price,
  comparePrice,
  images,
  category,
  rating,
  reviewCount,
  brand,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `cart-${id}`,
      productId: id,
      name,
      price,
      image: images[0] || "",
    });
    toast.success("Added to cart!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${id}`}>
        <div className="group bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden card-hover">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={images[0] || "/images/placeholder.jpg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Discount Badge */}
            {comparePrice && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{calculateDiscount(price, comparePrice)}%
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="text-xs text-muted-foreground mb-1">
              {brand && <span>{brand} • </span>}
              {category}
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{formatPrice(price)}</span>
              {comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
