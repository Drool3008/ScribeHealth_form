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

  return (
    <div className="py-4 space-y-6 px-4 lg:px-6 animate-in fade-in duration-500">
      <Card className="border shadow-none hover:shadow-sm transition-all duration-300">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span>Raw Survey Responses ({dbData.length} records)</span>
            <span className="text-[11px] text-muted-foreground font-normal">Sourcing real-time Supabase aggregate grid nodes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-center text-xs">#</TableHead>
                  <TableHead className="text-xs font-semibold">Specialty (D1)</TableHead>
                  <TableHead className="text-xs font-semibold">Patients/day (D5)</TableHead>
                  <TableHead className="text-xs font-semibold">Time/patient (Q1)</TableHead>
                  <TableHead className="text-xs font-semibold">After-hours (Q2)</TableHead>
                  <TableHead className="text-xs font-semibold">Satisfaction (Q4)</TableHead>
                  <TableHead className="text-xs font-semibold">Core Pain (Q5)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dbData.map((r, index) => (
                  <TableRow key={r.id || index} className="hover:bg-muted/30">
                    <TableCell className="text-center text-xs text-muted-foreground font-medium">{index + 1}</TableCell>
                    <TableCell className="text-sm text-foreground">{(r.answers as any)?.D1 || "N/A"}</TableCell>
                    <TableCell className="text-sm text-foreground">{(r.answers as any)?.D5 || "N/A"}</TableCell>
                    <TableCell className="text-sm text-foreground">{(r.answers as any)?.Q1 || "N/A"}</TableCell>
                    <TableCell className="text-sm text-foreground">{(r.answers as any)?.Q2 || "N/A"}</TableCell>
                    <TableCell className="text-sm text-foreground">{(r.answers as any)?.Q4 || "N/A"}/5</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{(r.answers as any)?.Q5 || "N/A"}</TableCell>
                  </TableRow>
                ))}
                {dbData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground text-sm">
                      No raw survey data fetched or stored.
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
