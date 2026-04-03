"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { TrendingUp, Users, DollarSign, Calculator, Zap, Rocket, CheckCircle2, Info, Activity, Target } from "lucide-react"
import { GuideTooltip } from "../guide-tooltip"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

function LTVContent() {
  const [showGuide, setShowGuide] = React.useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get("view");

  const setView = (view: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (view) {
      params.set("view", view);
    } else {
      params.delete("view");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12" onClick={() => setShowGuide(false)}>
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Lifetime Value (LTV) Analysis</h1>
        <p className="text-sm text-muted-foreground">Long-term unit economics and sustainability metrics</p>
      </div>

      {/* 🔷 1. Top Section — Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        {[
          { label: "Est. Lifetime Value", value: "₹60k – ₹1L+", sub: "Per Customer" },
          { label: "LTV : CAC Ratio", value: "~4x to 10x", sub: "Y1 to Y3 efficiency" },
          { label: "Churn Rate", value: "20%", sub: "Conservative Stress Case" },
          { label: "Customer Lifetime", value: "3 – 5 Years", sub: "Annual Model" },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-muted/5">
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{kpi.label}</div>
            <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 🔷 2. Main Content Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LTV ESTIMATE SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col text-left overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="size-3 text-primary" /> LTV Estimate
            </CardTitle>
            <GuideTooltip text="See lifetime value math" show={showGuide} onDismiss={() => setShowGuide(false)}>
              <Sheet open={currentView === "ltv"} onOpenChange={(open) => setView(open ? "ltv" : null)}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 rounded-none font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">See Math</Button>
                </SheetTrigger>
                <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col focus:outline-none focus:ring-0">
                <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
                  <SheetTitle className="text-2xl font-bold tracking-tight text-left">LTV Calculation Logic</SheetTitle>
                  <SheetDescription className="text-sm font-medium text-muted-foreground text-left uppercase tracking-widest">How lifetime value is derived</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-24">
                  <div className="bg-primary/5 p-6 border-l-4 border-primary">
                    <p className="text-sm font-medium leading-relaxed">
                      LTV is the cumulative gross contribution a customer provides over their total duration with the product:
                      <span className="block mt-2 font-mono font-black text-lg">LTV = Contribution/Yr × Customer Lifetime</span>
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">01. Annual Contribution (Per Doctor)</div>
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent border-b-2">
                          <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Metric</TableHead>
                          <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Value</TableHead>
                          <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Notes / Logic</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-b text-sm"><TableCell className="font-medium">Annual Revenue</TableCell><TableCell className="text-right font-mono font-bold">₹38,000</TableCell><TableCell className="text-xs text-muted-foreground">Blended plan average (Lite to Elite)</TableCell></TableRow>
                        <TableRow className="border-b text-sm"><TableCell className="font-medium">Delivery Cost (COGS)</TableCell><TableCell className="text-right font-mono font-bold text-rose-600">-₹17,851</TableCell><TableCell className="text-xs text-muted-foreground">Fixed infra + Variable AI cost</TableCell></TableRow>
                        <TableRow className="border-b text-sm bg-primary/[0.02]"><TableCell className="font-bold">Gross Contribution</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹20,149</TableCell><TableCell className="text-xs font-medium">Revenue – COGS (Yearly per unit)</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">02. Derived Lifetime Projections</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Card className="p-6 border shadow-none rounded-none space-y-2">
                          <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">3 Year Lifetime</div>
                          <div className="text-3xl font-black">₹60,000+</div>
                       </Card>
                       <Card className="p-6 border shadow-none rounded-none bg-primary/5 space-y-2 border-primary/20">
                          <div className="text-[9px] font-bold uppercase text-primary tracking-widest">5 Year Lifetime</div>
                          <div className="text-3xl font-black text-primary">₹1,00,000+</div>
                       </Card>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </GuideTooltip>
        </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1 text-left">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Based on a blended annual revenue of ₹38k–₹40k and stable COGS, we generate ~₹20k in annual gross contribution per doctor.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">Annual Rev</span><span className="text-lg font-black tracking-tight">₹38k+</span></div>
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">Annual COGS</span><span className="text-lg font-black tracking-tight text-rose-600">₹17.8k</span></div>
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">Gross Contr.</span><span className="text-lg font-black tracking-tight text-primary">~₹20k</span></div>
            </div>
          </CardContent>
        </Card>

        {/* CUSTOMER LIFETIME SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col text-left overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Activity className="size-3 text-primary" /> Lifetime Assumption
            </CardTitle>
            <div className="h-7 px-3 bg-muted/20 text-[10px] font-black uppercase flex items-center justify-center border tracking-widest">Stress Test</div>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Used a high churn rate (20%) as a conservative stress case to ensure economics remain valid in non-ideal conditions.
            </p>
            <div className="space-y-4">
              <div className="p-4 border bg-muted/5 space-y-1">
                 <div className="text-[9px] font-bold uppercase text-muted-foreground">Annual Churn</div>
                 <div className="text-2xl font-black">20%</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                 Tests business sustainability under higher churn scenarios; ensures growth remains capital-efficient despite variance.
              </p>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-2">
               {[
                 { icon: <CheckCircle2 className="size-3 text-emerald-500" />, text: "3-5 yr duration" },
                 { icon: <CheckCircle2 className="size-3 text-emerald-500" />, text: "Validates LTV" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] font-bold bg-muted/10 p-2 border border-dashed text-muted-foreground">
                    {item.icon} <span className="uppercase tracking-widest">{item.text}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* LTV:CAC COMPARISON SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col text-left overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Target className="size-3 text-primary" /> Marketing Ratio
            </CardTitle>
            <GuideTooltip text="Analyze LTV:CAC sensitivity" show={showGuide} onDismiss={() => setShowGuide(false)}>
              <Sheet open={currentView === "sensitivity"} onOpenChange={(open) => setView(open ? "sensitivity" : null)}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 rounded-none font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">Sensitivity</Button>
                </SheetTrigger>
                <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col focus:outline-none focus:ring-0">
                <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
                  <SheetTitle className="text-2xl font-bold tracking-tight text-left">LTV : CAC Sensitivity Analysis</SheetTitle>
                  <SheetDescription className="text-sm font-medium text-muted-foreground text-left uppercase tracking-widest">Edge Case Testing: 1% Conversion</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-24">
                  <div className="p-6 border border-rose-500/30 bg-rose-500/5 space-y-2">
                    <p className="text-xs font-bold uppercase text-rose-600 tracking-[0.2em] mb-2">Edge Case Assumption</p>
                    <p className="text-sm font-medium leading-relaxed">
                      Conversion drops to 1% (100 trials yielding only 1 payer). All other acquisition costs and spend remain constant.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Impact on Unit Economics</div>
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent border-b-2">
                          <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Metric</TableHead>
                          <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Scenario Value</TableHead>
                          <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Delta vs Base</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-b text-sm"><TableCell className="font-medium">Acquisition Spend</TableCell><TableCell className="text-right font-mono font-bold">₹35,000</TableCell><TableCell className="text-xs text-muted-foreground p-3">No change (per 100 trials)</TableCell></TableRow>
                        <TableRow className="border-b text-sm"><TableCell className="font-medium">Paying Customers</TableCell><TableCell className="text-right font-mono font-black text-rose-600">1</TableCell><TableCell className="text-xs text-muted-foreground p-3">-50% vs Y1 (2%)</TableCell></TableRow>
                        <TableRow className="border-b text-sm bg-rose-500/[0.03]"><TableCell className="font-bold">Resulting CAC</TableCell><TableCell className="text-right font-mono font-black text-rose-600">₹35,000</TableCell><TableCell className="text-xs font-bold text-rose-600">+100% Increase</TableCell></TableRow>
                        <TableRow className="border-b text-sm"><TableCell className="font-medium">Expected LTV</TableCell><TableCell className="text-right font-mono font-bold p-3">₹60k – ₹1L</TableCell><TableCell className="text-xs text-muted-foreground p-3">Unchanged lifetime contribution</TableCell></TableRow>
                        <TableRow className="text-sm bg-primary/5"><TableCell className="font-black uppercase text-[10px]">LTV : CAC Ratio</TableCell><TableCell className="text-right font-mono font-black text-primary p-3">~1.5x to 3x</TableCell><TableCell className="text-xs font-black uppercase text-primary p-3">Sustainable but Capital Heavy</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="p-6 border bg-muted/5 space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Takeaway</h5>
                    <p className="text-sm leading-relaxed">
                      "Business is highly sensitive to conversion rates. Strong performance depends on activation and onboarding. Even at 1% conversion, LTV remains higher than CAC, though growth becomes slower and capital-heavy."
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </GuideTooltip>
        </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1 flex flex-col">
            <p className="text-sm leading-relaxed text-muted-foreground">
              For every ₹1 we spend to acquire a customer, we earn ₹4 to ₹10 back over their lifetime.
            </p>
            <div className="p-6 border border-primary/20 bg-primary/5 text-center mt-auto">
               <div className="text-5xl font-black tracking-tighter text-primary">4x - 10x</div>
               <div className="text-[10px] font-bold text-primary uppercase mt-2 tracking-widest">ROI Multiplier (Base Case)</div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic text-center">
              "Validates sustainable growth model."
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🔷 Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="rounded-none border shadow-none p-8 space-y-4 bg-muted/5">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Strategic Insight</h4>
            <p className="text-base font-bold leading-relaxed text-foreground">
               LTV is driven by two core factors: the ₹20k yearly gross contribution and the 3-5 year retention rate. As acquisition efficiency improves, our ROAS multiplies.
            </p>
         </Card>
         <Card className="rounded-none border shadow-none p-8 space-y-4 bg-primary/5 border-primary/30">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary">The Sustainability Rule</h4>
            <p className="text-base font-bold leading-relaxed text-primary">
               Even in non-ideal conditions (1% conversion or 20% churn), the business maintains a positive LTV:CAC spread, ensuring capital efficiency during scaling.
            </p>
         </Card>
      </div>
      
      {/* 🔷 Bottom Legend Bar */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { icon: <Info className="size-4" />, text: "Churn stress test @ 20% conservative" },
           { icon: <Info className="size-4" />, text: "LTV based on ₹20k baseline contribution" },
           { icon: <Info className="size-4" />, text: "Capital efficient even at 1% conversion" },
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

export default function LTVPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading...</div>}>
      <LTVContent />
    </Suspense>
  )
}
