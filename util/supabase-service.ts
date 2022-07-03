import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY ? process.env.SUPABASE_SERVICE_KEY : ''

if (supabaseUrl === "") {
    throw new Error("Missing supabase url")
}

if (supabaseKey === "") {
  throw new Error("Missing supabase service key")
}

export const supabase = createClient(supabaseUrl, supabaseKey)