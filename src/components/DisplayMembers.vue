<script setup>
    import { teamMembersStore } from "@/stores/memberList";
    import useSupabase from "../composable/supabase";
    import {onMounted, ref} from 'vue';

    const {deleteMember, getTeamLeader, getUserId, getUserTeam} = useSupabase();
    const teamLeader = ref([]);
    const userId = ref();
    const userTeam = ref();

    async function _deleteMember(mem_last_name,mem_first_name){
        const confirmation = window.confirm("Remove " + mem_first_name + " " +  mem_last_name + " from the team? ");
        if(confirmation){
            const error = await deleteMember(mem_last_name,mem_first_name);
        
            if(error == null){
                teamMembersStore.remove(mem_first_name, mem_last_name)
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
        teamLeader.value = await getTeamLeader(userTeam.value);
    })

</script>
<template>
    <div>
        <table>
            <tr v-for="leader in teamLeader" :key="leader">
                <td>{{ leader['mem_last_name'] }}</td>
                <td>{{ leader['mem_first_name'] }}</td>
            </tr>
            <tr v-for="member in teamMembersStore.listMembers" :key="member">
                <td>{{ member['mem_last_name'] }}</td>
                <td>{{ member['mem_first_name'] }}</td>
                <td><button @click="_deleteMember(member['mem_last_name'],member['mem_first_name'])">X</button></td>
            </tr>
        </table>
    </div>
</template>
<style>
</style>