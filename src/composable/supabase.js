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
            return data.tea_name;
        }
        console.error("Error while fetching the team's name : ", error);
    }

    async function changeTeamName(name, id){
        let {data, error}= await supabase
        .from('team')
        .update({ tea_name: name })
        .eq('tea_id', id)
        .select();
    }

    async function teamMember(userTeam){
        let { data, error } = await supabase
          .from('membre')
          .select('mem_last_name, mem_first_name')
          .eq('tea_id', userTeam)
          .is('user_id', null)
        return data;
          
    }
    
    async function getTeamLeader(userTeam){
        let { data, error } = await supabase
          .from('membre')
          .select('mem_last_name, mem_first_name')
          .eq('tea_id', userTeam)
          .not('user_id', "is", null)

        if(error){
            console.error("Error while fetching the team's leader", error)
        }

        return data;
          
    }


    async function deleteMember(mem_last_name,mem_first_name){
        const { error } = await supabase
            .from('membre')
            .delete()
            .eq('mem_last_name', mem_last_name, 'mem_first_name', mem_first_name)
        
            if(error){
                console.error("Error while deleting the member", error)
            }
            
        return error; 
        
    }

    async function getRankings(){
        const { data, error } = await supabase
            .from('rankings')
            .select('rank, tea_name, tea_score')
            .order('tea_score', { ascending: false})

        if(error){
            console.error("Error while fetching the rankings", error)
        }

        return data
    }
    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if(error){
            console.error("Error while signing out", error.message)
        }
    }
    
    async function getUserId() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            return user.id
        } else {
            return null 
        }
    }

    async function setMatch(data){
        const { data: insertedData, error } = await supabase
            .from("match")
            .insert(data)
        if (error) {
            console.error("Error inserting match:", error.message);
            return;
        }
    }

    async function getTeam(){
        const {data, error} = await supabase.from("team").select()
        return data
    }

    async function getSport(){
        const {data, error} = await supabase.from("sport").select()
        return data
    }

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
        return data.tea_id;
    }

    async function updateMember(name, firstname) {
        const { data, error } = await supabase
            .from("membre")
            .update({ 
                mem_last_name: name,
                mem_first_name: firstname 
            })
            .eq("user_id", await getUserId());    
        if (error) {
            console.error("Error updating member:", error.message);
        }
    }
        

    async function insertMember(mem_last_name,mem_first_name, tea_id){
        const { data, error } = await supabase
            .from('membre')
            .insert([
            { 'mem_last_name': mem_last_name, 'mem_first_name': mem_first_name,'tea_id':tea_id },
            ])
            .select()

        if(error){
            console.error("Error while adding the member", error)
        }
    }

    async function getTeammatesNumber(tea_id){
        const { data, error } = await supabase
            .from('membre')
            .select()
            .eq("tea_id", tea_id)

            if(error){
                console.error("Error while getting the number of teammates", error)
            }

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
    }

    async function isLoggedIn() {
        const { data } = await supabase.auth.getSession();
        return !!data.session;
    }

    async function signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            return error
        } 

        else {
            return true
        }
    }

    async function signUp(email, password, lastname, firstname) {

        const { data, errorAuth } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
    
        await updateMember(lastname, firstname);
    
        return errorAuth;
    }
    

    return {supabase, signOut, teamName, changeTeamName, teamMember, deleteMember, getTeamLeader, getUserId, getUserTeam, insertMember, getTeammatesNumber, getTeam, getSport, setMatch, updateMatchScore, getMatch, getRankings, updateMember, isLoggedIn, signIn, signUp}

}
