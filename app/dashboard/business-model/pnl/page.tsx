"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  ReferenceLine,
  LabelList
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, BarChart3, Zap, DollarSign, Target, PieChart, Activity, Calculator, ArrowUpRight, ArrowDownRight, Info, Rocket } from "lucide-react"

const data = [
  { year: "Year 1", revenue: 10.12, cogs: 8.93, cac: 8.70, ga: 5.90, contribution: -7.51, ebitda: -13.41, pat: -13.41, margin: 11.8 },
  { year: "Year 2", revenue: 39.90, cogs: 17.85, cac: 6.96, ga: 14.25, contribution: 15.09, ebitda: 0.84, pat: 0.84, margin: 55.3 },
  { year: "Year 3", revenue: 97.32, cogs: 35.70, cac: 8.70, ga: 22.30, contribution: 52.92, ebitda: 30.62, pat: 26.10, margin: 63.3 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 shadow-none text-[10px] font-mono">
        <p className="font-bold border-b mb-1 pb-1">{label}</p>
        {payload.map((item: any, i: number) => (
          <div key={i} className="flex justify-between gap-4">
            <span style={{ color: item.color }}>{item.name}:</span>
            <span className="font-bold">₹{item.value.toFixed(2)}L</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const KpiCard = ({ title, value, subtext, trend, trendValue }: { title: string, value: string, subtext: string, trend?: "up" | "down", trendValue?: string }) => (
  <Card className="border shadow-none rounded-none hover:bg-muted/5 transition-colors">
    <CardHeader className="py-3 px-4 pb-1">
      <CardDescription className="text-[10px] uppercase font-bold tracking-wider">{title}</CardDescription>
    </CardHeader>
    <CardContent className="px-4 pb-3">
      <div className="text-2xl font-black tracking-tight">{value}</div>
      <div className="flex items-center gap-1.5 mt-1">
        {trend === "up" ? <ArrowUpRight className="size-3 text-emerald-600" /> : <ArrowDownRight className="size-3 text-rose-600" />}
        <span className={cn("text-[10px] font-bold", trend === "up" ? "text-emerald-600" : "text-rose-600")}>{trendValue}</span>
        <span className="text-[10px] text-muted-foreground ml-auto">{subtext}</span>
      </div>
    </CardContent>
  </Card>
)

const pnlData = [
  { label: "Revenue", y1: "10.12 L", p1: "100%", y2: "39.90 L", p2: "100%", y3: "97.32 L", p3: "100%", type: "bold" },
  { label: "Solo Doctors", y1: "10.12 L", p1: "", y2: "39.90 L", p2: "", y3: "97.32 L", p3: "", type: "sub" },
  { label: "COGS", y1: "-8.93 L", p1: "-88.2%", y2: "-17.85 L", p2: "-44.7%", y3: "-35.70 L", p3: "-36.7%" },
  { label: "Gross Margin", y1: "1.19 L", p1: "11.8%", y2: "22.05 L", p2: "55.3%", y3: "61.62 L", p3: "63.3%", type: "medium" },
  { label: "CAC / Marketing", y1: "-8.70 L", p1: "-86.0%", y2: "-6.96 L", p2: "-17.4%", y3: "-8.70 L", p3: "-8.9%", tooltip: "Customer Acquisition Cost" },
  { label: "Contribution", y1: "-7.51 L", p1: "-74.2%", y2: "15.09 L", p2: "37.8%", y3: "52.92 L", p3: "54.4%", type: "bold" },
  { label: "G&A", y1: "-5.90 L", p1: "-58.3%", y2: "-14.25 L", p2: "-35.7%", y3: "-22.30 L", p3: "-22.9%", tooltip: "General & Administrative Expenses" },
  { label: "EBITDA", y1: "-13.41 L", p1: "-132.6%", y2: "0.84 L", p2: "2.1%", y3: "30.62 L", p3: "31.5%", type: "bold" },
  { label: "PAT", y1: "-13.41 L", p1: "-132.6%", y2: "0.84 L", p2: "2.1%", y3: "26.10 L", p3: "26.8%", type: "bold" },
]

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Info icon already imported above

function getColorClass(value: string | number) {
  const val = typeof value === "string" ? value.replace(/[₹L(),%]/g, "") : value
  const num = parseFloat(val as string)
  if (isNaN(num)) return "text-muted-foreground"
  if (num > 0) return "text-emerald-600 font-medium"
  if (num < 0) return "text-rose-600 font-medium"
  return "text-muted-foreground/60"
}

function FinancialTable({ data, title }: { data: any[], title: string }) {
  return (
    <Card className="border shadow-none rounded-none overflow-hidden">
      <CardHeader className="py-3 px-4 border-b bg-muted/10">
        <CardTitle className="text-[11px] font-bold uppercase tracking-widest">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <TooltipProvider delayDuration={100}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[200px] py-1 text-[10px] uppercase font-bold">Line Item</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 1</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">%</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold bg-muted/5">Year 2</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold bg-muted/5">%</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 3</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} className={cn(
                  "hover:bg-muted/30 border-b border-muted/20",
                  row.label === "Contribution" && "bg-primary/5"
                )}>
                  <TableCell className={cn(
                    "py-2 font-medium text-xs",
                    row.type === "bold" && "font-bold text-sm",
                    row.type === "medium" && "font-semibold",
                    row.type === "sub" && "pl-6 text-muted-foreground font-normal"
                  )}>
                    <div className="flex items-center gap-1.5">
                      {row.label}
                      {row.tooltip && (
                        <UiTooltip>
                          <TooltipTrigger asChild>
                            <Info className="size-3 text-muted-foreground/50 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-[10px]">{row.tooltip}</TooltipContent>
                        </UiTooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px]", getColorClass(row.y1))}>{row.y1}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[10px] opacity-80", getColorClass(row.p1))}>{row.p1}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px] bg-muted/5", getColorClass(row.y2))}>{row.y2}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[10px] opacity-80 bg-muted/5", getColorClass(row.p2))}>{row.p2}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px]", getColorClass(row.y3))}>{row.y3}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[10px] opacity-80", getColorClass(row.p3))}>{row.p3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}

