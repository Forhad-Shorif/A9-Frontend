"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Camera,
  GraduationCap,
  MapPin,
  Share2,
  Sparkles,
  User,
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
import ClientUser from "@/lib/ClientUser";
import { showToast } from "@/lib/utils/toast";
import {
  createUserProfile,
  UserProfileFormData,
} from "@/components/SheareForm/ProfileForm/ActionProfile";

export default function AddLeftProfileDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const uploadToImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    if (!data?.success || !data?.data?.display_url) {
      throw new Error("Failed to upload image to ImgBB");
    }

    return String(data.data.display_url);
  };

  const user = ClientUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      let finalPhotoURL = "";
      if (imageFile) {
        finalPhotoURL = await uploadToImgBB(imageFile);
      }

      const educations = [
        String(formData.get("edu1") || "").trim(),
        String(formData.get("edu2") || "").trim(),
        String(formData.get("edu3") || "").trim(),
        String(formData.get("edu4") || "").trim(),
        String(formData.get("edu5") || "").trim(),
      ].filter(Boolean);

      const profileData: UserProfileFormData = {
        name: String(formData.get("name") || "").trim(),
        tag: String(formData.get("tag") || "").trim(),
        dateOfBirth: String(formData.get("dateOfBirth") || "").trim(),
        location: String(formData.get("location") || "").trim(),
        photoURL: finalPhotoURL,
        facebook: String(formData.get("facebook") || "").trim(),
        contact: String(formData.get("contact") || "").trim(),
        educations,
        email: user?.email ?? undefined,
        Id: user?.id ?? undefined,
      };

      const created = await createUserProfile(profileData);

      if (!created) {
        showToast.error("Failed to save profile");
        return;
      }

      showToast.success("Profile added successfully");
      router.refresh();
      setImageFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Submit error:", error);
      showToast.error("Failed to save profile");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-2xs outline-none transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-800/90 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-900 dark:focus:ring-cyan-400/15";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="group inline-flex items-center gap-2 rounded-xl border border-cyan-500/35 bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/60 hover:bg-cyan-500/20 hover:shadow-md dark:border-cyan-400/30 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:via-sky-500/10 dark:to-cyan-400/20 dark:text-cyan-200 dark:shadow-[0_0_20px_rgba(34,211,238,0.12)] dark:hover:border-cyan-400/70 dark:hover:text-white dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]">
        <Sparkles className="h-4 w-4 text-cyan-600 transition-transform duration-200 group-hover:scale-110 dark:text-cyan-400" />
        <span>Add User Info</span>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white/95 p-0 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-cyan-500/25 dark:bg-slate-950/95 dark:text-slate-100 dark:shadow-[0_0_50px_rgba(6,182,212,0.18)] sm:max-w-xl">
        {/* Top Accent Header */}
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-transparent px-4 py-5 dark:border-slate-800/90 dark:from-cyan-500/15 dark:via-sky-500/5 dark:to-transparent sm:px-6">
          <DialogHeader className="text-left">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" />
              <span>Profile & Qualifications</span>
            </div>
            <DialogTitle className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Add Profile Info
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Add your basic details, date of birth, address, and education qualifications.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-4 py-5 sm:px-6">
          <p className="rounded-xl border border-amber-300/70 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200">
            Fill out the form below and click Add Info to save your profile details.
          </p>

          {/* Identity, DOB & Address */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <User className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Identity & Basic Info</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Full name (e.g. Tariqul Hasan)"
                className={inputClass}
              />
              <input
                type="text"
                name="tag"
                placeholder="Short tag (e.g. Teacher / Student)"
                className={inputClass}
              />

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                  <span>Location / Address</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Area or Address"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Profile Photo File */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Camera className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Profile Photo (File)</span>
              </p>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Uploads to ImgBB
              </span>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50/90 px-3.5 py-2 text-xs text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cyan-700 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:file:bg-cyan-400/15 dark:file:text-cyan-300 dark:hover:border-cyan-400"
            />
          </div>

          {/* Social & Contact */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Share2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Social & Contact</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="facebook"
                placeholder="Facebook handle or URL"
                className={inputClass}
              />
              <input
                type="text"
                name="contact"
                placeholder="Email or phone contact"
                className={inputClass}
              />
            </div>
          </div>

          {/* Education & Qualifications (5 Optional Fields) */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <GraduationCap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Education & Qualifications</span>
              </p>
              <span className="rounded-md bg-slate-200/70 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Optional (1–5)
              </span>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                name="edu1"
                placeholder="1. Masters / Post-Grad (e.g. M.Sc. in Applied Math - DU)"
                className={inputClass}
              />
              <input
                type="text"
                name="edu2"
                placeholder="2. Graduation / Honours (e.g. B.Sc. in Physics - BUET)"
                className={inputClass}
              />
              <input
                type="text"
                name="edu3"
                placeholder="3. HSC / College (e.g. HSC in Science)"
                className={inputClass}
              />
              <input
                type="text"
                name="edu4"
                placeholder="4. SSC / School (e.g. SSC in Science)"
                className={inputClass}
              />
              <input
                type="text"
                name="edu5"
                placeholder="5. Extra degree / course / certification (optional)"
                className={inputClass}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-1 sm:gap-3">
            <DialogClose className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            >
              <span>{submitting ? "Saving..." : "Add Info"}</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}