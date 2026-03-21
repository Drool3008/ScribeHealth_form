"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Heart } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  const getPageTitle = (path: string) => {
    if (path === "/dashboard") return "Scorecard Overview"
    if (path === "/dashboard/demographics") return "Demographics"
    if (path === "/dashboard/rq1") return "Time & Effort (RQ1)"
    if (path === "/dashboard/rq2") return "Tools & Pain (RQ2)"
    if (path === "/dashboard/rq3") return "AI Trust (RQ3)"
    if (path === "/dashboard/rq4") return "Multilingual (RQ4)"
    if (path === "/dashboard/rq5") return "Workflow (RQ5)"
    if (path === "/dashboard/transcripts") return "Interview Transcripts"
    if (path === "/dashboard/report") return "Research Report (2.4)"
    if (path === "/dashboard/data-library") return "Data Library"
    return "Dashboard"
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getPageTitle(pathname)}</h1>

        <div className="ml-auto flex items-center gap-1.5 px-2 text-xs text-muted-foreground font-medium selection:text-none">
          Developed by <span className="text-foreground font-semibold">Team Nomads</span> with <Heart className="size-3.5 text-red-500 fill-red-500 animate-pulse" />
        </div>
      </div>
    </header>
  )
}
