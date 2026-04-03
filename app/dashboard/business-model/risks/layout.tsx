"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AlertTriangle, TrendingDown, ShieldAlert } from "lucide-react"

const riskTabs = [
  { 
    id: "risk1", 
    label: "Risk 1: Unit Growth", 
    href: "/dashboard/business-model/risks/risk1",
    icon: <AlertTriangle className="size-3 mr-2 text-rose-500" />
  },
  { 
    id: "risk2", 
    label: "Risk 2: CAC Underperformance", 
    href: "/dashboard/business-model/risks/risk2",
    icon: <TrendingDown className="size-3 mr-2 text-rose-500" />
  },
  { 
    id: "risk3", 
    label: "Risk 3: Retention / Churn", 
    href: "/dashboard/business-model/risks/risk3",
    icon: <ShieldAlert className="size-3 mr-2 text-rose-500" />
  },
]

export default function RisksLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 SECTION 1: HEADER */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Revenue & Growth Risks</h1>
        <p className="text-sm text-muted-foreground">Understanding downside scenarios and financial sensitivity</p>
      </div>

      {/* 🔷 SECTION 2: RISK SELECTOR (Linkable Tabs) */}
      <div className="bg-muted/30 p-1 w-full md:w-auto h-auto grid grid-cols-1 md:flex items-stretch border">
        {riskTabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex items-center justify-center text-xs font-bold py-2 px-6 transition-all duration-200",
                isActive 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              {tab.icon} {tab.label}
            </Link>
          )
        })}
      </div>

      <div className="mt-8">
        {children}
      </div>
    </div>
  )
}
