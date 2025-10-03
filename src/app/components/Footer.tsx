import {
  Facebook,
  Instagram,
  X,
  Mail,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-gray-400 mt-16">
      {/* Top Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/*
          New Grid Configuration:
          - Default (mobile): 1 column
          - sm: 2 columns
          - lg: 4 columns (for a sleek 3-3-3-3 look on a 12-column grid, making it an effective 4-column layout)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand - Takes a full column on lg, 2 columns on sm */}
          <div className="sm:col-span-2 lg:col-span-1"> {/* Adjusted lg:col-span-2 to lg:col-span-1 for 4-column layout */}
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-4">
              Cyfa <span className="text-red-600">Luxury</span> Wears
            </h3>
            <p className="text-sm sm:text-base leading-relaxed max-w-md text-gray-400">
              Redefining luxury for him, for her, for all. Timeless fashion that
              speaks sophistication and style.
            </p>

            {/* Social Media - Show on mobile and sm, but hidden on lg (moved to bottom bar) */}
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

          {/* Shop - Takes 1 column on all sizes (now sits next to Brand on sm/lg) */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <a
                  href="/products?category=men"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="/products?category=women"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  href="/products?category=unisex"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Unisex
                </a>
              </li>
              <li>
                <a
                  href="/products?filter=new"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Company - Takes 1 column on all sizes (now sits on the second row on sm, but first row on lg) */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <a
                  href="/about"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white hover:pl-1 transition-all cursor-pointer inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Takes 1 column on all sizes (now sits on the second row on sm, but first row on lg) */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <a
                  href="tel:+2349132496929"
                  className="hover:text-white transition"
                >
                  +234-913-249-6929
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                <a
                  href="mailto:ugobornosa3@gmail.com"
                  className="hover:text-white transition break-all"
                >
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
                  Plot 16, Block 72 Adecibo Omonla Crescent, Off Victoria
                  Arobieke, Lekki Phase 1, Lagos
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* --- */}
      
      {/* Bottom Bar (No change needed here, it's already well-structured) */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-center md:text-left text-gray-500">
              &copy; {new Date().getFullYear()} Cyfa Luxury Wears. All rights
              reserved.
            </p>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <a className="text-gray-500 hover:text-white transition cursor-pointer">
                Privacy Policy
              </a>
              <span className="text-gray-700">•</span>
              <a className="text-gray-500 hover:text-white transition cursor-pointer">
                Terms of Service
              </a>
              <span className="text-gray-700">•</span>
              <a className="text-gray-500 hover:text-white transition cursor-pointer">
                Shipping Info
              </a>
            </div>

            {/* Social Media - Desktop only (Hidden on mobile, appears on lg) */}
            <div className="hidden lg:flex gap-4">
              <a
                aria-label="Facebook"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                aria-label="Instagram"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                aria-label="X"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
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