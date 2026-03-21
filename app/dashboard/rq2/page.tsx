"use client"

import * as React from "react"
import { useSurveyData, dummyResponses } from "@/lib/dashboard-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle } from "lucide-react"

function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Skeleton className="h-72 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>
    </div>
  )
}

export default function Rq2Page() {
  const { data: dbResponses, loading } = useSurveyData()
  const [toolsData, setToolsData] = React.useState<any[]>([])
  const [satisfactionData, setSatisfactionData] = React.useState<any[]>([])
  const [frustrationsData, setFrustrationsData] = React.useState<any[]>([])
  const [avgSatisfaction, setAvgSatisfaction] = React.useState(0)

  React.useEffect(() => {
    if (loading) return

    const toolsCounts: Record<string, number> = {}
    const satCounts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
    const frustrationCounts: Record<string, number> = {}
    let totalSat = 0
    let docsWithSat = 0

    const finalData = dbResponses

    finalData.forEach(r => {
      const a = r.answers || {}
      
      if (Array.isArray(a.Q3)) {
        a.Q3.forEach((tool: string) => {
          toolsCounts[tool] = (toolsCounts[tool] || 0) + 1
        })
      }

      if (a.Q4 !== undefined) {
        const score = String(a.Q4)
        satCounts[score] = (satCounts[score] || 0) + 1
        totalSat += Number(a.Q4)
        docsWithSat++
      }

      if (a.Q5) {
        frustrationCounts[a.Q5] = (frustrationCounts[a.Q5] || 0) + 1
      }
    })

    setToolsData(Object.entries(toolsCounts).map(([name, value]) => ({ name, value })))
    setSatisfactionData(Object.entries(satCounts).map(([name, value]) => ({ name, value })))
    setFrustrationsData(Object.entries(frustrationCounts).map(([name, value]) => ({ name, value })))
    setAvgSatisfaction(docsWithSat > 0 ? totalSat / docsWithSat : 0)
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">RQ2: Tools & Frustrations</h1>
        <p className="text-sm text-muted-foreground">Analysis of tool usage fragmentation and core dissatisfaction drivers.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20 shadow-sm animate-in zoom-in duration-300">
        <HelpCircle className="size-5 text-primary" />
        <AlertDescription className="ml-2">
          <span className="font-bold text-foreground">💡 Core Insight:</span> Tools fragmentation heavily delays speeds, maintaining an average satisfaction score of only <span className="underline decoration-primary font-semibold">{avgSatisfaction.toFixed(1)}/5</span> items triggers optimizations targets.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border p-6 flex flex-col justify-center items-center hover:shadow-md transition-all duration-300">
          <div className="text-xs uppercase font-semibold text-muted-foreground">Avg Satisfaction</div>
          <div className="text-4xl font-bold mt-2 text-foreground">{avgSatisfaction.toFixed(1)}/5</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Tools Distribution (Q3)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolsData} layout="vertical">
                <YAxis type="category" dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
          <CardHeader><CardTitle className="text-lg">Satisfaction Distribution (Q4)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={satisfactionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <CardHeader><CardTitle className="text-lg">Biggest Frustration Areas (Q5)</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frustrationsData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
