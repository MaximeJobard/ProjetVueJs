<script setup>
import useSupabase from "../composable/supabase";
import {onMounted, ref} from 'vue';

const {teamName, changeTeamName,getUserId, getUserTeam}=useSupabase();


const name = ref();
const userId = ref();
const userTeam = ref();

onMounted(async()=>{
    userId.value=await getUserId();
    userTeam.value=await getUserTeam(userId.value);
    name.value= await teamName(userTeam.value);
})

function changeName(){
    const data =  changeTeamName(name.value, userTeam.value);
}

  
</script>
<template>
    <div class="team_nom flex flex-col items-center">
        <label>
            Team:
            <input type="text" class="text-black border-2 border-black w-full rounded-xl mb-4" v-model="name" placeholder=name @change="changeName() ">
        </label>
    </div>
</template>