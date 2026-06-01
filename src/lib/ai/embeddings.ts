import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Generate text embeddings using Hugging Face's sentence-transformers
 * Model: all-MiniLM-L6-v2 (384 dimensions, fast, free)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    
    // The response is a nested array, flatten it
    if (Array.isArray(response) && Array.isArray(response[0])) {
      return response[0] as number[];
    }
    return response as number[];
  } catch (error) {
    console.error("Embedding generation error:", error);
    // Return a zero vector as fallback
    return new Array(384).fill(0);
  }
}

/**
 * Generate embeddings for multiple texts (batch processing)
 */
export async function generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const embeddings = await Promise.all(
      texts.map((text) => generateEmbedding(text))
    );
    return embeddings;
  } catch (error) {
    console.error("Batch embedding error:", error);
    return texts.map(() => new Array(384).fill(0));
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  
  return dotProduct / denominator;
}

/**
 * Find most similar items using vector similarity search
 */
export function findSimilar(
  queryEmbedding: number[],
  items: { id: string; embedding: number[] }[],
  topK: number = 10
): { id: string; score: number }[] {
  const scored = items.map((item) => ({
    id: item.id,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
