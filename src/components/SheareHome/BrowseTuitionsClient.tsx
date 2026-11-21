"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search,
} from "lucide-react";

interface TuitionItem {
  _id: string;
  title: string;
  subject?: string;
  classLevel?: string;
  deliveryMode?: string;
  location?: string;
  monthlyFee?: number;
  weeklyClasses?: string;
  coverImageURL?: string;
  logoImageURL?: string;
  name?: string;
  status?: string;
}

const normalize = (value?: string) => (value || "").trim().toLowerCase();

// "online" / "ONLINE" → "Online" (URL query theke asha value er jonno)
const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value;

const uniqueSorted = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );

export default function BrowseTuitionsClient({
  initialSearch = "",
  initialMode = "",
}: {
  initialSearch?: string;
  initialMode?: string;
}) {
  const [allTuitions, setAllTuitions] = useState<TuitionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [subject, setSubject] = useState<string>("all");
  const [classLevel, setClassLevel] = useState<string>("all");
  const [mode, setMode] = useState<string>(initialMode ? capitalize(initialMode) : "all");

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Shudhu active tuition gulo public list e ashe (closed gulo dashboard e thake)
  useEffect(() => {
    const controller = new AbortController();

    const fetchTuitions = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${backendUrl}/Tuitions?status=active`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.tuitions || [];
        setAllTuitions(list);
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          console.error("Failed to fetch tuitions:", err);
          setError("Could not load tuitions right now. Please try again.");
          setAllTuitions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTuitions();
    return () => controller.abort();
  }, [backendUrl]);

  // Filter options asol data theke toiri hoy, tai option ar data kokhono mile na hoy na
  const subjectOptions = useMemo(
    () => uniqueSorted(allTuitions.map((item) => (item.subject || "").trim())),
    [allTuitions]
  );

  const classLevelOptions = useMemo(
    () =>
      uniqueSorted(allTuitions.map((item) => (item.classLevel || "").trim())),
    [allTuitions]
  );

  const modeOptions = useMemo(
    () =>
      uniqueSorted(
        allTuitions.map((item) => (item.deliveryMode || "").trim())
      ),
    [allTuitions]
  );

  // URL theke asha filter jodi data te na thake, ta hole "all" dhori (state na change kore)
  const activeMode =
    mode === "all" ||
    modeOptions.length === 0 ||
    modeOptions.some((option) => normalize(option) === normalize(mode))
      ? mode
      : "all";

  const filteredTuitions = useMemo(() => {
    const keyword = normalize(searchQuery);

    return allTuitions.filter((item) => {
      if (subject !== "all" && normalize(item.subject) !== normalize(subject)) {
        return false;
      }

      if (
        classLevel !== "all" &&
        normalize(item.classLevel) !== normalize(classLevel)
      ) {
        return false;
      }

      if (
        activeMode !== "all" &&
        normalize(item.deliveryMode) !== normalize(activeMode)
      ) {
        return false;
      }

      if (!keyword) return true;

      return [
        item.title,
        item.subject,
        item.classLevel,
        item.location,
        item.name,
      ].some((value) => normalize(value).includes(keyword));
    });
  }, [allTuitions, searchQuery, subject, classLevel, activeMode]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchQuery("");
    setSubject("all");
    setClassLevel("all");
    setMode("all");

    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Box */}
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xs dark:border-slate-800/90 dark:bg-slate-900/80 dark:shadow-[0_0_30px_rgba(6,182,212,0.06)] sm:p-5">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") setSearchQuery("");
              }}
              placeholder="Search tuitions by title, subject, level, area or tutor..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </form>

        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-teal-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
            >
              <option value="all">All Subjects</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Class Level
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-teal-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
            >
              <option value="all">All Levels</option>
              {classLevelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mode
            </label>
            <select
              value={activeMode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-teal-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
            >
              <option value="all">All Modes</option>
              {modeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results: height ektu reserve kora hoy, jate filter e kom result ashleo page choto hoye na */}
      <div className="flex min-h-[62vh] flex-col gap-4">
        {/* Count */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {filteredTuitions.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {allTuitions.length}
          </span>{" "}
          active tuitions
        </p>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex min-h-[340px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-rose-300 bg-white/90 p-10 text-center dark:border-rose-400/30 dark:bg-slate-900/60">
            <BookOpen className="h-9 w-9 text-rose-500 dark:text-rose-400" />
            <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              Could not load tuitions
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {error}
            </p>
          </div>
        ) : filteredTuitions.length === 0 ? (
          <div className="flex min-h-[340px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center dark:border-slate-800 dark:bg-slate-900/60">
            <BookOpen className="h-9 w-9 text-teal-700 dark:text-cyan-400" />
            <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              No tuitions found
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try another keyword or reset filters.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTuitions.map((item) => {
              const coverSrc = item.coverImageURL || item.logoImageURL;

            return (
              <div
                key={item._id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-teal-600/40 hover:shadow-md dark:border-slate-800/90 dark:bg-slate-900/80 dark:hover:border-cyan-400/45 dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    {coverSrc ? (
                      <img
                        src={coverSrc}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-emerald-500/15 text-teal-800 dark:text-cyan-300">
                        <BookOpen className="h-9 w-9" />
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/75 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs">
                      {item.deliveryMode || "Online"}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-teal-600/10 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                        {item.subject || "General"}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.classLevel || "All Levels"}
                      </span>
                    </div>

                    <h2 className="mt-2.5 line-clamp-1 text-base font-bold text-slate-900 group-hover:text-teal-800 dark:text-white dark:group-hover:text-cyan-300">
                      {item.title}
                    </h2>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-cyan-400" />
                        <span className="truncate">
                          {item.location || "Online / Nationwide"}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-cyan-400" />
                        <span>{item.classLevel || "All Levels"}</span>
                      </p>
                      {item.weeklyClasses && (
                        <p className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-cyan-400" />
                          <span>{item.weeklyClasses}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/70 bg-slate-50/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                  <div>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      ৳{Number(item.monthlyFee || 0).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400"> / mo</span>
                  </div>

                  <Link
                    href={`/view/${item._id}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
