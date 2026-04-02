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
import { Wallet, ShieldCheck, PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, Info, CheckCircle2, Rocket } from "lucide-react"

const balanceSheetData = [
  { label: "ASSETS", y1: "", y2: "", y3: "", type: "header" },
  { label: "Cash & Bank Balance", y1: "6.59 L", y2: "7.43 L", y3: "33.54 L" },
  { label: "Total Assets", y1: "6.59 L", y2: "7.43 L", y3: "33.54 L", type: "bold" },
  { label: "LIABILITIES & EQUITY", y1: "", y2: "", y3: "", type: "header" },
  { label: "Share Capital (Equity Raised)", y1: "20.00 L", y2: "20.00 L", y3: "20.00 L" },
  { label: "Retained Earnings (Cumulative PAT)", y1: "-13.41 L", y2: "-12.57 L", y3: "13.54 L" },
  { label: "Total Liabilities & Equity", y1: "6.59 L", y2: "7.43 L", y3: "33.54 L", type: "bold" },
]

const chartData = [
  { year: "Year 1", cash: 6.59, equity: 20.00, retained: -13.41 },
  { year: "Year 2", cash: 7.43, equity: 20.00, retained: -12.57 },
  { year: "Year 3", cash: 33.54, equity: 20.00, retained: 13.54 },
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

export default function BalanceSheetPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 overflow-x-hidden">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-left">Balance Sheet Statement</h1>
        <p className="text-sm text-muted-foreground text-left">Assets, equity, and long-term capital structure</p>
      </div>

      {/* Headlines */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        <KpiCard title="Cash & Bank (Y3)" value="₹33.54 L" trend="up" trendValue="+350%" subtext="Y1: ₹6.59 L" />
        <KpiCard title="Net Equity (Y3)" value="₹33.54 L" trend="up" trendValue="Growth" subtext="Y1: ₹6.59 L" />
        <KpiCard title="Retained Earnings (Y3)" value="₹13.54 L" trend="up" trendValue="Flipped +ve" subtext="Y1: -₹13.4 L" />
        <KpiCard title="Long-term Debt" value="₹0.00 L" trend="up" trendValue="Zero" subtext="Debt-free" />
      </div>

      {/* Table Section */}
      <Card className="border shadow-none rounded-none overflow-hidden">
        <CardHeader className="py-3 px-4 border-b bg-muted/10">
          <CardTitle className="text-[11px] font-bold uppercase tracking-widest flex items-center justify-between">
            Balance Sheet Statement (₹ L)
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 text-[9px] border-emerald-500/20 px-2 py-0">✓ Balanced Sheet</Badge>
          </CardTitle>
          <CardDescription className="text-[10px]">As at year-end positions (Cumulative figures)</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[300px] py-1 text-[10px] uppercase font-bold">Particulars</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 1</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold bg-muted/5">Year 2</TableHead>
                <TableHead className="text-right py-1 text-[10px] uppercase font-bold">Year 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {balanceSheetData.map((row, idx) => (
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
                  <TableCell className={cn("text-right font-mono text-[11px]", row.y1.startsWith("-") ? "text-rose-600" : "text-foreground")}>{row.y1}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px] bg-muted/5", row.y2.startsWith("-") ? "text-rose-600" : "text-foreground")}>{row.y2}</TableCell>
                  <TableCell className={cn("text-right font-mono text-[11px]", row.y3.startsWith("-") ? "text-rose-600" : "text-foreground")}>{row.y3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cash Growth */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Wallet className="size-3 text-emerald-600" /> Cash Growth (₹ L)
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
                  <Area type="monotone" dataKey="cash" name="Cash Balance" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.05} dot={{ r: 4 }} activeDot={{ r: 6 }}>
                    <LabelList dataKey="cash" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic">“Cumulative net cash accumulation from operations and funding”</p>
          </CardContent>
        </Card>

        {/* Retained Earnings */}
        <Card className="border shadow-none rounded-none overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-muted/5">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <PieChart className="size-3 text-primary" /> Retained Earnings Curve (₹ L)
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
                  <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1} />
                  <Bar dataKey="retained" name="Retained Earnings" radius={[2, 2, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.retained > 0 ? "#10b981" : "var(--rose-500)"} />
                    ))}
                    <LabelList dataKey="retained" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic">“Business turns self-sustaining in Year 3”</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Working Capital Section */}
        <Card className="border shadow-none rounded-none bg-primary/[0.02]">
           <CardHeader className="py-3 px-4 pb-2">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
               📋 Working Capital Analysis
             </CardTitle>
           </CardHeader>
           <CardContent className="px-4 pb-6 space-y-4">
             <p className="text-sm leading-relaxed text-muted-foreground font-medium italic border-l-2 border-primary/20 pl-4">
               “The business requires minimal working capital as it operates on a subscription-based digital model with upfront payments, no inventory, and negligible receivables.”
             </p>
             <div className="flex gap-4">
               <div className="flex-1 p-3 border bg-background text-center">
                 <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Upfront model</div>
                 <div className="text-xs font-bold text-emerald-600">SaaS Prepaid</div>
               </div>
               <div className="flex-1 p-3 border bg-background text-center">
                 <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">No Receivables</div>
                 <div className="text-xs font-bold text-emerald-600">Direct-to-Doc</div>
               </div>
             </div>
           </CardContent>
        </Card>

        {/* Capital Structure */}
        <Card className="border shadow-none rounded-none bg-emerald-500/[0.02]">
           <CardHeader className="py-3 px-4 pb-2">
             <CardTitle className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-emerald-700">
               <ShieldCheck className="size-4" /> Capital Structure
             </CardTitle>
           </CardHeader>
           <CardContent className="px-4 pb-6 space-y-4">
             <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center text-xs p-2 border bg-background">
                  <span className="font-medium text-muted-foreground">Equity Raised</span>
                  <span className="font-black text-foreground">₹20.00 L</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 border bg-background">
                  <span className="font-medium text-muted-foreground">Long-term Debt</span>
                  <span className="font-black text-emerald-600 uppercase italic">Zero Debt</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 border bg-background">
                  <span className="font-medium text-muted-foreground">Funding Model</span>
                  <span className="font-black text-foreground">Fully Equity-funded</span>
                </div>
             </div>
             <p className="text-[10px] text-muted-foreground italic mt-2">“Low financial risk with lean operational buffers”</p>
           </CardContent>
        </Card>
      </div>

      {/* Bottom Line Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { icon: <TrendingUp className="size-4 text-emerald-500" />, text: "Asset-light model (₹0 Capex)" },
           { icon: <ShieldCheck className="size-4 text-emerald-500" />, text: "Debt-free Capital Structure" },
           { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Cash positive and self-sustaining by Y3" },
         ].map((item, i) => (
           <div key={i} className="flex items-center gap-3 p-4 border bg-muted/5 font-bold">
              {item.icon}
              <span className="text-xs">{item.text}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
