// api.ts

import { GoogleGenAI } from "@google/genai";
// import { blogModel } from "./db";

const apiKey = process.env.AI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

export async function generateAIContent(prompt: string) {
  console.log(apiKey);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
        "You are the best blog writer in the world, your task is to understand the prompt given properly and generate a 1000 words and exactly 3 paragraphs blog which will have it's own unique spirit to it, as if the best writer has written it. Prompt: " +
        prompt+"Give me the answer in a json format: {title, para1, para2, para3}. Give me just this json and nothing else.",
    });
    return response.text;
  } catch (error) {
    console.error("Error generating AI content:", error);
    return null;
  }
}
