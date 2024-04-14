<script setup>
    import { teamMembersStore } from "@/stores/memberList";
    import useSupabase from "../composable/supabase";
    import {onMounted, ref} from 'vue';

    const {deleteMember, getTeamLeader, getUserId, getUserTeam, teamMember} = useSupabase();
    const teamLeader = ref([]);
    const userId = ref();
    const userTeam = ref();
    const members = ref([])

    async function _deleteMember(mem_last_name,mem_first_name){
        const confirmation = window.confirm("Remove " + mem_first_name + " " +  mem_last_name + " from the team? ");
        if(confirmation){
            const error = await deleteMember(mem_last_name,mem_first_name);
        
            if(error == null){
                teamMembersStore.remove(mem_first_name, mem_last_name)
            }

        }
    }

    onMounted(async()=>{ 
        userId.value=await getUserId();
        userTeam.value=await getUserTeam(userId.value);
        teamLeader.value = await getTeamLeader(userTeam.value);
        teamMembersStore.listMembers = await teamMember(userTeam.value)
    })

</script>
<template>
    <div ref="list" class="flex flex-col items-center">
        <div v-for="leader in teamLeader" :key="leader" class="border-2 text-center border-black my-4 px-6 py-2 rounded-2xl">
            {{ leader['mem_last_name'] }}
            {{ leader['mem_first_name'] }}
        </div>
        <div v-for="member in teamMembersStore.listMembers" :key="member" class="border-2 text-center border-black my-4 px-6 py-2 rounded-2xl">
            {{ member['mem_last_name'] }}
            {{ member['mem_first_name'] }}
            <p></p>
            <button @click="_deleteMember(member['mem_last_name'],member['mem_first_name'])" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">X</button>
        </div>
    </div>
</template>
<style>
</style>