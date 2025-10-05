"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Mail, Home, ArrowRight, Download } from "lucide-react";
import { useCartStore } from "../../../store/cart-store";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Run only on client
  useEffect(() => {
    // Clear the cart once user lands here
    clearCart();

    // Generate stable client-only order number
    setOrderNumber(`CYF-${Date.now().toString().slice(-8)}`);

    setIsAnimating(true);
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Main Success Card */}
        <div
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
            isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6 animate-bounce">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2.5} />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Order Confirmed!</h1>
              <p className="text-green-50 text-lg">Thank you for shopping with Cyfa Luxury Wears</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="px-8 py-8">
            {/* Order Number */}
            {orderNumber && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Number</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">{orderNumber}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                    <Download className="w-4 h-4" />
                    Receipt
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            <div className="mb-8 text-center">
              <p className="text-gray-700 leading-relaxed mb-2">
                We&apos;ve received your order and will begin processing it right away.
              </p>
              <p className="text-gray-600 text-sm">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
                  What's Next?
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="bg-blue-500 rounded-full p-2 mt-1">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Check Your Email</h4>
                    <p className="text-sm text-gray-600">
                      Order confirmation and tracking details have been sent to your inbox.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="bg-purple-500 rounded-full p-2 mt-1">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Order Processing</h4>
                    <p className="text-sm text-gray-600">
                      Your order is being prepared and will ship within 2-3 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Track Your Order</h4>
                    <p className="text-sm text-gray-600">
                      You'll receive a tracking number once your order ships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help with your order?{" "}
                <a
                  href="/contact"
                  className="text-red-600 hover:text-red-700 font-semibold underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur rounded-2xl shadow-lg p-6 border border-white">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full p-3">
              <span className="text-2xl">💝</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Exclusive Offer</h3>
              <p className="text-sm text-gray-600">
                Use code{" "}
                <span className="font-mono font-bold text-red-600">THANKYOU10</span> for 10% off
                your next purchase!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
