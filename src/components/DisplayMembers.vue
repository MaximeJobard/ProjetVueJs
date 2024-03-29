<script setup>
    import useSupabase from "../composable/supabase";
    import {VueElement, onMounted, ref} from 'vue';

    const {supabase, teamMember,deleteMember, getTeamLeader, getUserId, getUserTeam}=useSupabase();
    const list=ref();
    const members=ref([]);
    const teamLeader=ref([]);
    const userId=ref();
    const userTeam=ref();



    function _deleteMember(mem_last_name,mem_first_name){
        const confirmation =window.confirm("Êtes-vous sûr de vouloir supprimer le membre ? ");
        if(confirmation){
            const error=deleteMember(mem_last_name,mem_first_name);
        
            if(error.value==null){
                
                members.value=members.value.filter((member)=>{
                return  member['mem_last_name']!=mem_last_name && member['mem_first_name']!=mem_first_name;
                });
                console.log(members.value);
            }
            else{
                console.log(error);
            }
        }
    }

    onMounted(async()=>{ 
        userId.value=await getUserId();
        userTeam.value=await getUserTeam(userId.value);
        console.log(userTeam.value)
        teamLeader.value=await getTeamLeader(userTeam.value);
        members.value= await teamMember(userTeam.value);
        
    })

</script>
<template>
    <div ref="list" class="flex flex-col items-center">
        <div v-for="leader in teamLeader" :key="leader" class="border-2 text-center border-black my-4 px-6 py-2 rounded-2xl">
            {{ leader['mem_last_name'] }}
            {{ leader['mem_first_name'] }}
        </div>
        <div v-for="member in members" :key="member" class="border-2 text-center border-black my-4 px-6 py-2 rounded-2xl">
            {{ member['mem_last_name'] }}
            {{ member['mem_first_name'] }}
            <p></p>
            <button @click="_deleteMember(member['mem_last_name'],member['mem_first_name'])" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">X</button>
        </div>
    </div>
</template>
<style>
</style>