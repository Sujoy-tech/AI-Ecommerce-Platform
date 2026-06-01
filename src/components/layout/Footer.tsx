import Link from "next/link";
import { Brain, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NexusAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered e-commerce platform built with cutting-edge machine learning
              and modern web technologies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="font-semibold mb-4">AI Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/search" className="hover:text-foreground">Semantic Search</Link></li>
              <li><Link href="/search" className="hover:text-foreground">Visual Search</Link></li>
              <li><Link href="/products" className="hover:text-foreground">AI Recommendations</Link></li>
              <li><Link href="#" className="hover:text-foreground">Sentiment Analysis</Link></li>
              <li><Link href="#" className="hover:text-foreground">Fraud Detection</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">All Products</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-foreground">Electronics</Link></li>
              <li><Link href="/products?category=Fashion" className="hover:text-foreground">Fashion</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-foreground">Featured</Link></li>
              <li><Link href="/products?sort=popular" className="hover:text-foreground">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-4">Built With</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 14 + TypeScript</li>
              <li>Hugging Face AI Models</li>
              <li>PostgreSQL + Prisma</li>
              <li>Tailwind CSS + Framer Motion</li>
              <li>Vercel Edge Functions</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 NexusAI Shop. AI-Integrated E-Commerce Platform. Built as a demonstration of modern AI/ML capabilities.</p>
        </div>
      </div>
    </footer>
  );
}
