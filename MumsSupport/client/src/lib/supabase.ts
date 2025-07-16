import { createClient } from '@supabase/supabase-js';

// Use your actual Supabase URL and anon key
const supabaseUrl = 'https://eckgcnirouyxkcxtxzn.supabase.co';
const supabaseAnonKey = 'your-actual-anon-key-here'; // Replace with your actual key

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);