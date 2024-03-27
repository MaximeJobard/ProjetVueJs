import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = 'https://uggqhbotmjvpabwhzamp.supabase.co'
    const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ3FoYm90bWp2cGFid2h6YW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTQ3NjEsImV4cCI6MjAyNTIzMDc2MX0.dQFV1slHWmtJy3NhDcGazABgI9YWkotBLenO_WRMOPg'
    const supabase = createClient(url, anon)

    async function teamName(userTeam){
        let { data, error } = await supabase
        .from('team')
        .select('tea_name')
        .eq('tea_id',userTeam).single();
        if(error==null){
            console.log(data);
            return data.tea_name;
        }
        console.log(error);
    }

    async function changeTeamName(name){
        let {data, error}= await supabase
        .from('team')
        .update({ tea_name: name })
        .eq('tea_id', 4)
        .select();
    }

    async function teamMember(userTeam){
        let { data, error } = await supabase
          .from('membre')
          .select('mem_last_name, mem_first_name')
          .eq('tea_id', userTeam)
          .is('user_id', null)
        console.log(data);
        return data;
          
    }
    
    async function getTeamLeader(userTeam){
        let { data, error } = await supabase
          .from('membre')
          .select('mem_last_name, mem_first_name')
          .eq('tea_id', userTeam)
          .not('user_id', "is", null)
        console.log(data);
        console.log(error);
        return data;
          
    }


    async function deleteMember(mem_last_name,mem_first_name){
        const { error } = await supabase
            .from('membre')
            .delete()
            .eq('mem_last_name', mem_last_name, 'mem_first_name', mem_first_name)
            
        return error; 
        
    }

    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    
    
    async function getUserId() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user)
        if (user) {
            console.log("id est :" + user.id)
        return user.id
        } else {
        return null 
        }
    }

    async function getUserTeam(uid){
        const {data, error}=await supabase
          .from('membre')
          .select('tea_id')
          .eq('user_id', uid).single()
        console.log(data);
        return data.tea_id;
          
    }

    async function updateMember(name, firstname){
        supabase.storage
        .from("membre")
        .Update({ mem_last_name: name })
        .eq("user_id", getUserId());

        supabase
        .from("membre")
        .update({ mem_first_name: firstname })
        .eq("user_id", getUserId());
    }
    return {supabase, signOut, teamName, changeTeamName, teamMember, deleteMember, getTeamLeader, getUserId, getUserTeam}
}


    
    
