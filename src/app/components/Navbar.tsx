"use client";
import Link from "next/link";
import { ShoppingBag, User as UserIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore } from "../../../store/cart-store";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            aria-label="Cyfa Luxury Wears Home"
          >
            <Image
              src="/cyfalogo.png"
              alt="Cyfa Luxury Wears"
              width={60}
              height={60}
              priority
              className="rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {[
              { href: "/", label: "Explore" },
              { href: "/products", label: "Wardrobe" },
              { href: "/about", label: "Who We Are" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-medium text-gray-700 hover:text-red-600 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Clerk auth */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="p-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-gray-100 cursor-pointer">
                  <UserIcon className="w-5 h-5" />
                </button>
              </SignInButton>
            </SignedOut>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-full transition"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="p-2 rounded-full text-gray-700 hover:text-red-600">
                  <UserIcon className="w-5 h-5" />
                </button>
              </SignInButton>
            </SignedOut>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-red-600 rounded-full transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Menu toggle */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100 text-center">
            {[
              { href: "/", label: "Explore" },
              { href: "/products", label: "Wardrobe" },
              { href: "/about", label: "Who We Are" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 px-4 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
