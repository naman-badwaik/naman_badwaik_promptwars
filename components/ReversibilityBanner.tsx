import React from "react";
import { DoorClosed, DoorOpen, Info } from "lucide-react";
import { BlindSpotAnalysis } from "@/lib/schemas";

interface ReversibilityBannerProps {
  reversibility: BlindSpotAnalysis["reversibility"];
}

export function ReversibilityBanner({
  reversibility,
}: ReversibilityBannerProps) {
  const isType1 = reversibility.type.includes("Type 1");

  return (
    <div
      tabIndex={0}
      className={`card-hover-lift relative overflow-hidden rounded-2xl border p-6 sm:p-7 shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
        isType1
          ? "border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-900 text-amber-200"
          : "border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/90 to-slate-900 text-cyan-200"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${
              isType1
                ? "border-amber-500/40 bg-amber-950/60 text-amber-400"
                : "border-cyan-500/40 bg-cyan-950/60 text-cyan-400"
            }`}
          >
            {isType1 ? (
              <DoorClosed className="h-6 w-6" aria-hidden="true" />
            ) : (
              <DoorOpen className="h-6 w-6" aria-hidden="true" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                STEP 01
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                  isType1
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                    : "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                }`}
              >
                {isType1 ? "Type 1 Door: High Stakes" : "Type 2 Door: Reversible"}
              </span>
              <span className="text-xs text-slate-400">
                Decision Architecture
              </span>
            </div>

            <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white">
              {reversibility.type}
            </h3>

            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
              {reversibility.rationale}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 sm:self-auto flex-shrink-0">
          <Info className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          <span>
            {isType1
              ? "Walk through deliberately"
              : "Safe to experiment & iterate"}
          </span>
        </div>
      </div>
    </div>
  );
}
