<script setup>

    import { ref } from 'vue'
    import Articles from '../utils/articlesMock.js'
    import CustomButton from './CustomButton.vue'

    const articles = ref(Articles);

    const createArticle = (name) => {}
    const deleteArticle = (name) => {}
    const addToList = (name) => {}
    const takeOffFromList = (name) => {}

</script>

<template>

    <h2 v-if="articles.lenght !== 0">A acheter: </h2>
    <h3 v-else>Fais ta liste de course</h3>

    <custom-button buttonText="Create article" button-color="green" @button-click="createArticle(name)"/>
    <custom-button buttonText="Delete article" button-color="red" @button-click="deleteArticle(name)"/>
    <custom-button buttonText="Add to list" button-color="green" @button-click="addToList(name)"/>

    <div id="shopList">
        <CustomButton v-for="article in articles" :buttonText="article" buttonColor="red" @button-click="takeOffFromList(name)"/>
    </div>
    <hr>

</template>

<style scoped>

    #shopList {
        background-color: beige;
        width: 80%;
        display: flex;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: start;
        min-width: 0;
    }

</style>