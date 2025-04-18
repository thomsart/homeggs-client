<script setup>

    import { ref, reactive } from 'vue'
    import { callShop } from '../utils/api/callShopEndpoints.js'
    import Product from '../models/shop/product.js'

    import CustomButton from './CustomButton.vue'

    const product = reactive(new Product());
    const handleCreateProduct = async () => {
        const callAddProduct = callShop();
        callAddProduct.addProduct();
    };

</script>

<template>

    <form id="product-form" @submit.prevent="handleCreateProduct">

        <div id="product-inputs" v-for="(value, key) in product.getFormFields()" :key="key">
            <input :id="key" :name="key" v-model="product[key]"  :placeholder="key" :type="typeof value === 'number' ? 'number' : 'text'"/>
        </div>
        <Custom-button id="button-validation" buttonText="ajoute" buttonCollor="blue">Ajoute</Custom-button>

    </form>


</template>

<style>

    /* #product-form {
        border: 3px;
        border-color: black;
        width: 80%;
        height: 80%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    } */

    #product-inputs {
        display: flex;
        flex-direction: column;
    }

    #button-validation {
        width: 100%;
    }

</style>