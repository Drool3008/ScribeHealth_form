"use client"

import * as React from "react"
import { useSurveyData, dummyResponses } from "@/lib/dashboard-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle } from "lucide-react"

const COLORS = [
  'var(--color-primary)',
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

export default function Rq3Page() {
  const { data: dbResponses, loading } = useSurveyData()
  const [comfortData, setComfortData] = React.useState<any[]>([])
  const [concernsData, setConcernsData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (loading) return

    const comfortCounts: Record<string, number> = {}
    const concernsCounts: Record<string, number> = {}

    const finalData = dbResponses

    finalData.forEach(r => {
      const a = r.answers || {}

      if (a.Q6) comfortCounts[a.Q6] = (comfortCounts[a.Q6] || 0) + 1
      if (Array.isArray(a.Q7)) {
        a.Q7.forEach((concern: string) => {
          concernsCounts[concern] = (concernsCounts[concern] || 0) + 1
        })
      }
    })

    setComfortData(Object.entries(comfortCounts).map(([name, value]) => ({ name, value })))
    setConcernsData(Object.entries(concernsCounts).map(([name, value]) => ({ name, value })))
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">RQ3: Comfort with Automated Note Generation</h1>
        <p className="text-sm text-muted-foreground">Evaluating trust thresholds, adoption factors and transparency requirements.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20 shadow-sm animate-in zoom-in duration-300">
        <HelpCircle className="size-5 text-primary" />
        <AlertDescription className="ml-2">
          <span className="font-bold text-foreground">💡 Core Insight:</span> Doctors are generally open to automated note drafting setups, but data confirms that <span className="underline decoration-primary font-semibold">hallucinations and precision</span> concerns remain standard friction points requiring transparent guardrails.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Comfort Using AI (Q6)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={comfortData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {comfortData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Concerns Frequency (Q7)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={concernsData} layout="vertical">
                <YAxis type="category" dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
