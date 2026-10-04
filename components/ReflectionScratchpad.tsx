import React, { useState } from "react";
import {
  PenLine,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { BlindSpotAnalysis } from "@/lib/schemas";

interface ReflectionScratchpadProps {
  questions: BlindSpotAnalysis["catalyticQuestions"];
  reflections: Record<number, string>;
  onReflectionChange: (questionIndex: number, text: string) => void;
}

export function ReflectionScratchpad({
  questions,
  reflections,
  onReflectionChange,
}: ReflectionScratchpadProps) {
  // Track open/collapsed state for each question (default all open for easy access)
  const [collapsedMap, setCollapsedMap] = useState<Record<number, boolean>>({});

  const toggleCollapse = (index: number) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Calculate completed count
  const answeredCount = questions.filter(
    (_, idx) => (reflections[idx]?.trim().length || 0) > 0
  ).length;

  return (
    <div className="space-y-6">
      {/* 1. Header with Completion Badge */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Your Reflection
            </h3>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Don&apos;t just read the blind spots. Challenge your own thinking.
          </p>
        </div>

        {/* Subtle Completion Indicator */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs text-slate-300 sm:self-auto">
          {answeredCount > 0 ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-slate-500" />
          )}
          <span className="font-medium">
            {answeredCount} of {questions.length} questions explored
          </span>
        </div>
      </div>

      {/* 2. Socratic Guidance Card */}
      <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/70 to-slate-900/70 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-300">
          <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden="true" />
          <h4 className="text-sm font-semibold tracking-wide uppercase">
            Pause before deciding.
          </h4>
        </div>
        <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
          Hold these three self-inquiry prompts in mind as you review each question below:
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 text-xs text-slate-300">
            <span className="font-semibold text-amber-300 block mb-1">
              • Assumption Audit:
            </span>
            &ldquo;Which assumption surprised you most?&rdquo;
          </div>
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 text-xs text-slate-300">
            <span className="font-semibold text-cyan-300 block mb-1">
              • Inversion Test:
            </span>
            &ldquo;What would need to be true for your current thinking to change?&rdquo;
          </div>
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 text-xs text-slate-300">
            <span className="font-semibold text-indigo-300 block mb-1">
              • Missing Data:
            </span>
            &ldquo;What key information would you want before committing?&rdquo;
          </div>
        </div>
      </div>

      {/* 3. Catalytic Question Prompts with Expandable Textareas */}
      <div className="space-y-4">
        {questions.map((item, idx) => {
          const isCollapsed = Boolean(collapsedMap[idx]);
          const currentText = reflections[idx] || "";
          const isAnswered = currentText.trim().length > 0;

          return (
            <article
              key={idx}
              className={`rounded-xl border transition-all duration-200 ${
                isAnswered
                  ? "border-cyan-500/40 bg-slate-900/80 shadow-md"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/70"
              }`}
            >
              {/* Question Header & Toggle */}
              <div
                className="flex items-start justify-between gap-3 p-4 sm:p-5 cursor-pointer select-none"
                onClick={() => toggleCollapse(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCollapse(idx);
                  }
                }}
                aria-expanded={!isCollapsed}
                aria-label={`Toggle reflection for question ${idx + 1}`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                      Probe #{idx + 1}
                    </span>
                    {isAnswered && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Reflected</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-semibold text-white leading-snug">
                    &ldquo;{item.question}&rdquo;
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-medium text-slate-300">
                      Why this matters:{" "}
                    </span>
                    {item.whyThisMatters}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={isCollapsed ? "Expand question" : "Collapse question"}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Reflection Writing Area */}
              {!isCollapsed && (
                <div className="border-t border-slate-800/80 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                  <label
                    htmlFor={`reflection-${idx}`}
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Your reflection:
                  </label>
                  <textarea
                    id={`reflection-${idx}`}
                    rows={3}
                    value={currentText}
                    onChange={(e) => onReflectionChange(idx, e.target.value)}
                    placeholder="Write your honest thinking, counter-arguments, or immediate intuition here..."
                    className="w-full rounded-xl border border-slate-800/80 bg-slate-950/80 p-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-cyan-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  />
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Stored in your local session. Never sent to any server.</span>
                    <span>{currentText.length} characters</span>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
