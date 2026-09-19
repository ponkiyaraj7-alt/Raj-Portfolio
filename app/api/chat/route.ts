// app/api/chat/route.ts

import Groq from "groq-sdk";
import { detectAndMaskPII, routePIIToEmail } from "@/lib/pii-filter";
import { systemPrompt } from "@/lib/portfolio-knowledge";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "dummy_key_build" });

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
      });
    }

    // Get the latest user message
    const lastMessage = messages[messages.length - 1];

    // PII interception — detect and mask contact info
    let processedContent = lastMessage.content;
    if (lastMessage.role === "user") {
      const piiResult = detectAndMaskPII(lastMessage.content);

      if (piiResult.hasPII) {
        // Route contact info to notification email (bypasses Groq)
        const conversationSummary = messages
          .slice(-6) // Last 6 messages for context
          .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
          .join("\n");

        await routePIIToEmail(
          piiResult.emails,
          piiResult.phones,
          lastMessage.content,
          conversationSummary
        );

        // Send masked version to Groq
        processedContent = piiResult.cleanedMessage;
      }
    }

    // Build messages for Groq
    const groqMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: processedContent },
    ];

    // Stream response from Groq
    const stream = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama-3.3-70b-versatile",
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    });

    // Return streaming response
    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content || "";
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          } catch (error) {
            console.error("Stream error:", error);
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
