import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

interface SentimentResult {
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  score: number;
  confidence: number;
}

/**
 * Analyze sentiment of a review text using Hugging Face
 * Model: distilbert-base-uncased-finetuned-sst-2-english
 */
export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  try {
    const response = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text,
    });

    const result = response[0];
    
    return {
      label: result.label === "POSITIVE" ? "POSITIVE" : "NEGATIVE",
      score: result.label === "POSITIVE" ? result.score : -result.score,
      confidence: result.score,
    };
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return { label: "NEUTRAL", score: 0, confidence: 0 };
  }
}

/**
 * Batch sentiment analysis for multiple reviews
 */
export async function analyzeBatchSentiment(
  texts: string[]
): Promise<SentimentResult[]> {
  const results = await Promise.all(texts.map(analyzeSentiment));
  return results;
}

/**
 * Generate review summary using AI
 */
export async function generateReviewSummary(
  reviews: { content: string; rating: number }[]
): Promise<string> {
  if (reviews.length === 0) return "No reviews yet.";

  try {
    const reviewTexts = reviews
      .slice(0, 10)
      .map((r) => `Rating: ${r.rating}/5 - "${r.content}"`)
      .join("\n");

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        {
          role: "system",
          content: "Summarize the following product reviews in 2-3 sentences. Highlight key pros and cons mentioned by customers.",
        },
        { role: "user", content: reviewTexts },
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || "Reviews show mixed feedback.";
  } catch (error) {
    console.error("Review summary error:", error);
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    return `Based on ${reviews.length} reviews with an average rating of ${avgRating.toFixed(1)}/5.`;
  }
}

/**
 * Detect fake/spam reviews using heuristics + AI
 */
export async function detectFakeReview(review: {
  content: string;
  rating: number;
  userId: string;
}): Promise<{ isSuspicious: boolean; reason?: string }> {
  // Heuristic checks
  if (review.content.length < 10) {
    return { isSuspicious: true, reason: "Review too short" };
  }

  if (review.content.length > 5000) {
    return { isSuspicious: true, reason: "Review unusually long" };
  }

  // Check for excessive capitalization
  const upperRatio = (review.content.match(/[A-Z]/g) || []).length / review.content.length;
  if (upperRatio > 0.5) {
    return { isSuspicious: true, reason: "Excessive capitalization" };
  }

  // Check for repetitive patterns
  const words = review.content.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (uniqueWords.size / words.length < 0.3) {
    return { isSuspicious: true, reason: "Repetitive content" };
  }

  return { isSuspicious: false };
}
