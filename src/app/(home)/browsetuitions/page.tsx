import React from "react";
import { Sparkles } from "lucide-react";
import BrowseTuitionsClient from "@/components/SheareHome/BrowseTuitionsClient";

interface BrowseTuitionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function BrowseTuitionsPage({
  searchParams,
}: BrowseTuitionsPageProps) {
  const params = await searchParams;
  const initialSearch =
    firstValue(params.q) || firstValue(params.search) || "";
  const initialMode = firstValue(params.mode) || "";

  return (
    <div className="mx-auto max-w-6xl space-y-7 px-4 py-8 text-slate-900 dark:text-slate-100">
      {/* Server Side Heading */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-600/20 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 p-6 text-center dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-slate-900 dark:to-teal-500/10 sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/85 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Tuition Marketplace</span>
        </span>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Browse All Tuitions
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Explore vetted tuition posts and mentorship batches. Search and filter by subject, class level, or mode.
        </p>
      </div>

      {/* Client Side Fetch + Search + Filter */}
      <BrowseTuitionsClient
        initialSearch={initialSearch}
        initialMode={initialMode}
      />
    </div>
  );
}