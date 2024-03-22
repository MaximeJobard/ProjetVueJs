<script setup>
    import useSupabase from "../composable/supabase";
    import {onMounted, ref} from 'vue';

    const {supabase, teamMember}=useSupabase();
    const list=ref();
    const members=ref([]);

    onMounted(async()=>{
        members.value= await teamMember();
    })

</script>
<template>
    <div ref="list">
        <table>
            <tr v-for="member in members" :key="member">
                <td>{{ member['mem_last_name'] }}{{ member['mem_first_name'] }}</td>
                
            </tr>
        </table>
    </div>
</template>
<style>
</style>