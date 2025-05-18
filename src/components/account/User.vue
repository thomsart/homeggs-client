<script setup>

    import { reactive } from 'vue'
    import { useToken } from '../../composables/token.js'
    import { useUserStore } from '../../models/account/useUserStore.js'

    import CustomButton from '../CustomButton.vue'

    const { clearToken } = useToken();
    const user = useUserStore();
    const userAttributesToUpdate = reactive({});

    const handleLogout = async () => {
        await user.logout();
        clearToken();
    };

    const handleUpdateUser = async () => {
        console.log(userAttributesToUpdate);
        await user.update({body: userAttributesToUpdate});
    };

</script>

<template>

    <h2>Bienvenue {{ user.firstName }} ! 
        <CustomButton id="custom-button-logout" buttonText="&nbsp;&nbsp;¡&nbsp;&nbsp;" @button-click="handleLogout()" /></h2>
    <form id="user-updating" @submit.prevent="handleUpdateUser(userAttributesToUpdate)">
        <input v-model="userAttributesToUpdate['first_name']" type="text" :placeholder="user.firstName">
        <input v-model="userAttributesToUpdate['last_name']"  type="text" :placeholder="user.lastName">
        <input v-model="userAttributesToUpdate['email']"  type="text" :placeholder="user.email">
        <input v-model="userAttributesToUpdate['phone']"  type="text" :placeholder="user.phone">
        <CustomButton id="custom-button-user-updating" buttonText="modifier" />
    </form>

</template>

<style lang="scss" scoped>

    #custom-button-logout {
        background-color: $color-RED;
        border-color: solid white 1px;
        border-radius: 20px;
    }

    form {
        input {
            background-color: $color-egg;
            border: none;
        }
        
        #custom-button-user-updating {
            background-color: $color-BLUE;
        }
    }

</style>