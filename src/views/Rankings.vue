<script setup>
    import useSupabase from '../composable/supabase';
    import {ref, onMounted} from "vue";

    const { getRankings } = useSupabase();

    const list = ref();
    const rankings = ref([]);

    onMounted(async () => {
        rankings.value = await getRankings();
        /*let i = 1;
        rankings.value.forEach(team => {
            team['rang'] = i;
            i++;
        });*/
    })

    


</script>

<template>
    <div ref="list">
        <table>
            <tr v-for="team in rankings" :key="team"> 
                <td> {{ team['tea_name'] }} </td>
                <td> {{ team['tea_score'] }} </td>
            </tr>
        </table>
    </div>
</template>