"use client"

import * as React from "react"
import { useSurveyData } from "@/lib/dashboard-helper"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DataLibraryPage() {
  const { data: dbData, loading } = useSurveyData()

  if (loading) {
    return (
      <div className="py-4 px-4 lg:px-6 space-y-4 animate-pulse">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    )
  }

  const renderTableBody = () => {
    if (dbData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={23} className="h-24 text-center text-muted-foreground text-sm">
            No raw survey data fetched or stored.
          </TableCell>
        </TableRow>
      )
    }

    return dbData.map((r, index) => {
      const a = (r.answers || {}) as any
      const formatVal = (val: any) => {
        if (Array.isArray(val)) return val.join(", ")
        return val || "N/A"
      }

      return (
        <TableRow key={r.id || index} className="hover:bg-muted/30 whitespace-nowrap">
          <TableCell className="text-center text-xs text-muted-foreground font-medium">{index + 1}</TableCell>
          <TableCell className="text-xs text-foreground font-medium">{formatVal(a.D1)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D2)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D3)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D4)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D6)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D7)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D8)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.D9)}</TableCell>
          <TableCell className="text-xs font-semibold text-primary">{formatVal(a.D5)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q1)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q2)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q_mental_tire)}</TableCell>
          <TableCell className="text-xs max-w-[150px] truncate" title={formatVal(a.Q3)}>{formatVal(a.Q3)}</TableCell>
          <TableCell className="text-xs text-center font-bold">{formatVal(a.Q4)}/5</TableCell>
          <TableCell className="text-xs max-w-[150px] truncate" title={formatVal(a.Q5)}>{formatVal(a.Q5)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q6)}</TableCell>
          <TableCell className="text-xs max-w-[120px] truncate" title={formatVal(a.Q7)}>{formatVal(a.Q7)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q8)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q9)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q10)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q11)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q12)}</TableCell>
          <TableCell className="text-xs">{formatVal(a.Q13)}</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <div className="py-4 space-y-6 px-4 lg:px-6 animate-in fade-in duration-500">
      <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span>Unified Spreadsheet View ({dbData.length} records)</span>
            <span className="text-[11px] text-muted-foreground font-normal">Scroll horizontally to view absolute question aggregates flawlessly</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50 border-b">
                <TableRow className="whitespace-nowrap">
                  <TableHead className="w-12 text-center text-xs">#</TableHead>
                  <TableHead className="text-xs font-bold text-foreground">Specialty (D1)</TableHead>
                  <TableHead className="text-xs font-semibold">Exp (D2)</TableHead>
                  <TableHead className="text-xs font-semibold">Workplace (D3)</TableHead>
                  <TableHead className="text-xs font-semibold">Location (D4)</TableHead>
                  <TableHead className="text-xs font-semibold">Consult style (D6)</TableHead>
                  <TableHead className="text-xs font-semibold">Required? (D7)</TableHead>
                  <TableHead className="text-xs font-semibold">Tech Comfort (D8)</TableHead>
                  <TableHead className="text-xs font-semibold">Device (D9)</TableHead>
                  <TableHead className="text-xs font-bold text-primary">Patients/D (D5)</TableHead>
                  <TableHead className="text-xs font-semibold">Time/P (Q1)</TableHead>
                  <TableHead className="text-xs font-semibold">Timing (Q2)</TableHead>
                  <TableHead className="text-xs font-semibold">Ment Tire (Q_mental)</TableHead>
                  <TableHead className="text-xs font-semibold">Tools (Q3)</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Satisfaction (Q4)</TableHead>
                  <TableHead className="text-xs font-semibold">Pain Point (Q5)</TableHead>
                  <TableHead className="text-xs font-semibold">AI Comfort (Q6)</TableHead>
                  <TableHead className="text-xs font-semibold">Concerns (Q7)</TableHead>
                  <TableHead className="text-xs font-semibold">Languages (Q8)</TableHead>
                  <TableHead className="text-xs font-semibold">Mental Translate (Q9)</TableHead>
                  <TableHead className="text-xs font-semibold">Slower? (Q10)</TableHead>
                  <TableHead className="text-xs font-semibold">Inefficient? (Q11)</TableHead>
                  <TableHead className="text-xs font-semibold">Follow-ups (Q12)</TableHead>
                  <TableHead className="text-xs font-semibold">Delays (Q13)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableBody()}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
