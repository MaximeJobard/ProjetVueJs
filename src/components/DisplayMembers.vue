<script setup>
    import useSupabase from "../composable/supabase";
    import {VueElement, onMounted, ref} from 'vue';

    const {supabase, teamMember,deleteMember}=useSupabase();
    const list=ref();
    const members=ref([]);

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
        members.value= await teamMember();
    })

</script>
<template>
    <div ref="list">
        <table>
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