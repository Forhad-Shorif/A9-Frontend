import React from "react";
import Profile from "@/components/SheareForm/Profile-Form";
import LeftProfileDialog from "@/components/SheareForm/Parsonal-Form";
import TeacherProfileDialog from "@/components/SheareForm/Teacher-Form";
import ServerUser from "@/lib/ServerUser";
import ProfileMediaSection from "@/components/SheareForm/ImageFeild";
import UserProfileCard from "@/components/SheareForm/UserProfile";
import TeacherProfileCard from "@/components/SheareForm/TeacherProfile";
import {
  getTeacherProfile,
  getUserProfile,
} from "@/components/SheareForm/ActionProfile";
import { getRole } from "@/lib/roles";

const ProfilePage = async () => {
  const user = await ServerUser();

  // Login na thakle profile dekhano jabe na.
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please sign in to view your profile.
        </div>
      </main>
    );
  }

  const role = getRole(user.role);
  const email = user.email || "";

  // Backend theke login kora user er profile data ana hoy.
  // Admin er jonno ei profile info section cholbe na (shudhu student + teacher).
  const userProfile = role !== "admin" ? await getUserProfile(email) : null;
  const teacherProfile =
    role === "teachers" ? await getTeacherProfile(email) : null;

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Top Header with Update Profile on One Side */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              My Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your personal info and appearance
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {/* Teacher er jonno shudhu Teacher Info button */}
            {role === "teachers" && (
              <TeacherProfileDialog
                mode={teacherProfile ? "edit" : "add"}
                initialData={teacherProfile}
              />
            )}
            {/* Student ar Teacher duijoner jonno personal info button */}
            {role !== "admin" && (
              <LeftProfileDialog
                mode={userProfile ? "edit" : "add"}
                initialData={userProfile}
              />
            )}
            <Profile />
          </div>
        </div>

        {/* Main Profile Card */}
        <ProfileMediaSection />

        {/* Student: shudhu User card. Teacher: User card + alada Teacher card. */}
        {role !== "admin" &&
          (role === "teachers" ? (
            <div className="grid items-start gap-4 md:grid-cols-2 md:gap-5">
              {userProfile ? (
                <UserProfileCard
                  profile={userProfile}
                  fallbackName={user.name || undefined}
                  fallbackImage={user.image || undefined}
                />
              ) : (
                <EmptyCard>
                  No user profile info added yet. Click the &quot;Add Info&quot;
                  button above to add it.
                </EmptyCard>
              )}

              {teacherProfile ? (
                <TeacherProfileCard profile={teacherProfile} />
              ) : (
                <EmptyCard>
                  Teacher info not added yet. Click the &quot;Add Teacher
                  Info&quot; button above to add it.
                </EmptyCard>
              )}
            </div>
          ) : userProfile ? (
            <UserProfileCard
              profile={userProfile}
              fallbackName={user.name || undefined}
              fallbackImage={user.image || undefined}
            />
          ) : (
            <EmptyCard>
              No profile info added yet. Click the &quot;Add Info&quot; button
              above to add your details.
            </EmptyCard>
          ))}

      </div>
    </main>
  );
};

interface EmptyCardProps {
  children: React.ReactNode;
}

// Profile data na thakle ei dashed card ta dekhano hoy.
function EmptyCard({ children }: EmptyCardProps) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
      {children}
    </div>
  );
}

export default ProfilePage;
