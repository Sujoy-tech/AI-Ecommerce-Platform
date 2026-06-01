import { NextRequest, NextResponse } from "next/server";
import { analyzeSentiment, generateReviewSummary } from "@/lib/ai/sentiment";

export async function POST(req: NextRequest) {
  try {
    const { text, reviews } = await req.json();

    // Single text sentiment analysis
    if (text) {
      const result = await analyzeSentiment(text);
      return NextResponse.json({ sentiment: result });
    }

    // Batch review analysis with summary
    if (reviews && Array.isArray(reviews)) {
      const sentiments = await Promise.all(
        reviews.map(async (review: { content: string; rating: number }) => ({
          ...review,
          sentiment: await analyzeSentiment(review.content),
        }))
      );

      const summary = await generateReviewSummary(reviews);

      return NextResponse.json({
        reviews: sentiments,
        summary,
        stats: {
          total: sentiments.length,
          positive: sentiments.filter((s) => s.sentiment.label === "POSITIVE").length,
          negative: sentiments.filter((s) => s.sentiment.label === "NEGATIVE").length,
          averageScore:
            sentiments.reduce((acc, s) => acc + s.sentiment.score, 0) / sentiments.length,
        },
      });
    }

    return NextResponse.json(
      { error: "Either 'text' or 'reviews' array is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Sentiment API error:", error);
    return NextResponse.json(
      { error: "Sentiment analysis failed" },
      { status: 500 }
    );
  }
}
