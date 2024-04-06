<script setup>
import ManagementTeam from '../components/TeamInput.vue'
import DisplayMembers from '../components/DisplayMembers.vue'
import AddMembre from '../components/AddMembre.vue'
import Header from '../components/Header.vue'
</script>

<template>
    <div class="flex flex-col items-center">
        <Header/>
        <ManagementTeam/>
        <DisplayMembers/>
        <AddMembre/>
    </div>

</template>

<style>

</style>