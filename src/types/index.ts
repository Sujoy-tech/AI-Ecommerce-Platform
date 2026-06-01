export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  subcategory?: string | null;
  brand?: string | null;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  attributes?: Record<string, string> | null;
  isFeatured: boolean;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN" | "SELLER";
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string | null;
  content: string;
  sentiment?: number | null;
  isVerified: boolean;
  createdAt: string;
  user?: { name: string; image: string };
}

export interface SearchResult {
  query: string;
  results: Product[];
  totalResults: number;
  searchType: "hybrid_semantic" | "visual" | "text";
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: Record<string, any>;
}

export interface Recommendation {
  id: string;
  productId: string;
  score: number;
  reason?: string;
  type: "COLLABORATIVE" | "CONTENT_BASED" | "HYBRID" | "TRENDING" | "PERSONALIZED";
}

export interface AIMetrics {
  searchAccuracy: number;
  recommendationCTR: number;
  chatbotResolution: number;
  fraudDetection: number;
  visualSearchMatch: number;
  sentimentAccuracy: number;
}
