"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Pricing", href: "/dashboard/business-model/pricing" },
  { name: "Solo Doctors", href: "/dashboard/business-model/solo-doctors" },
  { name: "P&L", href: "/dashboard/business-model/pnl" },
  { name: "Balance Sheet", href: "/dashboard/business-model/balance-sheet" },
  { name: "Funding", href: "/dashboard/business-model/funding" },
  { name: "Cash Flow", href: "/dashboard/business-model/cash-flow" },
  { name: "LTV", href: "/dashboard/business-model/ltv" },
  { name: "G&A", href: "/dashboard/business-model/ga" },
  { name: "Risks", href: "/dashboard/business-model/risks" },
]

export default function BusinessModelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 lg:px-6">
        <div className="flex items-center py-2 gap-1">
          <div className="flex items-center space-x-1 no-scrollbar overflow-x-auto flex-1">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-none transition-all duration-200 whitespace-nowrap",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.name}
                </Link>
              )
            })}
          </div>
          <div className="shrink-0 pl-3 border-l ml-1">
            <a
              href="https://docs.google.com/spreadsheets/d/1iw32_xY9GK8rvOmlD7mMFPWC8wQOI26ChzLTe40qoXM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 h-7 px-3 text-[11px] font-semibold border rounded-none transition-colors whitespace-nowrap",
                "text-muted-foreground border-border hover:text-foreground hover:bg-muted/50"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
              Calculations (.xlsx)
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        {children}
      </div>
    </div>
  )
}
