"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCartStore } from "../../../../store/cart-store";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  category?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          const found = data.products.find((p: Product) => p.id === id);
          setProduct(found || null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
        <p className="text-gray-700 font-medium text-lg">Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-16 px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* ---------- Image Gallery ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={product.images[0]}
              alt={product.name}
              className="w-full max-h-[520px] object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-24 w-full rounded-xl object-cover border hover:scale-105 transition"
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* ---------- Details ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center items-center text-center space-y-6"
        >
          {product.category && (
            <span className="inline-block w-fit rounded-full bg-red-100 text-red-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
              {product.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            {product.name}
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {product.price}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 text-sm">
              {product.reviews} reviews
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-2xl">
            {product.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
              })
            }
            className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-pink-500 px-6 py-3.5 font-semibold text-white shadow hover:from-red-700 hover:to-pink-600 transition-all"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
