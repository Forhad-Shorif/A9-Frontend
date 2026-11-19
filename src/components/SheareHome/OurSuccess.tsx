"use client";

import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  Clock01Icon,
  EarthIcon,
  Location01Icon,
  Mortarboard01Icon,
  StarIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";

// ------------------------------------------------------------------
// Success story: MentorLagbe e teacher-ra tuition post kore, student-ra
// apply kore. Tai success o dui dhoroner — ONLINE ar OFFLINE.
//
// Image role:
//  - /Online.png  → transparent cutout, tai gradient background er upor bose
//  - /Offline.png → classroom photo, tai card er upor cover kore bose
// ------------------------------------------------------------------
const stories = [
  {
    mode: "Online",
    icon: EarthIcon,
    image: "/Online.png",
    alt: "A student learning online with a tutor",
    title: "Classes from anywhere",
    student: "Nusrat J. · HSC · Dhaka",
    quote:
      "Found a Math tutor in just 3 days. Every class was online, right at my desk.",
    stats: [
      { value: "1,200+", label: "online tuitions matched" },
      { value: "4.9/5", label: "average tutor rating" },
    ],
    cta: "Browse online tuitions",
    href: "/tuitions?mode=online",
    badgeClass: "bg-teal-600 text-white dark:bg-teal-400 dark:text-[#04121a]",
    frameClass:
      "bg-gradient-to-br from-teal-100 via-cyan-50 to-white dark:from-teal-400/15 dark:via-cyan-400/10 dark:to-transparent",
    imageClass: "object-contain object-bottom p-2",
    shadeClass:
      "bg-gradient-to-t from-white via-white/45 to-transparent dark:from-[#0b1620] dark:via-[#0b1620]/40",
    chipClass: "bg-white/80 text-teal-800 dark:bg-white/10 dark:text-teal-100",
    titleClass: "text-neutral-900 dark:text-white",
  },
  {
    mode: "Offline",
    icon: Location01Icon,
    image: "/Offline.png",
    alt: "Teacher taking a class in a classroom",
    title: "Learning face to face",
    student: "Rafi A. · Class 10 · Chattogram",
    quote:
      "A home tutor came twice a week. My grades moved from C to A in one term.",
    stats: [
      { value: "1,300+", label: "home tuitions matched" },
      { value: "64", label: "areas covered" },
    ],
    cta: "Browse offline tuitions",
    href: "/tuitions?mode=offline",
    badgeClass: "bg-teal-600 text-white dark:bg-teal-400 dark:text-[#04121a]",
    frameClass: "bg-neutral-900",
    imageClass: "object-cover",
    shadeClass: "bg-gradient-to-t from-black/80 via-black/25 to-transparent",
    chipClass: "bg-white/15 text-white",
    titleClass: "text-white",
  },
];

const overallStats = [
  { icon: Mortarboard01Icon, value: "2,500+", label: "Live tuitions" },
  { icon: UserMultipleIcon, value: "48,000+", label: "Students joined" },
  { icon: Clock01Icon, value: "20+ hrs", label: "Weekly learning" },
  { icon: StarIcon, value: "4.9/5", label: "Average rating" },
];

const OurSuccessStats = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white py-16 sm:py-20 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]">
      {/* ---------- Background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.16),transparent_55%)]" />
        <div className="absolute -left-24 top-24 size-80 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_100%] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* ---------- Heading ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/85 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-teal-700 uppercase shadow-sm backdrop-blur dark:border-teal-400/25 dark:bg-white/5 dark:text-teal-300">
            <span className="size-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)] dark:bg-teal-400 dark:shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
            Our success story
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
            Two ways to learn.{" "}
            <span className="relative inline-block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:to-cyan-300">
              One goal
              <svg
                aria-hidden
                viewBox="0 0 160 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-teal-400/70 dark:text-teal-300/60"
              >
                <path
                  d="M4 8C40 3.5 100 3 156 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            Tutors post tuitions, students apply — some join from home, some
            learn in a classroom nearby. Either way, the result is the same.
          </p>
        </div>

        {/* ---------- Online / Offline cards ---------- */}
        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          {stories.map((story) => (
            <article
              key={story.mode}
              className="group overflow-hidden rounded-[28px] border border-teal-100 bg-white shadow-[0_26px_55px_-40px_rgba(13,148,136,0.7)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
            >
              {/* image + overlay */}
              <div
                className={`relative h-56 overflow-hidden sm:h-64 ${story.frameClass}`}
              >
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className={`${story.imageClass} transition-transform duration-700 group-hover:scale-[1.04]`}
                />

                {/* text readable rakhar jonno soft shade */}
                <div className={`absolute inset-0 ${story.shadeClass}`} />

                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-sm backdrop-blur ${story.badgeClass}`}
                >
                  <HugeiconsIcon
                    icon={story.icon}
                    size={14}
                    strokeWidth={2}
                  />
                  {story.mode.toUpperCase()}
                </span>

                <div className="absolute inset-x-4 bottom-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur ${story.chipClass}`}
                  >
                    <HugeiconsIcon
                      icon={CheckmarkBadge01Icon}
                      size={13}
                      strokeWidth={2}
                    />
                    Success story
                  </span>
                  <p
                    className={`mt-2 text-base font-bold sm:text-lg ${story.titleClass}`}
                  >
                    {story.title}
                  </p>
                </div>
              </div>

              {/* text + numbers */}
              <div className="p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {story.student}
                </p>

                <div className="mt-5 grid grid-cols-2 divide-x divide-teal-100 overflow-hidden rounded-2xl border border-teal-100 bg-teal-50/50 py-3 text-center dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
                  {story.stats.map((stat) => (
                    <div key={stat.label} className="px-2">
                      <p className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={story.href}
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
                >
                  {story.cta}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- Overall numbers ---------- */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-teal-100 bg-teal-100 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10">
          {overallStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 bg-white px-5 py-4 dark:bg-[#070f16]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300">
                <HugeiconsIcon icon={stat.icon} size={19} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="block text-[11px] text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSuccessStats;
