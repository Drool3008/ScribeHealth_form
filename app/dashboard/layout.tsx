import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "calc(var(--spacing) * 64)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <SiteHeader />
        <div className="flex flex-1 flex-col w-full max-w-full overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
