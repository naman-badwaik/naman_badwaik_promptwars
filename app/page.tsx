"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PresetScenarios } from "@/components/PresetScenarios";
import { DecisionForm } from "@/components/DecisionForm";
import { LoadingState } from "@/components/LoadingState";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { ErrorState } from "@/components/ErrorState";
import { PresetScenario } from "@/lib/sampleData";
import { AlertCircle, RotateCcw } from "lucide-react";
import {
  DecisionInput,
  DecisionInputSchema,
  BlindSpotAnalysis,
  AnalyzeApiResponse,
} from "@/lib/schemas";

const INITIAL_FORM: DecisionInput = {
  decision: "",
  currentThinking: "",
  context: "",
  constraints: "",
};

export default function HomePage() {
  const [formValues, setFormValues] = useState<DecisionInput>(INITIAL_FORM);
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<BlindSpotAnalysis | null>(null);

  // Sprint 3: Personal Reflections local state
  const [reflections, setReflections] = useState<Record<number, string>>({});
  // Sprint 6 (Upgrade): Challenge My Thinking Pre-Mortem reflection state
  const [challengeReflection, setChallengeReflection] = useState<string>("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Accessible Escape key listener for reset confirmation dialog
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showResetConfirm) {
        setShowResetConfirm(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResetConfirm]);

  const scrollToForm = () => {
    const el = document.getElementById("decision-canvas");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById("analysis-results");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPresetId(preset.id);
    setFormValues({
      decision: preset.decision,
      currentThinking: preset.currentThinking,
      context: preset.context,
      constraints: preset.constraints,
    });
    setFieldErrors({});
    setApiError(null);
    scrollToForm();
  };

  const handleChangeField = (field: keyof DecisionInput, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-level error when user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleReflectionChange = (questionIndex: number, text: string) => {
    setReflections((prev) => ({
      ...prev,
      [questionIndex]: text,
    }));
  };

  const executeClearAll = () => {
    setFormValues(INITIAL_FORM);
    setSelectedPresetId(undefined);
    setFieldErrors({});
    setApiError(null);
    setAnalysisResult(null);
    setReflections({});
    setChallengeReflection("");
    setShowResetConfirm(false);
    scrollToForm();
  };

  const handleFormClear = () => {
    setFormValues(INITIAL_FORM);
    setSelectedPresetId(undefined);
    setFieldErrors({});
    setApiError(null);
  };

  const handleRequestReset = () => {
    // Check if user has unsaved reflection or pre-mortem notes
    const hasActiveReflections =
      Object.values(reflections).some((text) => text.trim().length > 0) ||
      challengeReflection.trim().length > 0;

    if (hasActiveReflections) {
      setShowResetConfirm(true);
    } else {
      executeClearAll();
    }
  };

  const executeAnalysis = async (input: DecisionInput) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const json: AnalyzeApiResponse = await response.json();

      if (!json.success) {
        if (response.status === 429) {
          setApiError(
            "The analysis service is temporarily busy. Please wait a brief moment and try again."
          );
        } else if (response.status === 400 && json.fieldErrors) {
          setFieldErrors(json.fieldErrors);
          setApiError(
            "Some information needs attention. Please review the highlighted fields."
          );
        } else {
          setApiError(
            json.error ||
              "We couldn't complete the analysis this time. Please try again."
          );
        }
        setIsLoading(false);
        return;
      }

      setAnalysisResult(json.data);
      setReflections({}); // Reset reflections for newly generated dilemma
      setChallengeReflection(""); // Reset pre-mortem reflection
      setIsLoading(false);
      scrollToResults();
    } catch {
      setApiError(
        "We couldn't complete the analysis this time. Please check your connection and try again."
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side schema pre-validation
    const validation = DecisionInputSchema.safeParse(formValues);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFieldErrors(errors);
      setApiError(
        "Some information needs attention. Please correct the fields above."
      );
      return;
    }

    setFieldErrors({});
    executeAnalysis(validation.data);
  };

  const handleRetry = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onScrollToForm={scrollToForm} />

        {/* Starter Presets */}
        <PresetScenarios
          onSelectPreset={handleSelectPreset}
          activePresetId={selectedPresetId}
        />

        {/* Decision Canvas Input Form */}
        <DecisionForm
          values={formValues}
          onChange={handleChangeField}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          fieldErrors={fieldErrors}
          onClear={handleFormClear}
        />

        {/* Dynamic States: Loading, Error, Results */}
        {isLoading && <LoadingState />}

        {apiError && !isLoading && (
          <ErrorState message={apiError} onRetry={handleRetry} />
        )}

        {analysisResult && !isLoading && (
          <AnalysisDashboard
            input={formValues}
            analysis={analysisResult}
            reflections={reflections}
            challengeReflection={challengeReflection}
            onReflectionChange={handleReflectionChange}
            onChallengeReflectionChange={setChallengeReflection}
            onAnalyzeAnother={handleRequestReset}
          />
        )}

        {/* Reset Confirmation Prompt (Overlay / Inline modal) */}
        {showResetConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-reset-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          >
            <div className="max-w-md w-full rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <h3
                  id="confirm-reset-title"
                  className="text-lg font-bold text-white"
                >
                  Unexported Reflections
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                You have recorded personal reflections in the scratchpad that haven&apos;t been exported. If you start fresh, these notes will be cleared.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Keep Reflecting
                </button>
                <button
                  type="button"
                  onClick={executeClearAll}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-500 shadow-md"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Start Fresh</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Accessible Minimal Footer */}
      <footer className="border-t border-slate-900 bg-[#070a12] py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} BlindSpot AI — The Epistemic Decision Mirror.</p>
          <p className="text-slate-400">
            Designed for thoughtful reflection. Your decision stays yours.
          </p>
        </div>
      </footer>
    </div>
  );
}
