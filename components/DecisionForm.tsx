import React, { ChangeEvent, FormEvent } from "react";
import { Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { DecisionInput } from "@/lib/schemas";

interface DecisionFormProps {
  values: DecisionInput;
  onChange: (field: keyof DecisionInput, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  fieldErrors: Record<string, string[] | undefined>;
  onClear: () => void;
}

export function DecisionForm({
  values,
  onChange,
  onSubmit,
  isLoading,
  fieldErrors,
  onClear,
}: DecisionFormProps) {
  const handleChange =
    (field: keyof DecisionInput) =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(field, e.target.value);
    };

  const decisionLen = values.decision?.length || 0;
  const currentThinkingLen = values.currentThinking?.length || 0;
  const contextLen = values.context?.length || 0;
  const constraintsLen = values.constraints?.length || 0;

  return (
    <section id="decision-canvas" aria-labelledby="form-heading" className="py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          {/* Section Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-6">
            <div>
              <h2
                id="form-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Put your decision under the microscope.
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Be candid. The deeper the context, the sharper the blind spots uncovered.
              </p>
            </div>
            {(decisionLen > 0 || currentThinkingLen > 0 || contextLen > 0) && (
              <button
                type="button"
                onClick={onClear}
                disabled={isLoading}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/40 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 disabled:opacity-50"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset Form</span>
              </button>
            )}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
            {/* FIELD 1: Decision */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="field-decision"
                  className="text-sm font-semibold text-slate-200"
                >
                  What decision are you trying to make?{" "}
                  <span className="text-cyan-400" aria-hidden="true">
                    *
                  </span>
                </label>
                <span
                  className={`text-xs ${
                    decisionLen > 600
                      ? "text-rose-400 font-semibold"
                      : "text-slate-400"
                  }`}
                  aria-live="polite"
                >
                  {decisionLen} / 600
                </span>
              </div>
              <textarea
                id="field-decision"
                name="decision"
                rows={3}
                value={values.decision || ""}
                onChange={handleChange("decision")}
                placeholder="Example: Should I switch to a different career path or double down on my current role?"
                disabled={isLoading}
                aria-invalid={Boolean(fieldErrors.decision)}
                aria-describedby={
                  fieldErrors.decision ? "field-decision-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-950/70 p-3.5 text-sm text-slate-100 placeholder-slate-400 transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  fieldErrors.decision
                    ? "border-rose-500/80 focus-visible:ring-rose-400"
                    : "border-slate-800 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-400"
                }`}
              />
              {fieldErrors.decision && (
                <div
                  id="field-decision-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5"
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{fieldErrors.decision[0]}</span>
                </div>
              )}
            </div>

            {/* FIELD 2: Current Thinking */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="field-currentThinking"
                  className="text-sm font-semibold text-slate-200"
                >
                  What are you currently leaning toward?{" "}
                  <span className="text-cyan-400" aria-hidden="true">
                    *
                  </span>
                </label>
                <span
                  className={`text-xs ${
                    currentThinkingLen > 600
                      ? "text-rose-400 font-semibold"
                      : "text-slate-400"
                  }`}
                  aria-live="polite"
                >
                  {currentThinkingLen} / 600
                </span>
              </div>
              <textarea
                id="field-currentThinking"
                name="currentThinking"
                rows={3}
                value={values.currentThinking || ""}
                onChange={handleChange("currentThinking")}
                placeholder="I am currently leaning toward making the switch because..."
                disabled={isLoading}
                aria-invalid={Boolean(fieldErrors.currentThinking)}
                aria-describedby={
                  fieldErrors.currentThinking
                    ? "field-currentThinking-error"
                    : undefined
                }
                className={`w-full rounded-xl border bg-slate-950/70 p-3.5 text-sm text-slate-100 placeholder-slate-400 transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  fieldErrors.currentThinking
                    ? "border-rose-500/80 focus-visible:ring-rose-400"
                    : "border-slate-800 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-400"
                }`}
              />
              {fieldErrors.currentThinking && (
                <div
                  id="field-currentThinking-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5"
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{fieldErrors.currentThinking[0]}</span>
                </div>
              )}
            </div>

            {/* FIELD 3: Context */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="field-context"
                  className="text-sm font-semibold text-slate-200"
                >
                  What context matters?{" "}
                  <span className="text-cyan-400" aria-hidden="true">
                    *
                  </span>
                </label>
                <span
                  className={`text-xs ${
                    contextLen > 1000
                      ? "text-rose-400 font-semibold"
                      : "text-slate-400"
                  }`}
                  aria-live="polite"
                >
                  {contextLen} / 1000
                </span>
              </div>
              <textarea
                id="field-context"
                name="context"
                rows={4}
                value={values.context || ""}
                onChange={handleChange("context")}
                placeholder="Tell us what led to this decision and what matters most (timeline, past attempts, stake-holders)..."
                disabled={isLoading}
                aria-invalid={Boolean(fieldErrors.context)}
                aria-describedby={
                  fieldErrors.context ? "field-context-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-950/70 p-3.5 text-sm text-slate-100 placeholder-slate-400 transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  fieldErrors.context
                    ? "border-rose-500/80 focus-visible:ring-rose-400"
                    : "border-slate-800 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-400"
                }`}
              />
              {fieldErrors.context && (
                <div
                  id="field-context-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5"
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{fieldErrors.context[0]}</span>
                </div>
              )}
            </div>

            {/* FIELD 4: Constraints (Optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="field-constraints"
                  className="text-sm font-semibold text-slate-200"
                >
                  What constraints, fears, or limitations should we consider?{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>
                <span
                  className={`text-xs ${
                    constraintsLen > 600
                      ? "text-rose-400 font-semibold"
                      : "text-slate-400"
                  }`}
                  aria-live="polite"
                >
                  {constraintsLen} / 600
                </span>
              </div>
              <textarea
                id="field-constraints"
                name="constraints"
                rows={3}
                value={values.constraints || ""}
                onChange={handleChange("constraints")}
                placeholder="Optional — money, time, family expectations, risk tolerance, irreversibility concerns..."
                disabled={isLoading}
                aria-invalid={Boolean(fieldErrors.constraints)}
                aria-describedby={
                  fieldErrors.constraints ? "field-constraints-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-950/70 p-3.5 text-sm text-slate-100 placeholder-slate-400 transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  fieldErrors.constraints
                    ? "border-rose-500/80 focus-visible:ring-rose-400"
                    : "border-slate-800 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-400"
                }`}
              />
              {fieldErrors.constraints && (
                <div
                  id="field-constraints-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5"
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{fieldErrors.constraints[0]}</span>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:bg-cyan-400 hover:shadow-cyan-400/30 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-5 w-5 text-slate-950 transition-transform duration-200 group-hover:rotate-12" />
                <span>
                  {isLoading ? "Examining Your Reasoning..." : "Reveal My Blind Spots"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
