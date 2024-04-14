import { useRouter } from "vue-router";
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

    async function getRankings(){
        const { data, error } = await supabase
            .from('rankings')
            .select('rank, tea_name, tea_score')
            .order('tea_score', { ascending: false})

        if(error != null){
            console.log(error);
        }

        return data
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

    //rentre un match dans la base (fonctionne pas)
    async function setMatch(data){
        const { data: insertedData, error } = await supabase
            .from("match")
            .insert(data)
            if (error) {
                console.error("Error inserting match:", error.message);
                return;
            }
            console.log("Match inserted successfully:", data);
    }

    //récupère la liste des équipes
    async function getTeam(){
        const {data, error} = await supabase.from("team").select()
        return data
    }

    //récupère la liste des sports
    async function getSport(){
        const {data, error} = await supabase.from("sport").select()
        return data
    }

    //récupère la liste des matchs
    async function getMatch(){
        const {data, error} = await supabase
            .from("match")
            .select()
            .order("mat_start_time", { ascending: true });
        return data
    }

    async function getUserTeam(uid){
        const {data, error}=await supabase
          .from('membre')
          .select('tea_id')
          .eq('user_id', uid).single()
        console.log(data);
        return data.tea_id;
    }

    async function updateMember(name, firstname) {
        // Effectuer la mise à jour du membre
        const { data, error } = await supabase
            .from("membre")
            .update({ 
                mem_last_name: name,
                mem_first_name: firstname 
            })
            .eq("user_id", await getUserId());    
        if (error) {
            console.error("Error updating member:", error.message);
        } else {
            console.log("Member updated successfully:", data);
        }
    }
        

    async function insertMember(mem_last_name,mem_first_name, tea_id){
        const { data, error } = await supabase
            .from('membre')
            .insert([
            { 'mem_last_name': mem_last_name, 'mem_first_name': mem_first_name,'tea_id':tea_id },
            ])
            .select()

        if(error != null){
            console.log(error)
        }
    }

    async function getTeammatesNumber(tea_id){
        const { data, error } = await supabase
            .from('membre')
            .select()
            .eq("tea_id", tea_id)

            if(error != null){
                console.log(error)
            }
            console.log("Nombre : ")
            console.log(data)

            return data
    }

    async function updateMatchScore(matchId, scoreTeam1, scoreTeam2) {
        const { data, error } = await supabase
            .from("match")
            .update({
                mat_score_team_1: scoreTeam1,
                mat_score_team_2: scoreTeam2
            })
            .eq("mat_id", matchId);
    
        if (error) {
            console.error("Error updating match score:", error.message);
            return;
        }
    
        console.log("Match score updated successfully:", data);
    }

    return {supabase, signOut, teamName, changeTeamName, teamMember, deleteMember, getTeamLeader, getUserId, getUserTeam, insertMember, getTeammatesNumber, getTeam, getSport, setMatch, updateMatchScore, getMatch, getRankings, updateMember}

}
