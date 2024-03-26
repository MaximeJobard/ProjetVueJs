<script setup>
import { RouterLink, RouterView } from 'vue-router'
import useSupabase from "@/composable/supabase.js"; 

  useSupabase()
</script>

<template>
  <RouterView />
</template>

<style scoped>
  @import 'tailwindcss/tailwind.css';
</style>
