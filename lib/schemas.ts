import { z } from "zod";

// ==========================================
// INPUT SCHEMA (Server & Client Shared)
// ==========================================

export const DecisionInputSchema = z.object({
  decision: z
    .string({
      required_error: "Decision is required",
      invalid_type_error: "Decision must be text",
    })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(10, { message: "Decision must be at least 10 characters" })
        .max(600, { message: "Decision cannot exceed 600 characters" })
    ),
  currentThinking: z
    .string({
      required_error: "Current thinking is required",
      invalid_type_error: "Current thinking must be text",
    })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(10, { message: "Current thinking must be at least 10 characters" })
        .max(600, { message: "Current thinking cannot exceed 600 characters" })
    ),
  context: z
    .string({
      required_error: "Context is required",
      invalid_type_error: "Context must be text",
    })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(10, { message: "Context must be at least 10 characters" })
        .max(1000, { message: "Context cannot exceed 1000 characters" })
    ),
  constraints: z
    .string({
      invalid_type_error: "Constraints must be text",
    })
    .optional()
    .transform((val) => (val !== undefined ? val.trim() : undefined))
    .pipe(
      z
        .string()
        .max(600, { message: "Constraints cannot exceed 600 characters" })
        .optional()
    ),
});

export type DecisionInput = z.infer<typeof DecisionInputSchema>;

// ==========================================
// OUTPUT SCHEMA (Strict Blind Spot Analysis)
// ==========================================

export const ReversibilityTypeEnum = z.enum([
  "Type 1 (One-Way Door - Hard to Reverse)",
  "Type 2 (Two-Way Door - Easily Reversible)",
]);

export const ReversibilitySchema = z.object({
  type: ReversibilityTypeEnum,
  rationale: z.string().min(1, "Rationale is required"),
});

export const WhatYouMayBeMissingItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  blindSpotCategory: z.string().min(1, "Blind spot category is required"),
});

export const AssumptionItemSchema = z.object({
  statedOrImpliedAssumption: z.string().min(1, "Assumption is required"),
  counterEvidenceCheck: z.string().min(1, "Counter evidence check is required"),
});

export const RiskAndTradeoffItemSchema = z.object({
  riskOrHiddenCost: z.string().min(1, "Risk or hidden cost is required"),
  worstCaseScenario: z.string().min(1, "Worst case scenario is required"),
  mitigationIdea: z.string().min(1, "Mitigation idea is required"),
});

export const AlternativePerspectiveItemSchema = z.object({
  viewpointLens: z.string().min(1, "Viewpoint lens is required"),
  howTheyViewThis: z.string().min(1, "Perspective viewpoint is required"),
});

export const CatalyticQuestionItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  whyThisMatters: z.string().min(1, "Importance explanation is required"),
});

export const ChallengeMyThinkingSchema = z.object({
  strongestAssumption: z
    .string()
    .min(1, "Strongest assumption is required"),
  biggestUncertainty: z
    .string()
    .min(1, "Biggest uncertainty is required"),
  alternativeInterpretation: z
    .string()
    .min(1, "Alternative interpretation is required"),
  preMortemQuestion: z
    .string()
    .min(1, "Pre-mortem question is required"),
});

export type ChallengeMyThinking = z.infer<typeof ChallengeMyThinkingSchema>;

export const BlindSpotAnalysisSchema = z.object({
  reversibility: ReversibilitySchema,
  whatYouMayBeMissing: z.array(WhatYouMayBeMissingItemSchema).min(1),
  assumptionsBeingMade: z.array(AssumptionItemSchema).min(1),
  risksAndTradeoffs: z.array(RiskAndTradeoffItemSchema).min(1),
  alternativePerspectives: z.array(AlternativePerspectiveItemSchema).min(1),
  catalyticQuestions: z.array(CatalyticQuestionItemSchema).min(1),
  mindShiftTriggers: z.array(z.string().min(1)).min(1),
  challengeMyThinking: ChallengeMyThinkingSchema.optional(),
});

export type BlindSpotAnalysis = z.infer<typeof BlindSpotAnalysisSchema>;

// API Response Wrappers
export interface AnalyzeSuccessResponse {
  success: true;
  data: BlindSpotAnalysis;
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
}

export type AnalyzeApiResponse = AnalyzeSuccessResponse | AnalyzeErrorResponse;
