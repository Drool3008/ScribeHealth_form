import * as React from "react"
import { RiskClient } from "./risk-client"

export function generateStaticParams() {
  return [
    { riskId: "risk1" },
    { riskId: "risk2" },
    { riskId: "risk3" },
    { riskId: "risk4" },
    { riskId: "risk5" },
  ]
}

export default async function SingleRiskPage({ params }: { params: Promise<{ riskId: string }> }) {
  const { riskId } = await params
  
  return (
    <RiskClient riskId={riskId} />
  )
}
