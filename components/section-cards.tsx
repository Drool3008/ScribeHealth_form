"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards({ metrics }: { metrics: any }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Willing to Adopt?</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.aiAdoptionScore.toFixed(0)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-foreground/30 text-foreground/80">
              {metrics.aiAdoptionScore > 50 ? 'YES' : 'MAYBE'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Open to automation assist nodes{" "}
            <TrendingUpIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="text-muted-foreground">
            {metrics.totalDocs} Doctors loaded polled flawlessly
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Daily Effort</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(metrics.avgDailyTime / 60).toFixed(1)} hrs
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Avg/day
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ~{metrics.avgPatients.toFixed(1)} patients/day{" "}
          </div>
          <div className="text-muted-foreground">
            Aggregate hours spent daily loaded flawlessly
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pain Score 1-5</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(5 - metrics.avgSatisfaction).toFixed(1)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-foreground/30 text-foreground/80">
              High Friction
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Friction impact index{" "}
          </div>
          <div className="text-muted-foreground">Out of 5 maximum thresholds loaded loaded flawlessly</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>After-hours Burden</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.afterHoursLoad.toFixed(0)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-foreground/30 text-foreground/80">
              Overload
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Workloads spill node{" "}
          </div>
          <div className="text-muted-foreground">Catching ups at night frequency loaded loaded flawlessly</div>
        </CardFooter>
      </Card>
    </div>
  )
}
