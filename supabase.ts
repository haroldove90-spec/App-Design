
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tpjykfqqrjtxzgfwtqts.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwanlrZnFxcmp0eHpnZnd0cXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MjA1OTksImV4cCI6MjA4MjA5NjU5OX0.S95LfAR1bf21gmclivIvHIX7Ep_cu3sn9OaIkW_7WmI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
