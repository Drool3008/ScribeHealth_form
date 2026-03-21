"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Smile, AlertTriangle, Languages, Zap } from "lucide-react"

const COLORS = ['#FF6F61', '#6B5B95', '#88B04B', '#92A8D1', '#955251', '#B565A7']

type SurveyResponse = {
  id: string
  created_at?: string
  answers: Record<string, any>
}

// Helper midpoint mapping for computations
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

export default function DashboardPage() {
  const [data, setData] = React.useState<SurveyResponse[]>([])
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
    const dummyResponses: SurveyResponse[] = [
      { id: "1", answers: {"D1": "General Physician", "D5": "10–20", "Q1": "10–15 min", "Q2": "After work hours", "Q3": ["Paper", "WhatsApp"], "Q4": 3, "Q5": "Takes too much time", "Q6": "Somewhat comfortable", "Q7": ["Accuracy", "Privacy"], "Q8": ["English", "Telugu"], "Q9": "Often", "Q10": "Yes significantly", "Q11": "After consultation", "Q12": "WhatsApp", "Q13": "Sometimes"} },
      { id: "2", answers: {"D1": "Psychiatrist", "D5": "5–10", "Q1": "20+ min", "Q2": "End of day", "Q3": ["Notion / Docs"], "Q4": 2, "Q5": "Difficult to retrieve records", "Q6": "Very comfortable", "Q7": ["Legal issues"], "Q8": ["English"], "Q9": "Never", "Q10": "Not really", "Q11": "During consultation", "Q12": "No structured process", "Q13": "Very often"} },
      { id: "3", answers: {"D1": "Dermatologist", "D5": "20+", "Q1": "5–10 min", "Q2": "Immediately after each session", "Q3": ["Hospital system", "Paper"], "Q4": 4, "Q5": "Takes too much time", "Q6": "Uncomfortable", "Q7": ["Accuracy"], "Q8": ["Mixed languages"], "Q9": "Always", "Q10": "Yes significantly", "Q11": "Follow-ups", "Q12": "Staff handles it", "Q13": "Rarely"} },
      { id: "4", answers: {"D1": "Pediatrician", "D5": "20+", "Q1": "15–20 min", "Q2": "After work hours", "Q3": ["Paper"], "Q4": 2, "Q5": "Hard to organize", "Q6": "Neutral", "Q7": ["Privacy"], "Q8": ["Hindi"], "Q9": "Sometimes", "Q10": "Slightly", "Q11": "After consultation", "Q12": "Manual calls", "Q13": "Very often"} },
      { id: "5", answers: {"D1": "Physiotherapist", "D5": "1–5", "Q1": "10–15 min", "Q2": "End of day", "Q3": ["WhatsApp", "Notion / Docs", "Paper"], "Q4": 4, "Q5": "Takes too much time", "Q6": "Somewhat comfortable", "Q7": ["Loss of control"], "Q8": ["English", "Mixed languages"], "Q9": "Often", "Q10": "Yes significantly", "Q11": "After consultation", "Q12": "WhatsApp", "Q13": "Sometimes"} },
      { id: "6", answers: {"D1": "General Physician", "D5": "10–20", "Q1": "10–15 min", "Q2": "After work hours", "Q3": ["Paper", "Notion / Docs"], "Q4": 3, "Q5": "Takes too much time", "Q6": "Very comfortable", "Q7": ["Accuracy"], "Q8": ["Telugu"], "Q9": "Often", "Q10": "Yes significantly", "Q11": "After consultation", "Q12": "No structured process", "Q13": "Very often"} },
      { id: "7", answers: {"D1": "Dermatologist", "D5": "10–20", "Q1": "5–10 min", "Q2": "Immediately after each session", "Q3": ["Hospital system"], "Q4": 5, "Q5": "Switching between tools", "Q6": "Very comfortable", "Q7": ["None"], "Q8": ["English"], "Q9": "Never", "Q10": "Not really", "Q11": "During consultation", "Q12": "Staff handles it", "Q13": "Rarely"} },
      { id: "8", answers: {"D1": "Other", "D5": "5–10", "Q1": "10–15 min", "Q2": "End of day", "Q3": ["Paper"], "Q4": 4, "Q5": "Takes too much time", "Q6": "Somewhat comfortable", "Q7": ["Accuracy"], "Q8": ["Hindi", "Mixed languages"], "Q9": "Sometimes", "Q10": "Slightly", "Q11": "Follow-ups", "Q12": "Manual calls", "Q13": "Sometimes"} },
      { id: "9", answers: {"D1": "General Physician", "D5": "20+", "Q1": "10–15 min", "Q2": "After work hours", "Q3": ["Paper", "WhatsApp", "Notion / Docs"], "Q4": 2, "Q5": "Takes too much time", "Q6": "Somewhat comfortable", "Q7": ["Privacy"], "Q8": ["Mixed languages"], "Q9": "Always", "Q10": "Yes significantly", "Q11": "After consultation", "Q12": "No structured process", "Q13": "Very often"} },
      { id: "10", answers: {"D1": "Psychiatrist", "D5": "5–10", "Q1": "20+ min", "Q2": "After work hours", "Q3": ["Notion / Docs"], "Q4": 4, "Q5": "Hard to organize", "Q6": "Somewhat comfortable", "Q7": ["Accuracy"], "Q8": ["English"], "Q9": "Sometimes", "Q10": "Not really", "Q11": "After consultation", "Q12": "Staff handles it", "Q13": "Sometimes"} }
    ]

    setData(dummyResponses)
    aggregateMetrics(dummyResponses)
  }, [])

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

      // RQ1
      const patientCount = mapPatients(a.D5)
      const timePerPatient = mapTime(a.Q1)
      totalDailyTime += patientCount * timePerPatient
      if (a.Q2 === "After work hours") afterHoursCount++
      if (a.Q2) workflowCounts[a.Q2] = (workflowCounts[a.Q2] || 0) + 1

      // RQ2
      if (Array.isArray(a.Q3)) totalTools += a.Q3.length
      if (a.Q4) totalSatisfaction += Number(a.Q4)
      if (a.Q5) painCounts[a.Q5] = (painCounts[a.Q5] || 0) + 1

      // RQ3
      if (a.Q6 === "Very comfortable" || a.Q6 === "Somewhat comfortable") comfortCount++
      if (Array.isArray(a.Q7)) {
        a.Q7.forEach((c: string) => concernsCounts[c] = (concernsCounts[c] || 0) + 1)
      }

      // RQ4
      if (Array.isArray(a.Q8) && a.Q8.includes("Mixed languages")) mixedLangCount++
      if (a.Q9 === "Always") totalTranslationBurden += 3
      if (a.Q9 === "Often") totalTranslationBurden += 2
      if (a.Q9 === "Sometimes") totalTranslationBurden += 1
      if (a.Q10 === "Yes significantly") frictionImpactCount++

      // RQ5
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

  const isProblemReal = metrics.avgDailyTime > 100 && metrics.avgSatisfaction < 3.5
  const triggersAction = metrics.afterHoursLoad > 40 && metrics.aiAdoptionScore > 50

  return (
    <div className="min-h-screen bg-background/95 p-6 animate-fade-in-up">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">framework Scorecard & Insight Board</h1>
            <p className="text-muted-foreground">Framework metrics analyzing Doctor workflow frictions setups.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isProblemReal ? "destructive" : "secondary"} className="h-7 px-2.5">
              {isProblemReal ? "🚨 Problem Validated" : "🔍 Investigation stage"}
            </Badge>
            <Badge className="h-7 px-2.5 bg-emerald-500 text-white">
              {triggersAction ? "✅ High Adoption Expected" : "⚠️ Assistive UX required"}
            </Badge>
          </div>
        </div>

        <Separator className="bg-border/45" />

        <Card className="border border-red-200/50 bg-destructive/5 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Willing to Adopt?</span>
            <div className={`text-xl font-bold mt-1 ${metrics.aiAdoptionScore > 50 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {metrics.aiAdoptionScore > 50 ? 'YES' : 'MAYBE'} ({metrics.aiAdoptionScore.toFixed(0)}%)
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Daily Doc Effort</span>
            <div className="text-xl font-bold mt-1 text-foreground">{metrics.avgDailyTime.toFixed(0)} mins / day</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pain Score 1-5 Scale</span>
            <div className="text-xl font-bold mt-1 text-red-500">{(5 - metrics.avgSatisfaction).toFixed(1)} Rating</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">After-Hours Burnout</span>
            <div className="text-xl font-bold mt-1 text-destructive">{metrics.afterHoursLoad.toFixed(0)}% Over hours</div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Clock className="size-5" /> RQ1: Time & Effort</CardTitle>
              <CardDescription>“Doctors spend {metrics.avgDailyTime.toFixed(0)} mins/day on documentation”</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={charts.workflowSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                    {charts.workflowSplit.map((_: any, index: any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Smile className="size-5" /> RQ2: Tool Fragmentation</CardTitle>
              <CardDescription>Fragmentation Score: {metrics.toolsFragScore.toFixed(1)} tools/user</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.painDistribution} layout="vertical">
                  <YAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={100} />
                  <XAxis type="number" fontSize={12} tickLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#6B5B95" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Zap className="size-5" /> RQ3: AI Trust</CardTitle>
              <CardDescription>{metrics.aiAdoptionScore.toFixed(0)}% are open to automated notes drafting</CardDescription>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.concernFrequency}>
                  <XAxis dataKey="name" fontSize={11} tickLine={false} />
                  <YAxis fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#88B04B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Languages className="size-5" /> RQ4: Multilingual Friction</CardTitle>
              <CardDescription>{metrics.frictionImpact.toFixed(0)}% say it slows documentation significantly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4 px-6">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium"><span>Ideal Translation Burden index</span><span>{metrics.translationBurden.toFixed(0)}%</span></div>
                <Progress value={metrics.translationBurden} className="h-2 bg-muted-foreground/15" />
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border">
                <span className="text-sm font-bold">💡 Key Rule Threshold</span><br />
                <span className="text-xs text-muted-foreground">If translating mentally burden hits &gt;50%, multilingual assistance UX guarantees localized edge buffers!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border shadow-sm">
          <CardHeader><CardTitle className="text-lg">RQ5: Workflow Bottlenecks</CardTitle></CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.bottleneckDistribution}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF6F61" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
