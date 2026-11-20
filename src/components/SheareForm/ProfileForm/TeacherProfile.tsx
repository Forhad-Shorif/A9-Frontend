import React from "react";
import {
  Award,
  BookOpen,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Video,
} from "lucide-react";
import { TeacherProfileItem } from "@/components/SheareForm/ProfileForm/ActionProfile";

interface TeacherProfileCardProps {
  profile: TeacherProfileItem;
}

// Ei card ta alada component, tai onno page e-o import kore use kora jabe:
// <TeacherProfileCard profile={teacherProfile} />
const TeacherProfileCard = ({ profile }: TeacherProfileCardProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-cyan-500/25 dark:bg-slate-950 dark:shadow-[0_0_35px_rgba(6,182,212,0.14)]">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-teal-50 via-cyan-50 to-white px-4 py-4 dark:border-slate-800 dark:from-teal-500/10 dark:via-cyan-500/5 dark:to-transparent sm:px-5">
        <div className="flex items-start gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-sm dark:text-slate-950 sm:h-12 sm:w-12">
            <Award className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-700 dark:border-teal-400/25 dark:text-teal-300">
              <BookOpen className="h-3 w-3" />
              Teacher Profile
            </span>

            <h3 className="mt-1 break-words text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
              {profile.headline || "Teacher Overview"}
            </h3>

            {profile.teachingMode && (
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Video className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                {profile.teachingMode}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {/* Info tiles */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoTile
            icon={<Award className="h-4 w-4" />}
            label="Experience"
            value={
              profile.yearsExperience
                ? `${profile.yearsExperience} years`
                : "Not provided"
            }
          />
          <InfoTile
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={profile.location || "Not provided"}
          />
          <InfoTile
            icon={<Calendar className="h-4 w-4" />}
            label="Birth Date"
            value={profile.dateOfBirth || "Not provided"}
          />
          <InfoTile
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={profile.email || "Not provided"}
          />
        </div>

        {/* About Me */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
              <FileText className="h-4 w-4" />
            </span>
            About Me
          </h4>
          <p className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            {profile.aboutMe || "No bio added yet."}
          </p>
        </div>

        {/* Skills & Subjects */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
              <BookOpen className="h-4 w-4" />
            </span>
            Skills & Subjects
          </h4>

          {Array.isArray(profile.skillsAndSubjects) &&
          profile.skillsAndSubjects.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skillsAndSubjects.map((skill, idx) => (
                <span
                  key={`${profile._id}-skill-${idx}`}
                  className="rounded-full border border-cyan-200 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 px-3 py-3 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
              No skills or subjects added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

interface InfoTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoTile({ icon, label, value }: InfoTileProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <span className="text-cyan-600 dark:text-cyan-400">{icon}</span>
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-medium text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default TeacherProfileCard;
