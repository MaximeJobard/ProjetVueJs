<script setup>
    import useSupabase from '../composable/supabase';
    import {ref, onMounted} from "vue";
    import Header from '../components/Header.vue'

    const { getRankings } = useSupabase();

    const list = ref();
    const rankings = ref([]);

    onMounted(async () => {
        rankings.value = await getRankings();
    })
</script>

<template>
    <div class="flex flex-col items-center">
        <Header/>
        <div ref="list" class="flex flex-col">
            <div v-for="team in rankings" :key="team" class="border-2 text-center border-black my-4 rounded-2xl"> 
                <p class="text-3xl">{{ team['rank'] }}</p>
                <p></p>
                {{ team['tea_name'] }} : {{ team['tea_score'] }} points
            </div>
        </div>
    </div>
</template>