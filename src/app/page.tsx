"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Testimonials from "./components/Testimonials";

type Product = {
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badges?: string[];
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-white">
        <Image
          src="/holly.jpg"
          alt="Luxury Fashion Collection"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-4 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          >
            C y f a
            <br />
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text"
            >
              L u x u r y
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            W e a r s
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mt-6"
          >
            Redefining luxury for him, for her, for all. Timeless fashion that
            speaks sophistication and style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
          >
            <Link
              href="/products"
              className="rounded-full bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-300 transition shadow hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-8 py-3 text-lg font-semibold text-white shadow hover:scale-105 transition"
            >
              Behind the Brand
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* =============== TRUST INDICATORS =============== */}
      <section className="bg-gray-900 py-14 text-white">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:grid-cols-3 text-center">
          <Indicator
            icon={<TruckIcon className="w-12 h-12 text-red-500 mb-3" />}
            title="Free Worldwide Shipping"
            text="On orders over ₦100,000"
          />
          <Indicator
            icon={<ShieldCheckIcon className="w-12 h-12 text-red-500 mb-3" />}
            title="Authenticity Guaranteed"
            text="100% genuine products"
          />
          <Indicator
            icon={<ShoppingBagIcon className="w-12 h-12 text-red-500 mb-3" />}
            title="30-Day Returns"
            text="Hassle-free returns"
          />
        </div>
      </section>

      {/* =============== NEW ARRIVALS =============== */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900"
            >
              Explore Our Latest Arrivals
            </motion.h2>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              View All <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] cursor-pointer">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={500}
                    height={600}
                    className="object-cover w-full h-full rounded-xl"
                  />

                  {/* Show ONLY first badge */}
                  {p.badges && p.badges.length > 0 && (
                    <div className="absolute top-3 left-3">
                      {(() => {
                        const badge = p.badges[0]; // first badge only
                        const colorMap: Record<string, string> = {
                          "On Sale": "bg-green-600/90 text-white",
                          New: "bg-blue-600/90 text-white",
                          "Best Seller": "bg-yellow-500/90 text-black",
                          Limited: "bg-orange-600/90 text-white",
                          Exclusive: "bg-purple-600/90 text-white",
                        };
                        return (
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold shadow-md transform -rotate-1 ${
                              colorMap[badge] || "bg-gray-600/90 text-white"
                            }`}
                          >
                            {badge}
                          </span>
                        );
                      })()}
                    </div>
                  )}

                  {/* Add to Cart Icon */}
                  <div className="absolute top-3 right-3 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur group-hover:opacity-100 transition">
                    <ShoppingBagIcon className="h-5 w-5 text-gray-700" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-3 space-y-1 text-center sm:text-left cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 hover:text-red-600 transition line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{p.category}</p>

                  <div className="flex justify-center sm:justify-start items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">
                      {p.price}
                    </span>
                    {p.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== BRAND STORY =============== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl px-4 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-center tracking-tight text-3xl md:text-4xl font-bold text-gray-900"
          >
            Crafted for Excellence
          </motion.h2>
          <p className="mb-4 text-base sm:text-lg leading-relaxed text-gray-600">
            Since our founding,{" "}
            <span className="font-semibold text-gray-800">
              Cyfa Luxury Wears
            </span>{" "}
            has been dedicated to creating exceptional pieces that embody
            timeless elegance and contemporary sophistication.
          </p>
          <p className="mb-6 text-base sm:text-lg leading-relaxed text-gray-600">
            From premium fabrics sourced globally to meticulous attention to
            detail, every piece in our collection tells a story of refinement.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
          >
            Learn Our Story <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Testimonials />
      {/* =============== NEWSLETTER =============== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black py-20 text-white">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-2xl px-4 text-center"
        >
          <h2 className="mb-6 text-3xl sm:text-4xl font-bold">Stay in Style</h2>
          <p className="mb-8 text-gray-300">
            Be the first to discover new collections, exclusive offers, and
            styling tips from our experts.
          </p>
          {subscribed ? (
            <p className="text-green-400 font-semibold">
              🎉 Thank you for subscribing!
            </p>
          ) : (
            <form
              className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full px-5 py-3 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-red-500 outline-none "
                required
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 font-semibold shadow hover:from-red-700 hover:to-pink-700 transition"
              >
                Subscribe
              </button>
            </form>
          )}

        </motion.div>
      </section>

      {/* =============== STATS =============== */}
      <section className="bg-white py-16">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
          <AnimatedStat number={45} suffix="K+" label="Happy Customers" />
          <AnimatedStat number={1300} suffix="+" label="Premium Products" />
          <AnimatedStat number={22} suffix="+" label="Countries" />
          <AnimatedStat number={5} suffix="★" label="Average Rating" />
        </div>
      </section>
    </div>
  );
}

/* ===== Helper Components ===== */
function Indicator({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      {icon}
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
}

function AnimatedStat({
  number,
  suffix,
  label,
}: {
  number: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = number;
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-1 text-3xl sm:text-4xl font-bold text-red-600">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}
