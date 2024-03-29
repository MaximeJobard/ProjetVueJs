<script setup>
import { ref } from "vue"
import router from "@/router/index";
import useSupabase from "@/composable/supabase.js"

const {supabase} = useSupabase()

const email = ref()
const password = ref()

async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })

    if(error == null){
        router.push('/managementTeam')
    }
}

function goSignUp(){
    router.push('/SignUp')
}

</script>

<template>
    <div class="h-lvh flex flex-col bg-slate-400 gap-10">
        <label>
            Email:
            <input class="text-black p-1" type="email" v-model="email">
        </label>
        <label class="block">
            Password:
            <input class="text-black p-1" type="password" v-model="password">
        </label>
        <button class="p-2 bg-blue-600 border-black border-4 rounded-full" @click="signIn">Sign in and chat !</button>
        <button @click="goSignUp">Je n'ai pas de compte</button>
    </div>
</template>

<style>

</style>