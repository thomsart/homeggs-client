<script setup>

    import { ref, reactive } from 'vue'
    import { callShop } from '../utils/api/callShopEndpoints.js'
    import Articles from '../utils/articlesMock.js'

    import CustomButton from './CustomButton.vue'

    const products = reactive();

    // const createArticle = (name) => {}
    // const deleteArticle = (name) => {}
    // const addToList = (name) => {}
    // const takeOffFromList = (article) => {
    //     articles.value = articles.value.filter(m => m!==article)
    // }
    const handleCreateProduct = async () => {};
    const handleAddToList = async () => {};
    const handletakeOffFromList = (product) => {
        products.value = products.value.filter(m => m!==product)
    }
    const handleUpdateProduct = async () => {};
    const handleDeleteProduct = async () => {};

</script>

<template>

    <h2>Shopping List</h2>
    <h3 v-if="products.lenght !== 0">A acheter: </h3>
    <h3 v-else>Fais ta liste de course</h3>

    <custom-button buttonText="Create product" button-color="blue" @button-click="handleCreateProduct(name)"/>
    <custom-button buttonText="Delete product" button-color="red" @button-click="handleDeleteProduct(name)"/>
    <custom-button buttonText="Add to list" button-color="green" @button-click="handleAddToList(name)"/>

    <div id="shopList">
        <custom-button v-for="product in products" :buttonText="product" buttonColor="red" @button-click="handletakeOffFromList(product)"/>
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