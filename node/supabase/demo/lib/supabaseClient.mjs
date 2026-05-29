import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)