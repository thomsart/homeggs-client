<script setup>

    import { useToken } from '../../composables/token.js'
    import { callAccount } from '../../utils/api/callAccountEndpoints.js'
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
    <custom-button buttonText="deconnexion" buttonColor="red" @button-click="handleLogout"></custom-button>
    <p>id: {{ user.id }}</p>
    <p>email: {{ user.email }}</p>
    <p>phone: {{ user.phone }}</p>
    <hr>

</template>

<style>

</style>