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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
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

export function RiskClient({ riskId }: { riskId: string }) {
  if (riskId === "risk1") {
    return (
      <RiskContent 
        riskTitle="Risk 1: Overestimated Unit Growth"
        riskDescription="Lower adoption rate due to slower market entry or longer sales cycles"
        metricLabel="Doctors"
        baseValues={[50, 100, 200]}
        stressValues={[35, 70, 140]}
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
        impactNote="Fixed G&A spreads across 30% fewer units driving negative yield."
        outcome="Profitability delayed | Business still profitable in Year 3"
        mitigations={[
          "Lock distribution partnerships early to guarantee baseline volume",
          "Focus on 1–2 high-conversion acquisition channels exclusively",
          "Validate conversion with ~100 paying users before more aggressive scaling",
          "Optimize onboarding to improve trial → paid conversion efficiency"
        ]}
      />
    )
  }

  if (riskId === "risk2") {
    return (
      <RiskContent 
        riskTitle="Risk 2: CAC Shock (Marketing Stops Working)"
        riskDescription="Rising acquisition costs due to funnel breakdown or increased competition"
        metricLabel="CAC (₹)"
        prefix="₹"
        baseValues={[17400, 6960, 4350]}
        stressValues={[22000, 18000, 15000]}
        failureScenarios={[
          "Conversion drops significantly (5% → 3%)",
          "Paid channels become more expensive due to saturation",
          "Referrals do not scale as expected (organic dampening)",
          "Doctors delay or hesitate in decision-making (longer sales cycles)"
        ]}
        costRigidityPoints={[
          "G&A remains mostly fixed despite efficiency drops",
          "Infrastructure costs do not reduce proportionally",
          "CAC is already spent upfront to acquire current base"
        ]}
        ebitdaImpact="-28.2% in Year 2 (vs +2.1% in base case)"
        impactNote="High CAC inflation in early stages severely compresses EBITDA margins."
        outcome="Break-even delayed | Business remains profitable in Year 3"
        mitigations={[
          "Partner with medical associations for trusted distribution",
          "Integrate with EMR vendors to reduce acquisition cost",
          "Bundle into hospital software ecosystems as an add-on",
          "Shift focus toward organic and referral-led growth"
        ]}
        keyInsight="The business is sensitive to CAC inflation in early stages, but improves as reliance shifts from paid acquisition to distribution."
      />
    )
  }

  if (riskId === "risk3") {
    return (
      <div className="p-12 border border-dashed text-center space-y-4">
        <ShieldAlert className="size-12 text-muted-foreground mx-auto opacity-20" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Retention Decay Modeling In Progress</p>
        <p className="text-xs text-muted-foreground">Scenario: 30% annual churn (stress case)</p>
      </div>
    )
  }

  return (
    <div className="p-12 border border-dashed text-center space-y-4">
      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select a risk to view sensitivity analysis</p>
    </div>
  )
}

