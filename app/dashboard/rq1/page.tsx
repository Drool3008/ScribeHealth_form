"use client"

import * as React from "react"
import { useSurveyData, dummyResponses, mapPatients, mapTime } from "@/lib/dashboard-helper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle } from "lucide-react"

const COLORS2 = [
  'var(--foreground)',
  'var(--primary)',
  'var(--muted-foreground)',
  'var(--accent-foreground)',
  'var(--secondary)'
]

function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Skeleton className="h-72 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>
    </div>
  )
}

export default function Rq1Page() {
  const { data: dbResponses, loading } = useSurveyData()
  const [dailyTime, setDailyTime] = React.useState(0)
  const [afterHours, setAfterHours] = React.useState(0)
  const [workflow, setWorkflow] = React.useState<any[]>([])
  const [mentalTire, setMentalTire] = React.useState<any[]>([])
  const [patientsData, setPatientsData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (loading) return

    const finalData = dbResponses.length > 0 ? dbResponses : dummyResponses
    let totalDocs = finalData.length
    let totalDailyTime = 0
    let afterHoursCount = 0
    let workflowCounts: Record<string, number> = { "Immediately after each session": 0, "End of day": 0, "After work hours": 0 }
    const mentalCounts: Record<string, number> = {}
    const patientCounts: Record<string, number> = {}

    finalData.forEach(r => {
      const a = r.answers || {}
      totalDailyTime += mapPatients(a.D5) * mapTime(a.Q1)
      if (a.Q2 === "After work hours") afterHoursCount++
      if (a.Q2) workflowCounts[a.Q2] = (workflowCounts[a.Q2] || 0) + 1
      
      if (a.Q_mental_tire) mentalCounts[a.Q_mental_tire] = (mentalCounts[a.Q_mental_tire] || 0) + 1
      if (a.D5) patientCounts[a.D5] = (patientCounts[a.D5] || 0) + 1
    })

    setDailyTime(totalDocs > 0 ? totalDailyTime / totalDocs : 0)
    setAfterHours(totalDocs > 0 ? (afterHoursCount / totalDocs) * 100 : 0)
    setWorkflow(Object.entries(workflowCounts).map(([name, value]) => ({ name, value })))
    setMentalTire(Object.entries(mentalCounts).map(([name, value]) => ({ name, value })))
    setPatientsData(Object.entries(patientCounts).map(([name, value]) => ({ name, value })))
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">RQ1: Time & Effort</h1>
        <p className="text-sm text-muted-foreground">Detailed profiling of daily documentation time spend and After-hours burnout</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20 shadow-sm animate-in zoom-in duration-300">
        <HelpCircle className="size-5 text-primary" />
        <AlertDescription className="ml-2">
          <span className="font-bold text-foreground">💡 Core Insight:</span> Doctors spend an average of <span className="underline decoration-primary font-semibold">{dailyTime.toFixed(0)} mins/day</span> on documentation, with <span className="underline decoration-primary font-semibold">{afterHours.toFixed(0)}%</span> reporting extend limits pushing into after-hours workloads setups.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border p-6 hover:shadow-md transition-all duration-300">
          <div className="text-xs uppercase font-semibold text-muted-foreground">Daily effort</div>
          <div className="text-3xl font-bold mt-1 text-foreground">{dailyTime.toFixed(0)} mins / day</div>
        </Card>
        <Card className="border p-6 hover:shadow-md transition-all duration-300">
          <div className="text-xs uppercase font-semibold text-muted-foreground">After Office Burn</div>
          <div className="text-3xl font-bold mt-1 text-foreground">{afterHours.toFixed(0)}% docs</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Workflow Distribution (Q2)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={workflow} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {workflow.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Daily Patient Capacity (D5)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientsData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} />
                <YAxis type="number" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <CardHeader><CardTitle className="text-lg">Mental Tiredness Burden (Q_mental_tire)</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mentalTire} layout="vertical">
              <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={100} />
              <XAxis type="number" fontSize={11} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
