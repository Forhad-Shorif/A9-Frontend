import React from "react";
import Profile from "@/components/SheareForm/Profile-Form";
import Image from "next/image";
import LeftProfileDialog from "@/components/SheareForm/Parsonal-Form";
import ServerUser from "@/lib/ServerUser";
import TeacherProfileDialog from "@/components/SheareForm/Teacher-Form";

const ProfilePage = async () => {

  const users = await ServerUser();

  const user = {
    name: "Forhad Shorif",
    location: "Dhaka, Bangladesh",
    bio: "Full-stack web developer building modern, fast, and responsive web applications.",
    photoURL: "https://placehold.co/160x160/0f172a/22d3ee?text=FS",
    coverPhoto: "",
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Top Header with Update Profile on One Side */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              My Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your personal info and appearance
            </p>
          </div>
          {users?.role === "teachers" ? (<TeacherProfileDialog />) : ("")}
          <LeftProfileDialog />
          <Profile />
        </div>

        {/* Main Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
          {/* Cover Photo */}
          <div className="relative h-44 w-full overflow-hidden bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-slate-200 dark:from-cyan-500/20 dark:via-slate-900 dark:to-slate-950 md:h-56">
            {user.coverPhoto && (
              <Image
                src={user.coverPhoto}
                alt={`${user.name || "User"} cover photo`}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-7">
            <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-end">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-900 shadow-lg ring-2 ring-cyan-500/30 dark:border-slate-900">
                  <Image
                    src={
                      user.photoURL ||
                      "https://placehold.co/160x160/0f172a/22d3ee?text=Avatar"
                    }
                    alt={user.name || "User profile photo"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {user.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;