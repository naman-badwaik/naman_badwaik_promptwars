import React from "react";

interface InsightCardProps {
  badge?: string;
  badgeColor?: "cyan" | "amber" | "indigo" | "rose" | "slate";
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function InsightCard({
  badge,
  badgeColor = "cyan",
  title,
  children,
  icon,
}: InsightCardProps) {
  const getBadgeClass = (color: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-400/15 text-amber-300 border-amber-400/30";
      case "indigo":
        return "bg-indigo-400/15 text-indigo-300 border-indigo-400/30";
      case "rose":
        return "bg-rose-400/15 text-rose-300 border-rose-400/30";
      case "slate":
        return "bg-slate-800 text-slate-300 border-slate-700";
      case "cyan":
      default:
        return "bg-cyan-400/15 text-cyan-300 border-cyan-400/30";
    }
  };

  return (
    <article
      tabIndex={0}
      className="card-hover-lift group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 shadow-md hover:border-slate-700/90 hover:bg-slate-900/85 hover:shadow-cyan-950/20 focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
    >
      <div>
        {(badge || icon) && (
          <div className="mb-3 flex items-center justify-between gap-2">
            {badge ? (
              <span
                className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${getBadgeClass(
                  badgeColor
                )}`}
              >
                {badge}
              </span>
            ) : (
              <div />
            )}
            {icon && <div className="text-slate-400">{icon}</div>}
          </div>
        )}

        {title && (
          <h4 className="text-base font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            {title}
          </h4>
        )}

        <div className="mt-2 text-sm text-slate-300 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </article>
  );
}
