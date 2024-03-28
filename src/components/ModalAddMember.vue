<template> 
    <el-dialog v-model="visible"> {{ args }} 
        <el-button @click="hide(), resolve(1111), remove()">close</el-button> 
    </el-dialog> 
</template> 

<script setup> 
    import { useModalRef } from "vue-modal-provider"; 
    const { show, hide} = useModalRef(); 
</script> 