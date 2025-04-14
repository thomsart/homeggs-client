<script setup>

    import CustomButton from './CustomButton.vue';

    import { ref, watchEffect } from 'vue'
    
</script>

<template>

    <form @submit.prevent="">
        <input v-model="email" type="email" placeholder="your email">
        <input v-model="password" type="password" placeholder="your password">
        <CustomButton buttonText="connexion" buttonCollor="blue"></CustomButton>
    </form>

</template>

<style>



</style>