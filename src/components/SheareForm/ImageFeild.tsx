"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, Loader2 } from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import { authClient } from "@/lib/auth-client";
import ClientUser from "@/lib/ClientUser";

const isValidImageUrl = (url?: string | null): url is string => {
  if (!url) return false;
  return url.startsWith("https://") || url.startsWith("http://");
};

export default function ProfileMediaSection() {
  const router = useRouter();
  const user = ClientUser() as
    | {
        name?: string | null;
        image?: string | null;
        coverImage?: string | null;
      }
    | null;

  const [loading, setLoading] = useState<"avatar" | "cover" | null>(null);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const [localCover, setLocalCover] = useState<string | null>(null);

  const activeAvatar = isValidImageUrl(localAvatar)
    ? localAvatar
    : isValidImageUrl(user?.image)
    ? user.image
    : null;

  const activeCover = isValidImageUrl(localCover)
    ? localCover
    : isValidImageUrl(user?.coverImage)
    ? user.coverImage
    : null;

  const uploadImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const displayUrl = data?.data?.display_url || data?.data?.url;

    if (!data?.success || !displayUrl) {
      throw new Error("ImgBB upload failed");
    }

    return String(displayUrl);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(type);
      const url = await uploadImgBB(file);

      if (type === "avatar") {
        const { error } = await authClient.updateUser({ image: url });
        if (error) throw new Error(error.message);

        setLocalAvatar(url);
        showToast.success("Profile photo updated");
      } else {
        const { error } = await authClient.updateUser({
          coverImage: url,
        } as Parameters<typeof authClient.updateUser>[0]);
        if (error) throw new Error(error.message);

        setLocalCover(url);
        showToast.success("Cover photo updated");
      }

      await authClient.getSession();
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast.error("Upload failed");
    } finally {
      setLoading(null);
      e.target.value = "";
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Cover */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-slate-200 dark:from-cyan-500/20 dark:to-slate-950 md:h-56">
        {activeCover && (
          <img
            src={activeCover}
            alt="Cover"
            className="h-full w-full object-cover object-center"
          />
        )}

        <label className="absolute bottom-3 right-3 inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-slate-950">
          {loading === "cover" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ImagePlus className="h-3.5 w-3.5 text-cyan-400" />
          )}
          <span>Add Cover</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
            className="hidden"
          />
        </label>
      </div>

      {/* Avatar & Name */}
      <div className="px-6 pb-6">
        <div className="-mt-12 flex items-end gap-4">
          <div className="relative h-24 w-24 shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-slate-900 dark:border-slate-900">
              {activeAvatar && (
                <img
                  src={activeAvatar}
                  alt={user?.name || "User"}
                  className="h-full w-full object-cover object-center"
                />
              )}
              {loading === "avatar" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                </div>
              )}
            </div>

            <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-cyan-500 text-slate-950 hover:bg-cyan-400 dark:border-slate-900">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "avatar")}
                className="hidden"
              />
            </label>
          </div>

          <h2 className="pb-1 text-xl font-bold text-slate-900 dark:text-white">
            {user?.name}
          </h2>
        </div>
      </div>
    </section>
  );
}