<script setup>

    import { useToken } from '../../composables/token.js'
    import { useUserStore } from '../../models/account/useUserStore.js'

    import CustomButton from '../CustomButton.vue'

    const { clearToken } = useToken();
    const user = useUserStore();

    const handleLogout = async () => {
        await user.logout();
        clearToken();
    };

</script>

<template>

    <h2>Ton Compte</h2>
    <h3>Bienvenue {{ user.firstName }} {{ user.lastName }} !</h3>
    <CustomButton buttonText="deconnexion" buttonColor="red" @button-click="handleLogout" />
    <p>your email: {{ user.email }}</p>
    <p>your phone: {{ user.phone }}</p>
    <hr>

</template>

<style>

</style>