import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anon = import.meta.env.VITE_SUPABASE_ANON;
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

    async function updateMember(name, firstname){
        supabase.storage
        .from("membre")
        .Update({ mem_last_name: name })
        .eq("user_id", getUserId());

        await supabase.Storage
        .From("membre")
        .Update("mem_last_name", "fancy-avatar.png");

        supabase
        .from("membre")
        .update({ mem_first_name: firstname })
        .eq("user_id", getUserId());
    }

    return {supabase, signOut, getUserId, updateMember}
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
        const {data, error} = await supabase.from("match").select()
        return data
    }

    return {supabase, signOut, getTeam, getSport, setMatch, getMatch}
}