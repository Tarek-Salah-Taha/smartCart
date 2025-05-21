import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ubsmphgtwdcarnmrjpef.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVic21waGd0d2RjYXJubXJqcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NzM1MDYsImV4cCI6MjA2MTI0OTUwNn0.yfZc55Zgyp0VGZQrXB_coMXlzKq5j-rP6gPdjU1LqSc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
