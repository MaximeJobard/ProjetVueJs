<script setup>
import useSupabase from "../composable/supabase";
import {onMounted, ref} from 'vue';

const {supabase, teamName, changeTeamName}=useSupabase();


const nom= ref();

onMounted(async()=>{
    nom.value= await teamName();
   // console.log(nom.value);
})

function  changeNom(){
    console.log(nom.value);
    const data =  changeTeamName(nom.value);
}

  
</script>
<template>
    <div class="team_nom">
        <input type="text" class="text-black" v-model="nom" placeholder=nom @change="changeNom()">
    </div>
</template>