import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/chatbot";

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Validate message format
    const validRoles = ["user", "assistant", "system"];
    for (const msg of messages) {
      if (!validRoles.includes(msg.role) || typeof msg.content !== "string") {
        return NextResponse.json(
          { error: "Invalid message format" },
          { status: 400 }
        );
      }
    }

    const response = await generateChatResponse(messages, context);

    return NextResponse.json({
      message: {
        role: "assistant",
        content: response,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
