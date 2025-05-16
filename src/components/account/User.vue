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

    <h2>Bienvenue {{ user.firstName }} ! 
        <CustomButton id="custom-button-logout" buttonText="&nbsp;¡&nbsp;" @button-click="handleLogout()" /></h2>
    <p>{{ user.email }}</p>
    <p>{{ user.phone }}</p>
    

</template>

<style lang="scss">

    #custom-button-logout {
        background-color: $color-RED;
        border-color: solid white 1px;
        border-radius: 14px;
    }

</style>