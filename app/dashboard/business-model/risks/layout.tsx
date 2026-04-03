"use client"

import * as React from "react"

export default function RisksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 SECTION 1: HEADER */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Revenue & Growth Risks</h1>
        <p className="text-sm text-muted-foreground">Understanding downside scenarios and financial sensitivity</p>
      </div>

      {children}
    </div>
  )
}
