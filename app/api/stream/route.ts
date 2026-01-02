import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Error while fetching", { status: 500 });
  }
}
