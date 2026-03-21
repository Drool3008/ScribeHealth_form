"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

const surveyData = {
  "survey_title": "Doctor Documentation Workflow Study",
  "target_audience": "Doctors / Therapists",
  "sections": [
    {
      "section_id": "demographics",
      "section_title": "Demographics",
      "questions": [
        {
          "id": "D1",
          "research_question": "Basic demographic specialization statistics",
          "type": "single_select",
          "question": "What is your primary specialization?",
          "options": [
            "General Physician",
            "Psychiatrist / Psychologist",
            "Physiotherapist",
            "Dermatologist",
            "Pediatrician",
            "Other"
          ]
        },
        {
          "id": "D2",
          "research_question": "Experience metrics for segmentation",
          "type": "single_select",
          "question": "How many years have you been practicing?",
          "options": ["0–2 years", "3–5 years", "5–10 years", "10+ years"]
        },
        {
          "id": "D3",
          "research_question": "Workplace distribution context",
          "type": "single_select",
          "question": "Where do you primarily work?",
          "options": [
            "Private clinic (solo)",
            "Private clinic (group)",
            "Hospital (private)",
            "Hospital (government)",
            "Teleconsultation platform"
          ]
        },
        {
          "id": "D4",
          "research_question": "Geographical metrics tier location",
          "type": "single_select",
          "question": "Where is your practice located?",
          "options": ["Tier 1 (Metro)", "Tier 2", "Tier 3 / Rural"]
        },
        {
          "id": "D6",
          "research_question": "Style of consulting distribution",
          "type": "single_select",
          "question": "How do you primarily consult patients?",
          "options": ["In-person", "Online", "Hybrid"]
        },
        {
          "id": "D7",
          "research_question": "Legal requirement severity context",
          "type": "single_select",
          "question": "Is documentation legally or institutionally required in your practice?",
          "options": ["Strictly required", "Sometimes required", "Not required"]
        },
        {
          "id": "D8",
          "research_question": "Tech comfort benchmark metric",
          "type": "single_select",
          "question": "How comfortable are you using digital tools?",
          "options": ["Very comfortable", "Somewhat comfortable", "Neutral", "Not comfortable"]
        },
        {
          "id": "D9",
          "research_question": "Preferred hardware device layout",
          "type": "single_select",
          "question": "What device do you primarily use for documentation?",
          "options": ["Mobile", "Tablet", "Desktop/Laptop", "Paper only"]
        }
      ]
    },
    {
      "section_id": "rq1_time_effort",
      "section_title": "Time & Effort Spent on Documentation",
      "questions": [
        {
          "id": "D5",
          "research_question": "How much time and effort do doctors/therapists spend on documentation?",
          "type": "single_select",
          "question": "How many patients do you typically see in a day?",
          "options": ["1–5", "5–10", "10–20", "20+"]
        },
        {
          "id": "Q1",
          "research_question": "How much time and effort do doctors/therapists spend on documentation?",
          "type": "single_select",
          "question": "On average, how much time do you spend documenting each patient?",
          "options": ["0–5 min", "5–10 min", "10–15 min", "15–20 min", "20+ min"]
        },
        {
          "id": "Q2",
          "research_question": "How much time and effort do doctors/therapists spend on documentation?",
          "type": "single_select",
          "question": "When do you usually complete documentation?",
          "options": [
            "Immediately after each session",
            "End of day",
            "After work hours"
          ]
        },
        {
          "id": "Q_mental_tire",
          "research_question": "How much time and effort do doctors/therapists spend on documentation?",
          "type": "single_select",
          "question": "How mentally tiring do you find documentation?",
          "options": ["Not tiring", "Slightly tiring", "Moderately tiring", "Very tiring"]
        }
      ]
    },
    {
      "section_id": "rq2_tools",
      "section_title": "Current Tools & Frustrations",
      "questions": [
        {
          "id": "Q3",
          "research_question": "What tools do they currently use and what frustrates them?",
          "type": "multi_select",
          "question": "What tools do you currently use for documentation? (Select all)",
          "options": ["Paper", "Notion / Docs", "Hospital system", "WhatsApp", "Other"]
        },
        {
          "id": "Q4",
          "research_question": "What tools do they currently use and what frustrates them?",
          "type": "scale",
          "question": "How satisfied are you with your current documentation process?",
          "scale": {
            "min": 1,
            "max": 5,
            "labels": ["Very dissatisfied", "Very satisfied"]
          }
        },
        {
          "id": "Q5",
          "research_question": "What tools do they currently use and what frustrates them?",
          "type": "single_select",
          "question": "What is your biggest frustration?",
          "options": [
            "Takes too much time",
            "Hard to organize",
            "Switching between tools",
            "Security concerns",
            "Difficult to retrieve records"
          ]
        }
      ]
    },
    {
      "section_id": "rq3_ai_trust",
      "section_title": "Comfort with Automated Note Generation",
      "questions": [
        {
          "id": "Q6",
          "research_question": "How comfortable are they with automated note generation?",
          "type": "single_select",
          "question": "How comfortable would you be using a tool that generates draft notes from conversations?",
          "options": ["Very comfortable", "Somewhat comfortable", "Neutral", "Uncomfortable"]
        },
        {
          "id": "Q7",
          "research_question": "How comfortable are they with automated note generation?",
          "type": "multi_select",
          "question": "What concerns would you have? (Select all)",
          "options": [
            "Accuracy",
            "Privacy",
            "Legal issues",
            "Loss of control",
            "None"
          ]
        }
      ]
    },
    {
      "section_id": "rq4_multilingual",
      "section_title": "Multilingual Friction",
      "questions": [
        {
          "id": "Q8",
          "research_question": "Do multilingual conversations create friction?",
          "type": "multi_select",
          "question": "In which languages do your patients usually communicate? (Select all)",
          "options": ["English", "Telugu", "Hindi", "Mixed languages", "Other"]
        },
        {
          "id": "Q9",
          "research_question": "Do multilingual conversations create friction?",
          "type": "single_select",
          "question": "Do you mentally translate conversations while writing notes?",
          "options": ["Always", "Often", "Sometimes", "Never"]
        },
        {
          "id": "Q10",
          "research_question": "Do multilingual conversations create friction?",
          "type": "single_select",
          "question": "Does this make documentation harder or slower?",
          "options": ["Yes significantly", "Slightly", "Not really"]
        }
      ]
    },
    {
      "section_id": "rq5_workflow",
      "section_title": "Workflow Inefficiencies",
      "questions": [
        {
          "id": "Q11",
          "research_question": "Which part of the workflow is most inefficient?",
          "type": "single_select",
          "question": "Which part of your workflow takes the most effort?",
          "options": [
            "Before consultation",
            "During consultation",
            "After consultation",
            "Follow-ups"
          ]
        },
        {
          "id": "Q12",
          "research_question": "Which part of the workflow is most inefficient?",
          "type": "single_select",
          "question": "How do you currently handle follow-ups (tests/reports)?",
          "options": [
            "Manual calls",
            "WhatsApp",
            "Staff handles it",
            "No structured process"
          ]
        },
        {
          "id": "Q13",
          "research_question": "Which part of the workflow is most inefficient?",
          "type": "single_select",
          "question": "How often do patients miss or delay follow-ups?",
          "options": ["Very often", "Sometimes", "Rarely"]
        }
      ]
    }
  ]
}

