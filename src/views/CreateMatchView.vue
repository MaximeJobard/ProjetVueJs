
<script setup>
    import { ref } from 'vue'
    import CreateMatch from '../components/MatchInput.vue'
    import ListMatch from '../components/ListMatch.vue'

    const isCreateMatchVisible = ref(false)

    function showCreateMatch() {
        isCreateMatchVisible.value = true
    }

    function hideCreateMatch() {
        isCreateMatchVisible.value = false
    }
</script>

<template>
    <div>
      <CreateMatch v-if="isCreateMatchVisible" @close="hideCreateMatch"/>
      <ListMatch v-if="!isCreateMatchVisible"/>
      <button v-if="!isCreateMatchVisible" @click="showCreateMatch">Create a match</button>
    </div>
</template>
