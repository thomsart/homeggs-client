<script setup>

    import { ref, watchEffect } from 'vue'
    import { useToken } from '../../composables/token.js'
    import { useUserStore } from '../../models/account/useUserStore.js'

    import CustomButton from '../CustomButton.vue'

    const { token, setToken } = useToken();
    const user = useUserStore();
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {

        if (!email.value || !password.value) {
            console.error("Email and password are required!");
            return;
        }
        await user.login({body: {'email': email.value, 'password': password.value}});
        const response = user.state.getResponse();
        // console.log(response);
        setToken(response.datas.auth_token);

        if (token.value) {
            await user.get(); // set user in store with fetched user form get() method
        }
    };

    watchEffect(() => {
        // console.log(('WatchEffect token in loginForm.vue: ' + token.value));
    });


</script>

<template>

    <h2>Connecte toi {{ user.firstName }}</h2>
    <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="your email">
        <input v-model="password" type="password" placeholder="your password">
        <CustomButton buttonText="connexion" />
    </form>
    <hr>

</template>

<style lang="scss">



</style>