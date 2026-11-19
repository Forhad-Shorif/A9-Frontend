"use client";

import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { showToast } from "@/lib/utils/toast";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadToImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    }

    const imgbbData = new FormData();
    imgbbData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbData,
    });

    const data = await res.json();
    if (!data?.success || !data?.data?.display_url) {
      throw new Error("ImgBB image upload failed");
    }

    return String(data.data.display_url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData(e.currentTarget);

      let finalPhotoURL = String(formData.get("photoURL") || "").trim();
      let finalCoverPhoto = String(formData.get("coverPhoto") || "").trim();

      if (photoFile) {
        finalPhotoURL = await uploadToImgBB(photoFile);
      }

      if (coverFile) {
        finalCoverPhoto = await uploadToImgBB(coverFile);
      }

      const updatedProfile = {
        name: String(formData.get("name") || "").trim(),
        photoURL: finalPhotoURL,
        coverPhoto: finalCoverPhoto,
      };

      console.log(updatedProfile);

      setPhotoFile(null);
      setCoverFile(null);
      setOpen(false);
    } catch (error) {
      showToast.error("file upload error")
    } finally {
      setUploading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400";

  const fileInputClass =
    "w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cyan-700 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:file:bg-cyan-400/15 dark:file:text-cyan-300 dark:hover:border-cyan-400";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-700 shadow-sm transition hover:border-cyan-500/50 hover:bg-cyan-500/20 dark:border-cyan-400/30 dark:bg-cyan-500/15 dark:text-cyan-200 dark:hover:bg-cyan-500/25 dark:hover:text-white">
        <Edit3 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        <span>Update Profile</span>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl dark:border-cyan-500/25 dark:bg-slate-950 dark:text-slate-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className={inputClass}
          />

          {/* Profile Photo: URL or File */}
          <div className="space-y-2 rounded-xl border border-slate-200/80 p-3 dark:border-slate-800/80">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Profile Photo (URL or File)
            </p>
            <input
              type="url"
              name="photoURL"
              placeholder="Profile photo URL"
              className={inputClass}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>

          {/* Cover Photo: URL or File */}
          <div className="space-y-2 rounded-xl border border-slate-200/80 p-3 dark:border-slate-800/80">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Cover Photo (URL or File)
            </p>
            <input
              type="url"
              name="coverPhoto"
              placeholder="Cover photo URL"
              className={inputClass}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <DialogClose className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={uploading}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60 dark:bg-cyan-400 dark:hover:bg-cyan-300"
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}