import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yaqmxfyxdoyouzrswcim.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcW14Znl4ZG95b3V6cnN3Y2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTQ3NTQsImV4cCI6MjA2NTIzMDc1NH0.NZylTaAsMdQX1mvrJFD48uSHIpGiXAkgEqxb_BP4r4A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);