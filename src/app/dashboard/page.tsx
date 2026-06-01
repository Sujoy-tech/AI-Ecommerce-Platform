"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  Star,
  BarChart3,
  Activity,
} from "lucide-react";

const stats = [
  { label: "AI Recommendations Served", value: "2.4M+", icon: Brain, trend: "+12%" },
  { label: "Products", value: "12,847", icon: Package, trend: "+234" },
  { label: "Active Users", value: "89,452", icon: Users, trend: "+5.2%" },
  { label: "Avg. Rating", value: "4.7/5", icon: Star, trend: "+0.2" },
];

const aiMetrics = [
  { label: "Search Accuracy", value: "94.2%", description: "Semantic search relevance score" },
  { label: "Recommendation CTR", value: "23.8%", description: "Click-through rate on AI suggestions" },
  { label: "Chatbot Resolution", value: "87%", description: "Issues resolved without human help" },
  { label: "Fraud Detection", value: "99.1%", description: "Fraudulent transaction detection rate" },
  { label: "Visual Search Match", value: "91.5%", description: "Correct product match from images" },
  { label: "Sentiment Accuracy", value: "96.3%", description: "Review sentiment classification" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time AI/ML model performance and platform analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Model Performance */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          AI Model Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{metric.label}</h3>
                <span className="text-2xl font-bold gradient-text">{metric.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: metric.value }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          System Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-primary">Frontend Layer</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Next.js 14 (App Router + RSC)</li>
              <li>• TypeScript (Strict Mode)</li>
              <li>• Tailwind CSS + Framer Motion</li>
              <li>• Zustand (State Management)</li>
              <li>• React Query (Server State)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-primary">AI/ML Layer</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Hugging Face Inference API</li>
              <li>• Mistral-7B (Chat/LLM)</li>
              <li>• Sentence-Transformers (Embeddings)</li>
              <li>• BLIP (Visual Search)</li>
              <li>• DistilBERT (Sentiment)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-primary">Backend Layer</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Next.js API Routes (Edge)</li>
              <li>• Prisma ORM</li>
              <li>• PostgreSQL (Supabase)</li>
              <li>• NextAuth.js (Auth)</li>
              <li>• Vercel (Deployment)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
