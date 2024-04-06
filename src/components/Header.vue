<script>
import useSupabase from "@/composable/supabase.js"

const {signOut} = useSupabase()

</script>

<template>
	<header class="w-full bg-gray-800 text-white p-4">
		<nav>
		<ul class="flex justify-evenly items-center">
			<li><a href="/rankings">Rankings</a></li>
			<li><a href="/managementTeam">Management Team</a></li>
			<li><a href="/createMatch">Create Match</a></li>
			<li><a class="inline-block bg-red-500 text-white px-4 py-2 rounded" href="/" @click="signOut">Signout</a></li>
		</ul>
		</nav>
	</header>

</template>

<style>

</style>