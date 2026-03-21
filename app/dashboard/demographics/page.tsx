"use client"

import * as React from "react"
import { useSurveyData, dummyResponses } from "@/lib/dashboard-helper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function DemographicsPage() {
  const { data: dbResponses, loading } = useSurveyData()
  const [charts, setCharts] = React.useState<any>({
    d1: [], d2: [], d3: [], d4: [], d6: [], d7: [], d8: [], d9: []
  })

  React.useEffect(() => {
    if (loading) return

    const d1Counts: Record<string, number> = {}
    const d2Counts: Record<string, number> = {}
    const d3Counts: Record<string, number> = {}
    const d4Counts: Record<string, number> = {}
    const d6Counts: Record<string, number> = {}
    const d7Counts: Record<string, number> = {}
    const d8Counts: Record<string, number> = {}
    const d9Counts: Record<string, number> = {}

    const finalData = dbResponses

    finalData.forEach(r => {
      const a = r.answers || {}
      if (a.D1) d1Counts[a.D1] = (d1Counts[a.D1] || 0) + 1
      if (a.D2) d2Counts[a.D2] = (d2Counts[a.D2] || 0) + 1
      if (a.D3) d3Counts[a.D3] = (d3Counts[a.D3] || 0) + 1
      if (a.D4) d4Counts[a.D4] = (d4Counts[a.D4] || 0) + 1
      if (a.D6) d6Counts[a.D6] = (d6Counts[a.D6] || 0) + 1
      if (a.D7) d7Counts[a.D7] = (d7Counts[a.D7] || 0) + 1
      if (a.D8) d8Counts[a.D8] = (d8Counts[a.D8] || 0) + 1
      if (a.D9) d9Counts[a.D9] = (d9Counts[a.D9] || 0) + 1
    })

    const mapFn = (counts: Record<string, number>) => Object.entries(counts).map(([name, value]) => ({ name, value }))

    setCharts({
      d1: mapFn(d1Counts),
      d2: mapFn(d2Counts),
      d3: mapFn(d3Counts),
      d4: mapFn(d4Counts),
      d6: mapFn(d6Counts),
      d7: mapFn(d7Counts),
      d8: mapFn(d8Counts),
      d9: mapFn(d9Counts),
    })
  }, [dbResponses, loading])

  if (loading) return <PageSkeleton />

  return (
    <div className="py-4 space-y-6 animate-in fade-in duration-500 px-4 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Primary Specializations (D1)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.d1} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {charts.d1.map((_: any, index: any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Primary Workplaces (D3)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.d3}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis type="number" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Experience (D2)</CardTitle></CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.d2}>
                <XAxis dataKey="name" fontSize={10} tickLine={false} />
                <YAxis type="number" fontSize={10} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Location (D4)</CardTitle></CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.d4} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={3}>
                  {charts.d4.map((_: any, index: any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
          <CardHeader><CardTitle className="text-sm font-semibold">Session lengths (D6)</CardTitle></CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.d6}>
                <XAxis dataKey="name" fontSize={10} tickLine={false} />
                <YAxis type="number" fontSize={10} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
