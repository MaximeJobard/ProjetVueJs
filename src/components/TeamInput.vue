<script setup>
import useSupabase from "../composable/supabase";
import {onMounted, ref} from 'vue';

const {teamName, changeTeamName,getUserId, getUserTeam}=useSupabase();


const nom = ref();
const userId = ref();
const userTeam = ref();

onMounted(async()=>{
    userId.value=await getUserId();
    userTeam.value=await getUserTeam(userId.value);
    nom.value= await teamName(userTeam.value);
})

function changeName(){
    console.log(nom.value);
    const data =  changeTeamName(nom.value);
}

  
</script>
<template>
    <div class="team_nom">
        <input type="text" class="text-black" v-model="nom" placeholder=nom @change="changeName()">
    </div>
</template>