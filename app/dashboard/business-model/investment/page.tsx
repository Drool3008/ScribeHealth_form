"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, BarChart3, LineChart } from "lucide-react"

export default function InvestmentPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight">Investment</h2>
        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-tight">Funding roadmap and equity distribution analysis</p>
      </div>

      <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
         <CardHeader className="pb-3 border-b bg-muted/10">
           <CardTitle className="text-sm font-bold flex items-center gap-2"><LineChart className="size-4" /> 12-Month Projection</CardTitle>
         </CardHeader>
         <CardContent className="h-64 pt-6 flex items-center justify-center text-muted-foreground text-xs italic">
           Detailed projection charts will appear here as monetization nodes deploy safely.
         </CardContent>
      </Card>
    </div>
  )
}
