import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anon = import.meta.env.VITE_SUPABASE_ANON;
    const supabase = createClient(url, anon)

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    async function getUserId() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user)
        if (user) {
            console.log("id est :" + user.value.id)
          return user.value.id
        } else {
          return null 
        }
    }

    async function updateMember(name, firstname){
        supabase
        .from("membre")
        .update({ mem_last_name: name })
        .eq("user_id", getUserId());

        supabase
        .from("membre")
        .update({ mem_first_name: firstname })
        .eq("user_id", getUserId());
    }

    return {supabase, signOut, getUserId, updateMember}
}