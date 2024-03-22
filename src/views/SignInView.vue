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
        router.push('/SignUp')
    }
}

//vérifier si connecté
async function isLoggedIn() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
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
        <button class="p-2 bg-blue-600 border-black border-4 rounded-full" @click=" signIn">Sign in and chat !</button>
        <p ref="text"></p>
    </div>
</template>

<style>
    label{
        color: white;
    }
</style>../api/supabaseAPI.js