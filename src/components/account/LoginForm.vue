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
    <form @submit.prevent="handleLogin()">
        <input v-model="email" type="email" placeholder="&emsp;email">
        <input v-model="password" type="password" placeholder="&emsp;password">
        <CustomButton id="custom-button-login" buttonText="connexion" />
    </form>

</template>

<style lang="scss">

    form {
        border-radius: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        input, #custom-button-login {
        width: 70%;
        height: 2em;
        margin-top: 0.5em;
        }
        #custom-button-login {
            background-color: $color-BLUE;
            margin-bottom: 3em;
        }
    }
    

</style>