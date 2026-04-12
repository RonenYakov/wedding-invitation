import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// בדיקה האם המפתחות הם אמיתיים אוPlaceholder
const isConfigured = url && url !== 'your_supabase_project_url' && url.startsWith('https://');

// אם מוגדר - מתחברים. אם לא - משתמשים בכתובת דמה שלא מפילה את האתר
export const supabase = createClient(
  isConfigured ? url : 'https://placeholder-url.supabase.co',
  isConfigured ? key : 'placeholder-key'
)

export interface RSVPRecord {
  name: string;
  guests: number;
  attending: boolean;
  dietary: string;
}

export async function submitRSVP(data: RSVPRecord): Promise<void> {
  if (!isConfigured) {
    console.log("Mock RSVP Submission:", data);
    alert("האתר במצב תצוגה בלבד. בגרסה הסופית האישור יישלח למסד הנתונים.");
    return;
  }

  const { error } = await supabase.from('rsvp').insert([data])
  if (error) throw new Error(error.message)
}