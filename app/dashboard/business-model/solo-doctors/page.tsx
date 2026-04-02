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
import { TrendingUp, Users, DollarSign, Calculator, Zap, Rocket, CheckCircle2, Info } from "lucide-react"
import { GuideTooltip } from "../guide-tooltip"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

export default function SoloDoctorsPage() {
  const [showGuide, setShowGuide] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12" onClick={() => setShowGuide(false)}>
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Solo Doctors Model</h1>
        <p className="text-sm text-muted-foreground">Commercial unit economics for individual practices</p>
      </div>

      {/* 🔷 1. Top Section — Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        {[
          { label: "Year 1 Revenue", value: "₹10.12 L", sub: "50 Doctors" },
          { label: "Year 2 Revenue", value: "₹39.90 L", sub: "100 Doctors" },
          { label: "Year 3 Revenue", value: "₹97.32 L", sub: "200 Doctors" },
          { label: "Y3 Contribution", value: "₹52.92 L", sub: "54.4% Margin" },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-muted/5">
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{kpi.label}</div>
            <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 🔷 2. Main Content Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* REVENUE SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="size-3 text-primary" /> Revenue Logic
              </CardTitle>
            </div>
            <GuideTooltip text="See revenue math & projection" show={showGuide} onDismiss={() => setShowGuide(false)}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 rounded-none font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">See Calculation</Button>
                </SheetTrigger>
                <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col">
                  <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
                    <SheetTitle className="text-2xl font-bold uppercase tracking-tight text-left">Revenue Breakdown</SheetTitle>
                    <SheetDescription className="text-sm font-medium uppercase tracking-widest text-left">Blended Subscription Revenue Model</SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground text-left">Waterfall Projection (L)</h4>
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-xs uppercase font-black px-4">Metric</TableHead>
                            <TableHead className="h-10 text-xs uppercase font-black text-right px-4">Year 1</TableHead>
                            <TableHead className="h-10 text-xs uppercase font-black text-right px-4">Year 2</TableHead>
                            <TableHead className="h-10 text-xs uppercase font-black text-right px-4">Year 3</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b font-mono text-sm"><TableCell className="font-bold"># New Subscribers</TableCell><TableCell className="text-right">50</TableCell><TableCell className="text-right">100</TableCell><TableCell className="text-right">200</TableCell></TableRow>
                          <TableRow className="border-b font-mono text-sm"><TableCell className="font-bold">Opening ARR</TableCell><TableCell className="text-right">0.00 L</TableCell><TableCell className="text-right">20.23 L</TableCell><TableCell className="text-right">59.58 L</TableCell></TableRow>
                          <TableRow className="border-b font-mono text-sm text-emerald-600"><TableCell className="font-bold">+ New ARR</TableCell><TableCell className="text-right">+20.23 L</TableCell><TableCell className="text-right">+39.75 L</TableCell><TableCell className="text-right">+76.67 L</TableCell></TableRow>
                          <TableRow className="border-b font-mono text-sm text-emerald-600"><TableCell className="font-bold">+ Expansion</TableCell><TableCell className="text-right">+0.00 L</TableCell><TableCell className="text-right">+3.64 L</TableCell><TableCell className="text-right">+10.72 L</TableCell></TableRow>
                          <TableRow className="border-b font-mono text-sm text-rose-600"><TableCell className="font-bold">- Churn (20%)</TableCell><TableCell className="text-right">-0.00 L</TableCell><TableCell className="text-right">-4.05 L</TableCell><TableCell className="text-right">-11.92 L</TableCell></TableRow>
                          <TableRow className="border-b-2 font-black text-sm bg-muted/20"><TableCell className="font-black uppercase">Closing ARR</TableCell><TableCell className="text-right font-black">20.23 L</TableCell><TableCell className="text-right font-black">59.58 L</TableCell><TableCell className="text-right font-black">135.06 L</TableCell></TableRow>
                          <TableRow className="font-bold text-sm bg-primary/5"><TableCell className="uppercase">Recognized Rev</TableCell><TableCell className="text-right font-black">10.12 L</TableCell><TableCell className="text-right font-black">39.90 L</TableCell><TableCell className="text-right font-black">97.32 L</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="p-6 border bg-muted/5 space-y-4">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-primary text-left">Strategic Insight</h5>
                      <p className="text-sm leading-relaxed italic text-left">
                        "Solo doctor revenue assumes a transition from 70% monthly adoption in Year 1 to 70% annual by Year 3. This increases retention but drives a blended ARPU decline from ₹40,461 to ₹38,335."
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </GuideTooltip>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1 text-left">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Blended model shifting from 70% Monthly (Y1) to 70% Annual (Y3). 
              Increases discounted penetration but stabilizes long-term retention.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">NRR Impact</span><span className="text-lg font-black tracking-tight">98%</span></div>
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">Expansion</span><span className="text-lg font-black tracking-tight">18%</span></div>
              <div className="flex justify-between items-end border-b pb-2"><span className="text-[10px] font-bold uppercase text-muted-foreground">Churn Rate</span><span className="text-lg font-black tracking-tight text-rose-600">20%</span></div>
            </div>
          </CardContent>
        </Card>

        {/* COGS SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col text-left overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Zap className="size-3 text-primary" /> Delivery Cost (COGS)
            </CardTitle>
            <GuideTooltip text="View COGS breakdown logic" show={showGuide} onDismiss={() => setShowGuide(false)}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 rounded-none font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">See Calculation</Button>
                </SheetTrigger>
                <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col">
                  <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
                    <SheetTitle className="text-2xl font-bold tracking-tight text-left">Delivery Cost (COGS) Analysis</SheetTitle>
                    <SheetDescription className="text-sm font-medium text-muted-foreground text-left uppercase tracking-widest">Technical Cost Modeling & Logic</SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-24">
                    
                    {/* 🔷 1. Usage Assumptions */}
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">01. Doctor Usage Assumptions</div>
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Metric</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Value</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4 whitespace-nowrap">Unit</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Notes / Logic</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Patients per day</TableCell><TableCell className="text-right font-mono font-bold">25</TableCell><TableCell className="text-muted-foreground">patients</TableCell><TableCell className="text-xs text-muted-foreground">Typical solo GP OPD volume</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Avg consult duration</TableCell><TableCell className="text-right font-mono font-bold">5</TableCell><TableCell className="text-muted-foreground">minutes</TableCell><TableCell className="text-xs text-muted-foreground">Primary care global average</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Speech per consult</TableCell><TableCell className="text-right font-mono font-bold">1.5</TableCell><TableCell className="text-muted-foreground">minutes</TableCell><TableCell className="text-xs text-muted-foreground">After automated silence trimming (~20%)</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Working days per year</TableCell><TableCell className="text-right font-mono font-bold">270</TableCell><TableCell className="text-muted-foreground">days</TableCell><TableCell className="text-xs text-muted-foreground">Standard private practice working norm</TableCell></TableRow>
                          <TableRow className="border-b text-sm bg-primary/[0.02]"><TableCell className="font-bold">Total speech per year</TableCell><TableCell className="text-right font-mono font-bold text-primary">10,125</TableCell><TableCell className="font-bold">minutes</TableCell><TableCell className="text-xs font-medium">37.5 mins/day × 270 days</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* 🔷 2. Variable AI Cost */}
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">02. Variable AI Cost (Per Doctor / Year)</div>
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Metric</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Value</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Unit</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Notes / Logic</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">STT Cost Rate</TableCell><TableCell className="text-right font-mono font-bold">0.8</TableCell><TableCell className="text-muted-foreground">INR/min</TableCell><TableCell className="text-xs text-muted-foreground">Azure/Google India blended benchmark</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Annual STT total</TableCell><TableCell className="text-right font-mono font-bold">8,100</TableCell><TableCell className="text-muted-foreground">INR</TableCell><TableCell className="text-xs text-muted-foreground">10,125 mins × ₹0.80</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">LLM cost per consult</TableCell><TableCell className="text-right font-mono font-bold">0.7</TableCell><TableCell className="text-muted-foreground">INR/con</TableCell><TableCell className="text-xs text-muted-foreground">gpt-4o-mini equiv optimized pipeline</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Annual LLM total</TableCell><TableCell className="text-right font-mono font-bold">4,725</TableCell><TableCell className="text-muted-foreground">INR</TableCell><TableCell className="text-xs text-muted-foreground">6,750 consults × ₹0.70</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">AI Ops Buffer</TableCell><TableCell className="text-right font-mono font-bold">3,206</TableCell><TableCell className="text-muted-foreground">INR</TableCell><TableCell className="text-xs text-muted-foreground">25% Retry + QC overhead allowance</TableCell></TableRow>
                          <TableRow className="border-b text-sm bg-primary/[0.02]"><TableCell className="font-bold">Total AI Cost</TableCell><TableCell className="text-right font-mono font-bold text-primary">16,031</TableCell><TableCell className="font-bold">INR/year</TableCell><TableCell className="text-xs font-medium">STT + LLM + AI Ops Overhead</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* 🔷 3. Platform & Infrastructure Cost */}
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">03. Platform & Infrastructure Cost (Per Doctor / Year)</div>
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Metric</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Value</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Unit</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Notes / Logic</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Audio Storage</TableCell><TableCell className="text-right font-mono font-bold">600</TableCell><TableCell className="text-muted-foreground">INR/year</TableCell><TableCell className="text-xs text-muted-foreground">High volume compressed object storage</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Metadata storage</TableCell><TableCell className="text-right font-mono font-bold">70</TableCell><TableCell className="text-muted-foreground">INR/year</TableCell><TableCell className="text-xs text-muted-foreground">Structured notes and logs</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Backend infrastructure</TableCell><TableCell className="text-right font-mono font-bold">750</TableCell><TableCell className="text-muted-foreground">INR/year</TableCell><TableCell className="text-xs text-muted-foreground">APIs, Database, and Queue management</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Security & logging</TableCell><TableCell className="text-right font-mono font-bold">400</TableCell><TableCell className="text-muted-foreground">INR/year</TableCell><TableCell className="text-xs text-muted-foreground">Encryption, audits, and compliance logs</TableCell></TableRow>
                          <TableRow className="border-b text-sm bg-primary/[0.02]"><TableCell className="font-bold">Total Platform Cost</TableCell><TableCell className="text-right font-mono font-bold text-primary">1,820</TableCell><TableCell className="font-bold">INR/year</TableCell><TableCell className="text-xs font-medium">Non-AI backend operational costs</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* 🔷 4. Final COGS Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border">
                      <div className="p-8 border-b md:border-b-0 md:border-r bg-muted/5 space-y-2 flex flex-col justify-center">
                         <div className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <DollarSign className="size-3 text-primary" /> Total Unit Cost / Year
                         </div>
                         <div className="text-5xl font-black tracking-tighter">₹17,851</div>
                         <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 tracking-widest">Fixed delivery rate per doctor</div>
                      </div>
                      <div className="p-8 bg-primary/[0.03] space-y-6">
                         <div className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-[0.2em]">
                            <TrendingUp className="size-3" /> 3-Year Aggregate COGS (L)
                         </div>
                         <div className="space-y-4">
                           <div className="flex justify-between items-end border-b border-primary/10 pb-2">
                              <span className="text-xs font-bold text-muted-foreground uppercase">Year 1 (50 Docs)</span>
                              <span className="text-xl font-black text-primary">₹8.93 L</span>
                           </div>
                           <div className="flex justify-between items-end border-b border-primary/10 pb-2">
                              <span className="text-xs font-bold text-muted-foreground uppercase">Year 2 (100 Docs)</span>
                              <span className="text-xl font-black text-primary">₹17.85 L</span>
                           </div>
                           <div className="flex justify-between items-end border-b border-primary/10 pb-2">
                              <span className="text-xs font-bold text-muted-foreground uppercase">Year 3 (200 Docs)</span>
                              <span className="text-xl font-black text-primary">₹35.70 L</span>
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* 🧠 Disclaimer */}
                    <div className="p-6 border border-dashed flex items-start gap-4">
                       <Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                       <p className="text-xs text-muted-foreground leading-relaxed">
                          These costs are based on assumed usage patterns (10,125 minutes/year) and may vary depending on actual doctor behavior, system efficiency improvements, and cloud scaling discounts. Calculations exclude G&A and general marketing overheads.
                       </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </GuideTooltip>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fixed delivery cost remains constant at ₹17,851/doc throughout Year 1-3. 
              Efficiency is gained through infra volume discounting.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>AI processing scales linearly with units</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>Infra baseline covers 24/7 availability</span>
              </div>
            </div>
            <div className="mt-auto pt-4 bg-muted/5 p-4 border border-dashed text-center">
              <div className="text-2xl font-black">₹17,851</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Stable Delivery Rate</div>
            </div>
          </CardContent>
        </Card>

        {/* CAC SECTION */}
        <Card className="border shadow-none rounded-none flex flex-col text-left overflow-visible">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Users className="size-3 text-primary" /> Acquisition (CAC)
            </CardTitle>
            <GuideTooltip text="Examine CAC funnel details" show={showGuide} onDismiss={() => setShowGuide(false)}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 rounded-none font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">See Calculation</Button>
                </SheetTrigger>
                <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col">
                  <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
                    <SheetTitle className="text-2xl font-bold tracking-tight text-left">Customer Acquisition Cost (CAC) Logic</SheetTitle>
                    <SheetDescription className="text-sm font-medium text-muted-foreground text-left uppercase tracking-widest">Growth Funnel & Conversion Modeling</SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-24">
                    <div className="bg-primary/5 p-6 border-l-4 border-primary space-y-2">
                      <p className="text-base font-bold text-primary uppercase tracking-tight">Definition</p>
                      <p className="text-sm font-medium leading-relaxed">
                        CAC is the total cost required to acquire one paying doctor, calculated using a bottom-up funnel model: 
                        <span className="block mt-2 font-mono font-black text-lg">CAC = Total Spend / Paying Customers</span>
                      </p>
                    </div>

                    {/* 🔷 STEP 1: COST PER TRIAL USER */}
                    <div className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">01. Cost Per Trial User (Trial Cost + Acquisition)</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                           <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground">A. Trial Usage Cost Breakdown</h5>
                           <Table>
                             <TableBody>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">Recordings / Day</TableCell><TableCell className="text-right font-mono font-bold p-2">5</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">Mins / Recording</TableCell><TableCell className="text-right font-mono font-bold p-2">8</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">Trial Duration</TableCell><TableCell className="text-right font-mono font-bold p-2">5 Days</TableCell></TableRow>
                               <TableRow className="border-b text-sm bg-muted/20"><TableCell className="font-bold p-2">Total Trial Mins</TableCell><TableCell className="text-right font-mono font-black p-2">200</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">STT Cost (₹0.8/min)</TableCell><TableCell className="text-right font-mono font-bold p-2">₹160.0</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">LLM Cost (₹0.7/con)</TableCell><TableCell className="text-right font-mono font-bold p-2">₹17.5</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">AI Ops (20%)</TableCell><TableCell className="text-right font-mono font-bold p-2">₹35.5</TableCell></TableRow>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">Infra Allocation</TableCell><TableCell className="text-right font-mono font-bold p-2">₹15.0</TableCell></TableRow>
                               <TableRow className="bg-primary/5 text-primary"><TableCell className="font-black uppercase text-[10px] p-2">Total Trial Cost</TableCell><TableCell className="text-right font-mono font-black p-2">₹230</TableCell></TableRow>
                             </TableBody>
                           </Table>
                         </div>
                         <div className="space-y-4">
                           <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground">B. Paid Acquisition Cost</h5>
                           <Table>
                             <TableBody>
                               <TableRow className="border-b text-sm"><TableCell className="font-medium p-2">Meta + Google Ads</TableCell><TableCell className="text-right font-mono font-bold p-2">₹120</TableCell></TableRow>
                               <TableRow className="mt-8 bg-primary/5 text-primary"><TableCell className="font-black uppercase text-[10px] p-2">Total per trial</TableCell><TableCell className="text-right font-mono font-black p-2">₹350</TableCell></TableRow>
                             </TableBody>
                           </Table>
                           <div className="p-6 border bg-muted/5 space-y-2">
                              <div className="text-[10px] font-bold uppercase text-muted-foreground">Cost Per Trial User</div>
                              <div className="text-4xl font-black tracking-tighter">₹350</div>
                           </div>
                         </div>
                      </div>
                    </div>

                    <Separator className="opacity-50" />

                    {/* 🔷 STEP 2 & 3: CONVERSION & CAC MATH */}
                    <div className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">02. Conversion to Paying Users (Logic)</div>
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Scenario (per 100 trials)</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Payers</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Total Spend</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Derived CAC</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 1 (2% Conv)</TableCell><TableCell className="text-right font-mono font-bold">2</TableCell><TableCell className="text-right font-mono">₹35,000</TableCell><TableCell className="text-right font-mono font-black text-rose-600">₹17,500</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 2 (5% Conv)</TableCell><TableCell className="text-right font-mono font-bold">5</TableCell><TableCell className="text-right font-mono">₹35,000</TableCell><TableCell className="text-right font-mono font-black text-emerald-600">₹7,000</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 3 (8% Conv)</TableCell><TableCell className="text-right font-mono font-bold">8</TableCell><TableCell className="text-right font-mono">₹35,000</TableCell><TableCell className="text-right font-mono font-black text-emerald-600">₹4,375</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* 🔷 STEP 4: SCALING LOGIC */}
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">03. Scaling Efficiency Driven by Funnel Optimization</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="p-4 border bg-muted/5 space-y-2">
                            <div className="text-[10px] font-bold uppercase text-muted-foreground">Year 1 Dynamics</div>
                            <p className="text-xs leading-relaxed text-muted-foreground">Low conversion (2%) results in high CAC. Significant trial volume needed for initial user acquisition.</p>
                         </div>
                         <div className="p-4 border bg-muted/5 space-y-2">
                            <div className="text-[10px] font-bold uppercase text-muted-foreground">Year 2 Dynamics</div>
                            <p className="text-xs leading-relaxed text-muted-foreground">Onboarding and funnel optimization increases conversion to 5%. CAC reduces significantly.</p>
                         </div>
                         <div className="p-4 border bg-muted/5 space-y-2">
                            <div className="text-[10px] font-bold uppercase text-emerald-600">Year 3 Dynamics</div>
                            <p className="text-xs leading-relaxed text-muted-foreground">Stronger fit and referrals drive conversion to 8%. CAC becomes highly efficient for scale.</p>
                         </div>
                      </div>
                    </div>

                    {/* 🔷 STEP 5: TRIAL → CUSTOMER FUNNEL */}
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">04. Trial → Customer Funnel (Required Volume)</div>
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Period</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Target Doctors</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Conversion %</TableHead>
                            <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Trials Required</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b text-sm"><TableCell className="font-bold">Year 1</TableCell><TableCell className="text-right font-mono">50</TableCell><TableCell className="text-right font-mono">2%</TableCell><TableCell className="text-right font-mono font-black">2,500</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-bold">Year 2</TableCell><TableCell className="text-right font-mono">100</TableCell><TableCell className="text-right font-mono">5%</TableCell><TableCell className="text-right font-mono font-black">2,000</TableCell></TableRow>
                          <TableRow className="border-b text-sm"><TableCell className="font-bold">Year 3</TableCell><TableCell className="text-right font-mono">200</TableCell><TableCell className="text-right font-mono">8%</TableCell><TableCell className="text-right font-mono font-black">3,750</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* 🔷 FINAL SUMMARY GRID */}
                    <div className="grid grid-cols-2 gap-0 border">
                      <div className="p-8 border-r bg-muted/5 space-y-2">
                         <div className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <Users className="size-3" /> Cost Per Trial User
                         </div>
                         <div className="text-5xl font-black tracking-tighter">₹350</div>
                         <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 tracking-widest">Base cost to acquire trial</div>
                      </div>
                      <div className="p-8 bg-primary/5 space-y-4">
                         <div className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                            <TrendingUp className="size-3" /> Conversion Leap
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="text-4xl font-black tracking-tighter text-primary/40">2%</div>
                            <div className="h-0.5 w-12 bg-primary/20"></div>
                            <div className="text-5xl font-black tracking-tighter text-primary">8%</div>
                         </div>
                         <div className="text-[10px] font-bold text-primary uppercase opacity-70 tracking-widest">Year 1 to Year 3 target</div>
                      </div>
                    </div>

                    {/* 🧠 Core Modeling Assumptions */}
                    <div className="p-6 border border-dashed hover:border-muted-foreground/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <Calculator className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Core Modeling Assumptions</p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                            <li className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary font-bold">•</span>
                              Trial usage reflects realistic doctor behavior in frequency and duration.
                            </li>
                            <li className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary font-bold">•</span>
                              Trial users are aligned with the target segment and not unqualified traffic.
                            </li>
                            <li className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary font-bold">•</span>
                              Product demonstrates clear value during trial, reducing documentation effort.
                            </li>
                            <li className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary font-bold">•</span>
                              Paid acquisition cost per signup remains stable during early growth stages.
                            </li>
                            <li className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary font-bold">•</span>
                              Conversion rates improve over time due to onboarding and referral momentum.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </GuideTooltip>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Referral momentum and conversion optimization drive CAC down by 75% over 3 years.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border">
                <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Y1 Initial</div>
                <div className="text-base font-black">₹17,400</div>
              </div>
              <div className="p-3 border border-emerald-500/20 bg-emerald-500/5">
                <div className="text-[9px] font-bold uppercase text-emerald-600 tracking-widest">Y3 Target</div>
                <div className="text-base font-black text-emerald-600">₹4,350</div>
              </div>
            </div>
            <p className="text-[10px] font-medium text-muted-foreground mt-4 italic text-left">
              "Efficiency stems from a 5% to 15% conversion improvement."
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🔷 3. Unit Contribution Summary */}
      <Card className="border shadow-none rounded-none border-emerald-500/30">
        <CardHeader className="py-4 px-6 border-b bg-emerald-500/5">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-700">Unit Contribution Summary (₹ L)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
            {[
              { y: "Year 1", v: "-₹7.51 L", c: "text-rose-600" },
              { y: "Year 2", v: "₹15.09 L", c: "text-emerald-600" },
              { y: "Year 3", v: "₹52.92 L", c: "text-emerald-600" },
            ].map((item, i) => (
              <div key={i} className="p-10 text-center">
                <div className="text-[10px] font-black uppercase text-muted-foreground mb-2 tracking-widest">{item.y}</div>
                <div className={cn("text-3xl font-black tracking-tighter", item.c)}>{item.v}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-muted/5 text-center px-8">
             <p className="text-xs font-medium text-muted-foreground italic uppercase tracking-wider">
               "Average Unit contribution turns positive in Year 2, reaching high-velocity profitability in Year 3."
             </p>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 Strategic Bottom Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Positive Contribution in Y2" },
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Fixed COGS covers infra scale" },
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "CAC reduces by 75% through conversions" },
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Compounding ARR: ₹135.06 L closing" },
         ].map((item, i) => (
           <div key={i} className="flex flex-col gap-2 p-4 border bg-muted/5 border-muted text-left">
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{item.text}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
