"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "../../../store/cart-store";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string | null;
  rating: number;
  reviews: number;
  isNew: boolean;
  isSale: boolean;
  colors: string[];
  description: string;
  images: string[];
  stripeProductId: string;
  stripePriceId?: string;
  category?: string;
}

const categories = ["Men", "Women", "Unisex"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Men");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-100 px-6">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-700 font-semibold text-lg tracking-wide">
          Loading products
          <span className="animate-pulse text-red-500"> ...</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Fetching the latest deals for you. Please wait.
        </p>
      </div>
    );
  }

  // ✅ Filter products by category and search term
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      p.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-20">
        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:border-transparent transition text-gray-800"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-14">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-2 flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeCategory === cat
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No products found for this search.
          </p>
        ) : (
          <section className="relative">
            <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5 pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-72 overflow-hidden bg-gray-50 cursor-pointer">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-6 text-center">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 hover:text-red-600 transition line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>

                    <div className="flex items-center justify-center gap-3 mb-3">
                      <p className="text-2xl font-bold text-red-600">
                        {product.price}
                      </p>
                      {product.originalPrice && (
                        <p className="text-lg text-gray-400 line-through">
                          ₦{product.originalPrice}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-5">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
