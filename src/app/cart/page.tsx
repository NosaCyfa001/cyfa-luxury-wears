"use client";

import React from "react";
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
} from "lucide-react";
import { useCartStore } from "../../../store/cart-store";
import { loadStripe } from "@stripe/stripe-js";

export default function CartPage() {
  const { items, removeItem, clearCart, updateQuantity } = useCartStore();
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState<string | null>(null);

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 p-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 text-center max-w-md w-full border border-gray-100">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-pink-100 cursor-pointer">
            <span className="text-5xl">🛒</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you haven't added anything yet. Start exploring our
            collection and find something you love!
          </p>

          <a
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }


  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // redirect to Stripe checkout
    } else {
      alert("Checkout failed: " + data.error);
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

  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const subtotalAfterDiscount = subtotal - discount;
  const shipping = subtotalAfterDiscount >= 100000 ? 0 : 5000; // Free shipping over ₦100k
  const tax = subtotalAfterDiscount * 0.075; // 7.5% VAT
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
    if (
      promoCode.toUpperCase() === "CYFA10" ||
      promoCode.toUpperCase() === "LUXURY10"
    ) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoCode("");
    } else {
      alert("Invalid promo code. Try CYFA10 or LUXURY10");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </a>
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
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition px-4 py-2 rounded-lg hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
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
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover border border-gray-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {item.name}
                            </h3>

                            {/* Mobile Price */}
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

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Promo Code */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-red-600" />
                  Promo Code
                </h3>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-green-700 font-semibold text-sm">
                        {appliedPromo}
                      </span>
                      <span className="text-green-600 text-xs">Applied ✓</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-green-700 hover:text-red-600 transition"
                      aria-label="Remove promo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm text-gray-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Try: <span className="font-mono font-semibold">CYFA10</span>{" "}
                  or <span className="font-mono font-semibold">LUXURY10</span>
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-semibold">
                        -₦{discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center gap-1">
                      Shipping
                      {shipping === 0 && (
                        <span className="text-xs text-green-600">(Free)</span>
                      )}
                    </span>
                    <span
                      className={`font-semibold ${
                        shipping === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shipping === 0
                        ? "Free"
                        : `₦${shipping.toLocaleString()}`}
                    </span>
                  </div>

                  {subtotalAfterDiscount < 100000 && (
                    <p className="text-xs text-gray-500 italic">
                      Add ₦{(100000 - subtotalAfterDiscount).toLocaleString()}{" "}
                      more for free shipping
                    </p>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>Tax (VAT 7.5%)</span>
                    <span className="font-semibold">
                      ₦{tax.toLocaleString()}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-gradient-to-r from-red-600 to-pink-600 py-4 font-semibold cursor-pointer text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all mb-4"
                >
                  Proceed to Checkout
                </button>

                <a
                  href="/products"
                  className="block w-full text-center rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </a>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md p-6 space-y-4">
                <div className="flex items-start gap-3 ">
                  <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-gray-600">
                      SSL encrypted payment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-600">
                      On orders over ₦100,000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
