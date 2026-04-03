"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  TrendingDown,
  Target,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  Activity,
  DollarSign,
  Users,
  RotateCcw,
  PackageOpen,
} from "lucide-react"

const riskTabs = [
  { id: "risk1", label: "Risk 1: Unit Growth",      icon: TrendingDown },
  { id: "risk2", label: "Risk 2: CAC Shock",         icon: Users },
  { id: "risk3", label: "Risk 3: Churn / Retention", icon: RotateCcw },
  { id: "risk4", label: "Risk 4: COGS Stability",    icon: PackageOpen },
  { id: "risk5", label: "Risk 5: Combined Collapse", icon: AlertTriangle },
]

export function RiskClient({ riskId }: { riskId: string }) {
  const router = useRouter()

  return (
    <div className="space-y-8">

      {/* ─── Tab navigation ─── */}
      <div className="border-b">
        <div className="flex items-stretch overflow-x-auto no-scrollbar">
          {riskTabs.map((tab) => {
            const isActive = riskId === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() =>
                  router.push(`/dashboard/business-model/risks/${tab.id}`)
                }
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-all duration-150",
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                )}
              >
                <Icon className="size-3.5 shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Risk content ─── */}
      {riskId === "risk1" && (
        <RiskContent
          riskTitle="Risk 1: Overestimated Unit Growth"
          riskDescription="Lower adoption rate due to slower market entry or longer sales cycles"
          metricLabel="Doctors"
          baseValues={[50, 100, 200]}
          stressValues={[35, 70, 140]}
          failureScenarios={[
            "Revenue drops significantly (proportionally)",
            "CAC efficiency worsens (fixed marketing spend spreads across fewer users)",
            "Payback period increases due to lower utilization",
          ]}
          costRigidityPoints={[
            "G&A remains mostly fixed despite lower revenue",
            "Infrastructure costs do not reduce proportionally",
            "Marketing/CAC is already spent upfront to acquire current base",
          ]}
          ebitdaImpact="Negative in Year 2 (~ -13%)"
          impactNote="Fixed G&A spreads across 30% fewer units driving negative yield."
          outcome="Profitability delayed | Business still profitable in Year 3"
          mitigations={[
            "Lock distribution partnerships early to guarantee baseline volume",
            "Focus on 1–2 high-conversion acquisition channels exclusively",
            "Validate conversion with ~100 paying users before more aggressive scaling",
            "Optimize onboarding to improve trial → paid conversion efficiency",
          ]}
        />
      )}

      {riskId === "risk2" && (
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
            "Doctors delay or hesitate in decision-making (longer sales cycles)",
          ]}
          costRigidityPoints={[
            "G&A remains mostly fixed despite efficiency drops",
            "Infrastructure costs do not reduce proportionally",
            "CAC is already spent upfront to acquire current base",
          ]}
          ebitdaImpact="-28.2% in Year 2 (vs +2.1% in base case)"
          impactNote="High CAC inflation in early stages severely compresses EBITDA margins."
          outcome="Break-even delayed | Business remains profitable in Year 3"
          mitigations={[
            "Partner with medical associations for trusted distribution",
            "Integrate with EMR vendors to reduce acquisition cost",
            "Bundle into hospital software ecosystems as an add-on",
            "Shift focus toward organic and referral-led growth",
          ]}
          keyInsight="The business is sensitive to CAC inflation in early stages, but improves as reliance shifts from paid acquisition to distribution."
        />
      )}

      {riskId === "risk3" && (
        <RiskContent
          riskTitle="Risk 3: Churn Increases (Retention Breakdown)"
          riskDescription="Weakening retention leading to higher turnover and constant need for replacement acquisition"
          metricLabel="Churn Rate (%)"
          suffix="%"
          baseValues={[20, 20, 20]}
          stressValues={[30, 30, 30]}
          failureScenarios={[
            "Doctors try the product but do not continue usage",
            "Competitors offer cheaper or simpler alternatives",
            "Product experience is inconsistent or unreliable",
            "Customer support debt builds as churn volume grows",
          ]}
          costRigidityPoints={[
            "Acquisition effort must continue to replace lost users (LTV/CAC worsens)",
            "CAC is already incurred upfront for the lost users",
            "Growth becomes dependent on constant and expensive new acquisition",
          ]}
          ebitdaImpact="-0.4% in Year 2 (vs +2.1% in base case)"
          impactNote="Retention drops turn narrow Year 2 profitability into a minor negative yield."
          outcome="Survival protected | Business remains profitable in Year 3"
          mitigations={[
            "Push annual subscriptions to lock in usage and reduce cancellation flexibility",
            "Strengthen customer success and onboarding support for the first 30 days",
            "Focus on high-value, high-usage doctors (ICP refinement)",
            "Improve product reliability and feature consistency to reduce 'churn-drivers'",
          ]}
          keyInsight="The business is sensitive to retention in the short term, but remains resilient if long-term usage and customer value are maintained."
        />
      )}

      {riskId === "risk4" && (
        <RiskContent
          riskTitle="Risk 4: COGS Instability (Cost Structure Risk)"
          riskDescription="Efficiency risk from rising AI/infrastructure delivery costs which compress gross margins."
          metricLabel="COGS per Doctor (₹)"
          prefix="₹"
          baseValues={[17851, 17851, 17851]}
          stressValues={[22000, 23000, 25000]}
          sectionTitleLeft="What Could Go Wrong?"
          sectionTitleRight="Outcome"
          failureScenarios={[
            "STT (Speech-to-Text) costs increase beyond expectations",
            "LLM/AI API pricing changes unexpectedly or model shifts",
            "Usage per doctor increases beyond the initial forecast",
            "Inefficient prompt engineering drives up inference cost",
          ]}
          costRigidityPoints={[
            "Gross margin compresses directly across all pricing tiers",
            "Contribution margin drops, making CAC recovery harder",
            "LTV reduces significantly even if revenue stays stable",
            "You may not cover acquisition costs in the first 6-8 months",
          ]}
          ebitdaImpact="-10.8% in Year 2 (vs +2.1% in base case)"
          impactNote="If AI costs rise another 15-20% beyond this, Y3 profitability becomes fragile."
          outcome="Survival protected | Viability depends on AI cost control"
          mitigations={[
            "Lock AI API pricing contracts where possible for 12 months",
            "Optimize model usage and reduce unnecessary inference cycles",
            "Continuously track per-consult cost monthly vs revenue yield",
            "Improve infrastructure efficiency and prompt optimization over time",
          ]}
          keyInsight="The business remains viable, but profitability is highly sensitive to AI pricing stability and cost control."
        />
      )}

      {riskId === "risk5" && <Risk5Content />}

      {!["risk1", "risk2", "risk3", "risk4", "risk5"].includes(riskId) && (
        <div className="p-12 border border-dashed text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Select a risk to view sensitivity analysis
          </p>
        </div>
      )}
    </div>
  )
}

