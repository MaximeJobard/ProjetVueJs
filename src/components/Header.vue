<script setup>
	import useSupabase from "@/composable/supabase.js"
	import router from "@/router";
	import { ref, onMounted } from 'vue'

	const {signOut, isLoggedIn} = useSupabase()

	const isLogged = ref(false)

	onMounted(async () => {
		isLogged.value = await isLoggedIn();
	})

	async function _signOut(){
		await signOut();
		router.push("/")
	}

	function goToRankings(){
		router.push('/rankings')
	}

	function goToTeam(){
		router.push('/managementTeam')
	}

	function goToMatch(){
		router.push('/createMatch')
	}

	function gotToSignIn(){
		router.push("/")
	}

</script>

<template>
	<header class="w-full bg-gray-800 text-white p-4">
		<nav>
		<ul class="flex justify-evenly items-center">
			<li><button @click="goToRankings">Rankings</button></li>
			<li v-if="isLogged"><button @click="goToTeam">Management Team</button></li>
			<li v-if="isLogged"><button @click="goToMatch">Create Match</button></li>
			<li v-if="isLogged"><button class="inline-block bg-red-500 text-white px-4 py-2 rounded" @click="_signOut">Sign out</button></li>
			<li v-if="!isLogged"><button @click="gotToSignIn">Sign in</button></li>
		</ul>
		</nav>
	</header>

</template>

<style>

</style>