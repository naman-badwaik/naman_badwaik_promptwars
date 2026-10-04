import { describe, it, expect } from "vitest";
import { PRESET_SCENARIOS } from "@/lib/sampleData";
import { DecisionInputSchema } from "@/lib/schemas";

describe("Preset Scenarios Validation", () => {
  it("contains exactly 3 pre-configured scenarios", () => {
    expect(PRESET_SCENARIOS).toHaveLength(3);
  });

  PRESET_SCENARIOS.forEach((preset) => {
    it(`scenario "${preset.category}" strictly satisfies DecisionInputSchema`, () => {
      const result = DecisionInputSchema.safeParse({
        decision: preset.decision,
        currentThinking: preset.currentThinking,
        context: preset.context,
        constraints: preset.constraints,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.decision.length).toBeGreaterThanOrEqual(10);
        expect(result.data.decision.length).toBeLessThanOrEqual(600);
        expect(result.data.currentThinking.length).toBeGreaterThanOrEqual(10);
        expect(result.data.currentThinking.length).toBeLessThanOrEqual(600);
        expect(result.data.context.length).toBeGreaterThanOrEqual(10);
        expect(result.data.context.length).toBeLessThanOrEqual(1000);
      }
    });
  });
});
