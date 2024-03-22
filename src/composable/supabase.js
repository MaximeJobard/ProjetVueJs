import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = 'https://uggqhbotmjvpabwhzamp.supabase.co'
    const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ3FoYm90bWp2cGFid2h6YW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTQ3NjEsImV4cCI6MjAyNTIzMDc2MX0.dQFV1slHWmtJy3NhDcGazABgI9YWkotBLenO_WRMOPg'
    const supabase = createClient(url, anon)

    async function teamName(){
        let { data, error } = await supabase
        .from('team')
        .select('tea_name')
        .eq('tea_id',3).single();
        if(error==null){
            console.log(data);
            //return data['tea_name'];
            return data.tea_name;
        }
        console.log(error);
    }

    async function changeTeamName(name){
        let {data, error}= await supabase
        .from('team')
        .update({ tea_name: name })
        .eq('tea_id', 3)
        .select();
    }

    async function teamMember(){
        let { data, error } = await supabase
          .from('membre')
          .select('mem_last_name','mem_first_name')
        return data;
          
    }
    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    return {supabase, signOut, teamName, changeTeamName, teamMember}
}