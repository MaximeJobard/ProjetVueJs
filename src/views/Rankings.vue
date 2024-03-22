<script setup>
    import useSupabase from '@/composable/supabase';

    const { getRankings } = useSupabase();

    let rankings = ref([]);

    onMounted(async () => {
        rankings.value = await getRankings();
        console.log(profiles.value);
    })

</script>

<template>
    <h1>Stylé</h1>
</template>