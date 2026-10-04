import React from "react";
import { DecisionInput, BlindSpotAnalysis } from "@/lib/schemas";
import { ReversibilityBanner } from "./ReversibilityBanner";
import { InsightCard } from "./InsightCard";
import { ReflectionScratchpad } from "./ReflectionScratchpad";
import { DecisionDossier } from "./DecisionDossier";
import {
  EyeOff,
  Scale,
  AlertTriangle,
  Users2,
  HelpCircle,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { ChallengeThinking } from "./ChallengeThinking";

interface AnalysisDashboardProps {
  input: DecisionInput;
  analysis: BlindSpotAnalysis;
  reflections: Record<number, string>;
  challengeReflection: string;
  onReflectionChange: (index: number, text: string) => void;
  onChallengeReflectionChange: (text: string) => void;
  onAnalyzeAnother: () => void;
}

export function AnalysisDashboard({
  input,
  analysis,
  reflections,
  challengeReflection,
  onReflectionChange,
  onChallengeReflectionChange,
  onAnalyzeAnother,
}: AnalysisDashboardProps) {
  const effectiveChallenge = analysis.challengeMyThinking || {
    strongestAssumption:
      analysis.assumptionsBeingMade[0]?.statedOrImpliedAssumption ||
      "Core unverified premise.",
    biggestUncertainty:
      analysis.risksAndTradeoffs[0]?.riskOrHiddenCost ||
      "Downside unpredictability under shifting constraints.",
    alternativeInterpretation:
      analysis.alternativePerspectives[0]?.howTheyViewThis ||
      "Consider the inverse outcome if initial assumptions fail to hold.",
    preMortemQuestion:
      analysis.catalyticQuestions[0]?.question ||
      "If this path fails within a year, what was the root blind spot?",
  };
  return (
    <section
      id="analysis-results"
      aria-labelledby="results-heading"
      className="py-12 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ========================================================
            HEADER & REVISION METRICS SUMMARY (NOT A SCORE)
            ======================================================== */}
        <div className="animate-reveal stagger-1 border-b border-slate-800 pb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300 mb-3">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Cognitive Reflection Audit</span>
            </div>
            <h2
              id="results-heading"
              className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Your Blind Spot Review
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-300">
              This isn&apos;t a recommendation. It&apos;s a mirror for your reasoning.
            </p>
          </div>

          <button
            type="button"
            onClick={onAnalyzeAnother}
            className="self-center sm:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 shadow-sm"
          >
            <span>Examine Another Dilemma</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ========================================================
            COMPACT COGNITIVE SUMMARY: "Your thinking, examined."
            ======================================================== */}
        <div className="animate-reveal stagger-1 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-md">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Your thinking, examined</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Reversibility</span>
              <span className="text-xs font-bold text-cyan-300 mt-1 block truncate">
                {analysis.reversibility.type.includes("Type 1") ? "Type 1 Door" : "Type 2 Door"}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Blind Spots</span>
              <span className="text-base font-bold text-white mt-0.5 block">
                {analysis.whatYouMayBeMissing.length}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Assumptions</span>
              <span className="text-base font-bold text-amber-300 mt-0.5 block">
                {analysis.assumptionsBeingMade.length}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Risks Identified</span>
              <span className="text-base font-bold text-rose-300 mt-0.5 block">
                {analysis.risksAndTradeoffs.length}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Outside Lenses</span>
              <span className="text-base font-bold text-indigo-300 mt-0.5 block">
                {analysis.alternativePerspectives.length}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Socratic Probes</span>
              <span className="text-base font-bold text-cyan-400 mt-0.5 block">
                {analysis.catalyticQuestions.length}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            STEP 01: REVERSIBILITY BANNER
            ======================================================== */}
        <div className="animate-reveal stagger-2">
          <ReversibilityBanner reversibility={analysis.reversibility} />
        </div>

        {/* ========================================================
            STEP 02: WHAT YOU MAY BE MISSING
            ======================================================== */}
        <div className="animate-reveal stagger-3 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-cyan-400/80">02</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                What You May Be Missing
              </h3>
              <p className="text-xs text-slate-400">
                Factors outside your current mental frame.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {analysis.whatYouMayBeMissing.map((item, idx) => (
              <InsightCard
                key={idx}
                badge={item.blindSpotCategory}
                badgeColor="cyan"
                title={item.title}
              >
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </InsightCard>
            ))}
          </div>
        </div>

        {/* ========================================================
            STEP 03: ASSUMPTIONS YOU'RE MAKING
            ======================================================== */}
        <div className="animate-reveal stagger-4 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-amber-400/80">03</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/20">
              <Scale className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Assumptions You&apos;re Making
              </h3>
              <p className="text-xs text-slate-400">
                Premises currently treated as facts that warrant empirical verification.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {analysis.assumptionsBeingMade.map((item, idx) => (
              <InsightCard
                key={idx}
                badge="Premise vs. Reality"
                badgeColor="amber"
              >
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                      Stated or Implied Assumption:
                    </span>
                    <p className="mt-0.5 font-medium text-slate-100">
                      &ldquo;{item.statedOrImpliedAssumption}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Reality Check &amp; Counter-Evidence:
                    </span>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
                      {item.counterEvidenceCheck}
                    </p>
                  </div>
                </div>
              </InsightCard>
            ))}
          </div>
        </div>

        {/* ========================================================
            STEP 04: RISKS & TRADE-OFFS
            ======================================================== */}
        <div className="animate-reveal stagger-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-rose-400/80">04</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Risks &amp; Trade-offs
              </h3>
              <p className="text-xs text-slate-400">
                Worst-case downside limits and non-obvious opportunity costs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {analysis.risksAndTradeoffs.map((item, idx) => (
              <InsightCard
                key={idx}
                badge="Risk & Mitigation"
                badgeColor="rose"
                title={item.riskOrHiddenCost}
              >
                <div className="space-y-2.5">
                  <div className="rounded-lg border border-rose-900/30 bg-rose-950/20 p-2.5 text-xs text-rose-300/90">
                    <span className="font-semibold text-rose-300">
                      Worst-Case Scenario:{" "}
                    </span>
                    {item.worstCaseScenario}
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5 text-xs text-slate-300">
                    <span className="font-semibold text-emerald-400">
                      Mitigation Strategy:{" "}
                    </span>
                    {item.mitigationIdea}
                  </div>
                </div>
              </InsightCard>
            ))}
          </div>
        </div>

        {/* ========================================================
            STEP 05: ALTERNATIVE PERSPECTIVES
            ======================================================== */}
        <div className="animate-reveal stagger-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-indigo-400/80">05</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-500/20">
              <Users2 className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Alternative Perspectives
              </h3>
              <p className="text-xs text-slate-400">
                Viewing your dilemma through outside and adversarial lenses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {analysis.alternativePerspectives.map((item, idx) => (
              <InsightCard
                key={idx}
                badge={item.viewpointLens}
                badgeColor="indigo"
              >
                <p className="text-slate-200 leading-relaxed">
                  {item.howTheyViewThis}
                </p>
              </InsightCard>
            ))}
          </div>
        </div>

        {/* ========================================================
            STEP 06: CATALYTIC QUESTIONS & INTERACTIVE SCRATCHPAD
            ======================================================== */}
        <div className="animate-reveal stagger-7 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-cyan-400/80">06</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Catalytic Questions &amp; Reflection
              </h3>
              <p className="text-xs text-slate-400">
                Socratic probes designed to pierce certainty and stimulate honest reflection.
              </p>
            </div>
          </div>

          {/* Embedded Interactive Scratchpad */}
          <ReflectionScratchpad
            questions={analysis.catalyticQuestions}
            reflections={reflections}
            onReflectionChange={onReflectionChange}
          />
        </div>

        {/* ========================================================
            STEP 07: MIND-SHIFT TRIGGERS
            ("IF THIS CHANGES ... THEN REVISIT ...")
            ======================================================== */}
        <div className="animate-reveal stagger-8 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-xs font-bold text-amber-400/80">07</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/20">
              <Compass className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Mind-Shift Triggers
              </h3>
              <p className="text-xs text-slate-400">
                Explicit signals or new facts that would justify reversing your current leaning.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {analysis.mindShiftTriggers.map((trigger, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className="card-hover-lift rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
              >
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-xs text-amber-300">
                    {idx + 1}
                  </span>
                  <span>IF THIS CHANGES</span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-100 leading-snug">
                  {trigger}
                </p>
                <div className="mt-3.5 border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    THEN REVISIT:
                  </span>
                  <span className="text-cyan-400 font-medium">Your current reasoning</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            STEP 08: CHALLENGE MY THINKING (SECOND-LEVEL STRESS TEST)
            ======================================================== */}
        <div className="animate-reveal stagger-8">
          <ChallengeThinking
            challenge={effectiveChallenge}
            challengeReflection={challengeReflection}
            onChallengeReflectionChange={onChallengeReflectionChange}
          />
        </div>

        {/* ========================================================
            DECISION DOSSIER EXPORT SECTION
            ======================================================== */}
        <div className="animate-reveal stagger-8">
          <DecisionDossier
            input={input}
            analysis={analysis}
            reflections={reflections}
            challengeReflection={challengeReflection}
          />
        </div>

        {/* ========================================================
            BOTTOM CALL TO ACTION & RESET
            ======================================================== */}
        <div className="animate-reveal stagger-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-8 text-center shadow-lg">
          <h3 className="text-lg font-bold text-white">
            The decision remains entirely yours.
          </h3>
          <p className="mt-1.5 text-sm text-slate-400 max-w-xl mx-auto">
            Take time to sit with these questions before committing. When you&apos;re ready, examine your next fork in the road.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={onAnalyzeAnother}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-98"
            >
              <span>Examine Another Decision</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
