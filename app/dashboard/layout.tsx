import * as React from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Users, Clock, Smile, Zap, Languages, TrendingUp } from "lucide-react"

const navItems = [
  { name: "Demographics", href: "/dashboard/demographics", icon: Users },
  { name: "Time & Effort (RQ1)", href: "/dashboard/rq1", icon: Clock },
  { name: "Tools & Pain (RQ2)", href: "/dashboard/rq2", icon: Smile },
  { name: "AI Trust (RQ3)", href: "/dashboard/rq3", icon: Zap },
  { name: "Multilingual (RQ4)", href: "/dashboard/rq4", icon: Languages },
  { name: "Workflow (RQ5)", href: "/dashboard/rq5", icon: TrendingUp },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background/95">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 p-5 flex flex-col gap-5 bg-card flex-none">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold tracking-tight text-foreground">ScribeHealth</h2>
          <span className="text-xs text-muted-foreground font-medium">Research Insights Dashboard</span>
        </div>
        <Separator className="bg-border/50" />
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-150 active:scale-[0.98]"
            >
              <item.icon className="size-[18px]" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
