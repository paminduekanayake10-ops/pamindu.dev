import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sdbzzbxxgtsrkjwindyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYnp6Ynh4Z3Rzcmtqd2luZHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzY4MDQsImV4cCI6MjA5NDM1MjgwNH0.pabyXaiDi4FUn89kRvTwUyiCJ_inhR8F6yiszOllHto";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

  
  