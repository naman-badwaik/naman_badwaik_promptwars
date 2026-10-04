import React, { useState } from "react";
import { Copy, Check, Download, FileText, ShieldCheck } from "lucide-react";
import { DecisionInput, BlindSpotAnalysis } from "@/lib/schemas";
import { generateDossierMarkdown } from "@/lib/dossier";

interface DecisionDossierProps {
  input: DecisionInput;
  analysis: BlindSpotAnalysis;
  reflections: Record<number, string>;
  challengeReflection?: string;
}

export function DecisionDossier({
  input,
  analysis,
  reflections,
  challengeReflection,
}: DecisionDossierProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const markdownContent = generateDossierMarkdown(input, analysis, reflections, {
    challengeReflection,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is blocked in certain iframe contexts
      const textarea = document.createElement("textarea");
      textarea.value = markdownContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeFilename = `blindspot-dossier-${new Date()
      .toISOString()
      .slice(0, 10)}.md`;

    link.href = url;
    link.download = safeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const reflectionCount = Object.values(reflections).filter(
    (t) => t.trim().length > 0
  ).length;

  return (
    <div
      id="decision-dossier"
      className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-[#0e1626] to-slate-900/90 p-6 sm:p-8 shadow-xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Decision Dossier
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-300">
            Export a comprehensive summary of your dilemma, blind spots, and reflections.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 ${
              copied
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "border border-slate-700 bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white"
            }`}
            aria-label="Copy entire decision dossier to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-slate-950" />
                <span>Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-cyan-400" />
                <span>Copy Dossier</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-md shadow-cyan-500/20 transition-all duration-200 hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95"
            aria-label="Download decision dossier as a markdown document"
          >
            <Download className="h-4 w-4" />
            <span>Download Markdown</span>
          </button>
        </div>
      </div>

      {/* Meta & Privacy Reassurance */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>
            Generated locally in your browser. Never transmitted to any database or server.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview((p) => !p)}
          className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
        >
          {showPreview ? "Hide Markdown Preview" : "View Raw Markdown Preview"}
        </button>
      </div>

      {/* Optional Raw Markdown Preview */}
      {showPreview && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <pre className="max-h-72 overflow-y-auto text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
            {markdownContent}
          </pre>
        </div>
      )}

      {/* Concluding Product Principle Quote */}
      <div className="mt-6 border-t border-slate-800/80 pt-4 text-center sm:text-left">
        <p className="text-xs italic text-slate-400">
          &ldquo;BlindSpot AI does not make the decision for you. It holds up an epistemic mirror so you can commit with clarity.&rdquo;
        </p>
      </div>
    </div>
  );
}
