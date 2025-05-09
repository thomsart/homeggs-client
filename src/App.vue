<script setup>


    import { onMounted, watchEffect } from 'vue'
    import { useToken } from './composables/token.js'
    import { useUserStore } from './models/account/useUserStore.js'

    import LoginForm from './components/account/LoginForm.vue'
    import WelcomingUser from './components/account/WelcomingUser.vue'
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

    <h1>Homeggs</h1>
    <h2>Mets tout tes œufs dans le même foyer!</h2>
    <hr>

    <template v-if="!token">
        <LoginForm />
    </template>

    <template v-else>
        <WelcomingUser />
        <ProductsList />
    </template>

</template>

<style lang="scss">

</style>