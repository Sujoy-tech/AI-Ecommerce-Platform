import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusAI Shop | AI-Powered E-Commerce Platform",
  description:
    "Experience the future of shopping with AI-powered recommendations, semantic search, visual search, and intelligent customer support.",
  keywords: [
    "AI e-commerce",
    "machine learning",
    "smart shopping",
    "recommendations",
    "visual search",
  ],
  openGraph: {
    title: "NexusAI Shop | AI-Powered E-Commerce Platform",
    description: "Experience the future of shopping with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
