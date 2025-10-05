import Link from "next/link";
import { Facebook, Instagram, Twitter, X, Mail, Phone, Clock, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-gray-400 mt-16">
      {/* Top Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-4">
              Cyfa <span className="text-red-600">Luxury</span> Wears
            </h3>
            <p className="text-sm sm:text-base leading-relaxed max-w-md text-gray-400">
              Redefining luxury for him, for her, for all. Timeless fashion that
              speaks sophistication and style.
            </p>
            
            {/* Social Media - Show on mobile under brand */}
            <div className="flex gap-4 mt-6 lg:hidden">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">Shop</h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link href="/products" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Unisex
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">Company</h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link href="/about" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">Get in Touch</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <a href="tel:+2349132496929" className="hover:text-white transition">
                  +234-913-249-6929
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <a href="mailto:ugobornosa3@gmail.com" className="hover:text-white transition break-all">
                  ugobornosa3@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <div>
                  <div>Mon – Fri: 9:00 am – 5:00 pm</div>
                  <div>Sat: 10:00 am – 6:00 pm</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <span className="leading-relaxed">
                  Plot 16, Block 72 Adecibo Omonla Crescent, Off Victoria Arobieke, Lekki Phase 1, Lagos
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-center md:text-left text-gray-500">
              &copy; {new Date().getFullYear()} Cyfa Luxury Wears. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <Link href="/" className="text-gray-500 hover:text-white transition">
                Privacy Policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/" className="text-gray-500 hover:text-white transition">
                Terms of Service
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/" className="text-gray-500 hover:text-white transition">
                Shipping Info
              </Link>
            </div>

            {/* Social Media - Desktop only */}
            <div className="hidden lg:flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};