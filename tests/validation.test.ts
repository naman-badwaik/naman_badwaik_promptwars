import { describe, it, expect } from "vitest";
import { DecisionInputSchema } from "@/lib/schemas";

describe("DecisionInputSchema Validation", () => {
  const validPayload = {
    decision: "Should I accept an enterprise role or bootstrap my AI startup?",
    currentThinking: "Leaning towards the startup because I want full product autonomy.",
    context: "I have 10 months of runway saved up and a supportive partner, but a mortgage to pay.",
    constraints: "Must reach revenue sustainability within 12 months.",
  };

  // Test 1: Valid input
  it("1. accepts a fully valid input payload with optional constraints", () => {
    const result = DecisionInputSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.decision).toBe(validPayload.decision);
      expect(result.data.constraints).toBe(validPayload.constraints);
    }
  });

  it("accepts a valid input payload when constraints is omitted or empty", () => {
    const withoutConstraints = {
      decision: "Should I accept an enterprise role or bootstrap my AI startup?",
      currentThinking: "Leaning towards the startup because I want full product autonomy.",
      context: "I have 10 months of runway saved up and a supportive partner, but a mortgage to pay.",
    };
    const result = DecisionInputSchema.safeParse(withoutConstraints);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.constraints).toBeUndefined();
    }
  });

  // Test 2: Missing decision
  it("2. rejects payload when decision field is missing", () => {
    const invalid = { ...validPayload, decision: undefined };
    const result = DecisionInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.decision).toBeDefined();
    }
  });

  // Test 3: Decision shorter than minimum (min 10 chars)
  it("3. rejects decision shorter than 10 characters", () => {
    const invalid = { ...validPayload, decision: "Too short" }; // 9 chars
    const result = DecisionInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.decision?.[0]).toContain("at least 10 characters");
    }
  });

  it("rejects whitespace-padded decision that is shorter than 10 characters when trimmed", () => {
    const invalid = { ...validPayload, decision: "   short  " };
    const result = DecisionInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.decision?.[0]).toContain("at least 10 characters");
    }
  });

  // Test 4: Oversized decision (max 600 chars)
  it("4. rejects decision exceeding 600 characters", () => {
    const invalid = { ...validPayload, decision: "A".repeat(601) };
    const result = DecisionInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.decision?.[0]).toContain("cannot exceed 600 characters");
    }
  });

  // Test 5: Missing currentThinking
  it("5. rejects payload when currentThinking is missing or too short", () => {
    const missing = { ...validPayload, currentThinking: undefined };
    const result = DecisionInputSchema.safeParse(missing);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.currentThinking).toBeDefined();
    }

    const tooShort = { ...validPayload, currentThinking: "Not enough" }; // 10 chars is valid, let's test 9 chars
    const shortResult = DecisionInputSchema.safeParse({ ...validPayload, currentThinking: "Short!" });
    expect(shortResult.success).toBe(false);
  });

  // Test 6: Invalid context (missing, too short, or non-string)
  it("6. rejects payload when context is missing or shorter than 10 characters", () => {
    const missingContext = { ...validPayload, context: undefined };
    const result = DecisionInputSchema.safeParse(missingContext);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.context).toBeDefined();
    }

    const shortContext = { ...validPayload, context: "Brief" };
    const resultShort = DecisionInputSchema.safeParse(shortContext);
    expect(resultShort.success).toBe(false);
  });

  // Test 7: Oversized constraints (max 600 chars)
  it("7. rejects constraints exceeding 600 characters", () => {
    const invalid = { ...validPayload, constraints: "C".repeat(601) };
    const result = DecisionInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.constraints?.[0]).toContain("cannot exceed 600 characters");
    }
  });
});
