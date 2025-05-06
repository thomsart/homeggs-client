<script setup>

    import { onMounted, watchEffect } from 'vue'
    import { useToken } from '../composables/token.js'
    import { useUserStore } from '../models/account/useUserStore.js'

    import LoginForm from '../components/account/LoginForm.vue'
    import WelcomingUser from '../components/account/WelcomingUser.vue'
    import ShopList from '../components/shop/ProductsList.vue'

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

    <h1>Homeggs</h1>
    <h2>Mets tout tes œufs dans le même foyer!</h2>
    <hr>

    <template v-if="!token">
        <login-form></login-form>
    </template>

    <template v-else>
        <welcoming-user></welcoming-user>
        <shop-list></shop-list>
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