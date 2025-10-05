"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  PlusIcon,
  MinusIcon,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Tag,
  X,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../../store/cart-store";

export default function CartPage() {
  const { items, removeItem, clearCart, updateQuantity } = useCartStore();
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 p-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 text-center max-w-md w-full border border-gray-100">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-pink-100">
            <span className="text-5xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything yet. Start exploring our
            collection and find something you love!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed: " + data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[₦,]/g, ""))
        : Number(item.price);
    return sum + price * (item.quantity || 1);
  }, 0);

  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const shipping = subtotalAfterDiscount >= 100000 ? 0 : 5000;
  const tax = subtotalAfterDiscount * 0.075;
  const total = subtotalAfterDiscount + shipping + tax;
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) {
      removeItem(id);
    } else if (updateQuantity) {
      updateQuantity(id, newQty);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.toUpperCase();
    if (code === "CYFA10" || code === "LUXURY10") {
      setAppliedPromo(code);
      setPromoCode("");
    } else {
      alert("Invalid promo code. Try CYFA10 or LUXURY10");
    }
  };

  const handleRemovePromo = () => setAppliedPromo(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-8 md:py-12">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
            <p className="text-white text-lg font-medium">
              Redirecting to Secure Checkout...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </p>
            </div>
            <button
              onClick={clearCart}
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Table Header - Desktop Only */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div className="col-span-6">Product(s)</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const price =
                    typeof item.price === "string"
                      ? parseFloat(item.price.replace(/[₦,]/g, ""))
                      : Number(item.price);
                  const qty = item.quantity || 1;
                  const itemTotal = price * qty;

                  return (
                    <div
                      key={item.id}
                      className="p-4 md:p-6 hover:bg-gray-50 transition"
                    >
                      <div className="grid md:grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="md:col-span-6 flex items-start gap-4">
                          <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="rounded-lg object-cover border border-gray-200"
                              sizes="(max-width: 768px) 80px, 96px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="md:hidden text-lg font-bold text-red-600">
                              ₦{price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Price - Desktop */}
                        <div className="hidden md:flex md:col-span-2 justify-center">
                          <span className="text-lg font-semibold text-gray-900">
                            ₦{price.toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="md:col-span-2 flex md:justify-center items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, qty - 1)
                              }
                              className="p-2 hover:bg-gray-200 rounded-l-full transition"
                              aria-label="Decrease quantity"
                            >
                              {qty > 1 ? (
                                <MinusIcon className="w-4 h-4 text-gray-700" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-red-600" />
                              )}
                            </button>
                            <span className="px-4 py-1 font-semibold min-w-[3rem] text-center text-gray-900">
                              {qty}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, qty + 1)
                              }
                              className="p-2 hover:bg-gray-200 rounded-r-full transition"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-sm text-gray-600">
                            Subtotal:
                          </span>
                          <span className="text-xl font-bold text-red-600">
                            ₦{itemTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Clear Cart */}
            <button
              onClick={clearCart}
              className="md:hidden w-full mt-4 text-sm text-gray-500 hover:text-red-600 transition flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Main Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>Order Summary</span>
                    <span className="text-sm font-normal text-gray-600">
                      ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-semibold text-base">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Applied Promo */}
                    {appliedPromo && (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 -mx-1">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-xs text-green-700 font-semibold">
                              {appliedPromo} Applied
                            </p>
                            <p className="text-xs text-green-600">
                              10% discount
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-700">
                            -₦{discount.toLocaleString()}
                          </span>
                          <button
                            onClick={handleRemovePromo}
                            className="text-red-500 hover:text-red-700 cursor-pointer transition p-1 hover:bg-red-50 rounded"
                            aria-label="Remove promo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Shipping</span>
                      </div>
                      <span
                        className={`font-semibold ${
                          shipping === 0 ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        {shipping === 0
                          ? "FREE"
                          : `₦${shipping.toLocaleString()}`}
                      </span>
                    </div>

                    {/* Free shipping progress bar */}
                    {subtotalAfterDiscount < 100000 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 -mx-1">
                        <div className="flex items-start gap-2 mb-2">
                          <Truck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-blue-900 font-medium mb-1">
                              Add ₦
                              {(100000 - subtotalAfterDiscount).toLocaleString()}{" "}
                              more for FREE shipping
                            </p>
                            {/* Progress bar */}
                            <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                                style={{
                                  width: `${Math.min(
                                    (subtotalAfterDiscount / 100000) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tax */}
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-sm">Tax (VAT 7.5%)</span>
                      <span className="font-semibold text-base">
                        ₦{tax.toLocaleString()}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4" />

                    {/* Total */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 -mx-1">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">
                          ₦{total.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Incl. taxes & fees
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  {!appliedPromo && (
                    <div className="border-t border-gray-200 pt-5">
                      <label className=" text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-red-600" />
                        Have a promo code?
                      </label>
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900"
                        />
                        <button
                          type="submit"
                          className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span>Try:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded font-mono font-semibold text-red-600">
                          CYFA10
                        </code>
                        <span>or</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded font-mono font-semibold text-red-600">
                          LUXURY10
                        </code>
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full cursor-pointer rounded-xl py-4 font-bold text-white text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-xl hover:from-red-700 hover:to-pink-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        Proceed to Checkout
                      </>
                    )}
                  </button>

                  {/* Continue Shopping Link */}
                  <Link
                    href="/products"
                    className="block w-full text-center rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Trust Badges Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Why Shop With Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Secure Checkout
                      </p>
                      <p className="text-xs text-gray-600">
                        SSL encrypted payment processing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Fast Delivery
                      </p>
                      <p className="text-xs text-gray-600">
                        Free shipping on orders over ₦100,000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Easy Returns
                      </p>
                      <p className="text-xs text-gray-600">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <p className="text-xs text-gray-600 mb-3 text-center font-medium">
                  We Accept
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs font-semibold text-gray-700">
                    💳 Visa
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs font-semibold text-gray-700">
                    💳 Mastercard
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs font-semibold text-gray-700">
                    💳 Verve
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}