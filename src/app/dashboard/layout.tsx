import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardTopbar } from "../components/DashboardToggleBar"
import { DashboardSidebar } from "../components/DashboardSideBar"

// ------------------------------------------------------------------
// 🧱 DASHBOARD LAYOUT
// ------------------------------------------------------------------
// বাম দিকে sidebar, ডান দিকে top bar + page content।
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <DashboardTopbar />

                <main className="flex-1 bg-slate-50 p-5 text-neutral-900 sm:p-8 dark:bg-[#050b10] dark:text-neutral-100">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