function RiskContent({
  riskTitle,
  riskDescription,
  metricLabel,
  prefix = "",
  suffix = "",
  baseValues,
  stressValues,
  failureScenarios,
  costRigidityPoints,
  sectionTitleLeft = "Failure Scenario",
  sectionTitleRight = "Cost Rigidity",
  ebitdaImpact,
  impactNote,
  outcome,
  mitigations,
  keyInsight,
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

      {/* 🔷 BASE VS STRESS */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-4 px-6 border-b bg-muted/5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
            Base vs Stress Comparison ({metricLabel})
          </CardTitle>
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
                <TableCell className="text-right font-bold">{prefix}{baseValues[0].toLocaleString()}{suffix}</TableCell>
                <TableCell className="text-right font-bold">{prefix}{baseValues[1].toLocaleString()}{suffix}</TableCell>
                <TableCell className="text-right font-bold">{prefix}{baseValues[2].toLocaleString()}{suffix}</TableCell>
              </TableRow>
              <TableRow className="font-mono text-sm h-12 bg-rose-500/[0.04]">
                <TableCell className="font-bold text-rose-600 flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-rose-500" /> Stress Shock
                </TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[0].toLocaleString()}{suffix}</TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[1].toLocaleString()}{suffix}</TableCell>
                <TableCell className="text-right font-bold text-rose-600">{prefix}{stressValues[2].toLocaleString()}{suffix}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="p-4 bg-muted/10 flex items-center gap-2 border-t">
            <Info className="size-3.5 text-muted-foreground/60" />
            <p className="text-[10px] font-medium text-muted-foreground/80 italic">
              "Retention and churn volatility impact the compounding nature of the business model over time."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 WHAT COULD GO WRONG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border shadow-none rounded-none bg-rose-500/[0.02]">
          <CardHeader className="py-4 px-6 border-b border-rose-100">
            <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-rose-700 flex items-center gap-2">
              <Target className="size-3.5 text-rose-500" /> {sectionTitleLeft}
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
              <Zap className="size-3.5 text-amber-500" /> {sectionTitleRight}
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

      {/* 🔷 STRESS TEST MODEL */}
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
                    <span className="text-xs font-bold text-muted-foreground/40 line-through">{prefix}{row.base.toLocaleString()}{suffix}</span>
                    <ArrowRight className="size-3 text-rose-300" />
                    <span className="text-lg font-bold text-rose-700">{prefix}{row.stress.toLocaleString()}{suffix}</span>
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
            <p className="text-[10px] font-medium text-rose-950/40 italic leading-normal">{impactNote}</p>
          </div>

          <div className="p-8 space-y-6 bg-rose-500/[0.04]">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-800/60 flex items-center gap-2">
              <ShieldCheck className="size-3.5" /> Model Resilience
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                <ShieldCheck className="size-3" /> Fully Survivable
              </div>
              <p className="text-xs font-bold text-rose-950/80 leading-relaxed uppercase tracking-tight">{outcome}</p>
            </div>
            <p className="text-[10px] font-medium text-muted-foreground/60 leading-normal italic">
              {keyInsight || `"The stress test model shows capital reserves cover Y2 losses, reaching profitability on recovery."`}
            </p>
          </div>
        </div>
      </div>

      {/* 🔷 MITIGATION */}
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
                  <p className="text-xs font-bold text-foreground/80 leading-relaxed uppercase tracking-tight">
                    {m.split(" ").slice(0, 3).join(" ")}
                  </p>
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

function Risk5Content() {
  // ─── Historical (stressed) P&L: Y1-Y3 ───
  const historical = [
    { label: "Revenue",        y1: 7.08,   y1p: 100,    y2: 27.22,  y2p: 100,    y3: 64.71,  y3p: 100,    bold: true,  positive: true },
    { label: "  Solo Doctors", y1: 7.08,   y1p: null,   y2: 27.22,  y2p: null,   y3: 64.71,  y3p: null,   indent: true },
    { label: "COGS",           y1: -6.25,  y1p: -88.2,  y2: -12.50, y2p: -45.9,  y3: -24.99, y3p: -38.6,  negative: true },
    { label: "Gross Margin",   y1: 0.83,   y1p: 11.8,   y2: 14.73,  y2p: 54.1,   y3: 39.71,  y3p: 61.4,   bold: true, highlight: true },
    { label: "CAC / Marketing",y1: -6.09,  y1p: -86.0,  y2: -16.10, y2p: -59.1,  y3: -35.00, y3p: -54.1,  negative: true },
    { label: "Contribution",   y1: -5.26,  y1p: -74.2,  y2: -1.37,  y2p: -5.0,   y3: 4.71,   y3p: 7.3,    bold: true },
    { label: "G&A",            y1: -5.90,  y1p: -83.3,  y2: -14.25, y2p: -52.3,  y3: -22.30, y3p: -34.5,  negative: true },
    { label: "EBITDA",         y1: -11.16, y1p: -157.6, y2: -15.62, y2p: -57.4,  y3: -17.59, y3p: -27.2,  bold: true, negative: true },
    { label: "Depreciation",   y1: 0.00,   y1p: 0.0,    y2: 0.00,   y2p: 0.0,    y3: 0.00,   y3p: 0.0 },
    { label: "EBIT",           y1: -11.16, y1p: -157.6, y2: -15.62, y2p: -57.4,  y3: -17.59, y3p: -27.2,  bold: true, negative: true },
    { label: "Interest",       y1: 0.00,   y1p: 0.0,    y2: 0.00,   y2p: 0.0,    y3: 0.00,   y3p: 0.0 },
    { label: "PBT",            y1: -11.16, y1p: -157.6, y2: -15.62, y2p: -57.4,  y3: -17.59, y3p: -27.2,  bold: true, negative: true },
    { label: "Tax (25%)",      y1: 0.00,   y1p: 0.0,    y2: 0.00,   y2p: 0.0,    y3: 0.00,   y3p: 0.0 },
    { label: "PAT",            y1: -11.16, y1p: -157.6, y2: -15.62, y2p: -57.4,  y3: -17.59, y3p: -27.2,  bold: true, negative: true },
  ]

  // ─── Predictive model: Y4-Y6 ───
  // Methodology: revenue grows at decelerating rate (50%→35%→25%)
  // COGS%, CAC%, G&A% trend down based on Y1→Y3 improvement gradient
  const predictive = [
    { label: "Revenue",         y4: 97.07,  y4p: 100,    y5: 131.04, y5p: 100,    y6: 163.80, y6p: 100,    bold: true, positive: true },
    { label: "  Solo Doctors",  y4: 97.07,  y4p: null,   y5: 131.04, y5p: null,   y6: 163.80, y6p: null,   indent: true },
    { label: "COGS",            y4: -33.97, y4p: -35.0,  y5: -43.24, y5p: -33.0,  y6: -50.78, y6p: -31.0,  negative: true },
    { label: "Gross Margin",    y4: 63.10,  y4p: 65.0,   y5: 87.80,  y5p: 67.0,   y6: 113.02, y6p: 69.0,   bold: true, highlight: true },
    { label: "CAC / Marketing", y4: -48.54, y4p: -50.0,  y5: -60.28, y5p: -46.0,  y6: -70.43, y6p: -43.0,  negative: true },
    { label: "Contribution",    y4: 14.56,  y4p: 15.0,   y5: 27.52,  y5p: 21.0,   y6: 42.59,  y6p: 26.0,   bold: true },
    { label: "G&A",             y4: -29.12, y4p: -30.0,  y5: -35.38, y5p: -27.0,  y6: -40.95, y6p: -25.0,  negative: true },
    { label: "EBITDA",          y4: -14.56, y4p: -15.0,  y5: -7.86,  y5p: -6.0,   y6: 1.64,   y6p: 1.0,    bold: true },
    { label: "PAT",             y4: -14.56, y4p: -15.0,  y5: -7.86,  y5p: -6.0,   y6: 1.64,   y6p: 1.0,    bold: true },
  ]

  const fmt = (v: number | null, p?: boolean) => {
    if (v === null || v === undefined) return "—"
    return `${v >= 0 ? "" : "-"}₹${Math.abs(v).toFixed(2)} L`
  }
  const pct = (v: number | null) => {
    if (v === null || v === undefined) return ""
    return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`
  }
  const cellColor = (v: number | null, bold?: boolean) => {
    if (v === null || v === undefined) return ""
    if (v < 0) return "text-rose-600"
    if (v > 0 && bold) return "text-emerald-700"
    return ""
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-500">

      {/* ── Header Alert ── */}
      <Alert variant="destructive" className="bg-rose-500/[0.03] border-rose-500/20 rounded-none">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-xs font-black uppercase tracking-widest text-rose-700">
          Risk 5: Combined Collapse — What If All Risks Hit Simultaneously?
        </AlertTitle>
        <AlertDescription className="text-xs font-medium text-rose-600/80 italic mt-1 font-mono">
          Growth misses targets, CAC spikes, churn rises to 30%, and COGS inflates — stress applied across all four dimensions at once.
        </AlertDescription>
      </Alert>

      {/* ── Stressed P&L: Y1–Y3 ── */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-4 px-6 border-b bg-rose-500/[0.03]">
          <CardTitle className="text-[11px] font-black uppercase tracking-[0.15em] text-rose-700 flex items-center gap-2">
            <Activity className="size-3.5" /> Stressed P&amp;L Statement — Y1 to Y3 (₹ Lakh)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2 bg-muted/30">
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider w-[200px] px-4">Line Item</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 1</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-rose-600">%</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 2</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-rose-600">%</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 3</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-rose-600">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historical.map((row, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "border-b text-sm font-mono",
                    row.highlight ? "bg-primary/[0.03]" : "",
                    row.bold ? "" : "text-muted-foreground"
                  )}
                >
                  <TableCell className={cn("px-4 py-2.5 text-[12px]", row.indent ? "pl-8 text-muted-foreground" : row.bold ? "font-bold" : "font-medium")}>
                    {row.label}
                  </TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y1, row.bold))}>{fmt(row.y1)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y1p ?? null))}>{pct(row.y1p ?? null)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y2, row.bold))}>{fmt(row.y2)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y2p ?? null))}>{pct(row.y2p ?? null)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y3, row.bold))}>{fmt(row.y3)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y3p ?? null))}>{pct(row.y3p ?? null)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Predictive Model: Y4–Y6 ── */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-4 px-6 border-b bg-primary/[0.03]">
          <CardTitle className="text-[11px] font-black uppercase tracking-[0.15em] text-primary flex items-center gap-2">
            <TrendingDown className="size-3.5" /> Predictive Model — Y4 to Y6 (Extrapolated from Stress Trends)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-6 py-3 border-b bg-muted/10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Methodology: Revenue grows at decelerating rate (50% → 35% → 25%). COGS%, CAC%, G&amp;A% trend down based on observed Y1→Y3 improvement gradient.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2 bg-primary/5">
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider w-[200px] px-4">Line Item</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 4 (Est.)</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-primary">%</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 5 (Est.)</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-primary">%</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3">Year 6 (Est.)</TableHead>
                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-right px-3 text-primary">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictive.map((row, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "border-b text-sm font-mono",
                    row.highlight ? "bg-primary/[0.03]" : "",
                    row.bold ? "" : "text-muted-foreground",
                    row.label === "EBITDA" ? "border-t-2" : ""
                  )}
                >
                  <TableCell className={cn("px-4 py-2.5 text-[12px]", row.indent ? "pl-8 text-muted-foreground" : row.bold ? "font-bold" : "font-medium")}>
                    {row.label}
                  </TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y4, row.bold))}>{fmt(row.y4)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y4p ?? null))}>{pct(row.y4p ?? null)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y5, row.bold))}>{fmt(row.y5)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y5p ?? null))}>{pct(row.y5p ?? null)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5", row.bold ? "font-bold" : "font-medium", cellColor(row.y6, row.bold))}>{fmt(row.y6)}</TableCell>
                  <TableCell className={cn("text-right px-3 py-2.5 text-[10px]", cellColor(row.y6p ?? null))}>{pct(row.y6p ?? null)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t bg-emerald-50/50 flex items-center gap-3">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <p className="text-[11px] font-bold text-emerald-800">
              Even under combined stress, the business reaches EBITDA breakeven by <strong>Year 6</strong> — provided unit growth continues and AI cost efficiency improves. This validates long-term capital sufficiency.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Key Assumptions ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { year: "Year 4", rev: "₹97.07 L", growth: "+50%", cogs: "35%", cac: "50%", ga: "30%", ebitda: "-15.0%", color: "rose" },
          { year: "Year 5", rev: "₹131.04 L", growth: "+35%", cogs: "33%", cac: "46%", ga: "27%", ebitda: "-6.0%", color: "amber" },
          { year: "Year 6", rev: "₹163.80 L", growth: "+25%", cogs: "31%", cac: "43%", ga: "25%", ebitda: "+1.0%", color: "emerald" },
        ].map((y, i) => (
          <Card key={i} className={cn("border shadow-none rounded-none", y.color === "emerald" ? "border-emerald-300 bg-emerald-50/30" : "")}>
            <CardHeader className="py-3 px-5 border-b bg-muted/5">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest">{y.year} — Key Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-2">
              {[
                { k: "Revenue", v: y.rev },
                { k: "Revenue Growth", v: y.growth },
                { k: "COGS %", v: y.cogs },
                { k: "CAC %", v: y.cac },
                { k: "G&A %", v: y.ga },
                { k: "EBITDA %", v: y.ebitda },
              ].map((r, j) => (
                <div key={j} className="flex justify-between items-center border-b pb-1.5">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{r.k}</span>
                  <span className={cn("text-xs font-black", r.k === "EBITDA %" && y.color === "emerald" ? "text-emerald-700" : r.k === "EBITDA %" ? "text-rose-600" : "")}>{r.v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Survival Verdict ── */}
      <div className="border border-rose-200 bg-rose-500/[0.02] p-8 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-rose-700">Strategic Verdict: Combined Stress Scenario</h4>
        <p className="text-sm font-medium leading-relaxed">
          If all four risks materialize simultaneously — slower growth, CAC inflation, 30% churn, and COGS increase — the business runs a cumulative EBITDA loss of ~₹44.37 L across Y1–Y5. However, with continued scale and operational efficiency, it achieves EBITDA positivity in Year 6.
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
          Implication: the business requires ₹50–60 L in capital runway to survive the combined stress and reach profitability without a pivot.
        </p>
      </div>

    </div>
  )
}
