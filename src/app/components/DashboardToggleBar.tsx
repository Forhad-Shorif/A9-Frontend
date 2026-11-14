"use client"

import Link from "next/link"
import { Bell, Mail, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

export function DashboardTopbar() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const name = user?.name?.trim() || "Forhad Shorif"
  const initial = name.charAt(0).toUpperCase()

  return (
    <header className="relative sticky top-0 z-20 flex h-20 shrink-0 items-center gap-4 border-b border-blue-900/30 bg-gradient-to-r from-[#030712]/95 via-[#060d1f]/90 to-[#030712]/95 px-4 shadow-[0_18px_40px_-30px_rgba(59,130,246,0.9)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-sky-400/40 before:to-transparent sm:px-8">
      
      {/* 🟢 এখানে এই ট্রিগার বাটনটি থাকাতে সাইডবার বন্ধ থাকলেও এটি ক্লিক করে আবার ফিরিয়ে আনা যাবে */}
      <SidebarTrigger className="grid size-10 place-items-center rounded-xl border border-blue-800/40 bg-blue-950/30 text-blue-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/15 hover:text-sky-200 hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)] cursor-pointer" />

      {/* সার্চ ইনপুট */}
      <div className="group relative hidden min-w-0 max-w-xl flex-1 sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-300" />
        <input
          type="search"
          placeholder="Search jobs, talent, or applications..."
          aria-label="Search jobs, talent, or applications"
          className="h-11 w-full rounded-xl border border-blue-900/40 bg-blue-950/20 pr-4 pl-11 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 placeholder:text-slate-500 hover:border-blue-700/50 focus:border-sky-500/60 focus:bg-blue-950/40 focus:shadow-[0_0_28px_-8px_rgba(56,189,248,0.75)] focus:outline-none focus:ring-4 focus:ring-sky-500/10"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Messages"
          className="group relative grid size-10 place-items-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/15 hover:text-sky-200 hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)]"
        >
          <Mail className="size-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)] ring-2 ring-[#030712]" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="group relative grid size-10 place-items-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/15 hover:text-sky-200 hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)]"
        >
          <Bell className="size-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)] ring-2 ring-[#030712]" />
        </button>

        <span className="hidden h-6 w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent sm:block" />

        <Link href="/profile" className="group flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <span className="block text-sm font-semibold text-white transition-colors duration-300 group-hover:text-sky-200">{name}</span>
            <span className="block text-[11px] font-medium tracking-wide text-sky-300/75 capitalize">{user?.role || "Member"}</span>
          </div>

          <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-sky-400/40 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.85)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_24px_-2px_rgba(56,189,248,0.9)]">
            {user?.image ? (
              <img src={user.image} alt={name} className="size-full object-cover" />
            ) : (
              initial
            )}
          </span>
        </Link>
      </div>
    </header>
  )
}