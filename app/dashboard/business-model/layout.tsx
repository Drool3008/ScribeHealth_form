"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { name: "Pricing", href: "/dashboard/business-model/pricing" },
  { name: "Solo Doctors", href: "/dashboard/business-model/solo-doctors" },
  { name: "P&L", href: "/dashboard/business-model/pnl" },
  { name: "Balance Sheet", href: "/dashboard/business-model/balance-sheet" },
  { name: "Funding", href: "/dashboard/business-model/funding" },
  { name: "Cash Flow", href: "/dashboard/business-model/cash-flow" },
  { name: "LTV", href: "/dashboard/business-model/ltv" },
  { name: "G&A", href: "/dashboard/business-model/ga" },
]

export default function BusinessModelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 lg:px-6">
        <div className="flex items-center space-x-1 no-scrollbar overflow-x-auto py-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
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
      </div>
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        {children}
      </div>
    </div>
  )
}