function RiskContent({ 
  riskTitle, 
  riskDescription, 
  metricLabel,
  prefix = "",
  baseValues, 
  stressValues, 
  failureScenarios, 
  costRigidityPoints,
  ebitdaImpact,
  impactNote,
  outcome,
  mitigations,
  keyInsight
}: any) {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      
      {/* 🔷 Alert Header */}
      <Alert variant="destructive" className="bg-rose-500/[0.03] border-rose-500/20 rounded-none">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-xs font-black uppercase tracking-widest text-rose-700">{riskTitle}</AlertTitle>
        <AlertDescription className="text-xs font-medium text-rose-600/80 italic mt-1 font-mono">
          {riskDescription}
        </AlertDescription>
      </Alert>

      {/* 🔷 SECTION 3: BASE VS STRESS COMPARISON */}
      <Card className="border shadow-none rounded-none overflow-hidden underline-none">
        <CardHeader className="py-4 px-6 border-b bg-muted/5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">Base vs Stress Comparison ({metricLabel})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[200px] h-10 text-[10px] font-bold uppercase tracking-wider">Scenario</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right">Year 1</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right">Year 2</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right">Year 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b font-mono text-sm h-12">
                <TableCell className="font-bold flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-emerald-500" /> Base Plan
                </TableCell>
                <TableCell className="text-right font-bold">{prefix}{baseValues[0].toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">{prefix}{baseValues[1].toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">{prefix}{baseValues[2].toLocaleString()}</TableCell>
              </TableRow>
              <TableRow className="font-mono text-sm h-12 bg-rose-500/[0.04]">
                <TableCell className="font-bold text-rose-600 flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-rose-500" /> Stress Shock
                </TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[0].toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[1].toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[2].toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="p-4 bg-muted/10 flex items-center gap-2 border-t">
            <Info className="size-3.5 text-muted-foreground/60" />
            <p className="text-[10px] font-medium text-muted-foreground/80 italic">
              “Cost rigidity means that infrastructure and G&A do not scale down if marketing efficiency drops.”
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 SECTION 4: WHAT COULD GO WRONG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border shadow-none rounded-none bg-rose-500/[0.02]">
           <CardHeader className="py-4 px-6 border-b border-rose-100">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-rose-700 flex items-center gap-2">
               <Target className="size-3.5 text-rose-500" /> Failure Scenario
             </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-4">
             <p className="text-[10px] font-bold uppercase text-rose-500/70 tracking-widest">Downside Impact</p>
             <ul className="space-y-4">
               {failureScenarios.map((s: string, i: number) => (
                 <li key={i} className="flex gap-3 text-[13px] text-rose-950 font-medium leading-relaxed">
                   <div className="size-1 rounded-full bg-rose-400 mt-2 shrink-0" />
                   {s}
                 </li>
               ))}
             </ul>
           </CardContent>
        </Card>

        <Card className="border shadow-none rounded-none bg-muted/5">
           <CardHeader className="py-4 px-6 border-b border-muted">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
               <Zap className="size-3.5 text-amber-500" /> Cost Rigidity
             </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-4">
             <p className="text-[10px] font-bold uppercase text-muted-foreground/70 tracking-widest">Financial Burden</p>
             <ul className="space-y-4">
               {costRigidityPoints.map((s: string, i: number) => (
                 <li key={i} className="flex gap-3 text-[13px] text-muted-foreground font-medium leading-relaxed">
                   <div className="size-1 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                   {s}
                 </li>
               ))}
             </ul>
           </CardContent>
        </Card>
      </div>

      {/* 🔷 SECTION 5: STRESS TEST MODEL */}
      <div className="border border-rose-500/10 bg-rose-500/[0.02] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-rose-500/10">
          
          <div className="p-8 space-y-6 bg-white/40">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700/60 flex items-center gap-2">
              <Activity className="size-3.5" /> Unit Sensitivity
            </div>
            <div className="space-y-4">
              {[
                { label: "Year 1", base: baseValues[0], stress: stressValues[0] },
                { label: "Year 2", base: baseValues[1], stress: stressValues[1] },
                { label: "Year 3", base: baseValues[2], stress: stressValues[2] },
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-end border-b border-rose-100/50 pb-2">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground/70">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground/40 line-through">{prefix}{row.base.toLocaleString()}</span>
                    <ArrowRight className="size-3 text-rose-300" />
                    <span className="text-lg font-bold text-rose-700">{prefix}{row.stress.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 space-y-6 bg-white/60">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700/60 flex items-center gap-2">
              <DollarSign className="size-3.5" /> Margin Compression
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-rose-900/40 uppercase">EBITDA Breakdown (Y2)</div>
              <div className="text-3xl font-bold tracking-tighter text-rose-700">{ebitdaImpact}</div>
            </div>
            <p className="text-[10px] font-medium text-rose-950/40 italic leading-normal">
              {impactNote}
            </p>
          </div>

          <div className="p-8 space-y-6 bg-rose-500/[0.04]">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-800/60 flex items-center gap-2">
              <ShieldCheck className="size-3.5" /> Model Resilience
            </div>
            <div className="space-y-3">
               <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                 <ShieldCheck className="size-3" /> Fully Survivable
               </div>
               <p className="text-xs font-bold text-rose-950/80 leading-relaxed uppercase tracking-tight">
                 {outcome}
               </p>
            </div>
            <p className="text-[10px] font-medium text-muted-foreground/60 leading-normal italic">
              {keyInsight || "“The stress test model shows capital reserves cover Y2 losses, reaching profitability on recovery.”"}
            </p>
          </div>

        </div>
      </div>

      {/* 🔷 SECTION 6: MITIGATION STRATEGY */}
      <Card className="border shadow-none bg-muted/10 rounded-none overflow-hidden">
        <CardHeader className="py-6 px-8 border-b bg-muted/5">
          <CardTitle className="text-xs font-bold uppercase tracking-[0.15em] text-foreground flex items-center gap-2">
            🛡️ Risk Mitigation Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {mitigations.map((m: string, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="size-6 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 mt-0.5 border">
                  <span className="text-[10px] font-bold text-foreground/40">{i + 1}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground/80 leading-relaxed uppercase tracking-tight">{m.split(' ').slice(0, 3).join(' ')}</p>
                  <p className="text-[11px] font-medium text-muted-foreground leading-relaxed italic">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