export default function PnlPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-left">Profit & Loss (P&L) Statement</h1>
        <p className="text-sm text-muted-foreground text-left">Yearly revenue growth, margin expansion, and profitability targets</p>
      </div>

      {/* 🔷 1. Top Section (Headline KPIs) */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
      <KpiCard title="Revenue (Y3)" value="₹97.3L" trend="up" trendValue="10x Growth" subtext="Y1: ₹10.1L" />
      <KpiCard title="Gross Margin (Y3)" value="63.3%" trend="up" trendValue="+51.5%" subtext="Y1: 11.8%" />
      <KpiCard title="Contribution (Y3)" value="₹52.9L" trend="up" trendValue="Flips +ve" subtext="Y1: -₹7.5L" />
      <KpiCard title="PAT (Y3)" value="₹26.1L" trend="up" trendValue="Profitable" subtext="Y1: -₹13.4L" />
    </div>

      {/* 🔷 Tabular Statement */}
      <FinancialTable data={pnlData} title="Detailed Profit & Loss Statement (₹ L)" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🔷 2. Revenue Growth Chart */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="size-3 text-primary" /> Revenue Growth (₹ L)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center px-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }}>
                    <LabelList dataKey="revenue" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic">“3x–2.5x annual growth trajectory”</p>
          </CardContent>
        </Card>

        {/* 🔷 3. Margin Expansion */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="size-3 text-emerald-600" /> Margin Expansion (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 text-center px-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="margin" name="Gross Margin %" fill="#0f172a" radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="margin" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic">“Gross margins expand from 11.8% to 63.3% as infrastructure costs stabilize relative to revenue.”</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔷 4. Contribution vs Costs (Core Engine) */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-3 px-4 border-b bg-muted/5">
          <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-foreground">
            <Zap className="size-3 text-primary" /> Contribution Engine (Scaled Ops)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 px-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data.map(d => ({ ...d, cogs: -d.cogs, cac: -d.cac, ga: -d.ga }))} 
                stackOffset="sign"
                margin={{ bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} verticalAlign="bottom" wrapperStyle={{ fontSize: '10px', paddingTop: '30px' }} />
                <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1} />
                <Bar dataKey="revenue" name="Revenue" stackId="a" fill="var(--primary)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="cogs" name="COGS" stackId="a" fill="#fb7185" />
                <Bar dataKey="cac" name="CAC" stackId="a" fill="#f43f5e" />
                <Bar dataKey="ga" name="G&A" stackId="a" fill="#e11d48" radius={[0, 0, 2, 2]} />
                <Bar dataKey="contribution" name="Net Contribution" fill="var(--primary)">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.contribution > 0 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-muted-foreground mt-10 italic text-center pb-4">“Contribution flips positive in Year 2”</p>
        </CardContent>
      </Card>

      {/* 🔷 5. Profitability Curve */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-3 px-4 border-b bg-muted/5">
          <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-foreground">
            <Rocket className="size-3 text-primary" /> Profitability Curve (EBITDA / PAT)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="var(--foreground)" strokeDasharray="3 3" label={{ value: "⭐ Break-even Point", position: "right", fontSize: 10, fill: "var(--foreground)", fontWeight: 'bold' }} />
              <Line type="stepAfter" dataKey="ebitda" name="EBITDA" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pat" name="PAT" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: "#059669" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🔷 6. Bottom Section (1-line insights) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Break-even in Year 2" },
          { icon: <TrendingUp className="size-4 text-emerald-500" />, text: "Strong margin expansion (12% → 63%)" },
          { icon: <Zap className="size-4 text-emerald-500" />, text: "Profitability driven by CAC reduction + scale" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border bg-muted/5">
            {item.icon}
            <span className="text-xs font-bold text-foreground">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
