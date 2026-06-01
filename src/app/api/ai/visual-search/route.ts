import { NextRequest, NextResponse } from "next/server";
import { visualSearch, classifyProductImage } from "@/lib/ai/visual-search";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid image type. Supported: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be less than 10MB" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Perform visual search
    const [results, classifications] = await Promise.all([
      visualSearch(base64, 10),
      classifyProductImage(base64),
    ]);

    return NextResponse.json({
      results,
      classifications,
      totalResults: results.length,
    });
  } catch (error) {
    console.error("Visual search API error:", error);
    return NextResponse.json(
      { error: "Visual search failed" },
      { status: 500 }
    );
  }
}
