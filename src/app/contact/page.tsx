"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  ArrowRightIcon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  HeadphonesIcon,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+234 (0) 123 456 7890", "+234 (0) 987 654 3210"],
      description: "Mon-Fri 9AM-5PM WAT - Sat: 10:00 am – 6:00 am"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["cyfaluxurywears@gmail.com"],
      description: "We will respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Store",
      details: ["Plot 16, Block 72 Adecibo omonla Crescent,Off Victoria Arobieke, Lekki Phase 1, Lagos"],
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "Live Chat",
      details: ["Available 24/7"],
      description: "Instant support online"
    }
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. Items must be in original condition with tags attached."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to 25+ countries worldwide with free shipping on orders over #100,000."
    },
    {
      question: "How can I track my order?",
      answer: "You will receive a tracking number via email once your order ships. You can also track orders in your account."
    },
    {
      question: "Do you offer custom sizing?",
      answer: "Yes, we offer custom sizing for select items. Contact our customer service team for more details."
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/contact-hero.jpg"
            alt="Contact Cyfa Luxury"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-red-600/20 rounded-full blur-lg animate-bounce"></div>

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
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto"
          >
            We are here to help you discover the perfect luxury pieces and answer any questions about your style journey.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How Can We Help?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full group-hover:transform group-hover:scale-105">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-100 transition-colors">
                    <div className="text-red-600">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {info.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have a question about our products, need styling advice, or want to learn more about Cyfa Luxury? 
                  We would love to hear from you.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                        placeholder="+234 (0) 123 456 7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="styling">Styling Advice</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none bg-white"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Store Information & Social */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Store Details */}
              <div className="bg-gray-900 p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-bold mb-6">Store Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Admiralty Mall</p>
                      <p className="text-gray-300">Plot 16, Block 72 Adecibo Omonla Crescent, Off Victoria Arobieke, Lekki Phase 1</p>
                      <p className="text-gray-300">Lagos State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Store Hours</p>
                      <p className="text-gray-300">Monday - Friday: 10AM - 8PM</p>
                      <p className="text-gray-300">Saturday - Sunday: 10AM - 6PM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700 mt-6">
                  <h5 className="font-semibold mb-4">Follow Us</h5>
                  <div className="flex gap-4">
                    {[
                      { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
                      { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
                      { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
                      { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" }
                    ].map((social, i) => (
                      <Link
                        key={i}
                        href={social.href}
                        className="p-3 bg-gray-800 hover:bg-red-600 rounded-full transition-colors duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">Still have questions?</p>
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Our Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Need <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Immediate</span> Help?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our customer service team is available 24/7 to assist you with orders, 
                styling advice, or any questions about our luxury collections.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Customer Service Online</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">Average response time: 2 minutes</span>
                </div>
              </div>

              <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center gap-2 shadow-lg">
                <MessageCircle className="w-5 h-5" />
                Start Live Chat
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-6">Customer Support Stats</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">98%</div>
                    <p className="text-gray-300 text-sm">Satisfaction Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">24/7</div>
                    <p className="text-gray-300 text-sm">Support Available</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">2min</div>
                    <p className="text-gray-300 text-sm">Avg Response</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">45K+</div>
                    <p className="text-gray-300 text-sm">Happy Customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Inquiries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Business Partnerships</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Interested in wholesale opportunities, collaborations, or carrying Cyfa Luxury in your store? 
                We are always looking for like-minded partners who share our vision of accessible luxury.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Wholesale Inquiries</h4>
                  <p className="text-gray-600 mb-4">Bulk orders and retail partnerships</p>
                  <Link
                    href="mailto:wholesale@cyfaluxury.com"
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                  >
                    wholesale@cyfaluxury.com
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Press & Media</h4>
                  <p className="text-gray-600 mb-4">Media kits and press inquiries</p>
                  <Link
                    href="mailto:press@cyfaluxury.com"
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                  >
                    press@cyfaluxury.com
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

           
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive updates, styling tips, and early access to new collections.
          </p>
          
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-full border-0 flex-1 focus:ring-2 focus:ring-red-500 outline-none text-gray-900 placeholder-gray-500 shadow-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            Join 50,000+ fashion enthusiasts. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </div>
  );
}