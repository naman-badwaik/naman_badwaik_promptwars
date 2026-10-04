import React, { useState } from "react";
import {
  Flame,
  ShieldAlert,
  HelpCircle,
  Shuffle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react";
import { ChallengeMyThinking } from "@/lib/schemas";

interface ChallengeThinkingProps {
  challenge: ChallengeMyThinking;
  challengeReflection: string;
  onChallengeReflectionChange: (text: string) => void;
}

export function ChallengeThinking({
  challenge,
  challengeReflection,
  onChallengeReflectionChange,
}: ChallengeThinkingProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasReflection = challengeReflection.trim().length > 0;

  return (
    <section
      aria-labelledby="challenge-heading"
      className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-slate-900/95 p-6 sm:p-8 shadow-xl"
    >
      {/* Header & Toggle Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/50 px-3 py-1 text-xs font-semibold text-amber-300 mb-2">
            <Flame className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span>Second-Level Stress Test</span>
          </div>
          <h3
            id="challenge-heading"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2"
          >
            <span>Challenge My Thinking</span>
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            A focused adversarial audit designed to test the resilience of your current instinct.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="challenge-content-area"
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-950/30 px-4 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-900/40 focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
        >
          <span>{isExpanded ? "Collapse Audit" : "Open Stress Test"}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-amber-300" />
          ) : (
            <ChevronDown className="h-4 w-4 text-amber-300" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div id="challenge-content-area" className="mt-6 space-y-6">
          {/* Four Cognitive Stress Pillars */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 1. STRONGEST ASSUMPTION */}
            <div className="card-hover-lift rounded-xl border border-amber-500/20 bg-slate-950/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-950/70 text-amber-300 border border-amber-500/30">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Strongest Assumption Under Fire</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-100 leading-snug">
                &ldquo;{challenge.strongestAssumption}&rdquo;
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                If this single premise breaks down, the foundation of your preferred choice collapses.
              </p>
            </div>

            {/* 2. BIGGEST UNCERTAINTY */}
            <div className="card-hover-lift rounded-xl border border-rose-500/20 bg-slate-950/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-950/70 text-rose-300 border border-rose-500/30">
                  <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Critical Unknown Variable</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-100 leading-snug">
                {challenge.biggestUncertainty}
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                The highest-leverage variable that is currently beyond your direct predictive control.
              </p>
            </div>

            {/* 3. ALTERNATIVE INTERPRETATION */}
            <div className="card-hover-lift rounded-xl border border-indigo-500/20 bg-slate-950/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-950/70 text-indigo-300 border border-indigo-500/30">
                  <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Cognitive Inversion</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-100 leading-snug">
                {challenge.alternativeInterpretation}
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                What the opposite point of view reveals when stripped of defensive instincts.
              </p>
            </div>

            {/* 4. PRE-MORTEM QUESTION */}
            <div className="card-hover-lift rounded-xl border border-cyan-500/20 bg-slate-950/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>The Pre-Mortem Question</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-100 leading-snug">
                &ldquo;{challenge.preMortemQuestion}&rdquo;
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                Ask yourself: If this fails in 12 months, what was the unaddressed warning sign?
              </p>
            </div>
          </div>

          {/* Interactive Pre-Mortem Reflection Scratchpad */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label
                htmlFor="challenge-reflection-input"
                className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Your Pre-Mortem Audit Answer</span>
              </label>

              {hasReflection && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Recorded</span>
                </span>
              )}
            </div>

            <textarea
              id="challenge-reflection-input"
              rows={3}
              value={challengeReflection}
              onChange={(e) => onChallengeReflectionChange(e.target.value)}
              placeholder="Record your honest response to the Pre-Mortem probe here. What is the real risk you need to confront before committing?"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Included automatically in your exported Decision Dossier.</span>
              <span>{challengeReflection.length} characters</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
