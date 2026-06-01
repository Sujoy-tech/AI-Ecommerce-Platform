"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Search, Camera, MessageSquare, TrendingUp, Shield } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { AIFeatureCard } from "@/components/ai/AIFeatureCard";

const aiFeatures = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Personalized product suggestions powered by collaborative filtering and deep learning models.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Natural language search that understands intent, not just keywords. Find exactly what you need.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Camera,
    title: "Visual Search",
    description: "Upload an image to find similar products. Powered by computer vision and image embeddings.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "AI Shopping Assistant",
    description: "24/7 intelligent chatbot that helps you find products, compare options, and make decisions.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Pricing",
    description: "ML-powered pricing engine that ensures you always get the best deal with real-time optimization.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Advanced anomaly detection protects every transaction with real-time ML scoring.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Brain className="w-4 h-4" />
              Powered by Advanced AI & Machine Learning
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Shopping Reimagined with{" "}
              <span className="gradient-text">Artificial Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of e-commerce. Our platform uses cutting-edge ML models,
              LLMs, and computer vision to deliver personalized, intelligent shopping experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-400 transition-colors"
              >
                <Search className="w-5 h-5" />
                Try AI Search
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="text-4xl font-bold mb-4">
              AI-Powered Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every interaction is enhanced by machine learning. From search to checkout,
              our AI works behind the scenes to create a seamless experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {aiFeatures.map((feature) => (
              <AIFeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="text-4xl font-bold mb-4">Built with Modern Tech Stack</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade architecture using the latest technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Next.js 14", "TypeScript", "Tailwind CSS", "Prisma",
              "PostgreSQL", "Hugging Face", "TensorFlow.js", "Zustand",
              "NextAuth", "Vercel", "Stripe", "Redis",
            ].map((tech) => (
              <motion.div
                key={tech}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl border shadow-sm card-hover"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-medium text-sm">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience AI Shopping?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of users who have already discovered the power of AI-driven e-commerce.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
