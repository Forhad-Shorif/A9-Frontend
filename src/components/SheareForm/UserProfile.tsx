import React from "react";
import {
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Share2,
  UserRound,
} from "lucide-react";
import { UserProfileItem } from "@/components/SheareForm/ActionProfile";

interface UserProfileCardProps {
  profile: UserProfileItem;
  fallbackName?: string;
  fallbackImage?: string;
}

// User profile er choloman name/photo/cover ImageFeild e thake.
// Ei card shudhu backend er Profile data (tag, dob, location, education) dekhay.
const UserProfileCard = ({
  profile,
  fallbackName,
  fallbackImage,
}: UserProfileCardProps) => {
  const displayName = profile.name || fallbackName || "Unnamed User";
  const displayImage = profile.photoURL || fallbackImage || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-cyan-500/25 dark:bg-slate-950 dark:shadow-[0_0_35px_rgba(6,182,212,0.14)]">
      {/* Top: circular user image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-white px-5 pb-5 pt-6 text-center dark:from-cyan-500/10 dark:via-sky-500/5 dark:to-transparent">
        {/* Soft decorative glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-2xl dark:bg-cyan-400/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl dark:bg-sky-400/10" />

        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-cyan-100 shadow-lg shadow-cyan-500/20 dark:border-slate-900 dark:bg-slate-800 sm:h-28 sm:w-28">
          {displayImage ? (
            <img
              src={displayImage}
              alt={displayName}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-400 text-3xl font-bold text-white">
              {initial}
            </div>
          )}
        </div>

        <div className="relative mt-3">
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:border-cyan-400/25 dark:text-cyan-300">
            <UserRound className="h-3 w-3" />
            User Profile
          </span>

          <h3 className="mt-1 truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
            {displayName}
          </h3>

          {profile.tag && (
            <p className="truncate text-xs font-medium text-cyan-700 dark:text-cyan-300">
              {profile.tag}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {/* Basic info tiles */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoTile
            icon={<Calendar className="h-4 w-4" />}
            label="Birth Date"
            value={profile.dateOfBirth || "Not provided"}
          />
          <InfoTile
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={profile.location || "Not provided"}
          />
          <InfoTile
            icon={<Mail className="h-4 w-4" />}
            label="Contact"
            value={profile.contact || profile.email || "Not provided"}
          />
          <InfoTile
            icon={<Share2 className="h-4 w-4" />}
            label="Facebook"
            value={profile.facebook || "Not provided"}
          />
        </div>

        {/* Education */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
              <GraduationCap className="h-4 w-4" />
            </span>
            Education & Qualifications
          </h4>

          {Array.isArray(profile.educations) && profile.educations.length > 0 ? (
            <ul className="space-y-2">
              {profile.educations.map((edu, idx) => (
                <li
                  key={`${profile._id}-edu-${idx}`}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 px-3 py-3 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
              No education qualifications added yet.
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

// Choto info box — label + value ek jaygay dekhanor jonno.
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

export default UserProfileCard;
