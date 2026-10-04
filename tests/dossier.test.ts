import { describe, it, expect } from "vitest";
import { generateDossierMarkdown } from "@/lib/dossier";
import { DecisionInput, BlindSpotAnalysis } from "@/lib/schemas";

describe("generateDossierMarkdown Utility", () => {
  const mockInput: DecisionInput = {
    decision: "Should I accept an enterprise VP offer or bootstrap my AI startup?",
    currentThinking: "Leaning toward the startup because I crave autonomy.",
    context: "I have 9 months runway and a supportive partner.",
    constraints: "Must reach revenue sustainability within 12 months.",
  };

  const mockAnalysis: BlindSpotAnalysis = {
    reversibility: {
      type: "Type 1 (One-Way Door - Hard to Reverse)",
      rationale: "Leaving senior equity is nearly impossible to renegotiate.",
    },
    whatYouMayBeMissing: [
      {
        title: "Enterprise sales inertia",
        description: "B2B enterprise cycles take 9 months.",
        blindSpotCategory: "Velocity Friction",
      },
    ],
    assumptionsBeingMade: [
      {
        statedOrImpliedAssumption: "Autonomy equates to happiness.",
        counterEvidenceCheck: "Founders face severe customer pressure.",
      },
    ],
    risksAndTradeoffs: [
      {
        riskOrHiddenCost: "Opportunity cost of $250k salary.",
        worstCaseScenario: "Depleting savings and restarting hunt.",
        mitigationIdea: "Sign 3 LOIs before giving notice.",
      },
    ],
    alternativePerspectives: [
      {
        viewpointLens: "An Objective Skeptic",
        howTheyViewThis: "You are romanticizing the founder narrative.",
      },
    ],
    catalyticQuestions: [
      {
        question: "What specific metric proves this isn't working by Month 6?",
        whyThisMatters: "Prevents escalating commitment fallacy.",
      },
      {
        question: "What is your fallback if zero customers sign by Month 3?",
        whyThisMatters: "Forces explicit runway risk mitigation.",
      },
    ],
    mindShiftTriggers: [
      "If enterprise offer agrees to a 4-day week with IP carveouts.",
      "If zero design partners sign after 30 outbound demos.",
    ],
  };

  it("1. generates a valid non-empty markdown dossier", () => {
    const md = generateDossierMarkdown(mockInput, mockAnalysis, {}, { generatedAt: "2026-10-04" });
    expect(md).toBeDefined();
    expect(typeof md).toBe("string");
    expect(md.length).toBeGreaterThan(500);
    expect(md).toContain("# BLINDSPOT AI — DECISION DOSSIER");
    expect(md).toContain("**Date:** 2026-10-04");
  });

  it("2. includes all fields from user decision input", () => {
    const md = generateDossierMarkdown(mockInput, mockAnalysis);
    expect(md).toContain(mockInput.decision);
    expect(md).toContain(mockInput.currentThinking);
    expect(md).toContain(mockInput.context);
    expect(md).toContain(mockInput.constraints!);
  });

  it("3. includes user reflections under the corresponding catalytic questions", () => {
    const reflections = {
      0: "I will set a strict cut-off: 5 paying users or $2k MRR by Month 6.",
      1: "I will contract 20 hours/month to extend runway if needed.",
    };

    const md = generateDossierMarkdown(mockInput, mockAnalysis, reflections);
    expect(md).toContain("Question 1:");
    expect(md).toContain(reflections[0]);
    expect(md).toContain("Question 2:");
    expect(md).toContain(reflections[1]);
  });

  it("4. includes all analysis sections and reversibility classification", () => {
    const md = generateDossierMarkdown(mockInput, mockAnalysis);
    expect(md).toContain("Type 1 (One-Way Door - Hard to Reverse)");
    expect(md).toContain("WHAT YOU MAY BE MISSING");
    expect(md).toContain("Enterprise sales inertia");
    expect(md).toContain("UNEXAMINED ASSUMPTIONS");
    expect(md).toContain("Autonomy equates to happiness");
    expect(md).toContain("RISKS & ASYMMETRIC TRADE-OFFS");
    expect(md).toContain("ALTERNATIVE PERSPECTIVES & LENSES");
    expect(md).toContain("MIND-SHIFT TRIGGERS");
    expect(md).toContain("BlindSpot AI does not make the decision for you");
  });

  it("5. handles empty reflections gracefully with polite placeholders", () => {
    const md = generateDossierMarkdown(mockInput, mockAnalysis, {});
    expect(md).toContain("*(No personal reflection recorded yet)*");
  });

  it("6. preserves formatting with special characters, quotes, and markdown tokens", () => {
    const specialInput: DecisionInput = {
      decision: "Can I use <TypeScript> & Node.js with #hashtag *bold* `code`?",
      currentThinking: "Thinking 'quoted' & \"double-quoted\" with $100 and %20.",
      context: "Context with <alert> & special symbols: ~ ` ! @ # $ % ^ & * ( ) _ +",
      constraints: "Constraints with backslashes \\ and markdown tables | a | b |",
    };

    const specialReflections = {
      0: "Reflection with multiple lines:\nLine 1\nLine 2 > quote\n`code block`",
    };

    const md = generateDossierMarkdown(specialInput, mockAnalysis, specialReflections);
    expect(md).toContain(specialInput.decision);
    expect(md).toContain(specialInput.currentThinking);
    expect(md).toContain("Line 1\n  > Line 2 > quote\n  > `code block`");
  });

  it("7. includes Challenge My Thinking synthesis section when present", () => {
    const analysisWithChallenge: BlindSpotAnalysis = {
      ...mockAnalysis,
      challengeMyThinking: {
        strongestAssumption: "Autonomy equates to happiness.",
        biggestUncertainty: "Severe cash flow friction within 6 months.",
        alternativeInterpretation: "The VP role provides capital and network leverage.",
        preMortemQuestion: "If you run out of cash by Month 9, what was the blind spot?",
      },
    };

    const md = generateDossierMarkdown(mockInput, analysisWithChallenge);
    expect(md).toContain("CHALLENGE MY THINKING — SECOND-LEVEL STRESS TEST");
    expect(md).toContain("Strongest Assumption Under Fire");
    expect(md).toContain("Autonomy equates to happiness.");
    expect(md).toContain("Pre-Mortem Probe to Answer Before Deciding");
    expect(md).toContain("If you run out of cash by Month 9");
  });

  it("8. formats user pre-mortem audit answers correctly in the dossier", () => {
    const analysisWithChallenge: BlindSpotAnalysis = {
      ...mockAnalysis,
      challengeMyThinking: {
        strongestAssumption: "Autonomy equates to happiness.",
        biggestUncertainty: "Severe cash flow friction within 6 months.",
        alternativeInterpretation: "The VP role provides capital and network leverage.",
        preMortemQuestion: "If you run out of cash by Month 9, what was the blind spot?",
      },
    };

    const userPreMortem = "I will mandate 3 paying pilot contracts before handing in my two-week notice.";
    const md = generateDossierMarkdown(
      mockInput,
      analysisWithChallenge,
      {},
      { challengeReflection: userPreMortem }
    );
    expect(md).toContain("Your Pre-Mortem Audit Answer:");
    expect(md).toContain(userPreMortem);
  });
});
