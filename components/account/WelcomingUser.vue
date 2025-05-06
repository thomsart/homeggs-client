<script setup>

    import { useToken } from '../../composables/token.js'
    import { callAccount } from '../../utils/api/callAccountEndpoints.js'
    import { useUserStore } from '../../stores/user.js'

    import CustomButton from '../CustomButton.vue'

    const { token, clearToken } = useToken();
    const userStore = useUserStore();

    const handleLogout = async () => {
        const callLogout = callAccount();
        await callLogout.logout(token.value);
        clearToken();
    };

</script>

<template>

    <h2>Ton Compte</h2>
    <h3>Bienvenue {{ userStore.firtsName }} {{ userStore.lastName }} !</h3>
    <custom-button buttonText="deconnexion" buttonColor="red" @button-click="handleLogout"></custom-button>
    <p>id: {{ userStore.id }}</p>
    <p>email: {{ userStore.email }}</p>
    <p>phone: {{ userStore.phone }}</p>
    <hr>

</template>

<style>

</style>