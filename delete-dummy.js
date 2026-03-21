import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sscgnfofphzvvvauvodg.supabase.co"
const supabaseAnonKey = "sb_publishable_ssps-Pt2LISokfxAkcDcUA_jD2ZqP4Y"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase
    .from('survey_responses')
    .delete()
    .eq('created_at', '2026-03-21T07:36:42.868649+00:00')
  
  if (error) {
    console.error('Error deleting:', error)
  } else {
    console.log(`Successfully deleted dummy records perfectly forwards!`)
  }
}

run()
