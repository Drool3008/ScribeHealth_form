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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertTriangle, 
  TrendingDown, 
  ShieldAlert, 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Activity,
  DollarSign
} from "lucide-react"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

export default function BusinessRisksPage() {
  const [activeRisk, setActiveRisk] = React.useState("risk-1")

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 SECTION 1: HEADER */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Revenue & Growth Risks</h1>
        <p className="text-sm text-muted-foreground">Understanding downside scenarios and financial sensitivity</p>
      </div>

      {/* 🔷 SECTION 2: RISK SELECTOR */}
      <Tabs defaultValue="risk-1" onValueChange={setActiveRisk} className="w-full">
        <TabsList className="bg-muted/30 p-1 w-full md:w-auto h-auto grid grid-cols-1 md:flex rounded-none items-stretch">
          <TabsTrigger value="risk-1" className="rounded-none text-xs font-bold py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <AlertTriangle className="size-3 mr-2 text-rose-500" /> Overestimated Unit Growth
          </TabsTrigger>
          <TabsTrigger value="risk-2" className="rounded-none text-xs font-bold py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <TrendingDown className="size-3 mr-2 text-rose-500" /> CAC Underperformance
          </TabsTrigger>
          <TabsTrigger value="risk-3" className="rounded-none text-xs font-bold py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <ShieldAlert className="size-3 mr-2 text-rose-500" /> Retention / Churn Risk
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-8">
          <TabsContent value="risk-1" className="space-y-8">
            <RiskContent 
              riskTitle="Overestimated Unit Growth"
              riskDescription="Lower adoption rate due to slower market entry or longer sales cycles"
              baseUsers={[50, 100, 200]}
              stressUsers={[50, 70, 140]}
              failureScenarios={[
                "Revenue drops significantly (proportionally)",
                "CAC efficiency worsens (fixed marketing spend spreads across fewer users)",
                "Payback period increases due to lower utilization"
              ]}
              costRigidityPoints={[
                "G&A remains mostly fixed despite lower revenue",
                "Infrastructure costs do not reduce proportionally",
                "Marketing/CAC is already spent upfront to acquire current base"
              ]}
              ebitdaImpact="Negative in Year 2 (~ -13%)"
              outcome="Profitability delayed | Business still profitable in Year 3"
              outcomeStatus="survivable"
              mitigations={[
                "Lock distribution partnerships early to guarantee baseline volume",
                "Focus on 1–2 high-conversion acquisition channels exclusively",
                "Validate conversion with ~100 paying users before more aggressive scaling",
                "Optimize onboarding to improve trial → paid conversion efficiency"
              ]}
            />
          </TabsContent>

          <TabsContent value="risk-2" className="space-y-8">
            <div className="p-12 border border-dashed text-center space-y-4">
              <TrendingDown className="size-12 text-muted-foreground mx-auto opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Detailed CAC Sensitivity Modeling In Progress</p>
              <p className="text-xs text-muted-foreground">Scenario: 2x CAC with 1% conversion stress test</p>
            </div>
          </TabsContent>

          <TabsContent value="risk-3" className="space-y-8">
             <div className="p-12 border border-dashed text-center space-y-4">
              <ShieldAlert className="size-12 text-muted-foreground mx-auto opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Retention Decay Modeling In Progress</p>
              <p className="text-xs text-muted-foreground">Scenario: 30% annual churn (stress case)</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function RiskContent({ 
  riskTitle, 
  riskDescription, 
  baseUsers, 
  stressUsers, 
  failureScenarios, 
  costRigidityPoints,
  ebitdaImpact,
  outcome,
  outcomeStatus,
  mitigations
}: any) {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      
      {/* 🔷 SECTION 3: BASE VS STRESS COMPARISON */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-4 px-6 border-b bg-muted/5">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-foreground">Base vs Stress Adoption (Doctors)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[200px] h-10 text-[10px] font-black uppercase">Scenario</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase text-right">Year 1</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase text-right">Year 2</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase text-right">Year 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b font-mono text-sm h-12">
                <TableCell className="font-bold flex items-center gap-2"><div className="size-1.5 rounded-full bg-emerald-500"></div> Base Case</TableCell>
                <TableCell className="text-right font-black">{baseUsers[0]}</TableCell>
                <TableCell className="text-right font-black">{baseUsers[1]}</TableCell>
                <TableCell className="text-right font-black">{baseUsers[2]}</TableCell>
              </TableRow>
              <TableRow className="font-mono text-sm h-12 bg-rose-500/5">
                <TableCell className="font-bold text-rose-600 flex items-center gap-2"><div className="size-1.5 rounded-full bg-rose-500"></div> Stress Case (30-40% lower)</TableCell>
                <TableCell className="text-right font-black text-rose-600">{stressUsers[0]}</TableCell>
                <TableCell className="text-right font-black text-rose-600">{stressUsers[1]}</TableCell>
                <TableCell className="text-right font-black text-rose-600">{stressUsers[2]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="p-4 bg-muted/10 flex items-center gap-2 border-t">
            <Info className="size-4 text-muted-foreground" />
            <p className="text-[10px] font-medium text-muted-foreground italic">
              “If adoption is lower than expected, revenue declines proportionally while most costs remain fixed.”
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 SECTION 4: WHAT COULD GO WRONG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border shadow-none rounded-none bg-rose-500/[0.02]">
           <CardHeader className="py-4 px-6 border-b border-rose-100">
             <CardTitle className="text-xs font-black uppercase tracking-widest text-rose-700 flex items-center gap-2">
               <Target className="size-3" /> Failure Scenario
             </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-4">
             <p className="text-[10px] font-black uppercase text-rose-900 tracking-tight">Impact on Core Metrics:</p>
             <ul className="space-y-4">
               {failureScenarios.map((s: string, i: number) => (
                 <li key={i} className="flex gap-3 text-sm text-rose-900/80 leading-relaxed font-medium">
                   <span className="text-rose-500 font-black shrink-0 md:text-base">—</span>
                   {s}
                 </li>
               ))}
             </ul>
           </CardContent>
        </Card>

        <Card className="border shadow-none rounded-none bg-muted/5">
           <CardHeader className="py-4 px-6 border-b border-muted">
             <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
               <Zap className="size-3" /> Cost Rigidity (Why this hurts)
             </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-4">
             <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tight">Fixed Expense Burden:</p>
             <ul className="space-y-4">
               {costRigidityPoints.map((s: string, i: number) => (
                 <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed font-medium">
                   <span className="text-primary font-black shrink-0 md:text-base">•</span>
                   {s}
                 </li>
               ))}
             </ul>
           </CardContent>
        </Card>
      </div>

      {/* 🔷 SECTION 5: STRESS TEST MODEL */}
      <div className="border border-rose-500/20 bg-rose-500/[0.03] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-rose-500/10">
          
          <div className="p-8 space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-rose-600 flex items-center gap-2">
              <Activity className="size-3" /> Adjusted Units
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-rose-100 pb-2">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Y2 Units Target</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-muted-foreground line-through decoration-rose-300">100</span>
                  <ArrowRight className="size-3 text-rose-500" />
                  <span className="text-xl font-black text-rose-600">{stressUsers[1]}</span>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-rose-100 pb-2">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Y3 Units Target</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-muted-foreground line-through decoration-rose-300">200</span>
                  <ArrowRight className="size-3 text-rose-500" />
                  <span className="text-xl font-black text-rose-600">{stressUsers[2]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6 bg-white/20">
            <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 flex items-center gap-2">
              <DollarSign className="size-3" /> Financial Impact
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-rose-900/60 uppercase">Impact on EBITDA (Y2)</div>
              <div className="text-4xl font-black tracking-tighter text-rose-700">{ebitdaImpact}</div>
            </div>
            <p className="text-[10px] font-medium text-rose-900/40 italic leading-snug">
              Fixed costs spread across lower volume drive heavy percentage margin compression.
            </p>
          </div>

          <div className="p-8 space-y-6 bg-rose-500/[0.05]">
            <div className="text-[10px] font-black uppercase tracking-widest text-rose-800 flex items-center gap-2">
              <ShieldCheck className="size-3" /> Survival Outcome
            </div>
            <div className="space-y-3">
               <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                 <ShieldCheck className="size-3" /> Fully Survivable
               </div>
               <p className="text-sm font-bold text-rose-950/80 leading-relaxed uppercase tracking-tight leading-snug">
                 {outcome}
               </p>
            </div>
            <div className="p-4 bg-white/50 border border-white space-y-2">
              <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                “The business is sensitive to early growth assumptions but remains viable if growth recovers.”
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 🔷 SECTION 6: MITIGATION STRATEGY */}
      <Card className="border-none shadow-none bg-primary/[0.03] rounded-none">
        <CardHeader className="py-6 px-10 border-b border-primary/10">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
            🛡️ Mitigation Strategy
          </CardTitle>
          <CardDescription className="text-primary/70 font-medium tracking-wide">Proactive actions to decrease adoption risks</CardDescription>
        </CardHeader>
        <CardContent className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {mitigations.map((m: string, i: number) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
                  <span className="text-[10px] font-black text-primary group-hover:text-white">{i + 1}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-primary/90 leading-relaxed uppercase tracking-tight">{m.split(' ').slice(0, 3).join(' ')}</p>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
