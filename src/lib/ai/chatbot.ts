import { HfInference } from "@huggingface/inference";
import { prisma } from "@/lib/prisma";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

interface ChatContext {
  productContext?: string;
  userPreferences?: string;
  orderHistory?: string;
  currentPage?: string;
}

const SYSTEM_PROMPT = `You are NexusAI Shopping Assistant, an expert AI assistant for an e-commerce platform. You help customers with:
- Finding products that match their needs
- Comparing product features and prices
- Providing detailed product information
- Answering questions about shipping, returns, and policies
- Making personalized recommendations based on preferences
- Helping with order tracking and issues

Be friendly, concise, and helpful. When recommending products, explain why they're a good fit.
If you don't know something, say so honestly. Never make up product details or prices.
Format your responses with clear structure using markdown when appropriate.`;

/**
 * Fetch relevant products from database based on user query
 */
async function getRelevantProducts(query: string, limit: number = 5): Promise<any[]> {
  try {
    // Search for products by keywords in name/description or category
    const keywords = query.toLowerCase().split(" ");
    
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              search: keywords.join(" | "),
            },
          },
          {
            description: {
              search: keywords.join(" | "),
            },
          },
          {
            category: {
              in: keywords.map(k => 
                k.charAt(0).toUpperCase() + k.slice(1)
              ),
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        comparePrice: true,
        category: true,
        brand: true,
        rating: true,
        reviewCount: true,
        tags: true,
      },
      take: limit,
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Generate AI chatbot response using Hugging Face's free inference API
 * Uses Mistral-7B or similar open-source LLM
 */
export async function generateChatResponse(
  messages: { role: string; content: string }[],
  context?: ChatContext
): Promise<string> {
  try {
    const userMessage = messages[messages.length - 1]?.content || "";
    
    // Check if user is asking for product recommendations or product-related info
    const isProductQuery = /recommend|suggest|find|looking for|best|good|product|price|where|how much|show|category/i.test(userMessage);
    
    let productContext = "";
    if (isProductQuery) {
      const products = await getRelevantProducts(userMessage, 3);
      if (products.length > 0) {
        productContext = "\n\nRelevant products from our catalog:\n" + 
          products.map((p, i) => 
            `${i + 1}. **${p.name}** ($${p.price}) - ${p.brand}\n   ${p.description.substring(0, 100)}...`
          ).join("\n");
      }
    }

    // Build context-enriched prompt
    let contextPrompt = SYSTEM_PROMPT;
    
    if (productContext) {
      contextPrompt += productContext;
    }
    if (context?.productContext) {
      contextPrompt += `\n\nCurrent product context: ${context.productContext}`;
    }
    if (context?.userPreferences) {
      contextPrompt += `\n\nUser preferences: ${context.userPreferences}`;
    }

    // Format messages for the model
    const formattedMessages = [
      { role: "system", content: contextPrompt },
      ...messages.slice(-10), // Keep last 10 messages for context window
    ];

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: formattedMessages.map((m) => ({
        role: m.role as "system" | "user" | "assistant",
        content: m.content,
      })),
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.95,
    });

    return response.choices[0]?.message?.content || "I apologize, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Chat generation error:", error);
    
    // Fallback: use a simpler model or return a helpful default
    return generateFallbackResponse(messages[messages.length - 1]?.content || "");
  }
}

/**
 * Fallback response generator when API is unavailable
 */
function generateFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
    return "I'd love to help you find the perfect product! Could you tell me more about what you're looking for? For example:\n- What category interests you? (Electronics, Fashion, Home & Kitchen, Furniture)\n- What's your budget range?\n- Any specific features you need?\n\nOur store has great selections across all categories!";
  }

  if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
    return "To track your order, please go to your Dashboard > Orders section. You can see real-time status updates there. If you need further assistance, please provide your order ID.";
  }

  if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
    return "Our return policy allows returns within 30 days of delivery. Items must be in original condition. To initiate a return:\n1. Go to Dashboard > Orders\n2. Select the order\n3. Click 'Request Return'\n\nRefunds are processed within 5-7 business days.";
  }

  if (lowerMessage.includes("shipping")) {
    return "We offer free standard shipping on orders over $50. Shipping options:\n- **Standard**: 5-7 business days (Free over $50)\n- **Express**: 2-3 business days ($9.99)\n- **Next Day**: 1 business day ($19.99)";
  }

  if (lowerMessage.includes("category") || lowerMessage.includes("what do you have")) {
    return "We have amazing products across these categories:\n- **Electronics** - Latest gadgets, cameras, audio equipment\n- **Fashion** - Clothing, shoes, accessories\n- **Home & Kitchen** - Appliances, tools, decor\n- **Furniture** - Office, bedroom, living room furniture\n\nWhich category interests you?";
  }

  return "I'm here to help! I can assist you with:\n- **Product recommendations** - Tell me what you're looking for\n- **Product comparisons** - Compare features and prices\n- **Order help** - Track orders or handle returns\n- **General questions** - Shipping, policies, etc.\n\nWhat would you like help with?";
}

/**
 * Generate product-specific Q&A response
 */
export async function answerProductQuestion(
  productInfo: string,
  question: string
): Promise<string> {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        {
          role: "system",
          content: `You are a knowledgeable product expert. Answer questions about products accurately and helpfully. Here's the product information:\n\n${productInfo}`,
        },
        { role: "user", content: question },
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content || "I couldn't find specific information about that. Please check the product details page.";
  } catch (error) {
    console.error("Product Q&A error:", error);
    return "I'm having trouble accessing product details right now. Please check the product description or contact support.";
  }
}
