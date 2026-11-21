"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Users,
} from "lucide-react";

export interface AdminSummaryData {
  totalUsers: number;
  paidUsers: number;
  coursesPosted: number;
  activeTuitions: number;
  pendingApprovals: number;
  revenueLabel: string;
}

interface AdminOverviewStatsProps {
  initialStats?: AdminSummaryData;
}

// Pore fetch kore ane diben — apatoto dummy data
const DEFAULT_ADMIN_STATS: AdminSummaryData = {
  totalUsers: 1280,
  paidUsers: 245,
  coursesPosted: 86,
  activeTuitions: 64,
  pendingApprovals: 12,
  revenueLabel: "$4,820",
};

export default function AdminOverviewStats({
  initialStats = DEFAULT_ADMIN_STATS,
}: AdminOverviewStatsProps) {
  const [timeframe, setTimeframe] = useState<"all" | "month">("all");

  const stats =
    timeframe === "all"
      ? initialStats
      : {
          ...initialStats,
          totalUsers: 194,
          paidUsers: 58,
          coursesPosted: 21,
          activeTuitions: 18,
          pendingApprovals: 5,
          revenueLabel: "$1,140",
        };

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      sub: "Students & Teachers",
      icon: <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
      badge: "+12.4%",
    },
    {
      label: "Payments Made",
      value: stats.paidUsers.toLocaleString(),
      sub: `Revenue: ${stats.revenueLabel}`,
      icon: (
        <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      ),
      badge: "Stripe Live",
    },
    {
      label: "Courses Posted",
      value: stats.coursesPosted.toLocaleString(),
      sub: `${stats.activeTuitions} active listings`,
      icon: (
        <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
      ),
      badge: "Published",
    },
    {
      label: "Pending Review",
      value: stats.pendingApprovals.toLocaleString(),
      sub: "Needs admin check",
      icon: (
        <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      ),
      badge: "Action Needed",
    },
  ];

  return (
    <section className="rounded-3xl border border-cyan-500/25 bg-white/95 p-5 shadow-sm dark:border-cyan-400/25 dark:bg-slate-900/80 dark:shadow-[0_0_35px_rgba(6,182,212,0.1)] sm:p-7">
      {/* Main Heading Bar inside Client Overview */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-slate-800 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Platform Pulse</span>
          </div>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Users, Payments & Posted Courses Overview
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Sample snapshot ready to connect with your live backend API
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="inline-flex shrink-0 self-start rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-950 sm:self-center">
          <button
            type="button"
            onClick={() => setTimeframe("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              timeframe === "all"
                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-2xs dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            All Time
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("month")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              timeframe === "month"
                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-2xs dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Responsive 4-Card Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 transition-all hover:border-cyan-500/40 hover:bg-white dark:border-slate-800 dark:bg-slate-950/65 dark:hover:border-cyan-400/40 dark:hover:bg-slate-950"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                {item.icon}
              </div>
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300">
                {item.badge}
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}