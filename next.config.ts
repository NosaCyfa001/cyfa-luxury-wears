import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com"], // allow Stripe-hosted images
  },
};

export default nextConfig;
