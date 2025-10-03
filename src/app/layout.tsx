import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Cyfa Luxury Wears",
  description: "Style For Him & Her - Unisex Fashion Redefined",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
