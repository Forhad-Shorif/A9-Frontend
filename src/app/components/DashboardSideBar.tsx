"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
    Bookmark,
    BriefcaseBusiness,
    Building2,
    CreditCard,
    FileText,
    Inbox,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    UsersRound,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { showToast } from "@/lib/utils/toast"
import { cn } from "@/lib/utils"

type UserRole = "seeker" | "recruiter" | "admin"

type NavItem = {
    label: string
    href: string
    icon: LucideIcon
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
    seeker: [
        { label: "Dashboard", href: "/dashboard/user-1", icon: LayoutDashboard },
        { label: "Browse Jobs", href: "/browse-jobs", icon: Search },
        { label: "Saved Jobs", href: "/dashboard/seeker/saved", icon: Bookmark },
        { label: "Applications", href: "/dashboard/seeker/application", icon: FileText },
        { label: "Billing", href: "/dashboard/seeker/billing", icon: CreditCard },
        { label: "Settings", href: "/dashboard/seeker/setting", icon: Settings },
    ],
    recruiter: [
        { label: "Dashboard", href: "/dashboard/user-2", icon: LayoutDashboard },
        { label: "My Company", href: "/dashboard/recruiter/company", icon: Building2 },
        { label: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
        { label: "Add Job", href: "/dashboard/recruiter/jobs/new", icon: BriefcaseBusiness },
        { label: "Applications", href: "/dashboard/recruiter/applications", icon: Inbox },
        { label: "Settings", href: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { label: "Dashboard", href: "/dashboard/user-3", icon: LayoutDashboard },
        { label: "Users", href: "/dashboard/admin/users", icon: UsersRound },
        { label: "Companies", href: "/dashboard/admin/companies", icon: Building2 },
        { label: "Jobs", href: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
        { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const user = session?.user
    const role: UserRole = (user?.role as UserRole) || "admin"
    const items = NAV_ITEMS[role] || NAV_ITEMS.seeker

    const name = user?.name?.trim() || "User"
    const initial = name.charAt(0).toUpperCase()

    async function handleSignOut() {
        try {
            await authClient.signOut()
            showToast.success("Logged out successfully.")
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Sign out failed:", error)
            showToast.error("Could not log out. Please try again.")
        }
    }

    return (
        /* 🌌 প্রিমিয়াম ডার্ক ব্ল্যাক এবং ডিপ ব্লু গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */
        <Sidebar className="border-r border-blue-900/30 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#02040a] shadow-[15px_0_50px_rgba(0,0,0,0.65)] [&_[data-slot=sidebar-inner]]:bg-transparent [&_[data-slot=sidebar-inner]]:bg-[radial-gradient(120%_70%_at_50%_0%,rgba(59,130,246,0.14),transparent_60%)]">
            
            <SidebarHeader className="gap-5 p-5">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex bg-gradient-to-r from-white via-sky-200 to-indigo-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_16px_rgba(59,130,246,0.45)] transition-all duration-300 hover:from-sky-200 hover:via-blue-200 hover:to-violet-300"
                    >
                        HireLoop
                    </Link>
                    
                    {/* সাইডবার ক্লোজ করার বাটন */}
                    <SidebarTrigger className="grid size-9 place-items-center rounded-xl border border-blue-800/40 bg-blue-950/30 text-blue-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/15 hover:text-sky-200 hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)] cursor-pointer" />
                </div>

                <Link
                    href="/profile"
                    className="group flex items-center gap-3 rounded-2xl border border-blue-900/30 bg-gradient-to-br from-blue-500/[0.12] via-indigo-500/[0.06] to-transparent p-3 transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_34px_-10px_rgba(59,130,246,0.65)]"
                >
                    <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-sm font-bold text-white shadow-[0_0_20px_-3px_rgba(59,130,246,0.8)] ring-1 ring-sky-300/30 transition-transform duration-300 group-hover:scale-105">
                        {user?.image ? (
                            <img src={user.image} alt={name} className="size-full object-cover" />
                        ) : (
                            initial
                        )}
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white transition-colors group-hover:text-sky-200">{name}</span>
                        <span className="mt-0.5 inline-flex w-fit items-center truncate rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sky-200/90 capitalize">
                            {role} Account
                        </span>
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-2">
                <SidebarMenu className="gap-1.5">
                    {items.map((item) => {
                        const Icon = item.icon
                        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    render={<Link href={item.href} />}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "group/nav h-11 gap-3 rounded-xl px-3 text-sm font-medium text-slate-400 transition-all duration-300",
                                        "hover:translate-x-0.5 hover:bg-blue-500/10 hover:text-white",
                                        active && "border border-blue-500/40 bg-gradient-to-r from-blue-600/35 via-indigo-600/20 to-transparent text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-16px_rgba(59,130,246,0.9)]",
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "size-[18px] shrink-0 transition-all duration-300",
                                            active
                                                ? "text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.85)]"
                                                : "text-slate-500 group-hover/nav:text-sky-300",
                                        )}
                                    />
                                    <span className="truncate">{item.label}</span>
                                    {active && <span className="ml-auto h-5 w-1 rounded-full bg-gradient-to-b from-sky-300 via-blue-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.95)]" />}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-blue-900/25 p-3">
                {role === "seeker" && (
                    <div className="mb-3 pt-1">
                        <Link
                            href="/profile/add-info"
                            className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.95)] ring-1 ring-sky-300/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 hover:shadow-[0_14px_36px_-10px_rgba(59,130,246,1)] active:translate-y-0 active:scale-[0.98]"
                        >
                            Post Resume
                        </Link>
                    </div>
                )}

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            onClick={handleSignOut}
                            className="group/logout h-11 gap-3 rounded-xl px-3 text-sm font-medium text-rose-300/70 transition-all duration-300 hover:bg-rose-500/10 hover:text-rose-200 hover:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.25)]"
                        >
                            <LogOut className="size-[18px] transition-all duration-300 group-hover/logout:drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                            <span>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}