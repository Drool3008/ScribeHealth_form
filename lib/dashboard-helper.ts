import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export type SurveyResponse = {
  id: string
  answers: Record<string, any>
}

export const dummyResponses: SurveyResponse[] = [
  {"id":"1","answers":{"D1":"General Physician","D2":"10+ years","D3":"Hospital (private)","D4":"Tier 1 (Metro)","D6":"In-person","D7":"Strictly required","D8":"Very comfortable","D9":"Desktop/Laptop","D5":"10–20","Q1":"10–15 min","Q2":"After work hours","Q3":["Paper","WhatsApp"],"Q4":3,"Q5":"Takes too much time","Q6":"Somewhat comfortable","Q7":["Accuracy","Privacy"],"Q8":["English","Telugu"],"Q9":"Often","Q10":"Yes significantly","Q11":"After consultation","Q12":"WhatsApp","Q13":"Sometimes","Q_mental_tire":"Moderately tiring"}},
  {"id":"2","answers":{"D1":"Psychiatrist","D2":"3–5 years","D3":"Private clinic (solo)","D4":"Tier 1 (Metro)","D6":"Online","D7":"Sometimes required","D8":"Somewhat comfortable","D9":"Tablet","D5":"5–10","Q1":"20+ min","Q2":"End of day","Q3":["Notion / Docs"],"Q4":2,"Q5":"Difficult to retrieve records","Q6":"Very comfortable","Q7":["Legal issues"],"Q8":["English"],"Q9":"Never","Q10":"Not really","Q11":"During consultation","Q12":"No structured process","Q13":"Very often","Q_mental_tire":"Very tiring"}},
  {"id":"3","answers":{"D1":"Dermatologist","D2":"5–10 years","D3":"Private clinic (group)","D4":"Tier 2","D6":"Hybrid","D7":"Not required","D8":"Neutral","D9":"Mobile","D5":"20+","Q1":"5–10 min","Q2":"Immediately after each session","Q3":["Hospital system","Paper"],"Q4":4,"Q5":"Takes too much time","Q6":"Uncomfortable","Q7":["Accuracy"],"Q8":["Mixed languages"],"Q9":"Always","Q10":"Yes significantly","Q11":"Follow-ups","Q12":"Staff handles it","Q13":"Rarely","Q_mental_tire":"Slightly tiring"}},
  {"id":"4","answers":{"D1":"Pediatrician","D2":"0–2 years","D3":"Hospital (government)","D4":"Tier 3 / Rural","D6":"In-person","D7":"Strictly required","D8":"Not comfortable","D9":"Paper only","D5":"20+","Q1":"15–20 min","Q2":"After work hours","Q3":["Paper"],"Q4":2,"Q5":"Hard to organize","Q6":"Neutral","Q7":["Privacy"],"Q8":["Hindi"],"Q9":"Sometimes","Q10":"Slightly","Q11":"After consultation","Q12":"Manual calls","Q13":"Very often","Q_mental_tire":"Very tiring"}},
  {"id":"5","answers":{"D1":"Physiotherapist","D2":"3–5 years","D3":"Teleconsultation platform","D4":"Tier 2","D6":"Online","D7":"Sometimes required","D8":"Somewhat comfortable","D9":"Desktop/Laptop","D5":"1–5","Q1":"10–15 min","Q2":"End of day","Q3":["WhatsApp","Notion / Docs","Paper"],"Q4":4,"Q5":"Takes too much time","Q6":"Somewhat comfortable","Q7":["Loss of control"],"Q8":["English","Mixed languages"],"Q9":"Often","Q10":"Yes significantly","Q11":"After consultation","Q12":"WhatsApp","Q13":"Sometimes","Q_mental_tire":"Moderately tiring"}},
  {"id":"6","answers":{"D1":"General Physician","D2":"5–10 years","D3":"Private clinic (group)","D4":"Tier 1 (Metro)","D6":"Hybrid","D7":"Strictly required","D8":"Very comfortable","D9":"Mobile","D5":"10–20","Q1":"10–15 min","Q2":"After work hours","Q3":["Paper","Notion / Docs"],"Q4":3,"Q5":"Takes too much time","Q6":"Very comfortable","Q7":["Accuracy"],"Q8":["Telugu"],"Q9":"Often","Q10":"Yes significantly","Q11":"After consultation","Q12":"No structured process","Q13":"Very often","Q_mental_tire":"Very tiring"}},
  {"id":"7","answers":{"D1":"Dermatologist","D2":"10+ years","D3":"Hospital (private)","D4":"Tier 1 (Metro)","D6":"In-person","D7":"Strictly required","D8":"Very comfortable","D9":"Desktop/Laptop","D5":"10–20","Q1":"5–10 min","Q2":"Immediately after each session","Q3":["Hospital system"],"Q4":5,"Q5":"Switching between tools","Q6":"Very comfortable","Q7":["None"],"Q8":["English"],"Q9":"Never","Q10":"Not really","Q11":"During consultation","Q12":"Staff handles it","Q13":"Rarely","Q_mental_tire":"Not tiring"}},
  {"id":"8","answers":{"D1":"Other","D2":"0–2 years","D3":"Private clinic (solo)","D4":"Tier 3 / Rural","D6":"Online","D7":"Not required","D8":"Neutral","D9":"Tablet","D5":"5–10","Q1":"10–15 min","Q2":"End of day","Q3":["Paper"],"Q4":4,"Q5":"Takes too much time","Q6":"Somewhat comfortable","Q7":["Accuracy"],"Q8":["Hindi","Mixed languages"],"Q9":"Sometimes","Q10":"Slightly","Q11":"Follow-ups","Q12":"Manual calls","Q13":"Sometimes","Q_mental_tire":"Slightly tiring"}},
  {"id":"9","answers":{"D1":"General Physician","D2":"3–5 years","D3":"Hospital (private)","D4":"Tier 2","D6":"Hybrid","D7":"Strictly required","D8":"Somewhat comfortable","D9":"Desktop/Laptop","D5":"20+","Q1":"10–15 min","Q2":"After work hours","Q3":["Paper","WhatsApp","Notion / Docs"],"Q4":2,"Q5":"Takes too much time","Q6":"Somewhat comfortable","Q7":["Privacy"],"Q8":["Mixed languages"],"Q9":"Always","Q10":"Yes significantly","Q11":"After consultation","Q12":"No structured process","Q13":"Very often","Q_mental_tire":"Very tiring"}},
  {"id":"10","answers":{"D1":"Psychiatrist","D2":"5–10 years","D3":"Hospital (government)","D4":"Tier 1 (Metro)","D6":"In-person","D7":"Sometimes required","D8":"Somewhat comfortable","D9":"Mobile","D5":"5–10","Q1":"20+ min","Q2":"After work hours","Q3":["Notion / Docs"],"Q4":4,"Q5":"Hard to organize","Q6":"Somewhat comfortable","Q7":["Accuracy"],"Q8":["English"],"Q9":"Sometimes","Q10":"Not really","Q11":"After consultation","Q12":"Staff handles it","Q13":"Sometimes","Q_mental_tire":"Moderately tiring"}}
]

export const useSurveyData = () => {
  const [data, setData] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('survey_responses').select('*')
      setData(data ? data : [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { data, loading }
}

export const mapPatients = (val: string) => {
  if (val === "1–5") return 3
  if (val === "5–10") return 7.5
  if (val === "10–20") return 15
  if (val === "20+") return 25
  return 0
}

const mapTimeVal = (val: string) => {
  if (val === "0–5 min") return 2.5
  if (val === "5–10 min") return 7.5
  if (val === "10–15 min") return 12.5
  if (val === "15–20 min") return 17.5
  if (val === "20+ min") return 25
  return 0
}
export { mapTimeVal as mapTime }
