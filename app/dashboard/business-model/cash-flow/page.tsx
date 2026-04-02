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
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
  LabelList,
  AreaChart,
  Area
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Waves, Zap, Rocket, Coins, ArrowUpRight, ArrowDownRight, CheckCircle2, TrendingUp } from "lucide-react"

const cashFlowData = [
  { label: "OPERATING ACTIVITIES", type: "header" },
  { label: "PAT (from P&L)", y1: "-13.41 L", y2: "0.84 L", y3: "26.10 L" },
  { label: "Cash from Operations", y1: "-13.41 L", y2: "0.84 L", y3: "26.10 L", type: "bold" },
  { label: "FINANCING ACTIVITIES", type: "header" },
  { label: "+ Equity Raised", y1: "20.00 L", y2: "0.00 L", y3: "0.00 L" },
  { label: "Cash from Financing", y1: "20.00 L", y2: "0.00 L", y3: "0.00 L", type: "bold" },
  { label: "SUMMARY", type: "header" },
  { label: "Net Cash Flow", y1: "6.59 L", y2: "0.84 L", y3: "26.10 L", type: "bold" },
  { label: "Opening Cash Balance", y1: "0.00 L", y2: "6.59 L", y3: "7.43 L" },
  { label: "Closing Cash Balance", y1: "6.59 L", y2: "7.43 L", y3: "33.54 L", type: "bold" },
]

const chartData = [
  { year: "Year 1", net: 6.59, ops: -13.41, cumulative: 6.59 },
  { year: "Year 2", net: 0.84, ops: 0.84, cumulative: 7.43 },
  { year: "Year 3", net: 26.10, ops: 26.10, cumulative: 33.54 },
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

export default function CashFlowPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-left">Cash Flow Statement</h1>
        <p className="text-sm text-muted-foreground text-left">Liquidity tracking, operational burn, and cash accumulation</p>
      </div>

      {/* Headlines */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        <KpiCard title="Net Cash Flow (Y3)" value="₹26.10 L" trend="up" trendValue="High" subtext="Y1: ₹6.59 L" />
        <KpiCard title="Op. Cash Flow (Y3)" value="₹26.10 L" trend="up" trendValue="+₹39L Swing" subtext="Y1: -₹13.4 L" />
        <KpiCard title="Closing Cash (Y3)" value="₹33.54 L" trend="up" trendValue="5x Accumulation" subtext="Y1: ₹6.59 L" />
        <KpiCard title="Capex / Investment" value="₹0.00 L" trend="up" trendValue="Zero" subtext="Asset-light" />
      </div>

      {/* Table Section */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-3 px-4 border-b bg-muted/10">
          <CardTitle className="text-[11px] font-bold uppercase tracking-widest">Cash Flow Statement (₹ L)</CardTitle>
          <CardDescription className="text-[10px]">Condensed three-year liquidity perspective</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[300px] py-1 text-[10px] uppercase font-bold">Line Item</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 1</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold bg-muted/5">Year 2</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashFlowData.map((row, idx) => (
                <TableRow key={idx} className={cn(
                  "hover:bg-muted/30 border-b border-muted/20",
                  row.type === "header" && "bg-muted/30",
                  row.type === "bold" && "bg-primary/5"
                )}>
                  <TableCell className={cn(
                    "py-2 font-medium text-xs",
                    row.type === "header" && "font-black uppercase tracking-wider text-[10px] py-1.5",
                    row.type === "bold" && "font-bold text-sm"
                  )}>
                    {row.label}
                  </TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px]", (row.y1?.startsWith("-") || row.y1?.startsWith("(")) ? "text-rose-600" : "text-foreground")}>{row.y1}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px] bg-muted/5", (row.y2?.startsWith("-") || row.y2?.startsWith("(")) ? "text-rose-600" : "text-foreground")}>{row.y2}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px]", (row.y3?.startsWith("-") || row.y3?.startsWith("(")) ? "text-rose-600" : "text-foreground")}>{row.y3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Net Cash Flow Trend */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Waves className="size-3 text-primary" /> Cash Flow Trend (₹ L)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="net" name="Net Cash Flow" radius={[2, 2, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.net > 1 ? "#10b981" : "var(--primary)"} fillOpacity={0.8} />
                    ))}
                    <LabelList dataKey="net" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic">“Cash generation improves significantly after break-even”</p>
          </CardContent>
        </Card>

        {/* Operating Cash Flow Chart */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Zap className="size-3 text-primary" /> Operating Cash Flow (₹ L)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1} strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="ops" name="Operating Cash" stroke="var(--primary)" strokeWidth={2} fill="var(--primary)" fillOpacity={0.05} dot={{ r: 4 }}>
                     <LabelList dataKey="ops" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 italic">“Operations become cash-positive from Year 2”</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Source of Cash */}
        <Card className="border shadow-none rounded-none bg-emerald-500/[0.02]">
           <CardHeader className="py-3 px-4 pb-2">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-emerald-700">
               <Coins className="size-4" /> Source of Cash
             </CardTitle>
           </CardHeader>
           <CardContent className="px-4 pb-6 space-y-4">
             <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center text-xs p-3 border bg-background">
                  <span className="font-medium text-muted-foreground">Initial Equity</span>
                  <span className="font-black text-foreground uppercase border-b-2 border-emerald-500/20 pb-0.5">₹20.00 L</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 border bg-background">
                  <span className="font-medium text-muted-foreground">Debt Financing</span>
                  <span className="font-black text-foreground uppercase border-b-2 border-emerald-500/20 pb-0.5">₹0.00 L</span>
                </div>
             </div>
             <p className="text-sm leading-relaxed text-muted-foreground font-medium italic border-l-2 border-emerald-500/40 pl-4 mt-4">
               “Growth is funded without financial risk. Initial equity of ₹20L provides the necessary buffer for scale.”
             </p>
           </CardContent>
        </Card>

        {/* Capital Efficiency */}
        <Card className="border shadow-none rounded-none bg-primary/[0.02]">
           <CardHeader className="py-3 px-4 pb-2">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
               <Rocket className="size-4" /> Capital Efficiency
             </CardTitle>
           </CardHeader>
           <CardContent className="px-4 pb-6 space-y-4">
             <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border bg-background text-center">
                  <div className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Capex</div>
                  <div className="text-xs font-black text-foreground">Zero Required</div>
                </div>
                <div className="p-3 border bg-background text-center">
                  <div className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Asset Model</div>
                  <div className="text-xs font-black text-foreground">Asset-Light</div>
                </div>
             </div>
             <p className="text-xs leading-relaxed text-muted-foreground font-medium mt-4">
               The digital-first model ensures that cash generation is directly linked to top-line revenue growth without the burden of heavy physical infrastructure or inventory.
             </p>
           </CardContent>
        </Card>
      </div>

      {/* Bottom Line Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {[
           { icon: <TrendingUp className="size-4 text-emerald-500" />, text: "Transitions from cash burn to strong generation in Y3" },
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Operates cash-positively since Year 2 milestone" },
         ].map((item, i) => (
           <div key={i} className="flex items-center gap-3 p-4 border bg-muted/5 font-bold">
              {item.icon}
              <span className="text-xs text-foreground uppercase tracking-tight">{item.text}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
