// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// 从 Supabase 项目设置中获取
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)