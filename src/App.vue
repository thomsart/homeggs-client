<script>

    import { ref } from 'vue'

    export default {
        setup() {
            // Déclaration d'une référence booléenne
            const token = ref(true);

            return {
                token
            };
        }
    }

</script>

<template>
    
    <h1>Hommeggs</h1>
    <template v-if="token===true">
        <h2>Mets tout tes œufs dans le même foyer!</h2>
    </template>

    <template v-else>
        <h2>Bienvenue!</h2>
    </template>

</template>

<style>

</style>