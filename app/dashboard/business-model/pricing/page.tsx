"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { GuideTooltip } from "../guide-tooltip"

interface Plan {
  name: string
  price: string
  originalPrice?: string
  period: string
  popular?: boolean
  tagline: string
  features: string[]
}

const monthlyPlans: Plan[] = [
  {
    name: "Free",
    price: "0",
    period: "month",
    tagline: "Trial users",
    features: ["5 recordings/day", "8 mins each", "No card required"]
  },
  {
    name: "Lite",
    price: "1,999",
    period: "month",
    tagline: "Low volume clinics",
    features: [
      "5,000 minutes/year",
      "12 consults/day",
      "AI transcription",
      "Structured SOAP notes",
      "Secure cloud storage"
    ]
  },
  {
    name: "Pro",
    price: "3,999",
    period: "month",
    popular: true,
    tagline: "Most popular",
    features: [
      "10,000 minutes/year",
      "25 consults/day",
      "Faster processing",
      "Advanced customization",
      "Priority support"
    ]
  },
  {
    name: "Elite",
    price: "6,999",
    period: "month",
    tagline: "High volume doctors",
    features: [
      "15,000 minutes/year",
      "37 consults/day",
      "Heavy usage buffer",
      "Advanced analytics",
      "Premium support"
    ]
  }
]

const pricingStrategyData = {
  plans: [
    { name: "Lite", monthly: "₹1,999", yearly: "₹19,999", mix: "45%" },
    { name: "Pro", monthly: "₹3,999", yearly: "₹39,999", mix: "40%" },
    { name: "Elite", monthly: "₹6,999", yearly: "₹69,999", mix: "15%" },
  ],
  paymentMix: [
    { year: "Year 1", monthly: "70%", annual: "30%" },
    { year: "Year 2", monthly: "60%", annual: "40%" },
    { year: "Year 3", monthly: "30%", annual: "70%" },
  ],
  arpu: [
    { year: "Y1", value: "₹40,461" },
    { year: "Y2", value: "₹39,752" },
    { year: "Y3", value: "₹37,626" },
  ]
};

