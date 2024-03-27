<script setup>
import { ref } from "vue"
import router from "@/router";
import useSupabase from "@/composable/supabase.js";


const {supabase, getUserId, updateMember} = useSupabase()

const email = ref(null)
const password = ref(null)
const name = ref("")
const firstname = ref("")

async function signUp() {
    console.log({
        email: email.value,
        password: password.value
    })
    const { data, errorAuth } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })

    console.log("connecté")

    await updateMember(name.value, firstname.value)

    if(errorAuth == null){
        router.push('/managementTeam')
    }
}

function goSignIn(){
    router.push("/SignIn")
}

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-10">
        <div>
            <label>
                Email:
                <input class="text-black p-1" type="email" v-model="email" required>
            </label>
            <label>
                Password:
                <input class="text-black p-1" type="password" v-model="password" required>
            </label>
        </div>
        <div>
            <label>
                Nom :
                <input class="text-black p-1" type="text" v-model="name" required>
            </label>
            <label>
                Prénom :
                <input class="text-black p-1" type="text" v-model="firstname" required>
            </label>
        </div>
        <button class="p-2 bg-blue-600 border-black border-4 rounded-full" @click="signUp">Sign up and chat !</button>
            <button @click="goSignIn">J'ai déja un compte</button>

    </div>
</template>

<style>
    
</style>../api/supabaseAPI.js