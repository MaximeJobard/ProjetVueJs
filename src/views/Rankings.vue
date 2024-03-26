<script setup>
    import useSupabase from '../composable/supabase';
    import {ref, onMounted} from "vue";

    const { getRankings } = useSupabase();

    const list = ref();
    const rankings = ref([]);

    onMounted(async () => {
        rankings.value = await getRankings();
    })
</script>

<template>
    <div ref="list">
        <table>
            <tr v-for="team in rankings" :key="team"> 
                <td> {{ team['rank'] }} </td>
                <td> {{ team['tea_name'] }} </td>
                <td> {{ team['tea_score'] }} points </td>
            </tr>
        </table>
    </div>
</template>