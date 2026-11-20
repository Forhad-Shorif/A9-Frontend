import React from "react";
import ServerUser from "@/lib/ServerUser";
import ProfileMediaSection from "@/components/SheareForm/ProfileForm/ImageFeild";
import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import TeacherProfileCard from "@/components/SheareForm/ProfileForm/TeacherProfile";
import {
  getTeacherProfile,
  getUserProfile,
} from "@/components/SheareForm/ProfileForm/ActionProfile";
import { getRole } from "@/lib/roles";
import EditTeacherProfileDialog from "@/components/SheareForm/ProfileForm/EditTeacherProfileDialog";
import AddTeacherProfileDialog from "@/components/SheareForm/ProfileForm/Teacher-Form";
import EditLeftProfileDialog from "@/components/SheareForm/ProfileForm/EditLeftProfileDialog";
import AddLeftProfileDialog from "@/components/SheareForm/ProfileForm/Parsonal-Form";
import TeacherPlanSection from "@/components/SheareDashboard/SheareTeacher/TeacherPlanSection";

export default async function TeacherProfilePage() {
  const user = await ServerUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please sign in to view your teacher profile.
        </div>
      </main>
    );
  }

  const role = getRole(user.role);
  const email = user.email || "";

  const userProfile = role !== "admin" ? await getUserProfile(email) : null;
  const teacherProfile = await getTeacherProfile(email);

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Top Header with Post / Update Profile Actions */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              Teacher Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your mentor profile, personal info, and Pro plan
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {teacherProfile ? (
              <EditTeacherProfileDialog initialData={teacherProfile} />
            ) : (
              <AddTeacherProfileDialog />
            )}

            {userProfile ? (
              <EditLeftProfileDialog initialData={userProfile} />
            ) : (
              <AddLeftProfileDialog />
            )}
          </div>
        </div>

        {/* User Profile + Teacher Profile Cards */}
        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-5">
          {userProfile ? (
            <UserProfileCard
              profile={userProfile}
              fallbackName={user.name || undefined}
              fallbackImage={user.image || undefined}
            />
          ) : (
            <EmptyCard>
              No user profile info posted yet. Click the button above to post it.
            </EmptyCard>
          )}

          {teacherProfile ? (
            <TeacherProfileCard profile={teacherProfile} />
          ) : (
            <EmptyCard>
              Teacher info not posted yet. Click the button above to post it.
            </EmptyCard>
          )}
        </div>

        {/* Teacher Plan Upgrade Section -> Stripe */}
        <TeacherPlanSection
          teacherEmail={user.email || ""}
          teacherId={user.id || ""}
          currentPlan="starter"
        />
      </div>
    </main>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
      {children}
    </div>
  );
}