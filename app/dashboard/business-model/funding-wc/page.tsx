"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, PieChart, Users, DollarSign, Wallet, Gem } from "lucide-react"

export default function FundingWcPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h2 className="text-xl font-bold tracking-tight">Funding & Working Capital</h2></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-none hover:shadow-md transition-all">
          <CardHeader className="pb-3 border-b bg-primary/5"><CardTitle className="text-sm font-bold flex items-center gap-2"><Wallet className="size-4 text-primary" /> Current Round Status</CardTitle></CardHeader>
          <CardContent className="pt-4 space-y-3">
             <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground uppercase font-bold tracking-tight">Round</span><Badge variant="outline">Pre-Seed</Badge></div>
             <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground uppercase font-bold tracking-tight">Targeted</span><span className="text-sm font-bold font-mono">₹2.0Cr</span></div>
             <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground uppercase font-bold tracking-tight">Committed</span><span className="text-sm font-bold font-mono">₹85.0L</span></div>
             <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2"><div className="h-full bg-primary w-[42.5%]" /></div>
             <p className="text-[10px] text-muted-foreground text-right italic font-medium">42.5% committed accurately</p>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-md transition-all">
          <CardHeader className="pb-3 border-b bg-amber-500/5"><CardTitle className="text-sm font-bold flex items-center gap-2"><Gem className="size-4 text-amber-500" /> Working Capital requirement</CardTitle></CardHeader>
          <CardContent className="pt-4 space-y-3">
             <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
               Monthly inventory and server-forward requirements for high-velocity hospital node rollout.
             </p>
             <div className="flex items-center justify-between border-b pb-2"><span className="text-xs text-muted-foreground font-medium">Cycle Length</span><span className="text-xs font-bold">45 Days</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
