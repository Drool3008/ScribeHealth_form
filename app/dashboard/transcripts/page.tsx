"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Clock, ShieldAlert, ZapIcon } from "lucide-react"

const transcripts = [
  {
    doctor: "Dr. Rohan Mehta",
    title: "General Physician, Ahmedabad (Age 34)",
    answers: {
      Q1: "I quickly jot down the diagnosis, prescription, maybe a test I've referred. Then the next patient is already waiting, so I just move on. I try to keep it brief.",
      Q2: "I use a tablet — there's a software on it. But honestly it's not very smooth, so for a lot of follow-up patients I just handwrite a prescription and enter data later when the queue dies down.",
      Q3: "If everything is in order, maybe 3–5 minutes. But when I need to look up previous history — which the system makes difficult — that adds another 5–10 minutes easily.",
      Q4: "On a normal day, 40 to 50. During flu season or any outbreak, it can cross 70.",
      Q5: "Yes. I usually spend about an hour at the end of the day catching up. Sometimes from home if I couldn't finish at the clinic.",
      Q6: "When I need a patient's old lab report and it's just... not there in the system. I have to call the lab, or the patient pulls out a crumpled paper from their bag. It slows everything down.",
      Q7: "A clinic management software on my tablet. Paper prescriptions too. Lab reports come separately by email or on paper.",
      Q8: "I tried dictating voice notes on my phone once. It helped for a bit but I stopped because transcribing still took time."
    }
  },
  {
    doctor: "Dr. Neha Kapoor",
    title: "Clinical Psychologist, Chandigarh (Age 28)",
    answers: {
      Q1: "After a session, I write my session notes while everything is fresh — the themes that came up, interventions I used, observations, and the plan for next time.",
      Q2: "I use Notion for my notes. It's not a clinical tool exactly, but I've set it up to work the way I need. For formal records I print and file hard copies.",
      Q3: "About 15–20 minutes per session note. Therapy notes are detailed — you can't rush them.",
      Q4: "Usually 6 to 8 sessions.",
      Q5: "Sometimes if sessions ran late or I had back-to-back appointments.",
      Q6: "Security. I'm writing very sensitive things and I'm not confident the tool is safe.",
      Q7: "Notion, Google Calendar, paper files, video platforms.",
      Q8: "Tried EHR tools — too expensive or not suitable for India."
    }
  },
  {
    doctor: "Dr. Ravi Iyer",
    title: "Surgeon, Chennai (Age 45)",
    answers: {
      Q1: "Post-surgery there's a detailed operative note. Then post-op orders. For OPD visits, I dictate notes and my assistant enters them.",
      Q2: "Dictation via assistant (OPD), direct entry into hospital system (surgery), paper for pre-op.",
      Q3: "OPD: ~5 min | Pre-op: 20–30 min | Surgical notes: 15–20 min",
      Q4: "20–30 OPD + 2–4 surgeries.",
      Q5: "Yes, I review and sign off at night sometimes.",
      Q6: "Patient history not accessible at critical time (before surgery).",
      Q7: "HIS system, paper records, dictation.",
      Q8: "Voice-to-text apps — failed due to poor accuracy."
    }
  },
  {
    doctor: "Dr. Farhan Ali",
    title: "Pediatrician, Lucknow (Age 39)",
    answers: {
      Q1: "I finish the prescription, update records, and sometimes message parents summaries on WhatsApp.",
      Q2: "Pediatric EMR tool + WhatsApp + paper files.",
      Q3: "5–10 min routine, ~20 min for new patients.",
      Q4: "35–40, up to 60+ during peak season.",
      Q5: "Mostly follow-ups and parent queries at night.",
      Q6: "Vaccination records are scattered across formats.",
      Q7: "EMR app, WhatsApp, paper.",
      Q8: "Created Google Forms intake — helps but not integrated."
    }
  },
  {
    doctor: "Dr. Vikram Joshi",
    title: "Orthopedic Resident, Jaipur (Age 33)",
    answers: {
      Q1: "Quick OPD notes. In wards, continuous updates after interactions.",
      Q2: "Mostly handwritten. Some HIS usage but not intuitive.",
      Q3: "OPD: ~5 min | Ward: ~10 min | New case: 30–40 min",
      Q4: "15–20 ward + 20–30 OPD.",
      Q5: "All the time (especially research + case notes).",
      Q6: "Fragmentation across clinical + research notes.",
      Q7: "HIS, paper, OneNote.",
      Q8: "Templates in OneNote (only helps for research)."
    }
  },
  {
    doctor: "Dr. Sanjay Kulkarni",
    title: "Cardiologist, Bengaluru (Age 44)",
    answers: {
      Q1: "Update findings, write prescription, dictate summary if needed.",
      Q2: "Diagnostic software + dictation + manual entry.",
      Q3: "8–25 minutes depending on complexity.",
      Q4: "35–45 OPD + inpatient + procedures.",
      Q5: "Follow-ups and report reviews at night.",
      Q6: "Follow-up tracking is inefficient.",
      Q7: "Diagnostic tools, HIS, Excel, dictation.",
      Q8: "Calendar reminders — not integrated with patient data."
    }
  }
]

