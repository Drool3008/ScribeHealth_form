"use client"

import * as React from "react"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { useSurveyData, SurveyResponse } from "@/lib/dashboard-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Smile, Languages, Zap } from "lucide-react"

const COLORS = [
  'var(--color-primary)',
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)'
]

const mapPatients = (val: string) => {
  if (val === "1–5") return 3
  if (val === "5–10") return 7.5
  if (val === "10–20") return 15
  if (val === "20+") return 25
  return 0
}

const mapTime = (val: string) => {
  if (val === "0–5 min") return 2.5
  if (val === "5–10 min") return 7.5
  if (val === "10–15 min") return 12.5
  if (val === "15–20 min") return 17.5
  if (val === "20+ min") return 25
  return 0
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-pulse">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6"><Skeleton className="h-28 rounded-xl" /><Skeleton className="h-28 rounded-xl" /><Skeleton className="h-28 rounded-xl" /><Skeleton className="h-28 rounded-xl" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"><Skeleton className="h-72 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>
    </div>
  )
}

export default function Page() {
  const { data: dbData, loading } = useSurveyData()
  const [metrics, setMetrics] = React.useState({
    totalDocs: 0,
    avgDailyTime: 0,
    avgPatients: 0,
    afterHoursLoad: 0,
    avgSatisfaction: 0,
    toolsFragScore: 0,
    aiAdoptionScore: 0,
    translationBurden: 0,
    frictionImpact: 0
  })

  const [charts, setCharts] = React.useState<any>({
    workflowSplit: [],
    painDistribution: [],
    concernFrequency: [],
    bottleneckDistribution: []
  })

  React.useEffect(() => {
    if (loading) return
    aggregateMetrics(dbData)
  }, [dbData, loading])

  const aggregateMetrics = (responses: SurveyResponse[]) => {
    let totalDocs = responses.length
    let totalDailyTime = 0
    let totalPatients = 0
    let afterHoursCount = 0
    let workflowCounts: Record<string, number> = { "Immediately after each session": 0, "End of day": 0, "After work hours": 0 }
    let totalTools = 0
    let totalSatisfaction = 0
    let painCounts: Record<string, number> = {}
    let comfortCount = 0
    let concernsCounts: Record<string, number> = {}
    let totalTranslationBurden = 0
    let frictionImpactCount = 0
    let bottleneckCounts: Record<string, number> = {}

    responses.forEach(r => {
      const a = r.answers || {}
      const patientCount = mapPatients(a.D5)
      totalPatients += patientCount
      const timePerPatient = mapTime(a.Q1)
      totalDailyTime += patientCount * timePerPatient
      if (a.Q2 === "After work hours") afterHoursCount++
      if (a.Q2) workflowCounts[a.Q2] = (workflowCounts[a.Q2] || 0) + 1
      if (Array.isArray(a.Q3)) totalTools += a.Q3.length
      if (a.Q4) totalSatisfaction += Number(a.Q4)
      if (a.Q5) painCounts[a.Q5] = (painCounts[a.Q5] || 0) + 1
      if (a.Q6 === "Very comfortable" || a.Q6 === "Somewhat comfortable") comfortCount++
      if (Array.isArray(a.Q7)) a.Q7.forEach((c: string) => concernsCounts[c] = (concernsCounts[c] || 0) + 1)
      if (a.Q9 === "Always") totalTranslationBurden += 3
      else if (a.Q9 === "Often") totalTranslationBurden += 2
      else if (a.Q9 === "Sometimes") totalTranslationBurden += 1
      if (a.Q10 === "Yes significantly") frictionImpactCount++
      if (a.Q11) bottleneckCounts[a.Q11] = (bottleneckCounts[a.Q11] || 0) + 1
    })

    setMetrics({
      totalDocs,
      avgDailyTime: totalDocs > 0 ? totalDailyTime / totalDocs : 0,
      avgPatients: totalDocs > 0 ? totalPatients / totalDocs : 0,
      afterHoursLoad: totalDocs > 0 ? (afterHoursCount / totalDocs) * 100 : 0,
      avgSatisfaction: totalDocs > 0 ? totalSatisfaction / totalDocs : 0,
      toolsFragScore: totalDocs > 0 ? totalTools / totalDocs : 0,
      aiAdoptionScore: totalDocs > 0 ? (comfortCount / totalDocs) * 100 : 0,
      translationBurden: totalDocs > 0 ? (totalTranslationBurden / (totalDocs * 3)) * 100 : 0,
      frictionImpact: totalDocs > 0 ? (frictionImpactCount / totalDocs) * 100 : 0
    })

    setCharts({
      workflowSplit: Object.entries(workflowCounts).map(([name, value]) => ({ name, value })),
      painDistribution: Object.entries(painCounts).map(([name, value]) => ({ name, value })),
      concernFrequency: Object.entries(concernsCounts).map(([name, value]) => ({ name, value })),
      bottleneckDistribution: Object.entries(bottleneckCounts).map(([name, value]) => ({ name, value }))
    })
  }

  if (loading) return <DashboardSkeleton />

  return (
    <SidebarProvider style={{ "--sidebar-width": "calc(var(--spacing) * 64)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col py-4 md:gap-4 md:py-6">
          <SectionCards metrics={metrics} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-6 mt-4">
            <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /> Time & Effort</CardTitle>
                  <Link href="/dashboard/rq1" className="text-xs text-primary hover:underline">Details</Link>
                </div>
                <CardDescription className="text-xs">Workflow splits across session points loaded flawlessly</CardDescription>
              </CardHeader>
              <CardContent className="h-60 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={charts.workflowSplit} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={2}>
                      {charts.workflowSplit.map((_: any, index: any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2"><Smile className="size-4 text-muted-foreground" /> Tool Fragmentation</CardTitle>
                  <Link href="/dashboard/rq2" className="text-xs text-primary hover:underline">Details</Link>
                </div>
                <CardDescription className="text-xs">Frag Score: {metrics.toolsFragScore.toFixed(1)} tools/user</CardDescription>
              </CardHeader>
              <CardContent className="h-60 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.painDistribution} layout="vertical">
                    <YAxis type="category" dataKey="name" fontSize={10} tickLine={false} axisLine={false} width={80} />
                    <XAxis type="number" fontSize={10} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-6 mt-2">
            <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2"><Zap className="size-4 text-muted-foreground" /> AI Trust</CardTitle>
                  <Link href="/dashboard/rq3" className="text-xs text-primary hover:underline">Details</Link>
                </div>
                <CardDescription className="text-xs">{metrics.aiAdoptionScore.toFixed(0)}% are open to automated drafting nodes flawlessly loaded</CardDescription>
              </CardHeader>
              <CardContent className="h-60 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.concernFrequency}>
                    <XAxis dataKey="name" fontSize={10} tickLine={false} />
                    <YAxis type="number" fontSize={10} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2"><Languages className="size-4 text-muted-foreground" /> Multilingual Friction</CardTitle>
                  <Link href="/dashboard/rq4" className="text-xs text-primary hover:underline">Details</Link>
                </div>
                <CardDescription className="text-xs">Friction Index Impact triggers loaded flawlessly</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center gap-4 px-4 h-60">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium"><span>Ideal Translation Burden index</span><span>{metrics.translationBurden.toFixed(0)}%</span></div>
                  <Progress value={metrics.translationBurden} className="h-1.5" />
                </div>
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                  <span className="text-xs font-bold text-foreground">💡 Key Rule Threshold</span><br />
                  <span className="text-[11px] text-muted-foreground">If translating mentally burden hits &gt;50%, multilingual assistance UX guarantees localized edge buffers!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
