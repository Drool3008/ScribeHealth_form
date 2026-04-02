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

export default function Rq4Page() {
  const { data: dbResponses, loading } = useSurveyData()
  const [langsData, setLangsData] = React.useState<any[]>([])
  const [translateData, setTranslateData] = React.useState<any[]>([])
  const [burdenData, setBurdenData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (loading) return

    const langCounts: Record<string, number> = {}
    const translateCounts: Record<string, number> = {}
    const burdenCounts: Record<string, number> = {}

    const finalData = dbResponses

    finalData.forEach(r => {
      const a = r.answers || {}

      if (Array.isArray(a.Q8)) {
        a.Q8.forEach((lang: string) => {
          langCounts[lang] = (langCounts[lang] || 0) + 1
        })
      }
      if (a.Q9) translateCounts[a.Q9] = (translateCounts[a.Q9] || 0) + 1
      if (a.Q10) burdenCounts[a.Q10] = (burdenCounts[a.Q10] || 0) + 1
    })

    setLangsData(Object.entries(langCounts).map(([name, value]) => ({ name, value })))
    setTranslateData(Object.entries(translateCounts).map(([name, value]) => ({ name, value })))
    setBurdenData(Object.entries(burdenCounts).map(([name, value]) => ({ name, value })))
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="py-4 space-y-6 px-4 lg:px-6 animate-in fade-in duration-500">
      

      <Alert className="bg-primary/5 border-primary/20 shadow-sm animate-in zoom-in duration-300">
        <HelpCircle className="size-5 text-primary" />
        <AlertDescription className="ml-2">
          <span className="font-bold text-foreground">💡 Core Insight:</span> mental translation burdens add significant friction buffers, slowing down documentation throughput setups requiring localized node mitigations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-none hover:shadow-sm transition-all duration-300 bg-gradient-to-t from-primary/5 to-card @container/card">
          <CardHeader><CardTitle className="text-sm font-semibold">Mental Translation Strain (Q9)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={translateData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {translateData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-sm transition-all duration-300 bg-gradient-to-t from-primary/5 to-card @container/card">
          <CardHeader><CardTitle className="text-sm font-semibold">Slower / Harder metrics (Q10)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={burdenData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} />
                <YAxis type="number" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-none hover:shadow-sm transition-all duration-300 bg-gradient-to-t from-primary/5 to-card @container/card">
        <CardHeader><CardTitle className="text-sm font-semibold">Patient Communication Languages (Q8)</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={langsData} layout="vertical">
              <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={100} />
              <XAxis type="number" fontSize={11} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
