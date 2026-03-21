"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Users, Clock, Smile, AlertTriangle } from "lucide-react"

const COLORS = ['#FF6F61', '#6B5B95', '#88B04B', '#92A8D1', '#955251', '#B565A7']

type SurveyResponse = {
  id: string
  created_at: string
  answers: Record<string, any>
}

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState<SurveyResponse[]>([])
  
  // Aggregated states for charts
  const [specializationData, setSpecializationData] = React.useState<any[]>([])
  const [workplaceData, setWorkplaceData] = React.useState<any[]>([])
  const [satisfactionAverage, setSatisfactionAverage] = React.useState(0)
  const [mentallyTiringData, setMentallyTiringData] = React.useState<any[]>([])
  const [concernsData, setConcernsData] = React.useState<any[]>([])

  React.useEffect(() => {
    async function fetchData() {
      const { data: responses, error } = await supabase
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && responses) {
        setData(responses)
        aggregateMetrics(responses)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const aggregateMetrics = (responses: SurveyResponse[]) => {
    // 1. Specializations (D1)
    const specCounts: Record<string, number> = {}
    // 2. Workplace (D3)
    const workplaceCounts: Record<string, number> = {}
    // 3. Satisfaction (Q4)
    let totalSatisfaction = 0
    let satisfactionCount = 0
    // 4. Mentally Tiring (Q_mental_tire)
    const mentalCounts: Record<string, number> = {}
    // 5. Concerns (Q7 - Multi response)
    const concernsCounts: Record<string, number> = {}

    responses.forEach(r => {
      const ans = r.answers || {}

      // D1: Specialization
      if (ans.D1) {
        specCounts[ans.D1] = (specCounts[ans.D1] || 0) + 1
      }

      // D3: Workplace
      if (ans.D3) {
        workplaceCounts[ans.D3] = (workplaceCounts[ans.D3] || 0) + 1
      }

      // Q4: Satisfaction
      if (ans.Q4 !== undefined) {
        totalSatisfaction += Number(ans.Q4)
        satisfactionCount++
      }

      // Q_mental_tire
      if (ans.Q_mental_tire) {
        mentalCounts[ans.Q_mental_tire] = (mentalCounts[ans.Q_mental_tire] || 0) + 1
      }

      // Q7: Concerns
      if (Array.isArray(ans.Q7)) {
        ans.Q7.forEach((concern: string) => {
          concernsCounts[concern] = (concernsCounts[concern] || 0) + 1
        })
      }
    })

    setSpecializationData(Object.entries(specCounts).map(([name, value]) => ({ name, value })))
    setWorkplaceData(Object.entries(workplaceCounts).map(([name, value]) => ({ name, value })))
    setSatisfactionAverage(satisfactionCount > 0 ? totalSatisfaction / satisfactionCount : 0)
    setMentallyTiringData(Object.entries(mentalCounts).map(([name, value]) => ({ name, value })))
    setConcernsData(Object.entries(concernsCounts).map(([name, value]) => ({ name, value })))
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-2 bg-background/95">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground font-medium">Crunching metrics...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background/95 p-6 animate-fade-in-up">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Headers */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Metrics Dashboard</h1>
          <p className="text-muted-foreground">Detailed overview of doctor survey answers tallies analytics</p>
        </div>

        <Separator className="bg-border/45" />

        {/* Metric Cards Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
              <p className="text-xs text-muted-foreground">Last updated just now</p>
            </CardContent>
          </Card>

          <Card className="border border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
              <Smile className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{satisfactionAverage.toFixed(1)} / 5.0</div>
              <Progress value={(satisfactionAverage / 5) * 100} className="h-1.5 mt-2 bg-muted-foreground/15" />
            </CardContent>
          </Card>

          <Card className="border border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Top Concern</CardTitle>
              <AlertTriangle className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {concernsData.sort((a,b) => b.value - a.value)[0]?.name || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Most repeated answer choice</p>
            </CardContent>
          </Card>

          <Card className="border border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Mentally Tire Rate</CardTitle>
              <Clock className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-destructive/80">
                {mentallyTiringData.find(d => d.name === 'Very tiring')?.value || 0} Doctors
              </div>
              <p className="text-xs text-muted-foreground">Marked "Very tiring" effort</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Primary Specialization</CardTitle>
              <CardDescription>Breakdown by Doctor specialists</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={specializationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {specializationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Primary Workplace</CardTitle>
              <CardDescription>Where doctors consult from</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workplaceData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#6B5B95" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Bar Chart row */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card className="border border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Top Automation Concerns</CardTitle>
              <CardDescription>Major worries regarding generating notes from draft scripts</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={concernsData} layout="vertical">
                  <YAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={130} />
                  <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#FF6F61" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
