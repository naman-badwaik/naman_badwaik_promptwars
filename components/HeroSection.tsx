import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { ThinkingField } from "./ThinkingField";

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection = React.memo(function HeroSection({
  onScrollToForm,
}: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 text-center"
    >
      {/* 1. Subtle Background Thinking Field (Cognitive Vectors & Ambient Radiance) */}
      <ThinkingField />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Step 1 in Entrance: Epistemic Badge */}
        <div className="hero-badge-entrance inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-950/60">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
          <span>The Epistemic Decision Mirror</span>
        </div>

        {/* Step 2 in Entrance: Main Headline */}
        <h1
          id="hero-heading"
          className="hero-headline-entrance mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-[1.12]"
        >
          See what you&apos;re not seeing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            before you commit.
          </span>
        </h1>

        {/* Step 3 in Entrance: Supporting Text */}
        <p className="hero-subhead-entrance mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
          BlindSpot AI helps you uncover assumptions, overlooked factors,
          hidden trade-offs, and better questions — without making the decision
          for you.
        </p>

        {/* Step 4 in Entrance: Primary CTA */}
        <div className="hero-cta-entrance mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onScrollToForm}
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-cyan-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_0_24px_rgba(56,189,248,0.32)] focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 active:scale-[0.98]"
          >
            <span>Analyze a Decision</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Secondary subtle reassurance */}
        <p className="hero-cta-entrance mt-3 text-xs font-medium text-slate-400">
          Your decision stays yours.
        </p>
      </div>
    </section>
  );
});
