"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
    Bookmark,
    ClipboardList,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    SquarePlus,
    UserRound,
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
import { getRole, ROLE_LABEL, type UserRole } from "@/lib/roles"

type NavItem = {
    label: string
    href: string
    icon: LucideIcon
}

// Prottek role er menu ekta simple array. Last item ta profile update.
const MENU_BY_ROLE: Record<UserRole, NavItem[]> = {
    students: [
        { label: "Overview", href: "/dashboard/students", icon: LayoutDashboard },
        { label: "My Applications", href: "/dashboard/students/application", icon: ClipboardList },
        { label: "Saved Tuitions", href: "/dashboard/students/saved", icon: Bookmark },
        { label: "Update Profile", href: "/profile", icon: Settings },
    ],
    teachers: [
        { label: "Overview", href: "/dashboard/teachers", icon: LayoutDashboard },
        { label: "My Tuitions", href: "/dashboard/teachers/tuitions", icon: FileText },
        { label: "Post Tuition", href: "/dashboard/teachers/post", icon: SquarePlus },
        { label: "Applicants", href: "/dashboard/teachers/applicants", icon: UsersRound },
        { label: "Update Profile", href: "/profile", icon: Settings },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Users", href: "/dashboard/admin/users", icon: UsersRound },
        { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: FileText },
        { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { label: "Update Profile", href: "/profile", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const user = session?.user
    const role = getRole(user?.role)
    const items = MENU_BY_ROLE[role]

    const name = user?.name?.trim() || "User"

    async function handleSignOut() {
        // BetterAuth error throw kore na, { error } return kore — tai error check kora lage.
        const { error } = await authClient.signOut()

        if (error) {
            console.error("Sign out failed:", error)
            showToast.error("Could not log out. Please try again.")
            return
        }

        showToast.success("Logged out successfully.")
        router.push("/")
        router.refresh()
    }

    // Ekta nav item render korar chhoto helper (duibar use hocche)
    const renderNavItem = (item: NavItem) => {
        const Icon = item.icon
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    render={<Link href={item.href} />}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                        "h-11 gap-3 rounded-xl border border-transparent px-3 text-sm font-medium transition-all duration-300",
                        "text-neutral-700 hover:bg-teal-50 hover:text-teal-800",
                        "dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white",
                        active &&
                            "border-teal-300 bg-gradient-to-r from-teal-100 via-teal-50 to-transparent text-teal-900 shadow-sm dark:border-teal-300/70 dark:from-teal-400/25 dark:via-teal-400/10 dark:to-transparent dark:text-teal-50 dark:shadow-[0_0_28px_-8px_rgba(45,212,191,0.9)]"
                    )}
                >
                    <Icon
                        className={cn(
                            "size-[18px] shrink-0 transition-all duration-300",
                            active
                                ? "text-teal-600 dark:text-teal-200 dark:drop-shadow-[0_0_8px_rgba(45,212,191,0.9)]"
                                : "text-neutral-400 group-hover/menu-button:text-teal-600 dark:text-slate-400 dark:group-hover/menu-button:text-teal-200"
                        )}
                    />
                    <span className="truncate">{item.label}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <Sidebar className="border-r border-teal-100 bg-white [&_[data-slot=sidebar-inner]]:bg-[radial-gradient(120%_60%_at_50%_0%,rgba(20,184,166,0.10),transparent_60%)] dark:border-teal-400/10 dark:bg-[#060b12]">

            {/* ---------- Logo + user card ---------- */}
            <SidebarHeader className="gap-5 p-4 pt-5">
                <div className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-600 text-base font-extrabold text-[#04121a] shadow-[0_0_24px_-8px_rgba(34,211,238,0.85)] transition-transform duration-300 group-hover:scale-105">
                            ML
                        </span>
                        <span className="text-xl font-bold tracking-tight text-teal-700 dark:text-cyan-300 dark:drop-shadow-[0_0_16px_rgba(34,211,238,0.55)]">
                            MentorLagbe
                        </span>
                    </Link>

                    {/* সাইডবার ক্লোজ করার বাটন */}
                    {/* <SidebarTrigger className="grid size-9 place-items-center rounded-xl border border-teal-200 bg-white text-teal-700 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/5 dark:text-teal-300 dark:hover:border-teal-300/50 dark:hover:bg-teal-400/10 dark:hover:text-teal-100 cursor-pointer" /> */}
                </div>

                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50/60 p-3 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 dark:border-teal-300/40 dark:bg-teal-400/[0.06] dark:hover:border-teal-200/70 dark:hover:bg-teal-400/10"
                >
                    <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-teal-300 bg-teal-100 text-teal-600 shadow-sm dark:border-teal-300/70 dark:bg-teal-400/10 dark:text-teal-200 dark:shadow-[0_0_18px_rgba(45,212,191,0.45)]">
                        {user?.image ? (
                            <img src={user.image} alt={name} className="size-full object-cover" />
                        ) : (
                            <UserRound className="size-7" />
                        )}
                    </span>

                    <span className="min-w-0">
                        <span className="block truncate text-base font-semibold text-neutral-900 dark:text-white">
                            {name}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-teal-700 dark:border-teal-300/30 dark:bg-teal-400/10 dark:text-teal-100">
                            <UserRound className="size-3" />
                            {ROLE_LABEL[role]}
                        </span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* ---------- Menu ---------- */}
            <SidebarContent className="px-3 pt-1 pb-4">
                <p className="px-3 pt-4 pb-2 text-[10px] font-semibold tracking-[0.22em] text-neutral-400 dark:text-slate-400">
                    MAIN MENU
                </p>
                <SidebarMenu className="gap-1.5">
                    {items.map(renderNavItem)}
                </SidebarMenu>
            </SidebarContent>

            {/* ---------- Logout ---------- */}
            <SidebarFooter className="border-t border-teal-100 p-3 dark:border-teal-400/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            onClick={handleSignOut}
                            className="group/logout h-11 gap-3 rounded-xl px-3 text-sm font-medium text-rose-600 transition-all duration-300 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-200/90 dark:hover:bg-rose-500/10 dark:hover:text-rose-100"
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
