import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { text } = await generateText({
      // model: openai("gpt-4.1-nano"),
      model: google("gemini-2.5-flash"),
      prompt,
    });
    return Response.json({ text });
  } catch (error) {
    return new Response("Error while fetching", { status: 500 });
  }
}
