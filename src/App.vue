<script setup>

    import { onMounted, watchEffect } from 'vue'
    import { useToken } from './composables/token.js'
    import { useUserStore } from './models/account/useUserStore.js'

    import LoginForm from './components/account/LoginForm.vue'
    import User from './components/account/User.vue'
    import ProductsList from './components/shop/ProductsList.vue'

    const { token } = useToken();
    const user = useUserStore();

    onMounted(() => {
        const fetchUserIfTokenExists = async () => {
            if (user.id === null && token.value !== null) {
                await user.get();
            }}
        fetchUserIfTokenExists();
    })

    watchEffect(() => {
        // console.log('WatchEffect token dans App.vue: ' + token.value);
    });

</script>

<template>

    <div id="header">
        <h1>Homeggs... </h1>
        <h2>" Mets tout tes œufs dans le même foyer ! "</h2>
    </div>
    <hr>
    <template v-if="!token">
        <div id="login-form"><LoginForm /></div>
    </template>

    <template v-else>
        <div id="user"><User /></div>
        <hr>
        <div id="shop"><ProductsList /></div>
        <hr>
    </template>

</template>

<style lang="scss">

    hr {
        width: 30%;
    }

</style>