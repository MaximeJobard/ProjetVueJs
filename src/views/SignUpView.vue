<script setup>
import { ref } from "vue"
import useSupabase from "@/composable/supabase.js";

const {supabase} = useSupabase()

const email = ref(null)
const password = ref(null)

async function signUp() {
    console.log({
        email: email,
        password: password
    })
    await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            emailRedirectTo: 'http://localhost:5173/chat',
        }
    })
}

function signUpPass(){
    signUp(email.value, password.value)
}

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-10">
        <label>
            Email:
            <input class="text-black p-1" type="email" placeholder="Email" v-model="email">
        </label>
        <label>
            Password:
            <input class="text-black p-1" type="password" placeholder="password" v-model="password">
        </label>
        <button class="p-2 bg-blue-600 border-black border-4 rounded-full" @click="signUp">Sign up and chat !</button>
    </div>
</template>

<style>
    label{
        color: white;
    }
</style>../api/supabaseAPI.js