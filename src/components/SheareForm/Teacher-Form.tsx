"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  FileText,
  MapPin,
  Sparkles,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  createTeacherProfile,
  updateTeacherProfile,
  TeacherProfileItem,
} from "./ActionProfile";
import { showToast } from "@/lib/utils/toast";

// mode "add" hole teacher profile create (POST), "edit" hole update (PATCH) hobe.
interface TeacherProfileDialogProps {
  mode: "add" | "edit";
  initialData?: TeacherProfileItem | null;
}

const TeacherProfileDialog = ({
  mode,
  initialData,
}: TeacherProfileDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const User = authClient.useSession()
  const user = User.data?.user



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const skills = String(formData.get("skillsAndSubjects") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const TeacherForm = {
      headline: String(formData.get("headline") || "").trim(),
      teachingMode: String(formData.get("teachingMode") || "").trim(),
      dateOfBirth: String(formData.get("dateOfBirth") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      aboutMe: String(formData.get("aboutMe") || "").trim(),
      yearsExperience: String(formData.get("yearsExperience") || "").trim(),
      skillsAndSubjects: skills,
      email: user?.email as string,
      Id: user?.id as string,
    };

    // Data already ache kina dekhe POST (add) ba PATCH (edit) call kori.
    const saved =
      mode === "edit" && initialData?._id
        ? await updateTeacherProfile(initialData._id, TeacherForm)
        : await createTeacherProfile(TeacherForm);

    if (!saved) {
      showToast.error("Failed to save teacher profile");
      return;
    }

    showToast.success(
      mode === "edit"
        ? "Teacher profile updated successfully"
        : "Teacher profile added successfully"
    );

    // Server page abar data fetch kore, tai notun data sathe sathe dekha jabe.
    router.refresh();
    setOpen(false);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-2xs outline-none transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-800/90 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-900 dark:focus:ring-cyan-400/15";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="group inline-flex items-center gap-2 rounded-xl border border-cyan-500/35 bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/60 hover:bg-cyan-500/20 hover:shadow-md dark:border-cyan-400/30 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:via-sky-500/10 dark:to-cyan-400/20 dark:text-cyan-200 dark:shadow-[0_0_20px_rgba(34,211,238,0.12)] dark:hover:border-cyan-400/70 dark:hover:text-white dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]">
        <Sparkles className="h-4 w-4 text-cyan-600 transition-transform duration-200 group-hover:scale-110 dark:text-cyan-400" />
        <span>
          {mode === "edit" ? "Edit Teacher Info" : "Add Teacher Info"}
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white/95 p-0 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-cyan-500/25 dark:bg-slate-950/95 dark:text-slate-100 dark:shadow-[0_0_50px_rgba(6,182,212,0.18)] sm:max-w-xl">
        {/* Top Accent Header */}
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-transparent px-4 py-5 dark:border-slate-800/90 dark:from-cyan-500/15 dark:via-sky-500/5 dark:to-transparent sm:px-6">
          <DialogHeader className="text-left">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" />
              <span>Profile Details</span>
            </div>
            <DialogTitle className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {mode === "edit"
                ? "Overview, Experience & Skills"
                : "Add Overview, Experience & Skills"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Update your mentor title, teaching info, experience years, and subjects.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-4 py-5 sm:px-6">
          {/* Data na thakle form er uporei bole dey */}
          {mode === "add" && (
            <p className="rounded-xl border border-amber-300/70 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200">
              No teacher info added yet. Fill out the form below and click Add
              Teacher Info.
            </p>
          )}

          {/* Headline & Teaching Mode */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Video className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Title & Teaching Mode</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="headline"
                defaultValue={initialData?.headline || ""}
                placeholder="e.g. Senior Mathematics & Physics Mentor"
                className={inputClass}
              />
              <input
                type="text"
                name="teachingMode"
                defaultValue={initialData?.teachingMode || ""}
                placeholder="e.g. Online & Offline Teaching Mode"
                className={inputClass}
              />
            </div>
          </div>

          {/* Birth Date & Location */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Birth Date & Location</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={initialData?.dateOfBirth || ""}
                  className={inputClass}
                />
              </div>
              
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="location"
                  defaultValue={initialData?.location || ""}
                  placeholder="Location (Current Location)"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <FileText className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>About Me</span>
            </p>
            <textarea
              name="aboutMe"
              rows={3}
              defaultValue={initialData?.aboutMe || ""}
              placeholder="Write a short bio about your teaching approach..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Experience (Years Only) & Skills / Subjects */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Award className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Experience & Skills / Subjects</span>
            </p>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="yearsExperience"
                  defaultValue={initialData?.yearsExperience || ""}
                  placeholder="e.g. 8+ (or 8)"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <BookOpen className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Skills & Subjects (comma separated)</span>
                </label>
                <input
                  type="text"
                  name="skillsAndSubjects"
                  defaultValue={initialData?.skillsAndSubjects?.join(", ") || ""}
                  placeholder="e.g. Calculus, Quantum Physics, HSC Math, ICT, Exam Prep"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-1 sm:gap-3">
            <DialogClose className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-105 active:scale-[0.99] dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            >
              <MapPin className="hidden h-4 w-4" />
              <span>
                {mode === "edit" ? "Save Changes" : "Add Info"}
              </span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TeacherProfileDialog;