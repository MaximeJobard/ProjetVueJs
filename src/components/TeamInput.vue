<script setup>
import useSupabase from "../composable/supabase";
import {onMounted, ref} from 'vue';

const {supabase, teamName, changeTeamName,getUserId, getUserTeam}=useSupabase();


const nom= ref();
const userId=ref();
const userTeam=ref();

onMounted(async()=>{
    userId.value=await getUserId();
    userTeam.value=await getUserTeam(userId.value);
    nom.value= await teamName(userTeam.value);
   // console.log(nom.value);
})

function  changeNom(){
    console.log(nom.value);
    const data =  changeTeamName(nom.value);
}

  
</script>
<template>
    <div class="team_nom flex flex-col items-center">
        <div>
            <input type="text" class="text-black border-2 border-black w-full rounded-xl my-4" v-model="nom" placeholder=nom @change="changeNom() ">
        </div>
    </div>
</template>