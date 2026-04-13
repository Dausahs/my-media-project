// MOCK DATA for the template presentation
const MOCK_METADATA = [
  { id: "1", drive_file_id: "1", caption: "Global Summit Highlight", category: "Corporate", project_date: "2026-03-15" },
  { id: "2", drive_file_id: "2", caption: "Nike Air Max Launch", category: "Event", project_date: "2026-02-10" },
  { id: "3", drive_file_id: "3", caption: "Sony A7SIII Commercial BTS", category: "BTS", project_date: "2025-11-20" },
  { id: "4", drive_file_id: "4", caption: "Chris & Sarah Wedding", category: "Wedding", project_date: "2025-12-05" },
];

/**
 * Fetches metadata linked to drive files from Supabase.
 */
export async function getMediaMetadata() {
  // Real implementation:
  /*
  import { createClient } from '@supabase/supabase-js'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const { data, error } = await supabase.from('media_metadata').select('*')
  if (error) throw error
  return data
  */
  
  return MOCK_METADATA;
}

/**
 * Saves metadata to Supabase.
 */
export async function saveMediaMetadata(data: { drive_file_id: string, caption: string, category: string, project_date: string }) {
  console.log(`[STUB] Saving metadata to Supabase:`, data);
  return { id: `mock-supa-id-${Date.now()}`, ...data };
}
