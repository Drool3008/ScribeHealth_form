import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sscgnfofphzvvvauvodg.supabase.co"
const supabaseAnonKey = "sb_publishable_ssps-Pt2LISokfxAkcDcUA_jD2ZqP4Y"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('id, created_at, answers')
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log(`Total Rows: ${data.length}`)
    data.forEach(r => {
      console.log(`ID: ${r.id} | Created: ${r.created_at} | Q1: ${r.answers?.Q1}`)
    })
  }
}

run()
