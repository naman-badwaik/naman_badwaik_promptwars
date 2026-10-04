import React, { useState, useEffect } from "react";
import { Brain, Sparkles } from "lucide-react";

const COGNITIVE_STAGES = [
  {
    step: "01 / 05",
    title: "EXAMINING YOUR REASONING",
    subtext: "Mapping core mental models and stated premises...",
  },
  {
    step: "02 / 05",
    title: "CHECKING HIDDEN ASSUMPTIONS",
    subtext: "Auditing unstated heuristics and confirmation biases...",
  },
  {
    step: "03 / 05",
    title: "LOOKING FOR OVERLOOKED FACTORS",
    subtext: "Tracing second-order consequences and systemic friction...",
  },
  {
    step: "04 / 05",
    title: "TESTING ALTERNATIVE PERSPECTIVES",
    subtext: "Constructing objective counter-arguments and outside lenses...",
  },
  {
    step: "05 / 05",
    title: "BUILDING YOUR BLIND-SPOT MAP",
    subtext: "Formulating Socratic probes and pivot triggers...",
  },
];

export function LoadingState() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % COGNITIVE_STAGES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const activeStage = COGNITIVE_STAGES[currentStageIndex];

  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto my-14 max-w-xl px-4 text-center animate-reveal"
    >
      {/* Central Cognitive Focal Beacon */}
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        {/* Soft breathing pulse rings */}
        <div
          className="absolute inset-0 animate-ping rounded-full bg-cyan-500/15 duration-1000"
          aria-hidden="true"
        />
        <div
          className="absolute inset-2 animate-pulse rounded-full border border-cyan-400/40 bg-cyan-950/40 duration-700"
          aria-hidden="true"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/60 bg-slate-900 shadow-inner">
          <Brain className="h-7 w-7 text-cyan-400" aria-hidden="true" />
        </div>
      </div>

      {/* Progressive Stage Indicator */}
      <div className="mt-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-mono font-semibold text-cyan-400">
          <Sparkles className="h-3 w-3" />
          <span>STAGE {activeStage.step}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white transition-opacity duration-300">
          {activeStage.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 transition-opacity duration-300 max-w-md mx-auto">
          {activeStage.subtext}
        </p>
      </div>

      {/* Subtle Step Dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden="true">
        {COGNITIVE_STAGES.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentStageIndex
                ? "w-6 bg-cyan-400"
                : "w-1.5 bg-slate-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
