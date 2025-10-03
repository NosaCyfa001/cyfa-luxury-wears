"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Lanre Usman",
    location: "Lagos, Ikeja",
    rating: 4,
    comment:
      "I love the unique designs! Their unisex clothing is stylish and super comfortable. Definitely my go-to store now.",
    image: "/vh.jpg",
  },
  {
    name: "Yemi Nwosu",
    location: "Abuja, Garki",
    rating: 5,
    comment:
      "Finally, a store where I can shop with my partner! The quality is top-notch, and delivery is really fast.",
    image: "/yyn.jpg",
  },
  {
    name: "Ben Dawson",
    location: "Rivers, Port Harcourt",
    rating: 4,
    comment:
      "Trendy clothes at fair prices. I always get compliments when I wear outfits from here.",
    image: "/ytf.jpg",
  },
  {
    name: "jane roberts",
    location: "Edo, Upper Sokponba",
    rating: 5,
    comment:
      "Love how versatile the pieces are — I can dress them up or down. This store truly understands modern fashion.",
    image: "/vv.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Real experiences from our happy shoppers
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md p-8 max-w-2xl mx-auto"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                “{testimonial.comment}”
              </p>

              {/* Profile */}
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-red-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
