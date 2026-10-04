import React from "react";
import { Compass } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-sm"
            aria-hidden="true"
          >
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight text-white">
                BlindSpot AI
              </span>
            </div>
            <p className="text-xs font-normal text-slate-400">
              AI Thinking Companion
            </p>
          </div>
        </div>

        {/* Right: Status Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 shadow-sm">
          <span
            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
            aria-hidden="true"
          />
          <span className="font-medium text-slate-300">Thinking clearly</span>
        </div>
      </nav>
    </header>
  );
}
