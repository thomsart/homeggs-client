<script setup>

    import { onMounted, watchEffect } from 'vue'
    import { callAccount } from '../utils/api/callAccountEndpoints.js'
    import { useToken } from '../composables/token.js'
    import { useUserStore } from '../stores/user.js'

    import LoginForm from '../components/LoginForm.vue'
    import WelcomingUser from '../components/WelcomingUser.vue'
    import ShopList from '../components/Shop.vue'

    const { token } = useToken();
    const userStore = useUserStore();

    onMounted(() => {
        const callMe = callAccount();
        const fetchUserIfTokenExists = async () => {
            if (userStore.id === null && token.value !== null) {
                await callMe.me(token.value);
                userStore.setUser(callMe.datas.value);
                // console.log('The user as it comes from API: ' + JSON.stringify(callMe.datas.value));
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