import { prisma } from "@/lib/prisma";
import { cosineSimilarity } from "./embeddings";

interface UserBehavior {
  viewedProducts: string[];
  purchasedProducts: string[];
  cartProducts: string[];
  searchHistory: string[];
}

/**
 * Collaborative Filtering - Item-Based
 * Recommends products based on what similar users purchased
 */
export async function collaborativeFilter(
  userId: string,
  limit: number = 10
): Promise<string[]> {
  // Get user's purchase history
  const userOrders = await prisma.order.findMany({
    where: { userId },
    include: { items: { select: { productId: true } } },
  });

  const userProducts = new Set(
    userOrders.flatMap((order) => order.items.map((item) => item.productId))
  );

  if (userProducts.size === 0) return [];

  // Find users who bought similar products
  const similarUsers = await prisma.order.findMany({
    where: {
      userId: { not: userId },
      items: {
        some: {
          productId: { in: Array.from(userProducts) },
        },
      },
    },
    include: { items: { select: { productId: true } } },
    take: 50,
  });

  // Count product frequency among similar users
  const productScores = new Map<string, number>();
  
  for (const order of similarUsers) {
    for (const item of order.items) {
      if (!userProducts.has(item.productId)) {
        const current = productScores.get(item.productId) || 0;
        productScores.set(item.productId, current + 1);
      }
    }
  }

  // Sort by score and return top recommendations
  return Array.from(productScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId]) => productId);
}

/**
 * Content-Based Filtering
 * Recommends products similar to what user has interacted with
 */
export async function contentBasedFilter(
  userId: string,
  limit: number = 10
): Promise<string[]> {
  // Get user's recently viewed/purchased products
  const userOrders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { select: { id: true, embedding: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const userProductEmbeddings = userOrders
    .flatMap((order) => order.items.map((item) => item.product))
    .filter((p) => p.embedding.length > 0);

  if (userProductEmbeddings.length === 0) return [];

  // Calculate average user preference vector
  const avgEmbedding = new Array(384).fill(0);
  for (const product of userProductEmbeddings) {
    for (let i = 0; i < product.embedding.length; i++) {
      avgEmbedding[i] += product.embedding[i] / userProductEmbeddings.length;
    }
  }

  // Get all products and find most similar
  const allProducts = await prisma.product.findMany({
    where: {
      id: { notIn: userProductEmbeddings.map((p) => p.id) },
      isActive: true,
    },
    select: { id: true, embedding: true },
  });

  const scored = allProducts
    .filter((p) => p.embedding.length > 0)
    .map((product) => ({
      id: product.id,
      score: cosineSimilarity(avgEmbedding, product.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.id);
}

/**
 * Hybrid Recommendation Engine
 * Combines collaborative + content-based + trending
 */
export async function getHybridRecommendations(
  userId: string | null,
  limit: number = 12
): Promise<any[]> {
  let recommendedIds: string[] = [];

  if (userId) {
    // Try collaborative filtering first
    const collaborative = await collaborativeFilter(userId, limit);
    const contentBased = await contentBasedFilter(userId, limit);

    // Merge and deduplicate
    const seen = new Set<string>();
    for (const id of [...collaborative, ...contentBased]) {
      if (!seen.has(id)) {
        seen.add(id);
        recommendedIds.push(id);
      }
    }
  }

  // If not enough recommendations, add trending products
  if (recommendedIds.length < limit) {
    const trending = await prisma.product.findMany({
      where: {
        isActive: true,
        id: { notIn: recommendedIds },
      },
      orderBy: [
        { reviewCount: "desc" },
        { rating: "desc" },
      ],
      take: limit - recommendedIds.length,
      select: { id: true },
    });

    recommendedIds.push(...trending.map((p) => p.id));
  }

  // Fetch full product details
  const products = await prisma.product.findMany({
    where: { id: { in: recommendedIds.slice(0, limit) } },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      comparePrice: true,
      images: true,
      category: true,
      brand: true,
      rating: true,
      reviewCount: true,
      tags: true,
    },
  });

  return products;
}

/**
 * "Customers Also Bought" - Item-to-Item recommendations
 */
export async function getRelatedProducts(
  productId: string,
  limit: number = 6
): Promise<any[]> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { embedding: true, category: true, tags: true },
  });

  if (!product) return [];

  // Find products with similar embeddings
  const candidates = await prisma.product.findMany({
    where: {
      id: { not: productId },
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      comparePrice: true,
      images: true,
      category: true,
      rating: true,
      reviewCount: true,
      embedding: true,
    },
  });

  const scored = candidates
    .filter((c) => c.embedding.length > 0)
    .map((candidate) => ({
      ...candidate,
      score: cosineSimilarity(product.embedding, candidate.embedding),
      embedding: undefined,
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, limit);

  return scored;
}
