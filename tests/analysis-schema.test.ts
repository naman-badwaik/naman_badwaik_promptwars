import { describe, it, expect } from "vitest";
import { BlindSpotAnalysisSchema, BlindSpotAnalysis } from "@/lib/schemas";

describe("BlindSpotAnalysisSchema Validation", () => {
  const validAnalysis: BlindSpotAnalysis = {
    reversibility: {
      type: "Type 1 (One-Way Door - Hard to Reverse)",
      rationale:
        "Leaving a senior executive role and forfeiting unvested equity cannot be undone after departure.",
    },
    whatYouMayBeMissing: [
      {
        title: "Underestimating customer acquisition inertia",
        description:
          "Enterprise B2B sales cycles typically require 6-9 months, eroding runway faster than modeled.",
        blindSpotCategory: "Timeline & Velocity Friction",
      },
    ],
    assumptionsBeingMade: [
      {
        statedOrImpliedAssumption:
          "Product autonomy translates to psychological freedom.",
        counterEvidenceCheck:
          "Founders answer to early customers, churn rates, and capital constraints with higher acute stress than corporate managers.",
      },
    ],
    risksAndTradeoffs: [
      {
        riskOrHiddenCost:
          "Opportunity cost of compounded market compensation and benefits.",
        worstCaseScenario:
          "Depleting personal runway in 10 months and returning to market at equal or lower leverage.",
        mitigationIdea:
          "Secure 3 paid design partners before giving official notice.",
      },
    ],
    alternativePerspectives: [
      {
        viewpointLens: "An Objective Risk Analyst",
        howTheyViewThis:
          "Treat the venture as a de-risked transition rather than a binary leap.",
      },
      {
        viewpointLens: "Your 5-Years-Older Self",
        howTheyViewThis:
          "Regret of inaction often stings deeper than calculated failure, but uncalculated financial strain damages family resilience.",
      },
    ],
    catalyticQuestions: [
      {
        question:
          "What specific early traction metric would convince you this is not working?",
        whyThisMatters:
          "Pre-defining a quit threshold prevents the sunk-cost fallacy from draining personal capital.",
      },
    ],
    mindShiftTriggers: [
      "If zero design partners sign a letter of intent within the first 60 days.",
      "If enterprise compensation offer can be structured with flexibility to build IP independently.",
    ],
  };

  // Test 8: Valid BlindSpotAnalysis structure
  it("8. successfully validates a compliant BlindSpotAnalysis structure", () => {
    const result = BlindSpotAnalysisSchema.safeParse(validAnalysis);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.reversibility.type).toBe(
        "Type 1 (One-Way Door - Hard to Reverse)"
      );
      expect(result.data.whatYouMayBeMissing).toHaveLength(1);
      expect(result.data.catalyticQuestions).toHaveLength(1);
      expect(result.data.mindShiftTriggers).toHaveLength(2);
    }
  });

  // Test 9: Invalid AI response structure
  it("9. rejects an AI response with an invalid reversibility door type", () => {
    const invalid = {
      ...validAnalysis,
      reversibility: {
        type: "Type 3 (Unknown Door)", // Invalid enum
        rationale: "Some rationale",
      },
    };
    const result = BlindSpotAnalysisSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.format();
      expect(error.reversibility?.type).toBeDefined();
    }
  });

  it("9b. rejects an AI response with empty array fields", () => {
    const invalid = {
      ...validAnalysis,
      whatYouMayBeMissing: [], // Requires min(1)
    };
    const result = BlindSpotAnalysisSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("9c. rejects an AI response missing mandatory fields", () => {
    const { catalyticQuestions, ...missingRequired } = validAnalysis;
    const result = BlindSpotAnalysisSchema.safeParse(missingRequired);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.catalyticQuestions).toBeDefined();
    }
  });

  it("9d. rejects an AI response where items lack required sub-fields", () => {
    const invalid = {
      ...validAnalysis,
      risksAndTradeoffs: [
        {
          riskOrHiddenCost: "Only risk provided",
          // missing worstCaseScenario & mitigationIdea
        },
      ],
    };
    const result = BlindSpotAnalysisSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
