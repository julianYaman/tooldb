import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : ''

if (supabaseUrl === "") {
    throw new Error("Missing supabase url")
}

if (supabaseAnonKey === "") {
  throw new Error("Missing supabase anon key")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)