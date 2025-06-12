import { NextRequest, NextResponse } from "next/server";
import { generateAIContent } from "@/app/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  if (!prompt) {
    return NextResponse.json(
      { error: "Missing prompt query parameter" },
      { status: 400 }
    );
  }

  const aiResponse = await generateAIContent(prompt);

  if (!aiResponse) {
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }

  try {
    console.log(aiResponse);
    const parsed = JSON.parse(
      aiResponse.replace(/```json\s*/i, "").replace(/```$/, "")
    );

    const { title, para1, para2, para3 } = parsed;

    if (!title || !para1 || !para2 || !para3) {
      return NextResponse.json(
        { error: "Invalid format returned from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      title,
      para1,
      para2,
      para3,
    });
  } catch (err) {
    console.error("Error parsing AI response:", err);
    return NextResponse.json(
      { error: "Failed to parse AI response as JSON" },
      { status: 500 }
    );
  }
}
