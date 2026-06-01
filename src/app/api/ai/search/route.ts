import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding, findSimilar } from "@/lib/ai/embeddings";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { query, filters, limit = 20 } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query);

    // Get all active products
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(filters?.category && { category: filters.category }),
        ...(filters?.minPrice && { price: { gte: filters.minPrice } }),
        ...(filters?.maxPrice && { price: { lte: filters.maxPrice } }),
      },
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
        embedding: true,
      },
    });

    // Perform semantic similarity search
    const productsWithEmbeddings = products
      .filter((p) => p.embedding.length > 0)
      .map((p) => ({ id: p.id, embedding: p.embedding }));

    const similarItems = findSimilar(queryEmbedding, productsWithEmbeddings, limit);

    // Also do keyword matching as fallback/boost
    const queryTerms = query.toLowerCase().split(/\s+/);
    const keywordMatches = products.filter((product) => {
      const searchText = `${product.name} ${product.description} ${product.tags.join(" ")} ${product.category} ${product.brand}`.toLowerCase();
      return queryTerms.some((term) => searchText.includes(term));
    });

    // Combine semantic and keyword results
    const semanticIds = new Set(similarItems.map((i) => i.id));
    const keywordIds = new Set(keywordMatches.map((p) => p.id));

    // Score products: semantic similarity + keyword boost
    const scoredResults = products.map((product) => {
      let score = 0;
      const semanticMatch = similarItems.find((s) => s.id === product.id);
      if (semanticMatch) score += semanticMatch.score * 0.7;
      if (keywordIds.has(product.id)) score += 0.3;
      
      return {
        ...product,
        embedding: undefined,
        relevanceScore: score,
      };
    });

    // Sort by combined score
    const results = scoredResults
      .filter((r) => r.relevanceScore > 0.1)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return NextResponse.json({
      query,
      results,
      totalResults: results.length,
      searchType: "hybrid_semantic",
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
