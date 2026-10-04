import { NextRequest, NextResponse } from "next/server";
import { DecisionInputSchema, AnalyzeApiResponse } from "@/lib/schemas";
import { runGeminiBlindSpotAnalysis } from "@/lib/gemini";

// Ensure this route runs in Node.js serverless runtime on Vercel
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
): Promise<NextResponse<AnalyzeApiResponse>> {
  try {
    // 1. Safe JSON parsing of request body
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload: could not parse JSON body.",
        },
        { status: 400 }
      );
    }

    // 2. Validate input using Zod schema
    const validationResult = DecisionInputSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedInput = validationResult.data;

    // 3. Pre-flight check for server-side API Key
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === "YOUR_REAL_KEY_HERE" || apiKey === "your_gemini_api_key_here") {
      console.error(
        "[API Route Error]: GEMINI_API_KEY is not set to a valid key in .env.local."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Gemini API key is not configured on the server. Please enter your personal API key in .env.local.",
        },
        { status: 500 }
      );
    }

    // 4. Run the Gemini analysis pipeline
    const analysis = await runGeminiBlindSpotAnalysis(validatedInput);

    // 5. Return validated structured response
    return NextResponse.json(
      {
        success: true,
        data: analysis,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Safe error logging without logging secrets or private keys
    console.error("[POST /api/analyze execution error]:", errorMessage);

    // Check for rate limit / quota exhaustion patterns
    const isRateLimit =
      errorMessage.includes("RESOURCE_EXHAUSTED") ||
      errorMessage.includes("429") ||
      errorMessage.toLowerCase().includes("quota");

    if (isRateLimit) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The AI analysis engine is currently rate-limited. Please wait a brief moment and try again.",
        },
        { status: 429 }
      );
    }

    const isAuthError =
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("PERMISSION_DENIED") ||
      errorMessage.toLowerCase().includes("api key not valid");

    if (isAuthError) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Authentication error: The configured Gemini API key is invalid or lacks necessary permissions. Please verify your GEMINI_API_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    // Generic safe error message for client
    return NextResponse.json(
      {
        success: false,
        error:
          "An error occurred while analyzing your reasoning. Please try again.",
      },
      { status: 500 }
    );
  }
}