function PricingStrategySheet({ open, onOpenChange }: { open?: boolean, onOpenChange?: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-none border-primary/20 text-xs font-bold uppercase tracking-widest h-10 px-6">
          Pricing Strategy
        </Button>
      </SheetTrigger>
      <SheetContent className="!w-[800px] !max-w-none rounded-none border-l shadow-none p-0 flex flex-col focus:outline-none focus:ring-0">      <SheetHeader className="p-6 border-b sticky top-0 bg-background z-20">
        <SheetTitle className="text-2xl font-bold uppercase tracking-tight">Pricing Strategy</SheetTitle>
        <SheetDescription className="text-sm font-medium uppercase tracking-widest">How pricing converts into revenue</SheetDescription>
      </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-20">
          {/* 🔷 SECTION 2: Quick Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="rounded-none border shadow-none p-4 bg-muted/5 flex flex-col justify-between">
              <div className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest">Plans Available</div>
              <div className="text-base font-black uppercase">Lite / Pro / Elite</div>
            </Card>
            <Card className="rounded-none border shadow-none p-4 bg-muted/5 flex flex-col justify-between">
              <div className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest">User Distribution</div>
              <div className="text-base font-black uppercase">45% / 40% / 15%</div>
            </Card>
            <Card className="rounded-none border shadow-none p-4 bg-muted/5 flex flex-col justify-between">
              <div className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest">Payment Model</div>
              <div className="text-base font-black uppercase">Mth → Annual</div>
            </Card>
          </div>

          <div className="p-4 border-l-2 border-primary bg-primary/5">
            <p className="text-sm font-bold italic leading-relaxed">
              "Revenue grows through user expansion and increasing adoption of annual plans."
            </p>
          </div>

          {/* 🔷 SECTION 3: Pricing Table */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Comparative Commercial Tiers</h4>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-muted/30">
                  <TableHead className="h-10 text-xs uppercase font-bold px-4 tracking-widest">Plan Category</TableHead>
                  <TableHead className="h-10 text-xs uppercase font-bold text-right px-4 tracking-widest">Monthly Rate</TableHead>
                  <TableHead className="h-10 text-xs uppercase font-bold text-right px-4 tracking-widest">Annual Bundle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingStrategyData.plans.map((plan) => (
                  <TableRow key={plan.name} className="hover:bg-muted/10 border-b border-muted/20">
                    <TableCell className="py-3 text-sm font-bold px-4">{plan.name}</TableCell>
                    <TableCell className="py-3 text-sm text-right font-mono px-4">{plan.monthly}</TableCell>
                    <TableCell className="py-3 text-sm text-right font-mono px-4 text-emerald-600 font-bold">{plan.yearly}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 🔷 SECTION 4 & 5: Mix Logic */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">User Tier Distribution Assumptions</h4>
              <div className="space-y-3">
                {pricingStrategyData.plans.map((p) => (
                  <div key={p.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-black uppercase tracking-tight">
                      <span>{p.name}</span>
                      <span>{p.mix}</span>
                    </div>
                    <div className="h-1.5 bg-muted">
                      <div className="h-full bg-primary transition-all duration-1000" style={{ width: p.mix }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-4 italic font-medium">
                "We assume most users start with lower-tier plans due to pricing accessibility and initial usage needs."
              </p>
            </div>

            <Separator className="bg-muted/50" />

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Annual Payment Mix (Y1-Y3)</h4>
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-b border-muted/30">
                    <TableHead className="h-10 text-xs uppercase font-bold px-4 tracking-widest">Reporting Period</TableHead>
                    <TableHead className="h-10 text-xs uppercase font-bold text-right px-4 tracking-widest">Monthly Adoption</TableHead>
                    <TableHead className="h-10 text-xs uppercase font-bold text-right px-4 tracking-widest">Annual Adoption</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingStrategyData.paymentMix.map((mix) => (
                    <TableRow key={mix.year} className="hover:bg-muted/10 border-b border-muted/20">
                      <TableCell className="py-3 text-sm font-bold px-4">{mix.year}</TableCell>
                      <TableCell className="py-3 text-sm text-right font-mono px-4">{mix.monthly}</TableCell>
                      <TableCell className="py-3 text-sm text-right font-mono px-4 text-primary font-bold">{mix.annual}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                "Users gradually shift toward annual plans, improving retention and upfront cash collection."
              </p>
            </div>
          </div>

          {/* 🔷 SECTION 6: ARPU Evolution */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Revenue Per User (ARPU) Evolution</h4>
            <div className="grid grid-cols-3 gap-4">
              {pricingStrategyData.arpu.map((item) => (
                <div key={item.year} className="border p-6 text-center bg-muted/5">
                  <div className="text-xs font-black text-muted-foreground uppercase mb-2 tracking-widest">{item.year}</div>
                  <div className="text-xl font-black tracking-tighter">{item.value}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed italic font-medium">
              "Average revenue per user decreases slightly due to annual pricing discounts, but is projected to be offset by improved multi-year retention."
            </p>
          </div>

          {/* 🔷 SECTION 7: Deep Dive Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="arpu-breakdown" className="border-b border-muted/30">
              <AccordionTrigger className="text-xs font-black uppercase tracking-[0.1em] hover:no-underline py-4">Tier ARPU Breakdown</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-3 py-6">
                <div className="flex justify-between border-b border-dashed border-muted/50 pb-2"><span>Lite Tier</span><span className="font-bold text-foreground">₹20,000 avg/yr</span></div>
                <div className="flex justify-between border-b border-dashed border-muted/50 pb-2"><span>Pro Tier</span><span className="font-bold text-foreground">₹40,000 avg/yr</span></div>
                <div className="flex justify-between border-b border-dashed border-muted/50 pb-2"><span>Elite Tier</span><span className="font-bold text-foreground">₹70,000 avg/yr</span></div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="arr-logic" className="border-b border-muted/30">
              <AccordionTrigger className="text-xs font-black uppercase tracking-[0.1em] hover:no-underline py-4">ARR Calculation Logic</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground p-6 bg-muted/30 font-mono space-y-1">
                Opening ARR<br />
                + New ARR (Subs * Tier Price)<br />
                + Expansion (18% NRR impact)<br />
                - Churn (20% standard churn rate)<br />
                = Closing ARR
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="assumptions" className="border-b border-muted/30">
              <AccordionTrigger className="text-xs font-black uppercase tracking-[0.1em] hover:no-underline py-4">Core Modeling Assumptions</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4 py-6">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Tier distribution fixed at 45/40/15 mix for Y1-Y3 modeling</li>
                  <li>Upsell behavior accounted for in expansion % metrics</li>
                  <li>Pricing remains stable across the 36-month projection horizon</li>
                  <li>Upgrade triggers based on consult volume thresholds</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter className="p-8 border-t mt-auto bg-background sticky bottom-0 z-20">
          <p className="text-sm font-black uppercase tracking-[0.1em] text-primary w-full text-center">
            "Blended pricing and plan mix create predictable, scalable revenue."
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet >
  )
}

const yearlyPlans: Plan[] = [
  {
    name: "Free",
    price: "0",
    period: "month",
    tagline: "Trial users",
    features: ["5 recordings/day", "8 mins each", "No card required"]
  },
  {
    name: "Lite",
    price: "19,999",
    originalPrice: "23,988",
    period: "year",
    tagline: "Low volume clinics",
    features: [
      "5,000 minutes/year",
      "12 consults/day",
      "AI transcription",
      "Structured SOAP notes",
      "Secure cloud storage"
    ]
  },
  {
    name: "Pro",
    price: "39,999",
    originalPrice: "47,988",
    period: "year",
    popular: true,
    tagline: "Most popular",
    features: [
      "10,000 minutes/year",
      "25 consults/day",
      "Faster processing",
      "Advanced customization",
      "Priority support"
    ]
  },
  {
    name: "Elite",
    price: "69,999",
    originalPrice: "83,988",
    period: "year",
    tagline: "High volume doctors",
    features: [
      "15,000 minutes/year",
      "37 consults/day",
      "Heavy usage buffer",
      "Advanced analytics",
      "Premium support"
    ]
  }
]

function PricingCard({ name, price, originalPrice, period, popular, tagline, features }: Plan) {
  return (
    <Card className={cn(
      "relative rounded-none border shadow-none flex flex-col h-full overflow-visible",
      popular && "border-primary shadow-md z-10"
    )}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none bg-primary text-primary-foreground font-bold uppercase text-[9px] tracking-widest px-3">
          Most Popular
        </Badge>
      )}

      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold tracking-tight">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{tagline}</CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-grow">
        <div className="flex flex-col gap-1">
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-rose-500/50">₹{originalPrice}</span>
          )}
          <div className="text-3xl font-bold tracking-tighter">
            ₹{price}
            <span className="text-sm font-medium text-muted-foreground ml-1">
              /{period}
            </span>
          </div>
        </div>

        <ul className="mt-8 space-y-4 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-3 leading-tight font-medium">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6">
        <Button className="w-full rounded-none font-bold uppercase text-[11px] tracking-widest h-10">
          Get started
        </Button>
      </CardFooter>
    </Card>
  )
}

function PricingGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 pt-2">
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} />
      ))}
    </div>
  )
}

import { useSearchParams, useRouter } from "next/navigation"

export default function PricingPage() {
  const [showGuide, setShowGuide] = React.useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isStrategyOpen = searchParams.get("view") === "strategy";

  const setStrategyOpen = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (open) {
      params.set("view", "strategy");
    } else {
      params.delete("view");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto py-6 animate-in fade-in duration-700 space-y-8">
      {/* 🔷 Dashboard Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-left">Pricing & Commercial Tiers</h1>
        <p className="text-sm text-muted-foreground text-left">Subscription models, plan distribution, and revenue expansion</p>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4" onClick={() => setShowGuide(false)}>
          <TabsList className="bg-muted/30 p-1 rounded-none border h-10">
            <TabsTrigger
              value="monthly"
              className="rounded-none text-xs font-bold uppercase px-8 h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="rounded-none text-xs font-bold uppercase px-8 h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none relative"
            >
              Yearly
              <Badge className="absolute -top-3 -right-6 rounded-none bg-emerald-500 text-white text-[9px] font-black uppercase shadow-none border-none">Save 16%</Badge>
            </TabsTrigger>
          </TabsList>

          <GuideTooltip text="Click here to view pricing strategy" show={showGuide} onDismiss={() => setShowGuide(false)}>
            <PricingStrategySheet open={isStrategyOpen} onOpenChange={setStrategyOpen} />
          </GuideTooltip>
        </div>

        <TabsContent value="monthly" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <PricingGrid plans={monthlyPlans} />
        </TabsContent>

        <TabsContent value="yearly" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <PricingGrid plans={yearlyPlans} />
        </TabsContent>
      </Tabs>

      {/* 🔷 Support Footer */}
      <div className="mt-20 pt-2 border-t grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            Enterprise Ready
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For multi-doctor clinics and hospitals, we offer custom deployment options and dedicated support channels.
          </p>
        </div>
        <div className="space-y-3 font-medium">
          <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            Secure by Design
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All data is encrypted end-to-end. We maintain strict HIPAA compliance and regular security audits.
          </p>
        </div>
        <div className="space-y-3 font-medium">
          <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            No Hidden Costs
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            What you see is what you pay. No setup fees, no maintenance charges, and transparent usage limits.
          </p>
        </div>
      </div>
    </section>
  )
}
