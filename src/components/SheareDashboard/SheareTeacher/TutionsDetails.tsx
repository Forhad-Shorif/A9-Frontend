"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  CalendarDays,
  Check,
  Clock,
  GraduationCap,
  Layers,
  MapPin,
  MessageSquareQuote,
  Share2,
  Star,
  UserCheck,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import TuitionApplyModal from "./TuitionApplyModal";

export interface TuitionDetailData {
  _id?: string;
  id?: string;
  title: string;
  subject: string;
  classLevel: string;
  deliveryMode: string;
  location: string;
  weeklyClasses: string;
  classDuration?: string;
  courseDuration?: string;
  applyDeadline?: string;
  availableSeats?: string;
  highlights?: string[];
  status?: string;
  monthlyFee: number | string;
  currency?: string;
  about?: string;
  bannerImage?: string;
  postedDate?: string;
  mentor?: {
    id?: string;
    name?: string;
    email?: string;
    verified?: boolean;
  };
  rating?: number;
  reviewCount?: number;
}

interface TutionsDetailsProps {
  tuition: TuitionDetailData;
}

export default function TutionsDetails({ tuition }: TutionsDetailsProps) {
  const [saved, setSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const mentorName = tuition.mentor?.name || "Verified Mentor";
  const mentorEmail = tuition.mentor?.email || "mentor@mentorlagbe.com";
  const ratingValue = Number(tuition.rating ?? 0).toFixed(1);
  const ratingNumber = Number(tuition.rating ?? 0);
  const filledStars = Math.max(0, Math.min(5, Math.round(ratingNumber)));
  const reviewCount = tuition.reviewCount ?? 0;

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast.success("Tuition link copied to clipboard");
      }
    } catch {
      showToast.error("Could not copy link");
    }
  };

  const handleBookmark = () => {
    setSaved((prev) => !prev);
    showToast.success(
      !saved ? "Saved to your tuition list" : "Removed from saved list"
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/browsetuitions"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Tuitions</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Share2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={handleBookmark}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${saved
              ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-800 dark:border-cyan-400/50 dark:bg-cyan-400/15 dark:text-cyan-200"
              : "border-slate-200/90 bg-white/90 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left Content (8 cols) + Right Sticky Summary (4 cols) */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-8">
          {/* Hero Visual Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 shadow-sm dark:border-slate-800">
            {tuition.bannerImage ? (
              <img
                src={tuition.bannerImage}
                alt={tuition.title}
                className="h-56 w-full object-cover opacity-80 sm:h-72"
              />
            ) : (
              <div className="flex h-56 w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.28),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.22),transparent_55%)] p-6 sm:h-72">
                <div className="text-center text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>{tuition.subject}</span>
                  </span>
                  <p className="mt-3 text-lg font-bold text-slate-100 sm:text-2xl">
                    {tuition.deliveryMode} Mentorship Batch
                  </p>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-xs">
                {tuition.deliveryMode}
              </span>
              {tuition.status && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-xs">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  <span>{tuition.status}</span>
                </span>
              )}
            </div>
          </div>

          {/* Title & Meta Strip */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300">
                {tuition.subject}
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {tuition.classLevel}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {tuition.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                <UserCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Mentor: {mentorName}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Schedule: {tuition.weeklyClasses}</span>
              </span>
              {tuition.postedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Posted: {tuition.postedDate}</span>
                </span>
              )}
            </div>
          </div>

          {/* About This Tuition */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75 sm:p-7">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              About This Tuition
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {tuition.about ||
                "Structured mentorship sessions focused on concept clarity, regular practice, and exam readiness."}
            </p>
          </div>

          {/* Tuition Highlights */}
          {tuition.highlights && tuition.highlights.length > 0 && (
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75 sm:p-7">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                What You&apos;ll Get
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {tuition.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Student Reviews & Feedback */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Student Reviews & Feedback
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verified feedback from enrolled learners
                </p>
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 px-3.5 py-2 dark:border-slate-800 dark:bg-slate-950/70">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {ratingValue}
                </span>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-3.5 w-3.5 ${n <= filledStars
                            ? "fill-current text-amber-400"
                            : "text-slate-300 dark:text-slate-600"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-8 text-center dark:border-slate-800 dark:bg-slate-950/50">
              <MessageSquareQuote className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                No reviews yet. Accepted students can share feedback after attending classes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Summary & Mentor Card */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:col-span-4">
          <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-white/95 shadow-lg dark:border-cyan-400/25 dark:bg-slate-900/85 dark:shadow-[0_0_35px_rgba(6,182,212,0.12)]">
            {/* Fee Header */}
            <div className="border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-transparent p-5 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                Monthly Tuition Fee
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {tuition.currency || "৳"} {tuition.monthlyFee}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  / month
                </span>
              </div>
            </div>

            {/* Key Specs List */}
            <div className="divide-y divide-slate-200/70 px-5 text-xs dark:divide-slate-800/80 sm:text-sm">
              <div className="flex items-center justify-between py-3">
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Subject</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {tuition.subject}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <GraduationCap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Class Level</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tuition.classLevel}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-500 dark:text-slate-400">
                  Delivery Mode
                </span>
                <span className="font-bold text-cyan-700 dark:text-cyan-300">
                  {tuition.deliveryMode}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Location</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tuition.location}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-500 dark:text-slate-400">
                  Weekly Classes
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {tuition.weeklyClasses}
                </span>
              </div>

              {tuition.classDuration && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    Class Duration
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tuition.classDuration}
                  </span>
                </div>
              )}

              {tuition.courseDuration && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    Course Duration
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tuition.courseDuration}
                  </span>
                </div>
              )}

              {tuition.availableSeats && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    Available Seats
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tuition.availableSeats}
                  </span>
                </div>
              )}

              {tuition.applyDeadline && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    Apply Before
                  </span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {tuition.applyDeadline}
                  </span>
                </div>
              )}

              {tuition.status && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {tuition.status}
                  </span>
                </div>
              )}
            </div>

            {/* Mentor Box & Apply CTA */}
            <div className="space-y-4 border-t border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-sm font-extrabold text-white dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950">
                  {mentorName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Tuition Mentor
                  </p>
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {mentorName}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {mentorEmail}
                  </p>
                </div>
              </div>

              {tuition.mentor?.email && (
                <Link
                  href={`/teacher/${encodeURIComponent(tuition.mentor.email)}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal-600/30 bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 transition hover:border-teal-600 hover:bg-teal-50 dark:border-cyan-400/30 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-400/10"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>View Teacher</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99] dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                Apply Now
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Separate Modal File */}
      <TuitionApplyModal
        open={applyOpen}
        onOpenChange={setApplyOpen}
        tuition={tuition}
      />
    </div>
  );
}