import React from "react";

export const ThinkingField = React.memo(function ThinkingField() {
  return (
    <div
      className="hero-field-entrance pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Atmospheric Depth Gradients (Cyan & Indigo Ambient Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[740px] rounded-full bg-cyan-500/10 blur-[130px] thinking-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[540px] rounded-full bg-indigo-600/10 blur-[110px]" />

      {/* 2. Cognitive Constellation & Orbital Vectors (Vector SVG) */}
      <svg
        className="w-full max-w-[1100px] h-[580px] sm:h-[660px] opacity-75 select-none"
        viewBox="0 0 1100 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)",
        }}
      >
        <defs>
          <linearGradient id="vectorBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </linearGradient>

          <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Concentric Geometric Rings (Delicate dashed orbits) */}
        <circle
          cx="550"
          cy="310"
          r="480"
          stroke="rgba(56, 189, 248, 0.04)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="550"
          cy="310"
          r="360"
          stroke="rgba(56, 189, 248, 0.06)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <circle
          cx="550"
          cy="310"
          r="240"
          stroke="rgba(56, 189, 248, 0.09)"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="thinking-orbit"
        />
        <circle
          cx="550"
          cy="310"
          r="140"
          stroke="rgba(56, 189, 248, 0.12)"
          strokeWidth="1"
        />

        {/* Central Epistemic Reticle / Crosshair (+ marks) */}
        <line
          x1="550"
          y1="160"
          x2="550"
          y2="190"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1"
        />
        <line
          x1="550"
          y1="430"
          x2="550"
          y2="460"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1"
        />
        <line
          x1="400"
          y1="310"
          x2="430"
          y2="310"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1"
        />
        <line
          x1="670"
          y1="310"
          x2="700"
          y2="310"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1"
        />

        {/* Interconnected Cognitive Nodes & Vectors */}
        {/* Vector lines connecting thought nodes */}
        <path
          d="M 280 230 L 410 180 L 550 170 L 690 180 L 820 230"
          stroke="url(#vectorBeam)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <path
          d="M 280 230 L 370 340 L 550 310 L 730 340 L 820 230"
          stroke="rgba(148, 163, 184, 0.08)"
          strokeWidth="1"
        />
        <path
          d="M 370 340 L 470 450 L 550 430 L 630 450 L 730 340"
          stroke="url(#vectorBeam)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 410 180 L 550 310 L 690 180"
          stroke="rgba(56, 189, 248, 0.07)"
          strokeWidth="1"
        />

        {/* Cognitive Nodes (Nodes of reasoning) */}
        {/* Node 1 - Top Left */}
        <circle cx="410" cy="180" r="3" fill="#38bdf8" opacity="0.6" />
        <circle cx="410" cy="180" r="9" fill="url(#nodePulse)" />

        {/* Node 2 - Top Center Apex */}
        <circle cx="550" cy="170" r="3.5" fill="#38bdf8" opacity="0.8" />
        <circle cx="550" cy="170" r="12" fill="url(#nodePulse)" />

        {/* Node 3 - Top Right */}
        <circle cx="690" cy="180" r="3" fill="#38bdf8" opacity="0.6" />
        <circle cx="690" cy="180" r="9" fill="url(#nodePulse)" />

        {/* Node 4 - Mid Left Flank */}
        <circle cx="280" cy="230" r="2.5" fill="#818cf8" opacity="0.5" />

        {/* Node 5 - Mid Right Flank */}
        <circle cx="820" cy="230" r="2.5" fill="#818cf8" opacity="0.5" />

        {/* Node 6 - Inner Left Pivot */}
        <circle cx="370" cy="340" r="3" fill="#38bdf8" opacity="0.7" />
        <circle cx="370" cy="340" r="8" fill="url(#nodePulse)" />

        {/* Node 7 - Inner Right Pivot */}
        <circle cx="730" cy="340" r="3" fill="#38bdf8" opacity="0.7" />
        <circle cx="730" cy="340" r="8" fill="url(#nodePulse)" />

        {/* Node 8 & 9 - Bottom Base Nodes */}
        <circle cx="470" cy="450" r="2.5" fill="#818cf8" opacity="0.6" />
        <circle cx="630" cy="450" r="2.5" fill="#818cf8" opacity="0.6" />

        {/* Central Cognitive Focal Core (The Epistemic Anchor) */}
        <circle cx="550" cy="310" r="5" fill="#38bdf8" opacity="0.7" />
        <circle
          cx="550"
          cy="310"
          r="18"
          stroke="#38bdf8"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Floating thought particles */}
        <circle cx="340" cy="260" r="1.5" fill="#38bdf8" className="thinking-particle-1" />
        <circle cx="760" cy="280" r="1.5" fill="#818cf8" className="thinking-particle-2" />
        <circle cx="500" cy="380" r="1.5" fill="#38bdf8" className="thinking-particle-3" />
        <circle cx="600" cy="240" r="1.5" fill="#38bdf8" className="thinking-particle-1" />
      </svg>
    </div>
  );
});
