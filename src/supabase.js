import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qanamnnnxbupueuvxxci.supabase.co';
const supabaseAnonKey = 'sb_publishable_hcPxsbM35TVFNTe6lePi6A_oTdk0aWt';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);