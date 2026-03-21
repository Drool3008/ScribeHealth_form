"use client"

import * as React from "react"
import Link from "next/link"
import { useSurveyData, dummyResponses, SurveyResponse } from "@/lib/dashboard-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Smile, Languages, Zap } from "lucide-react"

const COLORS = [
  'var(--foreground)',
  'var(--primary)',
  'var(--muted-foreground)',
  'var(--accent-foreground)',
  'var(--secondary)'
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-24 rounded-xl mt-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data: dbData, loading } = useSurveyData()
  const [metrics, setMetrics] = React.useState({
    totalDocs: 0,
    avgDailyTime: 0,
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

    const finalData = dbData
    aggregateMetrics(finalData)
  }, [dbData, loading])

  const aggregateMetrics = (responses: SurveyResponse[]) => {
    let totalDocs = responses.length
    
    let totalDailyTime = 0
    let afterHoursCount = 0
    let workflowCounts: Record<string, number> = { "Immediately after each session": 0, "End of day": 0, "After work hours": 0 }

    let totalTools = 0
    let totalSatisfaction = 0
    let painCounts: Record<string, number> = {}

    let comfortCount = 0
    let concernsCounts: Record<string, number> = {}

    let mixedLangCount = 0
    let totalTranslationBurden = 0
    let frictionImpactCount = 0

    let bottleneckCounts: Record<string, number> = {}

    responses.forEach(r => {
      const a = r.answers || {}

      const patientCount = mapPatients(a.D5)
      const timePerPatient = mapTime(a.Q1)
      totalDailyTime += patientCount * timePerPatient
      if (a.Q2 === "After work hours") afterHoursCount++
      if (a.Q2) workflowCounts[a.Q2] = (workflowCounts[a.Q2] || 0) + 1

      if (Array.isArray(a.Q3)) totalTools += a.Q3.length
      if (a.Q4) totalSatisfaction += Number(a.Q4)
      if (a.Q5) painCounts[a.Q5] = (painCounts[a.Q5] || 0) + 1

      if (a.Q6 === "Very comfortable" || a.Q6 === "Somewhat comfortable") comfortCount++
      if (Array.isArray(a.Q7)) {
        a.Q7.forEach((c: string) => concernsCounts[c] = (concernsCounts[c] || 0) + 1)
      }

      if (Array.isArray(a.Q8) && a.Q8.includes("Mixed languages")) mixedLangCount++
      if (a.Q9 === "Always") totalTranslationBurden += 3
      if (a.Q9 === "Often") totalTranslationBurden += 2
      if (a.Q9 === "Sometimes") totalTranslationBurden += 1
      if (a.Q10 === "Yes significantly") frictionImpactCount++

      if (a.Q11) bottleneckCounts[a.Q11] = (bottleneckCounts[a.Q11] || 0) + 1
    })

    setMetrics({
      totalDocs,
      avgDailyTime: totalDocs > 0 ? totalDailyTime / totalDocs : 0,
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

  const isProblemReal = metrics.avgDailyTime > 100 && metrics.avgSatisfaction < 3.5
  const triggersAction = metrics.afterHoursLoad > 40 && metrics.aiAdoptionScore > 50

  return (
    <div className="min-h-screen bg-background p-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Scorecard & Insight Board</h1>
            <p className="text-sm text-muted-foreground">Framework metrics analyzing Doctor workflow frictions setups.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isProblemReal ? "destructive" : "secondary"}>
              {isProblemReal ? "🚨 Problem Validated" : "🔍 Investigation stage"}
            </Badge>
            <Badge className="bg-emerald-500 text-white">
              {triggersAction ? "✅ High Adoption Expected" : "⚠️ Assistive UX required"}
            </Badge>
          </div>
        </div>

        <Separator className="bg-border/45" />

        <Card className="border border-red-200/20 bg-destructive/5 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Willing to Adopt?</span>
            <div className={`text-xl font-bold mt-1 ${metrics.aiAdoptionScore > 50 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {metrics.aiAdoptionScore > 50 ? 'YES' : 'MAYBE'} ({metrics.aiAdoptionScore.toFixed(0)}%)
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Daily Doc Effort</span>
            <div className="text-xl font-bold mt-1 text-foreground">{metrics.avgDailyTime.toFixed(0)} mins</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pain Score 1-5 Scale</span>
            <div className="text-xl font-bold mt-1 text-red-500">{(5 - metrics.avgSatisfaction).toFixed(1)}</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">After-Hours Burden</span>
            <div className="text-xl font-bold mt-1 text-destructive">{metrics.afterHoursLoad.toFixed(0)}%</div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2"><Clock className="size-5 text-muted-foreground" /> RQ1: Time & Effort</CardTitle>
                <Link href="/dashboard/rq1" className="text-xs text-primary hover:underline font-medium">Details &rarr;</Link>
              </div>
              <CardDescription>“Doctors spend {metrics.avgDailyTime.toFixed(0)} mins/day on documentation”</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={charts.workflowSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                    {charts.workflowSplit.map((_: any, index: any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2"><Smile className="size-5 text-muted-foreground" /> RQ2: Tool Fragmentation</CardTitle>
                <Link href="/dashboard/rq2" className="text-xs text-primary hover:underline font-medium">Details &rarr;</Link>
              </div>
              <CardDescription>Fragmentation Score: {metrics.toolsFragScore.toFixed(1)} tools/user</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.painDistribution} layout="vertical">
                  <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={100} />
                  <XAxis type="number" fontSize={12} tickLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2"><Zap className="size-5 text-muted-foreground" /> RQ3: AI Trust</CardTitle>
                <Link href="/dashboard/rq3" className="text-xs text-primary hover:underline font-medium">Details &rarr;</Link>
              </div>
              <CardDescription>{metrics.aiAdoptionScore.toFixed(0)}% are open to automated notes drafting</CardDescription>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.concernFrequency}>
                  <XAxis dataKey="name" fontSize={11} tickLine={false} />
                  <YAxis type="number" fontSize={11} tickLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2"><Languages className="size-5 text-muted-foreground" /> RQ4: Multilingual Friction</CardTitle>
                <Link href="/dashboard/rq4" className="text-xs text-primary hover:underline font-medium">Details &rarr;</Link>
              </div>
              <CardDescription>{metrics.frictionImpact.toFixed(0)}% say it slows documentation significantly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4 px-6">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium"><span>Ideal Translation Burden index</span><span>{metrics.translationBurden.toFixed(0)}%</span></div>
                <Progress value={metrics.translationBurden} className="h-2 bg-muted" />
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border">
                <span className="text-sm font-bold">💡 Key Rule Threshold</span><br />
                <span className="text-xs text-muted-foreground">If translating mentally burden hits &gt;50%, multilingual assistance UX guarantees localized edge buffers!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">RQ5: Workflow Bottlenecks</CardTitle>
              <Link href="/dashboard/rq5" className="text-xs text-primary hover:underline font-medium">Details &rarr;</Link>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.bottleneckDistribution}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis type="number" fontSize={12} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
