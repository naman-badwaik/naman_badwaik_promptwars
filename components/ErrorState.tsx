import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  isRetryable?: boolean;
}

export function ErrorState({
  message,
  onRetry,
  isRetryable = true,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto my-8 max-w-2xl rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 text-center shadow-lg backdrop-blur-sm"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-400">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-rose-200">
        Unable to complete analysis
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-rose-300/90">
        {message || "We couldn't complete the analysis this time. Please try again."}
      </p>

      {isRetryable && onRetry && (
        <div className="mt-5">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-400/40 bg-rose-900/40 px-4 py-2.5 text-xs font-semibold text-rose-200 transition duration-150 hover:bg-rose-800/60 focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-95"
          >
            <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
