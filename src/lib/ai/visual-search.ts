import { HfInference } from "@huggingface/inference";
import { generateEmbedding, findSimilar } from "./embeddings";
import { prisma } from "@/lib/prisma";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Visual Search - Find similar products by image
 * Uses CLIP model for image-to-text embedding alignment
 */
export async function visualSearch(
  imageBase64: string,
  limit: number = 10
): Promise<any[]> {
  try {
    // Convert base64 to Blob for Hugging Face API
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });
    
    // Generate image caption first using image-to-text
    const captionResult = await hf.imageToText({
      model: "Salesforce/blip-image-captioning-base",
      data: imageBlob,
    });

    const imageDescription = captionResult.generated_text || "";
    
    // Generate embedding from the caption
    const queryEmbedding = await generateEmbedding(imageDescription);

    // Find similar products using embedding similarity
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        comparePrice: true,
        images: true,
        category: true,
        rating: true,
        reviewCount: true,
        embedding: true,
      },
    });

    const productsWithEmbeddings = products
      .filter((p) => p.embedding.length > 0)
      .map((p) => ({ id: p.id, embedding: p.embedding }));

    const similarItems = findSimilar(queryEmbedding, productsWithEmbeddings, limit);

    // Return full product details for matches
    const matchedIds = similarItems.map((item) => item.id);
    const matchedProducts = products
      .filter((p) => matchedIds.includes(p.id))
      .map((p) => ({
        ...p,
        embedding: undefined,
        similarityScore: similarItems.find((s) => s.id === p.id)?.score || 0,
      }));

    return matchedProducts.sort((a, b) => b.similarityScore - a.similarityScore);
  } catch (error) {
    console.error("Visual search error:", error);
    return [];
  }
}

/**
 * Image classification for automatic product categorization
 */
export async function classifyProductImage(
  imageBase64: string
): Promise<{ label: string; score: number }[]> {
  try {
    const imageBuffer = Buffer.from(imageBase64, "base64");
    
    const result = await hf.imageClassification({
      model: "google/vit-base-patch16-224",
      data: imageBuffer,
    });

    return result.slice(0, 5).map((r) => ({
      label: r.label,
      score: r.score,
    }));
  } catch (error) {
    console.error("Image classification error:", error);
    return [];
  }
}

/**
 * Generate product description from image
 */
export async function generateImageDescription(
  imageBase64: string
): Promise<string> {
  try {
    const imageBuffer = Buffer.from(imageBase64, "base64");
    
    const result = await hf.imageToText({
      model: "Salesforce/blip-image-captioning-large",
      data: imageBuffer,
    });

    return result.generated_text || "Unable to describe the image.";
  } catch (error) {
    console.error("Image description error:", error);
    return "Unable to process the image.";
  }
}