export default function SurveyForm() {
  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [hasConsented, setHasConsented] = React.useState(false)
  const [checkboxConsented, setCheckboxConsented] = React.useState(false)

  const currentSection = surveyData.sections[currentSectionIndex]
  const progressPercent = ((currentSectionIndex) / surveyData.sections.length) * 100

  const handleSingleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleMultiSelect = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const currentValues = prev[questionId] || []
      if (checked) {
        return { ...prev, [questionId]: [...currentValues, option] }
      } else {
        return { ...prev, [questionId]: currentValues.filter((v: string) => v !== option) }
      }
    })
  }

  const handleScaleChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const isSectionComplete = () => {
    return true
  }

  const goNext = async () => {
    if (currentSectionIndex < surveyData.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1)
      const scrollableDiv = document.querySelector('.overflow-y-auto')
      if (scrollableDiv) {
        scrollableDiv.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      try {
        await supabase.from('survey_responses').insert({ answers })
      } catch (err) {
        console.error('Failed to submit survey:', err)
      }
      setIsCompleted(true)
    }
  }

  const goBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!hasConsented) {
    return (
      <div className="min-h-svh w-full flex items-center justify-center p-4">
        <Card className="max-w-xl border-none shadow-none bg-transparent animate-fade-in-up">
          <CardHeader className="px-0 pt-0 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">🩺 Understanding Doctor Workflows</CardTitle>
            <CardDescription className="text-base text-muted-foreground/85">
              We are conducting a short study to understand how doctors manage their workflow before, during, and after patient consultations—especially around documentation and follow-ups.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 py-4 flex flex-col gap-6 text-base text-foreground/85 leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-[17px] font-bold flex items-center gap-1.5 text-foreground leading-normal">🔒 Privacy & Anonymity</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground/90 text-[15px]">
                <li>We <strong>do not collect any personally identifiable information</strong> (such as name, email, or phone number).</li>
                <li>Your responses are <strong>completely anonymous</strong> and cannot be traced back to you.</li>
                <li>The data collected will be used <strong>only for research and product development purposes</strong>.</li>
                <li>Your inputs will be analyzed in aggregate to understand patterns, not individuals.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[17px] font-bold flex items-center gap-1.5 text-foreground leading-normal">⏱️ Time Commitment</h3>
              <p className="text-muted-foreground/90 text-[15px]">This survey will take approximately <strong>2–3 minutes</strong> to complete.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[17px] font-bold flex items-center gap-1.5 text-foreground leading-normal">🙏 Your Role</h3>
              <p className="text-muted-foreground/90 text-[15px]">Your honest responses will help us identify challenges in clinical workflows and build better tools to reduce documentation burden.</p>
            </div>

            <Separator className="my-2 bg-border/40" />

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold flex items-center gap-1.5 text-foreground">✅ Consent</h3>
              <div className="flex items-start space-x-3 border border-foreground/15 rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer shadow-sm hover:scale-[1.01] hover:border-foreground/30 active:scale-[0.99]" onClick={() => setCheckboxConsented(!checkboxConsented)}>
                <Checkbox id="consent" className="size-[18px] pointer-events-none" checked={checkboxConsented} onCheckedChange={(c) => setCheckboxConsented(c === true)} />
                <div className="grid gap-1.5 leading-none">
                  <p className="text-base font-medium text-foreground/90">I acknowledge that:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground/85 space-y-1 pl-2 font-normal">
                    <li>My participation is voluntary</li>
                    <li>My responses are anonymous</li>
                    <li>My data will be used only for research purposes</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setHasConsented(true)} disabled={!checkboxConsented} className="px-8 h-11 text-base shadow-sm font-medium">
              Continue →
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-svh w-full flex items-center justify-center p-4">
        <Card className="max-w-xl border-none shadow-none bg-transparent animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Thank you! 🎉</CardTitle>
            <CardDescription className="text-base text-muted-foreground/85">
              Your responses for the {surveyData.survey_title} have been recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-col items-center gap-6">
            <p className="text-muted-foreground text-base text-center">We appreciate your time informing healthcare workflows.</p>
            <Button onClick={() => { setCurrentSectionIndex(0); setAnswers({}); setIsCompleted(false); setHasConsented(false) }} className="px-6 h-11 text-base shadow-sm font-medium">Restart Survey</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-dvh w-full max-w-2xl mx-auto flex flex-col pt-6 px-4 animate-fade-in-up overflow-hidden relative">
      <div className="space-y-1 pb-4 flex-none">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{surveyData.survey_title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground/90">
            {currentSection.section_title}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground/85">Please answer the following questions honestly.</CardDescription>
        </CardHeader>
        <Separator className="bg-border/50" />
        <CardContent className="px-0 py-6 flex flex-col gap-8">
          {currentSection.questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-3 group">
              <Label className="text-[17px] font-semibold leading-normal group-hover:text-foreground transition-colors">
                {q.question}
              </Label>

              {q.type === "single_select" && (
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(val) => handleSingleSelect(q.id, val)}
                  className="flex flex-col gap-2 pt-1"
                >
                  {q.options?.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "flex items-center space-x-3 border border-foreground/15 rounded-xl p-4 hover:bg-muted/50 transition-all cursor-pointer shadow-sm hover:scale-[1.01] hover:shadow-md hover:border-foreground/30 active:scale-[0.99]",
                        answers[q.id] === option && "border-primary bg-primary/5 border-2 shadow-sm"
                      )}
                      onClick={() => handleSingleSelect(q.id, option)}
                    >
                      <RadioGroupItem value={option} id={`${q.id}-${option}`} className="size-[18px] pointer-events-none" />
                      <Label
                        htmlFor={`${q.id}-${option}`}
                        className="flex-1 cursor-pointer font-medium text-[16px] text-foreground/90 pointer-events-none"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {q.type === "multi_select" && (
                <div className="flex flex-col gap-2 pt-1">
                  {q.options?.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "flex items-center space-x-3 border border-foreground/15 rounded-xl p-4 hover:bg-muted/50 transition-all cursor-pointer shadow-sm hover:scale-[1.01] hover:shadow-md hover:border-foreground/30 active:scale-[0.99]",
                        answers[q.id]?.includes(option) && "border-primary bg-primary/5 border-2 shadow-sm"
                      )}
                      onClick={() =>
                        handleMultiSelect(q.id, option, !answers[q.id]?.includes(option))
                      }
                    >
                      <Checkbox
                        id={`${q.id}-${option}`}
                        className="size-[18px] pointer-events-none"
                        checked={answers[q.id]?.includes(option)}
                        onCheckedChange={(checked) =>
                          handleMultiSelect(q.id, option, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`${q.id}-${option}`}
                        className="flex-1 cursor-pointer font-medium text-[16px] text-foreground/90 pointer-events-none"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                  {answers[q.id]?.includes("Other") && q.id === "Q8" && (
                    <Input
                      className="mt-2 text-sm bg-transparent !ring-offset-0 border-border/30 h-9"
                      placeholder="Specify other languages..."
                      value={answers["Q8_other"] || ""}
                      onChange={(e) => setAnswers(p => ({...p, Q8_other: e.target.value}))}
                    />
                  )}
                </div>
              )}

              {q.type === "scale" && q.scale && (
                <div className="pt-4 flex flex-col gap-4">
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>{q.scale.labels?.[0]}</span>
                    <span>{q.scale.labels?.[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[answers[q.id] || q.scale.min]}
                    max={q.scale.max}
                    min={q.scale.min}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(val) => handleScaleChange(q.id, val[0])}
                  />
                  <div className="flex justify-between px-1 font-mono text-xs">
                    {Array.from({ length: q.scale.max - q.scale.min + 1 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "cursor-pointer p-1 rounded transition-all",
                          answers[q.id] === q.scale!.min + i
                            ? "font-bold text-primary scale-110"
                            : "text-muted-foreground/60"
                        )}
                        onClick={() => handleScaleChange(q.id, q.scale!.min + i)}
                      >
                        {q.scale!.min + i}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center">
        <div className="relative w-full max-w-2xl px-4 pb-6 z-10 animate-fade-in-up">
          <div className="flex justify-between items-center bg-background p-4 rounded-xl shadow-lg border border-border/80 h-16">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentSectionIndex === 0}
              className="text-muted-foreground text-base h-10 px-2 sm:px-4 hover:bg-muted/80 flex items-center gap-1"
            >
              <ChevronLeft className="size-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex-1 max-w-[40%] mx-auto flex flex-col items-center gap-1.5">
              <Progress value={progressPercent} className="h-1.5 w-full bg-muted-foreground/15" />
              <span className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap tracking-wider">
                SECTION {currentSectionIndex + 1} OF {surveyData.sections.length}
              </span>
            </div>
            <Button onClick={goNext} disabled={!isSectionComplete()} className="px-3 sm:px-6 h-10 text-base shadow-sm font-medium flex items-center gap-1">
              {currentSectionIndex < surveyData.sections.length - 1 ? (
                <>
                  <span className="hidden sm:inline">Next Step</span>
                  <ChevronRight className="size-5" />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Submit Survey</span>
                  <Check className="size-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
