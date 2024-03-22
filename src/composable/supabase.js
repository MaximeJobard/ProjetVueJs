import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = 'https://uggqhbotmjvpabwhzamp.supabase.co'
    const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ3FoYm90bWp2cGFid2h6YW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTQ3NjEsImV4cCI6MjAyNTIzMDc2MX0.dQFV1slHWmtJy3NhDcGazABgI9YWkotBLenO_WRMOPg'
    const supabase = createClient(url, anon)

    /*async function TeamName($id){
        let { data: Team, error } = await supabase
        .from('Team')
        .select('some_column,other_column')
        .where()
    }*/
    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    return {supabase, signOut}
}