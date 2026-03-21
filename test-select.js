import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sscgnfofphzvvvauvodg.supabase.co"
const supabaseAnonKey = "sb_publishable_ssps-Pt2LISokfxAkcDcUA_jD2ZqP4Y"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')

  if (error) {
    console.error('Select error:', error)
  } else {
    console.log('Successfully fetched rows count:', data.length)
    if (data.length > 0) {
      console.log('Sample row Answers:', data[0].answers)
    }
  }
}

run()
