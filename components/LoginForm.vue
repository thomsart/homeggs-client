<script setup>

    import CustomButton from './CustomButton.vue'

    import { ref, watchEffect } from 'vue'
    import { callAccount } from '../utils/api/callAccountEndpoints.js'
    import { useToken } from '../composables/token.js'
    import { useUserStore } from '../stores/user.js'

    const { token, setToken } = useToken();
    const userStore = useUserStore();
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
        const callLogin = callAccount();
        const callMe = callAccount();

        if (!email.value || !password.value) {
            console.error("Email and password are required!");
            return;
        }
        await callLogin.login(email.value, password.value);
        setToken(callLogin.datas.value.auth_token);

        if (token.value) {
            await callMe.me(token.value);
            userStore.setUser(callMe.datas.value); // update user in store
        }
    };

    watchEffect(() => {
        console.log(('WatchEffect token in loginForm.vue: ' + token.value));
    });


</script>

<template>

    <h2>Connecte toi</h2>
    <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="your email">
        <input v-model="password" type="password" placeholder="your password">
        <Custom-button buttonText="connexion" buttonCollor="blue"></Custom-button>
    </form>
    <hr>

</template>

<style>



</style>