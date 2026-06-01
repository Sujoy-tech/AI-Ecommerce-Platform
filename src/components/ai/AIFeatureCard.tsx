"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AIFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export function AIFeatureCard({ icon: Icon, title, description, gradient }: AIFeatureCardProps) {
  return (
    <motion.div
      className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border card-hover"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
