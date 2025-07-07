import { supabase } from './lib/supabaseClient.mjs'

// const { error:error2 } = await supabase.from('todos').insert({ title: '打豆豆', is_complete: false })
// console.log(error2)
const { data, error } = await supabase.from('todos').select('*')
console.log(data);

// console.log(process.env.SUPABASE_URL)
// console.log(process.env.SUPABASE_KEY)

