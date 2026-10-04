import { GoogleGenAI, Type } from "@google/genai";
import {
  DecisionInput,
  BlindSpotAnalysis,
  BlindSpotAnalysisSchema,
} from "./schemas";

// Fallback model if process.env.GEMINI_MODEL is not provided
export const DEFAULT_GEMINI_MODEL = "gemini-flash-lite-latest";

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

// Module-level cached client for warm serverless runtime reuse
let cachedAiClient: GoogleGenAI | null = null;
let cachedApiKey: string | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in your environment variables."
    );
  }
  if (!cachedAiClient || cachedApiKey !== apiKey) {
    cachedAiClient = new GoogleGenAI({ apiKey });
    cachedApiKey = apiKey;
  }
  return cachedAiClient;
}

export const SYSTEM_INSTRUCTION = `You are an epistemic auditor and Socratic thinking companion for the BlindSpot AI platform.
Your purpose is to help the user examine their reasoning, uncover hidden assumptions, and discover blind spots.

Core Directives:
1. You MUST identify overlooked factors and neglected variables.
2. You MUST identify unstated assumptions the user is treating as unquestioned facts.
3. You MUST identify potential cognitive biases (e.g. optimism bias, sunk cost fallacy, recency bias, status quo bias).
4. You MUST identify second-order and third-order ripple consequences of their leaning.
5. You MUST identify asymmetric risks and hidden trade-offs.
6. You MUST provide alternative perspectives from distinct lenses (e.g., an objective skeptic, a future self, a direct competitor).
7. You MUST create thoughtful Socratic catalytic questions that trigger introspection.
8. You MUST identify clear, concrete conditions (mind-shift triggers) that could reasonably change the user's current thinking.

Strict Boundaries:
- You MUST NOT tell the user which option to choose.
- You MUST NOT recommend Option A or Option B.
- You MUST NOT score or rank the options.
- You MUST NOT declare one option objectively better or correct.
- You MUST NOT pretend to know facts that were not provided.
- You MUST NOT produce generic "both options have pros and cons" platitudes.
- You MUST NOT make the decision for the user.

The user remains the sole decision-maker.

Important Output Rules:
- Do NOT expose hidden chain-of-thought or internal reasoning scratchpads.
- Provide concise, intellectually rigorous observations, counter-considerations, and reflection prompts.
- Return ONLY valid JSON adhering strictly to the required schema.`;

export function buildAnalysisPrompt(input: DecisionInput): string {
  return `Please perform an epistemic audit and blind spot analysis on the following decision dilemma:

[DECISION AT HAND]:
${input.decision}

[USER'S CURRENT THINKING / PREFERRED DIRECTION]:
${input.currentThinking}

[RELEVANT CONTEXT & DRIVERS]:
${input.context}

${input.constraints ? `[CONSTRAINTS, PRIORITIES & CONCERNS]:\n${input.constraints}\n` : ""}
Conduct a deep, rigorous examination of this reasoning.
Classify reversibility (Type 1: One-way door vs. Type 2: Two-way door).
Identify blind spots, test core assumptions, pinpoint non-obvious risks, construct counter-perspectives, pose catalytic reflection questions, and define mind-shift triggers.
Synthesize a focused "Challenge My Thinking" stress-test with the strongest assumption under fire, the single biggest uncertainty, an alternative interpretation, and a decisive pre-mortem question.
Respond strictly in JSON according to the schema.`;
}

