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
    <div ref="list">
        <table>
            <tr v-for="leader in teamLeader" :key="leader">
                <td>{{ leader['mem_last_name'] }}</td>
                <td>{{ leader['mem_first_name'] }}</td>
            </tr>
            <tr v-for="member in members" :key="member">
                <td>{{ member['mem_last_name'] }}</td>
                <td>{{ member['mem_first_name'] }}</td>
                <td><button @click="_deleteMember(member['mem_last_name'],member['mem_first_name'])">X</button></td>
            </tr>
        </table>
    </div>
</template>
<style>
</style>