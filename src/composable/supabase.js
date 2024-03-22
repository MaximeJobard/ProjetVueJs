import { useRouter } from "vue-router";
import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = 'https://uggqhbotmjvpabwhzamp.supabase.co'
    const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ3FoYm90bWp2cGFid2h6YW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTQ3NjEsImV4cCI6MjAyNTIzMDc2MX0.dQFV1slHWmtJy3NhDcGazABgI9YWkotBLenO_WRMOPg'
    const supabase = createClient(url, anon)

    async function getRankings(){
        const { data, error } = await supabase
            .from('team')
            .select('tea_name, tea_score')
            .order('tea_score', { ascending: false})

        if(error != null){
            console.log(error);
        }

        return data
    }
    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    return {supabase, signOut, getRankings}
}