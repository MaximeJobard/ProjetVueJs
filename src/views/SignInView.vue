
<script setup>
    import { ref } from "vue"
    import router from "@/router/index";
    import useSupabase from "@/composable/supabase.js"
    import Header from '../components/Header.vue'

    const {signIn} = useSupabase()

    const email = ref()
    const password = ref()

    const errorMessage = ref(null)

    async function _signIn() {
        const logIn = await signIn(email.value, password.value)

        if (logIn != true) {
            errorMessage.value = logIn.message;
        } 

        else {
            errorMessage.value = null;
            router.push('/managementTeam')
        }
    }

    function goSignUp(){
        router.push('SignUp')
    }

</script>

<template>
    <div class="flex flex-col items-center">
        <Header/>
        <div class="flex flex-col items-center">
            <label class="w-full my-4">
                Email:
                <input class="border-2 border-black w-full rounded-xl" type="email" v-model="email">
            </label>
            <label class="w-full my-4">
                Password:
                <input class="border-2 border-black w-full rounded-xl" type="password" v-model="password">
            </label>
            <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
            <div class="flex flex-col items-center mt-8">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " @click="_signIn">Sign in</button>
                <button @click="goSignUp">I don't have an account</button>
            </div>
        </div>
    </div>
</template>

<style>

</style>
