import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dvncsmalbyhcgvxdkomh.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_1oBDzmJHwaLJuk4CtggfMQ_-KhAlIEl'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
