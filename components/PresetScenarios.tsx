import React from "react";
import { PRESET_SCENARIOS, PresetScenario } from "@/lib/sampleData";
import { Briefcase, GraduationCap, ShoppingBag, ArrowUpRight } from "lucide-react";

interface PresetScenariosProps {
  onSelectPreset: (preset: PresetScenario) => void;
  activePresetId?: string;
}

export const PresetScenarios = React.memo(function PresetScenarios({
  onSelectPreset,
  activePresetId,
}: PresetScenariosProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "career-choice":
        return <Briefcase className="h-4 w-4 text-cyan-400" aria-hidden="true" />;
      case "college-education":
        return <GraduationCap className="h-4 w-4 text-indigo-400" aria-hidden="true" />;
      case "personal-purchase":
        return <ShoppingBag className="h-4 w-4 text-amber-400" aria-hidden="true" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />;
    }
  };

  return (
    <section aria-labelledby="presets-heading" className="py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <span>Dilemma Starters</span>
          </div>
          <h2
            id="presets-heading"
            className="text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Start with a real decision
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Click any scenario to populate the microscope canvas, or enter your own below.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`card-hover-lift group relative flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "border-cyan-400 bg-slate-900/95 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50"
                    : "border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-md"
                }`}
                aria-pressed={isSelected}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-800/60 transition-colors group-hover:border-slate-700">
                        {getIcon(preset.id)}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {preset.category}
                      </span>
                    </div>
                    <span className="rounded-full border border-slate-800 bg-slate-800/70 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      {preset.tag}
                    </span>
                  </div>

                  <p className="mt-3.5 text-sm font-medium leading-snug text-slate-200 transition-colors group-hover:text-white">
                    {preset.decision}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-800/70 pt-3 text-xs font-medium">
                  <span className="text-slate-400 transition-colors group-hover:text-slate-300">
                    Click to load dilemma
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 transition-colors group-hover:text-cyan-300">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
});
