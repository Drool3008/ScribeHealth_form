"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, DollarSign, Wallet, ShieldCheck, PieChart, Coins, CheckCircle2, Info, ArrowUpRight, Banknote, Users, Rocket } from "lucide-react"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

export default function FundingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-left">Funding & Capital Strategy</h1>
        <p className="text-sm text-muted-foreground text-left">Long-term capitalization and cash runway modeling</p>
      </div>

      {/* 🔷 1. Top Section — Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        {[
          { label: "Capital Raised", value: "₹20.0 L", sub: "Equity Financing (Year 1)" },
          { label: "Closing Cash (Y1)", value: "₹6.59 L", sub: "Post-Burn Runway" },
          { label: "Financial Risk", value: "Low / Zero Debt", sub: "Equity-Only Model" },
          { label: "Break-even target", value: "Year 2", sub: "Self-Sustaining Operations" },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-muted/5 text-left">
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{kpi.label}</div>
            <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 🔷 2. Main Funding Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CAPITAL USE CASES */}
        <Card className="border shadow-none rounded-none flex flex-col text-left">
          <CardHeader className="py-4 px-6 border-b bg-muted/5">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <PieChart className="size-3 text-primary" /> Where the Capital is Used
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground text-left">
              The ₹20L initial injection is primarily invested in growth and early scaling across three core pillars.
            </p>
            <div className="space-y-4">
               {[
                 { title: "Customer Acquisition (CAC)", desc: "Marketing spend for the 2,500 trials needed in Year 1." },
                 { title: "Product Infrastructure & AI", desc: "Fixed COGS and variable processing for initial 50 doctors." },
                 { title: "Core Operations (G&A)", desc: "Essential compliance, software, and non-COGS hosting overhead." },
               ].map((item, i) => (
                 <div key={i} className="p-4 border-l-2 border-primary bg-muted/5 space-y-1 text-left">
                    <div className="text-xs font-black uppercase tracking-widest">{item.title}</div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">{item.desc}</p>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* CAPITAL EFFICIENCY */}
        <Card className="border shadow-none rounded-none flex flex-col text-left">
          <CardHeader className="py-4 px-6 border-b bg-muted/5">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="size-3 text-primary" /> Capital Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground text-left">
              The model minimizes the need for repeated funding through high-efficiency execution.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <ShieldCheck className="size-4 text-emerald-500" />, title: "No Debt", sub: "Low risk financing" },
                   { icon: <Users className="size-4 text-emerald-500" />, title: "Lean Team", sub: "Minimal salary overhead" },
                   { icon: <Rocket className="size-4 text-emerald-500" />, title: "No Aggressive Hiring", sub: "Costs scale with rev" },
                   { icon: <Coins className="size-4 text-emerald-500" />, title: "Self-sustaining", sub: "Break-even by Y2" },
                 ].map((item, i) => (
                   <div key={i} className="p-4 border bg-muted/5 space-y-1 text-left">
                      <div className="flex items-center gap-2">
                         {item.icon}
                         <div className="text-[10px] font-black uppercase tracking-tight">{item.title}</div>
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase pl-6 font-bold">{item.sub}</div>
                   </div>
                 ))}
              </div>
              <div className="p-4 bg-primary/5 border border-dashed border-primary/20">
                 <p className="text-xs leading-relaxed text-primary font-bold text-center">
                    "For every ₹1 raised, the startup focuses on unit profitability over growth-at-all-costs expansion."
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔷 3. Runway & Closing Cash (Deep Dive) */}
      <Card className="border shadow-none rounded-none text-left">
        <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Wallet className="size-3 text-primary" /> Closing Cash Progression (₹ L)
          </CardTitle>
          <div className="text-[10px] font-black uppercase tracking-widest px-3 bg-muted/20 border h-7 flex items-center justify-center">Runway Check</div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
            {[
              { year: "Year 1", amount: "6.59 L", color: "text-rose-600", note: "Post-Burn Balance" },
              { year: "Year 2", amount: "7.43 L", color: "text-emerald-600", note: "Post-Profit Break-even" },
              { year: "Year 3", amount: "33.54 L", color: "text-emerald-600", note: "Velocity Scaling Cap." },
            ].map((item, i) => (
              <div key={i} className="p-10 text-center space-y-2">
                <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.year}</div>
                <div className={cn("text-4xl font-black tracking-tighter", item.color)}>₹{item.amount}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 italic tracking-wider">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-primary/5 border-t border-primary/10 flex items-center justify-center gap-8">
             <div className="flex items-center gap-3">
                <div className="size-10 bg-primary flex items-center justify-center shrink-0">
                   <ArrowUpRight className="text-primary-foreground size-5" />
                </div>
                <div className="text-left">
                   <p className="text-xs font-black uppercase tracking-tight text-primary">Self-Sustaining Model</p>
                   <p className="text-[10px] font-medium text-muted-foreground leading-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
                      Positive Year 1 closing cash confirms the ₹20L raise suffices for both burn and runway.
                   </p>
                </div>
             </div>
             <Separator orientation="vertical" className="h-10 bg-primary/20" />
             <div className="flex items-center gap-3">
                <div className="size-10 bg-muted border flex items-center justify-center shrink-0">
                   <Banknote className="text-muted-foreground size-5" />
                </div>
                <div className="text-left">
                   <p className="text-xs font-black uppercase tracking-tight">Financial Resilience</p>
                   <p className="text-[10px] font-medium text-muted-foreground leading-tight">
                      No external funding required in Year 2 to maintain operational stability.
                   </p>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 4. Why ₹20L is Sufficient Section */}
      <Card className="border shadow-none rounded-none text-left bg-muted/5">
         <CardHeader className="py-4 px-6 border-b">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Why ₹20L is Sufficient (Runway Analysis)</CardTitle>
         </CardHeader>
         <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">The Burn Requirement</div>
                  <p className="text-sm font-medium leading-relaxed">
                     The raise covers the Year 1 losses of approximately <span className="font-black text-rose-600 font-mono">₹13.4L</span>, which accounts for both G&A and Acquisition costs during early market entry.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Post-Burn Runway</div>
                  <p className="text-sm font-medium leading-relaxed">
                     Completing Year 1 leaves a positive closing cash of <span className="font-black text-emerald-600 font-mono">₹6.59L</span>, acting as a buffer for the early months of Year 2.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Strategic Advantage</div>
                  <p className="text-sm font-medium leading-relaxed">
                     This capital structure supports the full transition to operating break-even in Year 2, where subscription revenues begin covering 100% of the operational burn.
                  </p>
               </div>
            </div>
            
            <Separator className="opacity-50" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-widest">Covers Y1 Losses (~₹13.4L)</p>
               </div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-widest">Leaves Cash Buffer (₹6.59L)</p>
               </div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-widest">Safe transition to break-even</p>
               </div>
            </div>
         </CardContent>
      </Card>
      
      {/* 🔷 Bottom Legend Bar */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {[
           { icon: <Info className="size-4" />, text: "Minimizes need for repeated funding rounds." },
           { icon: <Info className="size-4" />, text: "Founders prioritize capital efficiency over high-speed burn." },
         ].map((item, i) => (
           <div key={i} className="flex items-center gap-3 p-4 border bg-muted/5">
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{item.text}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
