<script setup>

    import { onMounted, watchEffect } from 'vue'
    import { callAccount } from '../utils/api/callAccountEndpoints.js'
    // import { callBudget } from '../utils/api/callBudgetEndpoints.js'
    import { useToken } from '../composables/token.js'
    import { useUserStore } from '../stores/user.js'

    import LoginForm from '../components/LoginForm.vue'
    import CustomButton from '../components/CustomButton.vue'

    const { token, clearToken } = useToken();
    const userStore = useUserStore();

    const handleLogout = async () => {
        const callLogout = callAccount();
        await callLogout.logout(token.value);
        clearToken();
    };

    onMounted(() => {
        const callMe = callAccount();
        const fetchUserIfTokenExists = async () => {
            if (userStore.id === null && token.value !== null) {
                await callMe.me(token.value);
                userStore.setUser(callMe.datas.value);
                console.log('The user as it comes from API: ' + JSON.stringify(callMe.datas.value));
            }}
        fetchUserIfTokenExists();
    })

    watchEffect(() => {
        console.log('WatchEffect token dans App.vue: ' + token.value);
    });

</script>

<template>

    <h1>Homeggs</h1>
    <h2>Mets tout tes œufs dans le même foyer!</h2>
    <hr>

    <template v-if="!token">
        <login-Form></login-Form>
    </template>

    <template v-else>
        <h2>Bienvenue {{ userStore.firtsName }} {{ userStore.lastName }} !</h2>
        <custom-button buttonText="deconnexion" buttonColor="blue" @button-click="handleLogout"></custom-button>
        <p>id: {{ userStore.id }}</p>
        <p>email: {{ userStore.email }}</p>
        <p>phone: {{ userStore.phone }}</p>
    </template>

</template>

<style>

    h1 {
        color: red;
    }
    h2 {
        color: blueviolet;
    }
    h3 {
        color: cadetblue;
    }

</style>