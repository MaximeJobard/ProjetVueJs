
<script setup>
    import { ref } from 'vue'
    import CreateMatch from '../components/MatchInput.vue'
    import ListMatch from '../components/ListMatch.vue'
    import Header from '../components/Header.vue'

    const isCreateMatchVisible = ref(false)

    function showCreateMatch() {
        isCreateMatchVisible.value = true
    }

    function hideCreateMatch() {
        isCreateMatchVisible.value = false
    }
</script>

<template>
    <div class="flex flex-col items-center">
        <Header/>
        <p class="text-center underline text-lg">Matchs</p>
      <CreateMatch v-if="isCreateMatchVisible" @close="hideCreateMatch"/>
      <ListMatch v-if="!isCreateMatchVisible"/>
      <button v-if="!isCreateMatchVisible" @click="showCreateMatch" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Create a match</button>
    </div>
</template>
