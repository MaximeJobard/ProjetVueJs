
<script setup>
import { ref } from "vue"
import router from "@/router";
import useSupabase from "@/composable/supabase.js";


const {supabase, updateMember, signOut} = useSupabase()

const email = ref(null)
const password = ref(null)
const name = ref("")
const firstname = ref("")

async function signUp() {
    signOut()
    if (!email.value || !password.value || !name.value || !firstname.value) {
        console.error("Veuillez remplir tous les champs.");
        return;
    }
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
    <div class="flex flex-col items-center">
        <div class="flex flex-col">
            <label class="my-4">
                Email:
                <input class="border-2 border-black w-full rounded-xl" type="email" v-model="email" required>
            </label>
            <label class="my-4">
                Password:
                <input class="border-2 border-black w-full rounded-xl" type="password" v-model="password" required>
            </label>
            <label class="my-4">
                Nom :
                <input class="border-2 border-black w-full rounded-xl" type="text" v-model="name" required>
            </label>
            <label class="my-4">
                Prénom :
                <input class="border-2 border-black w-full rounded-xl" type="text" v-model="firstname" required>
            </label>
        </div>
        <div class="flex flex-col items-center mt-8">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " @click="signUp">Sign up !</button>
            <button @click="goSignIn">I already have an account</button>
        </div>

    </div>
</template>

<style>
    
</style>../api/supabaseAPI.js
