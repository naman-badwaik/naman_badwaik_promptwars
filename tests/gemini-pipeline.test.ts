import { describe, it, expect } from "vitest";
import {
  cleanJsonString,
  buildAnalysisPrompt,
  getGeminiModel,
  DEFAULT_GEMINI_MODEL,
} from "@/lib/gemini";
import { DecisionInput } from "@/lib/schemas";

describe("Gemini Pipeline Utilities", () => {
  it("cleans raw JSON strings with no code fences", () => {
    const raw = '{"hello": "world"}';
    expect(cleanJsonString(raw)).toBe('{"hello": "world"}');
  });

  it("strips markdown json code fences accurately", () => {
    const withFences = '```json\n{"hello": "world"}\n```';
    expect(cleanJsonString(withFences)).toBe('{"hello": "world"}');
  });

  it("strips generic code fences without language tag", () => {
    const withFences = '```\n{"hello": "world"}\n```';
    expect(cleanJsonString(withFences)).toBe('{"hello": "world"}');
  });

  it("builds an epistemic analysis prompt containing all input components", () => {
    const input: DecisionInput = {
      decision: "Should I accept an enterprise offer or build a startup?",
      currentThinking: "Leaning towards startup for autonomy.",
      context: "10 months runway, supportive partner.",
      constraints: "Must reach revenue sustainability within 12 months.",
    };

    const prompt = buildAnalysisPrompt(input);
    expect(prompt).toContain(input.decision);
    expect(prompt).toContain(input.currentThinking);
    expect(prompt).toContain(input.context);
    expect(prompt).toContain(input.constraints!);
    expect(prompt).toContain("Type 1: One-way door vs. Type 2: Two-way door");
    expect(prompt).toContain("Challenge My Thinking");
  });

  it("handles prompt building gracefully when constraints are omitted", () => {
    const input: DecisionInput = {
      decision: "Should I accept an enterprise offer or build a startup?",
      currentThinking: "Leaning towards startup for autonomy.",
      context: "10 months runway, supportive partner.",
    };

    const prompt = buildAnalysisPrompt(input);
    expect(prompt).toContain(input.decision);
    expect(prompt).not.toContain("CONSTRAINTS, PRIORITIES & CONCERNS");
    expect(prompt).toContain("Challenge My Thinking");
  });

  it("uses DEFAULT_GEMINI_MODEL when process.env.GEMINI_MODEL is not set", () => {
    const originalEnv = process.env.GEMINI_MODEL;
    delete process.env.GEMINI_MODEL;
    expect(getGeminiModel()).toBe(DEFAULT_GEMINI_MODEL);
    process.env.GEMINI_MODEL = originalEnv;
  });
});