// JSON Schema specification for Gemini Structured Outputs
export const BLIND_SPOT_JSON_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    reversibility: {
      type: Type.OBJECT,
      properties: {
        type: {
          type: Type.STRING,
          enum: [
            "Type 1 (One-Way Door - Hard to Reverse)",
            "Type 2 (Two-Way Door - Easily Reversible)",
          ],
        },
        rationale: {
          type: Type.STRING,
          description: "Clear explanation of reversibility and stake level.",
        },
      },
      required: ["type", "rationale"],
    },
    whatYouMayBeMissing: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          blindSpotCategory: {
            type: Type.STRING,
            description: "e.g., Second-Order Ripple Effect, Neglected Variable, Systemic Friction",
          },
        },
        required: ["title", "description", "blindSpotCategory"],
      },
    },
    assumptionsBeingMade: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          statedOrImpliedAssumption: { type: Type.STRING },
          counterEvidenceCheck: { type: Type.STRING },
        },
        required: ["statedOrImpliedAssumption", "counterEvidenceCheck"],
      },
    },
    risksAndTradeoffs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          riskOrHiddenCost: { type: Type.STRING },
          worstCaseScenario: { type: Type.STRING },
          mitigationIdea: { type: Type.STRING },
        },
        required: ["riskOrHiddenCost", "worstCaseScenario", "mitigationIdea"],
      },
    },
    alternativePerspectives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          viewpointLens: {
            type: Type.STRING,
            description: "e.g., The Objective Skeptic, Your 5-Years-Older Self, The Conservative Risk Officer",
          },
          howTheyViewThis: { type: Type.STRING },
        },
        required: ["viewpointLens", "howTheyViewThis"],
      },
    },
    catalyticQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          whyThisMatters: { type: Type.STRING },
        },
        required: ["question", "whyThisMatters"],
      },
    },
    mindShiftTriggers: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    challengeMyThinking: {
      type: Type.OBJECT,
      properties: {
        strongestAssumption: {
          type: Type.STRING,
          description: "The single most critical or vulnerable premise the user is relying on.",
        },
        biggestUncertainty: {
          type: Type.STRING,
          description: "The highest-impact unknown or unpredictable variable that could alter the outcome.",
        },
        alternativeInterpretation: {
          type: Type.STRING,
          description: "A compelling counter-perspective or cognitive inversion of their preferred direction.",
        },
        preMortemQuestion: {
          type: Type.STRING,
          description: "A decisive pre-mortem question to test conviction before finalizing the choice.",
        },
      },
      required: [
        "strongestAssumption",
        "biggestUncertainty",
        "alternativeInterpretation",
        "preMortemQuestion",
      ],
    },
  },
  required: [
    "reversibility",
    "whatYouMayBeMissing",
    "assumptionsBeingMade",
    "risksAndTradeoffs",
    "alternativePerspectives",
    "catalyticQuestions",
    "mindShiftTriggers",
    "challengeMyThinking",
  ],
};

/**
 * Strips code fences (```json ... ```) if present and returns clean JSON string.
 */
export function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  return cleaned.trim();
}

/**
 * Executes the Gemini blind spot analysis pipeline:
 * 1. Build prompt
 * 2. Invoke Gemini with structured output config (temperature: 0.2, bounded max tokens)
 * 3. Enforce 25-second timeout to prevent serverless hanging
 * 4. Extract and sanitize JSON
 * 5. Validate output strictly with Zod schema
 */
export async function runGeminiBlindSpotAnalysis(
  input: DecisionInput
): Promise<BlindSpotAnalysis> {
  const ai = getGeminiClient();
  const model = getGeminiModel();
  const prompt = buildAnalysisPrompt(input);

  const timeoutMs = 25000;
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error("Gemini analysis timed out after 25 seconds. Please try again.")
      );
    }, timeoutMs);
    if (typeof timer.unref === "function") timer.unref();
  });

  const generatePromise = ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: BLIND_SPOT_JSON_SCHEMA,
      temperature: 0.2,
      maxOutputTokens: 2500,
    },
  });

  const response = await Promise.race([generatePromise, timeoutPromise]);

  const responseText = response.text;
  if (!responseText || responseText.trim().length === 0) {
    throw new Error("Received empty response from Gemini model.");
  }

  const cleanedText = cleanJsonString(responseText);

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(cleanedText);
  } catch (parseError) {
    const errorMsg =
      parseError instanceof Error ? parseError.message : "JSON syntax error";
    throw new Error(`Failed to parse Gemini output as JSON: ${errorMsg}`);
  }

  // Deterministic fallback if challengeMyThinking was omitted by a fallback model
  if (rawJson && typeof rawJson === "object") {
    const obj = rawJson as Record<string, unknown>;
    if (
      !obj.challengeMyThinking &&
      Array.isArray(obj.assumptionsBeingMade) &&
      obj.assumptionsBeingMade.length > 0
    ) {
      const firstAssumption = obj.assumptionsBeingMade[0] as Record<string, string>;
      const firstRisk = Array.isArray(obj.risksAndTradeoffs)
        ? (obj.risksAndTradeoffs[0] as Record<string, string>)
        : undefined;
      const firstAlt = Array.isArray(obj.alternativePerspectives)
        ? (obj.alternativePerspectives[0] as Record<string, string>)
        : undefined;
      const firstQ = Array.isArray(obj.catalyticQuestions)
        ? (obj.catalyticQuestions[0] as Record<string, string>)
        : undefined;

      obj.challengeMyThinking = {
        strongestAssumption:
          firstAssumption?.statedOrImpliedAssumption || "Core unverified premise.",
        biggestUncertainty:
          firstRisk?.riskOrHiddenCost ||
          "Downside unpredictability under shifting constraints.",
        alternativeInterpretation:
          firstAlt?.howTheyViewThis ||
          "Consider the inverse outcome if initial assumptions fail to hold.",
        preMortemQuestion:
          firstQ?.question ||
          "If this path fails within a year, what was the root blind spot?",
      };
    }
  }

  // Strict Zod schema validation
  const validationResult = BlindSpotAnalysisSchema.safeParse(rawJson);
  if (!validationResult.success) {
    const issues = validationResult.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Gemini response failed schema validation: ${issues}`);
  }

  return validationResult.data;
}
