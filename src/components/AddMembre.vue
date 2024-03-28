<script setup>
    import useSupabase from "../composable/supabase";
    import { useModal }  from "vue-modal-provider";
    import ModalAddMember from './ModalAddMember.vue'
import { ref } from "vue";
    
    const insertMember = useSupabase();
    const isClicked=  ref(false);
    const {show} = useModal(ModalAddMember) 
    function showModal() { 
        show('test msg')
        .then(c=>{ console.log(c); }) }

    function addMembre(){

    }

</script>

<template>
    <input type="text" v-if="isClicked"/>
    <input type="text" v-if="isClicked"/>
    <button>Ajouter un membre +</button>
    <!--<button @click="showModal" >Ajouter un membre +</button>--> 
</template>