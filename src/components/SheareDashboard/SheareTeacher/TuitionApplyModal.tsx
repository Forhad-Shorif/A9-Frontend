"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Clock,
  LogIn,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  Sunset,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClientUser from "@/lib/ClientUser";
import { showToast } from "@/lib/utils/toast";
import type { TuitionDetailData } from "./TutionsDetails";

interface TuitionApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tuition: TuitionDetailData;
}

type SessionSlot = "Morning" | "Afternoon" | "Night";

const SESSION_OPTIONS: {
  label: SessionSlot;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    label: "Morning",
    hint: "6 AM – 12 PM",
    icon: <Sun className="h-4 w-4 text-amber-500" />,
  },
  {
    label: "Afternoon",
    hint: "12 PM – 6 PM",
    icon: <Sunset className="h-4 w-4 text-orange-500" />,
  },
  {
    label: "Night",
    hint: "6 PM – 11 PM",
    icon: <Moon className="h-4 w-4 text-cyan-500" />,
  },
];

export default function TuitionApplyModal({
  open,
  onOpenChange,
  tuition,
}: TuitionApplyModalProps) {
  const user = ClientUser();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [sessionTime, setSessionTime] = useState<SessionSlot>("Morning");
  const [submitting, setSubmitting] = useState(false);

  const tuitionId = tuition._id || tuition.id || "";
  const mentorName = tuition.mentor?.name || "Verified Mentor";
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      showToast.error("Please sign in to apply for this tuition");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const studentName = String(
        formData.get("studentName") || user?.name || ""
      ).trim();
      const phone = String(formData.get("phone") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!studentName) {
        showToast.error("Please enter your name");
        return;
      }

      const payload = {
        tuitionId,
        tuitionTitle: tuition.title,
        subject: tuition.subject,
        classLevel: tuition.classLevel,
        monthlyFee: tuition.monthlyFee,
        teacherId: tuition.mentor?.id || "",
        teacherEmail: tuition.mentor?.email || "",
        mentorName,
        studentName,
        studentEmail: user.email,
        studentId: user.id || "",
        phone,
        sessionTime,
        message,
      };

      const res = await fetch(`${backendUrl}/ApplyPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Backend error dile response JSON na-o hote pare
      let data: { message?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        showToast.error(data?.message || "Failed to submit application");
        return;
      }

      showToast.success("Application sent to mentor successfully!");
      formRef.current?.reset();
      setSessionTime("Morning");
      onOpenChange(false);
    } catch (error) {
      console.error("Apply error:", error);
      showToast.error("Could not send application right now");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-800 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-white/95 p-0 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-cyan-400/25 dark:bg-slate-900/95 dark:text-slate-100 sm:max-w-lg">
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-transparent px-5 py-5 dark:border-slate-800 sm:px-6">
          <DialogHeader className="text-left">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3 py-0.5 text-[11px] font-bold text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/15 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" />
              <span>Apply for Tuition</span>
            </div>
            <DialogTitle className="mt-2 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              {tuition.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 dark:text-slate-400">
              Mentor:{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {mentorName}
              </strong>
              {tuition.subject ? ` • ${tuition.subject}` : ""}
            </DialogDescription>
          </DialogHeader>
        </div>

        {!user && (
          <div className="border-b border-amber-500/30 bg-amber-500/10 px-5 py-3 dark:border-amber-400/30 dark:bg-amber-400/10 sm:px-6">
            <Link
              href={`/sign-in?callbackUrl=${encodeURIComponent(
                `/view/${tuitionId}`
              )}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 underline underline-offset-2 dark:text-amber-300"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign in as a student to send this application</span>
            </Link>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleApplySubmit}
          className="space-y-4 px-5 py-5 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <User className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                name="studentName"
                required
                defaultValue={user?.name || ""}
                placeholder="Enter your name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Phone className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Preferred Session Time</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {SESSION_OPTIONS.map((slot) => {
                const active = sessionTime === slot.label;
                return (
                  <button
                    key={slot.label}
                    type="button"
                    onClick={() => setSessionTime(slot.label)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                      active
                        ? "border-cyan-500 bg-cyan-500/15 text-slate-900 ring-2 ring-cyan-500/30 dark:border-cyan-400 dark:bg-cyan-400/15 dark:text-white dark:ring-cyan-400/30"
                        : "border-slate-200 bg-slate-50/70 text-slate-600 hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                    }`}
                  >
                    <div className="mb-1">{slot.icon}</div>
                    <span className="text-xs font-bold">{slot.label}</span>
                    <span className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      {slot.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Learning Note (Optional)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Any specific topic, exam goal, or schedule note..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <DialogFooter className="gap-2 pt-2 sm:gap-2.5">
            <DialogClose className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </DialogClose>

            <button
              type="submit"
              disabled={submitting || !user}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 dark:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submitting ? "Sending..." : "Submit Application"}</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}