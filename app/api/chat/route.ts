import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      //   model: openai("gpt-4.1-nano"),
      messages: await convertToModelMessages(messages),
    });
    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat applicaiton ", error);
    return new Response("Failed to stream chat application ", { status: 500 });
  }
}
