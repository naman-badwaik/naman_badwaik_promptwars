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

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in your environment variables."
    );
  }
  return new GoogleGenAI({ apiKey });
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
  },
  required: [
    "reversibility",
    "whatYouMayBeMissing",
    "assumptionsBeingMade",
    "risksAndTradeoffs",
    "alternativePerspectives",
    "catalyticQuestions",
    "mindShiftTriggers",
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
 * 2. Invoke Gemini with structured output config
 * 3. Extract and sanitize JSON
 * 4. Validate output with Zod
 */
export async function runGeminiBlindSpotAnalysis(
  input: DecisionInput
): Promise<BlindSpotAnalysis> {
  const ai = getGeminiClient();
  const model = getGeminiModel();
  const prompt = buildAnalysisPrompt(input);

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: BLIND_SPOT_JSON_SCHEMA,
    },
  });

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
