"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Gem,
  Sparkles,
  DollarSign,
  Star,
  Users,
  CheckCircle,
  ArrowRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "Founded",
      description: "Started with a vision to democratize luxury fashion",
    },
    {
      year: "2020",
      title: "Global Reach",
      description: "Expanded to serve customers in 25+ countries",
    },
    {
      year: "2022",
      title: "45K+ Customers",
      description: "Reached 50,000 satisfied customers worldwide",
    },
    {
      year: "2024",
      title: "Sustainability",
      description: "Launched our eco-friendly collection initiative",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="About Cyfa Luxury"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-32 right-32 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-24 left-24 w-32 h-32 bg-red-600/20 rounded-full blur-lg animate-bounce"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl px-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
              Story
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed"
          >
            Redefining luxury fashion with elegance, quality, and accessibility
            for the modern world.
          </motion.p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <HeartIcon className="w-4 h-4" />
                Our Beginning
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Born from a Vision of{" "}
                <span className="text-red-600">Accessible Luxury</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At{" "}
                <span className="font-semibold text-black">
                  Cyfa 
                  Luxury Wears
                </span>
                , fashion is more than just clothing—it is a statement, a
                lifestyle, and a reflection of your unique identity. We believe
                that luxury should be within reach of everyone who appreciates
                quality and style.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From our humble beginnings as a small boutique, we have grown
                into a globally recognized brand trusted by fashion enthusiasts
                who value sophistication, quality craftsmanship, and bold
                individuality. Every piece we create tells a story of elegance
                and accessibility.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">6+</div>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    45K+
                  </div>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/vol.webp"
                  alt="Cyfa Luxury Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Star className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      4.9/5
                    </div>
                    <p className="text-gray-600 text-sm">Customer Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our Mission & Vision
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <Target className="w-16 h-16 text-red-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-red-400">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To democratize luxury fashion by making high-quality,
                  sophisticated pieces accessible to everyone without
                  compromising on style, craftsmanship, or elegance. We believe
                  that exceptional fashion should be a right, not a privilege.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-600/20 to-red-600/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <Eye className="w-16 h-16 text-pink-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-pink-400">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To become the leading African fashion brand recognized
                  globally for redefining what luxury means in the modern era.
                  We envision a world where style transcends boundaries and
                  connects cultures through exceptional design.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gem className="w-12 h-12 text-red-600 mb-6" />,
                title: "Uncompromising Quality",
                text: "Every piece is meticulously crafted using the finest fabrics and materials, ensuring durability and luxury in every stitch.",
              },
              {
                icon: <Sparkles className="w-12 h-12 text-red-600 mb-6" />,
                title: "Timeless Elegance",
                text: "We create sophisticated styles that transcend trends, ensuring your wardrobe remains relevant and refined for years to come.",
              },
              {
                icon: <DollarSign className="w-12 h-12 text-red-600 mb-6" />,
                title: "Accessible Luxury",
                text: "Luxury fashion should not be exclusive. We make premium quality accessible without compromising on craftsmanship or design.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full group-hover:transform group-hover:scale-105">
                  <div className="flex justify-center mb-6">
                    <div className="bg-red-50 p-4 rounded-full group-hover:bg-red-100 transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-500 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className={`flex items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:gap-8`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      i % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    } text-center`}
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Choose Cyfa Luxury?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-red-600" />,
                title: "Unique Designs",
                text: "Exclusive collections crafted by our in-house design team. You would not find these pieces anywhere else.",
              },
              {
                icon: <TruckIcon className="w-8 h-8 text-red-600" />,
                title: "Global Delivery",
                text: "Fast, reliable shipping to 25+ countries with tracking and insurance included on every order.",
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8 text-red-600" />,
                title: "Quality Guarantee",
                text: "Every item comes with our quality guarantee. Not satisfied? Return it within 30 days, no questions asked.",
              },
              {
                icon: <Users className="w-8 h-8 text-red-600" />,
                title: "Personal Styling",
                text: "Our expert stylists are available to help you create the perfect look for any occasion.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-red-600" />,
                title: "Sustainable Practices",
                text: "Committed to ethical sourcing and sustainable fashion practices that respect our planet.",
              },
              {
                icon: <HeartIcon className="w-8 h-8 text-red-600" />,
                title: "Customer First",
                text: "Your satisfaction drives everything we do. Join our community of fashion lovers worldwide.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full group-hover:transform group-hover:scale-105">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-600/10 rounded-full blur-2xl animate-bounce"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                Luxury?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of satisfied customers who have discovered the
              perfect blend of sophistication, quality, and accessibility. Your
              style journey begins here.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/about"
                className="group px-10 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Explore Collections
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
