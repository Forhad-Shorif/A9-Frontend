"use client";

import React, { useEffect, useState } from "react";
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
}

export default function BrowseTuitionsClient() {
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subject, setSubject] = useState<string>("all");
  const [classLevel, setClassLevel] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const controller = new AbortController();

    const fetchTuitions = async () => {
      try {
        setLoading(true);

        // মোট সংখ্যা দেখানোর জন্য অল ডেটা কল
        const allRes = await fetch(`${backendUrl}/Tuitions`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (allRes.ok) {
          const allData = await allRes.json();
          const allList = Array.isArray(allData)
            ? allData
            : allData?.tuitions || [];
          setTotalCount(allList.length);
        }

        // সার্চ ও ফিল্টার query দিয়ে ডেটা কল
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (subject !== "all") params.set("subject", subject);
        if (classLevel !== "all") params.set("classLevel", classLevel);
        if (mode !== "all") params.set("deliveryMode", mode);

        const qs = params.toString();
        const url = qs ? `${backendUrl}/Tuitions?${qs}` : `${backendUrl}/Tuitions`;

        const res = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data?.tuitions || [];
          setTuitions(list);
        }
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") {
          console.error("Failed to fetch tuitions:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTuitions();
    return () => controller.abort();
  }, [backendUrl, searchQuery, subject, classLevel, mode]);

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
              placeholder="Search tuitions by title, subject, level, or area..."
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
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="English">English</option>
              <option value="ICT">ICT</option>
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
              <option value="Class 6-8">Class 6-8</option>
              <option value="SSC / Class 9-10">SSC / Class 9-10</option>
              <option value="HSC">HSC</option>
              <option value="University">University</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-teal-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
            >
              <option value="all">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
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

      {/* Count */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {tuitions.length}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {totalCount}
        </span>{" "}
        tuitions
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
      ) : tuitions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-12 text-center dark:border-slate-800 dark:bg-slate-900/60">
          <BookOpen className="mx-auto h-9 w-9 text-teal-700 dark:text-cyan-400" />
          <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            No tuitions found
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Try another keyword or reset filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((item) => {
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
                    href={`/tuitions/${item._id}`}
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
  );
}