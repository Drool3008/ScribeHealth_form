import SurveyForm from "@/components/survey-form"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col bg-background/95">
      <main className="flex-1">
        <SurveyForm />
      </main>
    </div>
  )
}
