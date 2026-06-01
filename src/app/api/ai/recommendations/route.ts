import { NextRequest, NextResponse } from "next/server";
import { getHybridRecommendations, getRelatedProducts } from "@/lib/ai/recommendations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");
    const limit = parseInt(searchParams.get("limit") || "12");

    // If productId is provided, get related products
    if (productId) {
      const related = await getRelatedProducts(productId, limit);
      return NextResponse.json({
        type: "related",
        products: related,
      });
    }

    // Otherwise, get personalized recommendations
    const recommendations = await getHybridRecommendations(userId, limit);
    
    return NextResponse.json({
      type: userId ? "personalized" : "trending",
      products: recommendations,
    });
  } catch (error) {
    console.error("Recommendations API error:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
