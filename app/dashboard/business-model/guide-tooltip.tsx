"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GuideTooltipProps {
  children: React.ReactNode
  text: string
  show: boolean
  onDismiss: () => void
}

export function GuideTooltip({ children, text, show, onDismiss }: GuideTooltipProps) {
  if (!show) return <>{children}</>

  return (
    <div className="relative group" onClick={onDismiss}>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase px-3 py-1.5 whitespace-nowrap shadow-xl animate-in fade-in zoom-in duration-500 z-50 rounded-none border border-primary-foreground/20">
        {text}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 border-r border-b border-primary-foreground/20"></div>
      </div>
      {children}
    </div>
  )
}
