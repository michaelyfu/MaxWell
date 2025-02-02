import { NextResponse } from "next/server";
import { RealtimeClient } from "@openai/realtime-api-beta";

/**
 * Simple example that shows how to do a single user message
 * and retrieve a chunk of the model's response from the server.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userMessage } = body;

        if (!userMessage) {
            return NextResponse.json(
                { error: "Missing userMessage in request body" },
                { status: 400 }
            );
        }

        const client = new RealtimeClient({
            apiKey: "",
        });

        client.updateSession({
            instructions:
                "You are a helpful assistant. Always respond in a friendly tone.",
            voice: "alloy",
        });

        await client.connect();
        client.sendUserMessageContent([{ type: "input_text", text: userMessage }]);
        const assistantContent = "";

        return NextResponse.json({ assistantContent });
    } catch (err) {
        console.error("Realtime API error:", err);
        return NextResponse.json(
            {
                error: "Error from Realtime API",
                details: (err as Error).message,
            },
            { status: 500 }
        );
    }
} 