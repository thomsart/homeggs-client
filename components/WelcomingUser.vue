<script setup>

    import CustomButton from './CustomButton.vue'
    import { useUserStore } from '../stores/user.js'

    const userStore = useUserStore();

</script>

<template>

    <h2>Bienvenue {{ userStore.firtsName }} {{ userStore.lastName }} !</h2>
    <custom-button buttonText="deconnexion" buttonColor="blue" @button-click="handleLogout"></custom-button>
    <p>id: {{ userStore.id }}</p>
    <p>email: {{ userStore.email }}</p>
    <p>phone: {{ userStore.phone }}</p>
    <hr></hr>

</template>

<style>

</style>