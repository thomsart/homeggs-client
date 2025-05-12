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

    <h2>Bienvenue {{ user.firstName }} !</h2>
    <CustomButton buttonText="deconnexion" @button-click="handleLogout" />
    <p>Firstname: {{ user.firstName }}</p>
    <p>Lastname: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>

</template>

<style lang="scss">

</style>