export default function TranscriptsPage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Interview Transcripts (Filtered)</h1>
        <p className="text-sm text-muted-foreground">Qualitative diagnosis and profiling containing qualitative field interviews loaded successfully.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border p-4 hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center gap-2">
            <ShieldAlert className="size-5 text-destructive" />
            <CardTitle className="text-sm font-semibold">Top Friction Point</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xs text-muted-foreground">Patient history access latency + scattered files across labs/crumpled papers limits efficiency speeds.</p>
          </CardContent>
        </Card>

        <Card className="border p-4 hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center gap-2">
            <Clock className="size-5 text-amber-500" />
            <CardTitle className="text-sm font-semibold">After-hours Spillover</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xs text-muted-foreground">100% of subject profiles explicitly reported caching up or reviewing charts/reports at night or home.</p>
          </CardContent>
        </Card>

        <Card className="border p-4 hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center gap-2">
            <ZapIcon className="size-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Technological Fatigue</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xs text-muted-foreground">Voice apps accuracy failure & EMR platforms complexity forces fallback to simple Paper/Dictation layers flawlessly loaded.</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-border/45" />

      <h2 className="text-xl font-semibold tracking-tight">Expandable Interview Records ({transcripts.length})</h2>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {transcripts.map((t, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-4 bg-muted/10">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex flex-col items-start text-left gap-1">
                <span className="font-bold text-foreground text-sm flex items-center gap-2">
                  <FileText className="size-4 text-primary" /> {t.doctor}
                </span>
                <span className="text-xs text-muted-foreground font-normal">{t.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              <Separator className="mb-2" />
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q1. Walk me through what happens after you finish seeing a patient.</span>
                  <p className="text-muted-foreground">{t.answers.Q1}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q2. How do you currently document patient consultations?</span>
                  <p className="text-muted-foreground">{t.answers.Q2}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q3. How long does documentation usually take per patient?</span>
                  <p className="text-muted-foreground">{t.answers.Q3}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q4. Roughly how many patients do you see in a day?</span>
                  <p className="text-muted-foreground">{t.answers.Q4}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q5. Do you ever finish documentation after work hours?</span>
                  <p className="text-muted-foreground">{t.answers.Q5}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q6. What part of documentation frustrates you the most?</span>
                  <p className="text-muted-foreground">{t.answers.Q6}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q7. What tools or systems do you currently use for documentation?</span>
                  <p className="text-muted-foreground">{t.answers.Q7}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-xs">Q8. Have you tried any tools or methods to make documentation easier?</span>
                  <p className="text-muted-foreground">{t.answers.Q8}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  )
}
