"use client"

import * as React from "react"
import { useSurveyData, dummyResponses } from "@/lib/dashboard-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle } from "lucide-react"

const COLORS = [
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Skeleton className="h-72 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>
    </div>
  )
}

export default function Rq5Page() {
  const { data: dbResponses, loading } = useSurveyData()
  const [effortData, setEffortData] = React.useState<any[]>([])
  const [followupsData, setFollowupsData] = React.useState<any[]>([])
  const [missedData, setMissedData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (loading) return

    const effortCounts: Record<string, number> = {}
    const followupCounts: Record<string, number> = {}
    const missedCounts: Record<string, number> = {}

    const finalData = dbResponses

    finalData.forEach(r => {
      const a = r.answers || {}

      if (a.Q11) effortCounts[a.Q11] = (effortCounts[a.Q11] || 0) + 1
      if (a.Q12) followupCounts[a.Q12] = (followupCounts[a.Q12] || 0) + 1
      if (a.Q13) missedCounts[a.Q13] = (missedCounts[a.Q13] || 0) + 1
    })

    setEffortData(Object.entries(effortCounts).map(([name, value]) => ({ name, value })))
    setFollowupsData(Object.entries(followupCounts).map(([name, value]) => ({ name, value })))
    setMissedData(Object.entries(missedCounts).map(([name, value]) => ({ name, value })))
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">RQ5: Workflow Inefficiencies</h1>
        <p className="text-sm text-muted-foreground">Measuring consultative stages speed loads and follow-ups friction metrics.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20 shadow-sm animate-in zoom-in duration-300">
        <HelpCircle className="size-5 text-primary" />
        <AlertDescription className="ml-2">
          <span className="font-bold text-foreground">💡 Core Insight:</span> Follow-ups communication and manual delayed stages act as the primary inefficiencies slowing consultative triggers.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Most Inefficient Stage (Q11)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={effortData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {effortData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Delayed or Missed Follow-ups (Q13)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={missedData}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis type="number" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <CardHeader><CardTitle className="text-lg">Follow-up Communication Process (Q12)</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={followupsData} layout="vertical">
              <YAxis type="category" dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={100} />
              <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
