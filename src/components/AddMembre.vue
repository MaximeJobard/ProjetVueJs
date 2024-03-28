<script setup>
    import useSupabase from "../composable/supabase";
    import { ref } from "vue";
    
    const {insertMember, getUserId, getUserTeam, getTeammatesNumber} = useSupabase();
    const isClicked = ref(false);
    const mem_first_name = ref()
    const mem_last_name = ref()
    const maxTeammates = ref(false)
    verifyTeammatesNumber();
    

    function addMembreForm(){
        isClicked.value = true;
    }

    async function addMembreToTheTeam(){
        const confirmation = window.confirm("Voulez-vous ajouter " + mem_first_name.value + " " + mem_last_name.value + " à votre équipe ? ");
        if(confirmation){
            await insertMember(mem_last_name.value, mem_first_name.value, await getUserTeam(await getUserId()))
            verifyTeammatesNumber()
        }
        isClicked.value = false
    }

    async function verifyTeammatesNumber(){
        const teammatesNumber = await getTeammatesNumber(await getUserTeam( await getUserId()));
        console.log(teammatesNumber)
        if(teammatesNumber.length >= 5){
            maxTeammates.value = true
        }
    }
    

</script>

<template>

    <label v-if="isClicked">
        Prénom :
        <input type="text" v-model="mem_first_name"/>
    </label>
    <label v-if="isClicked">
        Nom :
        <input type="text" v-model="mem_last_name"/>
    </label>  
    <button v-if="isClicked" @click="addMembreToTheTeam">Ajouter ce membre -></button>

    <button v-if="!isClicked && !maxTeammates" @click="addMembreForm">Ajouter un membre +</button>
</template>