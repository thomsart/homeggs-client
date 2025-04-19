<script setup>

    import { ref, reactive, onMounted } from 'vue'
    import { callShop } from '../utils/api/callShopEndpoints.js'
    import Product from '../models/shop/product.js'

    import CustomButton from './CustomButton.vue'
    import ProductForm from './ProductForm.vue';

    const products = ref([]);
    onMounted(async () => {
        try {
        const callProducts = callShop();
        await callProducts.allProducts();
        const fetchedProducts = callProducts.datas.value || [];
        products.value = fetchedProducts.map(data => reactive(new Product(data)));
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
        console.log(products.value);
    })

    const isModalOpen = ref(false);

    const handleAddToList = async () => {};
    const handletakeOffFromList = (product) => {
        products.value = products.value.filter(m => m!==product)
    }
    const handleUpdateProduct = async () => {};
    const handleDeleteProduct = async () => {};

</script>

<template>

    <h2>Shopping List</h2>
    <h3 v-if="products.length !== 0">A acheter: </h3>
    <h3 v-else>Fais ta liste de course</h3>

    <custom-button buttonText="Create product" button-color="blue" @button-click="isModalOpen = true"/>
    <div v-if="isModalOpen" id="modal-overlay">
      <div id="modal">
        <custom-button id="button-close-modal" buttonText="X" button-color="red" @button-click="isModalOpen = false"/>
        <product-form/>
      </div>
    </div>

    <custom-button buttonText="Delete product" button-color="red" @button-click="handleDeleteProduct(name)"/>
    <custom-button buttonText="Add to list" button-color="green" @button-click="handleAddToList(name)"/>

    <div id="shopList">
        <custom-button v-for="product in products" :buttonText="product.name" buttonColor="red" @button-click="handletakeOffFromList(product)"/>
    </div>
    <hr>

</template>

<style>

    #shopList {
        background-color: beige;
        width: 90%;
        display: flex;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: start;
        min-width: 0;
    }
    #modal-overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #modal {
        position: relative;
        background-color: white;
        width: 30%;
        height: 30%;
        border: solid 3px;
        border-color: rgb(0, 0, 0);
        border-radius: 1em;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    #button-close-modal {
        margin-top: 5px;
        margin-right: 5px;
    }

</style>