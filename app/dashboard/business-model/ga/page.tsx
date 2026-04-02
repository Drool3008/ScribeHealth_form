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
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Users, DollarSign, Calculator, Zap, Rocket, CheckCircle2, ShieldCheck, Cpu, HardDrive } from "lucide-react"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

export default function GAPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight">General & Administrative (G&A)</h1>
        <p className="text-sm text-muted-foreground">Fixed operating expenses and overhead modeling</p>
      </div>

      {/* 🔷 1. Top Section — Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border divide-x">
        {[
          { label: "Year 1 G&A", value: "₹5.90 L", sub: "Lean Founder Execution" },
          { label: "Year 2 G&A", value: "₹14.25 L", sub: "Early Support Team" },
          { label: "Year 3 G&A", value: "₹22.30 L", sub: "Core Team Expansion" },
          { label: "Operating Model", value: "Lean Contract", sub: "Minimal Full-time Overhead" },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-muted/5">
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{kpi.label}</div>
            <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 🔷 2. Operating Overhead Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SOFTWARE & SAAS */}
        <Card className="border shadow-none rounded-none flex flex-col text-left">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0 text-left">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Cpu className="size-3 text-primary" /> Software & SaaS Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1 text-left">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Core stack including Workspace, Slack, GitHub, a CRM (HubSpot/Zoho), and analytics tools.
            </p>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] uppercase font-bold px-4">Period</TableHead>
                  <TableHead className="h-8 text-[10px] uppercase font-bold text-right px-4">Cost (L)</TableHead>
                  <TableHead className="h-8 text-[10px] uppercase font-bold px-4">Scaling Logic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 1</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹0.80 L</TableCell><TableCell className="text-xs text-muted-foreground">Minimal baseline stack</TableCell></TableRow>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 2</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹1.00 L</TableCell><TableCell className="text-xs text-muted-foreground">Additional CRM & Support seats</TableCell></TableRow>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 3</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹1.80 L</TableCell><TableCell className="text-xs text-muted-foreground">Team-wide productivity bundle</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* HOSTING OVERHEAD */}
        <Card className="border shadow-none rounded-none flex flex-col text-left">
          <CardHeader className="py-4 px-6 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0 text-left">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <HardDrive className="size-3 text-primary" /> Hosting Overhead (Non-COGS)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1 text-left">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Strategic spend for staging servers, backups, monitoring, logging, and CDN infrastructure.
            </p>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] uppercase font-bold px-4">Period</TableHead>
                  <TableHead className="h-8 text-[10px] uppercase font-bold text-right px-4">Cost (L)</TableHead>
                  <TableHead className="h-8 text-[10px] uppercase font-bold px-4">Infra Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 1</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹1.80 L</TableCell><TableCell className="text-xs text-muted-foreground">Foundational staging/backups</TableCell></TableRow>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 2</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹2.50 L</TableCell><TableCell className="text-xs text-muted-foreground">Advanced logging & observability</TableCell></TableRow>
                <TableRow className="border-b text-sm"><TableCell className="font-medium">Year 3</TableCell><TableCell className="text-right font-mono font-bold text-primary">₹3.50 L</TableCell><TableCell className="text-xs text-muted-foreground">High-availability CDN/Failover</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* 🔷 3. Accounting & Compliance (Deep Dive) */}
      <Card className="border shadow-none rounded-none text-left">
        <CardHeader className="py-4 px-6 border-b bg-muted/5">
          <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="size-3 text-primary" /> Accounting & Compliance Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-left">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-b-2">
                <TableHead className="h-10 text-[10px] uppercase font-bold px-4">Cost Category</TableHead>
                <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Y1 (L)</TableHead>
                <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Y2 (L)</TableHead>
                <TableHead className="h-10 text-[10px] uppercase font-bold text-right px-4">Y3 (L)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { label: "CA Retainership (GST/Tax)", y1: "1.00", y2: "1.00", y3: "1.50" },
                { label: "CS / Corporate Filings", y1: "0.25", y2: "0.00", y3: "0.40" },
                { label: "Payroll & HR Compliance", y1: "0.20", y2: "0.30", y3: "0.40" },
                { label: "Legal Drafting & Policy", y1: "0.75", y2: "0.00", y3: "0.25" },
                { label: "Trademark / IP Protection", y1: "0.30", y2: "0.10", y3: "0.10" },
                { label: "Security & Data Audit", y1: "0.30", y2: "0.20", y3: "0.20" },
              ].map((row, i) => (
                <TableRow key={i} className="border-b text-sm">
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-right font-mono font-bold">{row.y1}</TableCell>
                  <TableCell className="text-right font-mono font-bold">{row.y2}</TableCell>
                  <TableCell className="text-right font-mono font-bold text-primary">{row.y3}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-primary/5">
                <TableCell className="font-black uppercase text-[10px]">Total Compliance (L)</TableCell>
                <TableCell className="text-right font-black font-mono">₹2.80 L</TableCell>
                <TableCell className="text-right font-black font-mono">₹3.00 L</TableCell>
                <TableCell className="text-right font-black font-mono text-primary">₹4.00 L</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🔷 4. Core Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border shadow-none rounded-none flex flex-col text-left">
           <CardHeader className="py-4 px-6 border-b bg-muted/5">
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Users className="size-3 text-primary" /> Core Team (Lean Contract Model)
              </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-6 text-left">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Assumes four founders operate with zero salary initially, adding contract-based interns and support as revenue targets are achieved.
              </p>
              <div className="grid grid-cols-3 gap-4 border divide-x text-center bg-muted/5">
                 <div className="p-6">
                    <div className="text-[9px] font-bold uppercase text-muted-foreground mb-2">Year 1</div>
                    <div className="text-2xl font-black">₹0</div>
                 </div>
                 <div className="p-6">
                    <div className="text-[9px] font-bold uppercase text-muted-foreground mb-2">Year 2</div>
                    <div className="text-2xl font-black text-primary">₹7.0 L</div>
                 </div>
                 <div className="p-6">
                    <div className="text-[9px] font-bold uppercase text-muted-foreground mb-2">Year 3</div>
                    <div className="text-2xl font-black text-primary">₹12.0 L</div>
                 </div>
              </div>
              <div className="space-y-4">
                 {[
                   { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Founders operate on profit-share path" },
                   { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Scales via interns & part-time contractors" },
                   { icon: <CheckCircle2 className="size-4 text-emerald-500" />, text: "Target of 3 core support hires by Year 3" },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-3 text-xs leading-relaxed">
                      {item.icon} <span>{item.text}</span>
                   </div>
                 ))}
              </div>
           </CardContent>
        </Card>

        <Card className="border shadow-none rounded-none bg-muted/5 flex flex-col text-left">
           <CardHeader className="py-4 px-6 border-b">
              <CardTitle className="text-xs font-black uppercase tracking-widest">G&A Strategic Context</CardTitle>
           </CardHeader>
           <CardContent className="p-6 flex flex-col justify-between flex-1 space-y-8 text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b pb-1">
                   <span className="text-[10px] font-bold uppercase text-muted-foreground">Misc Buffer (Y3)</span>
                   <span className="text-lg font-black text-primary">₹1.00 L</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Covers domain renewals, legal notices, and minor SaaS spikes.
                </p>
              </div>
              
              <div className="p-8 border-2 border-primary bg-primary/[0.03] space-y-2">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Total Y3 G&A (Opex)</div>
                 <div className="text-5xl font-black tracking-tighter text-primary">₹22.30 L</div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 mt-4 leading-relaxed tracking-wider">
                   "Founding team prioritized lean execution; profit distribution replaces fixed salaries during initial scale."
                 </p>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
