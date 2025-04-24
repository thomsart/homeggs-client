<script setup>

    import { reactive } from 'vue'
    import { callShop } from '../utils/api/callShopEndpoints.js'
    import Product from '../models/shop/product.js'

    import CustomButton from './CustomButton.vue'

    const product = reactive(new Product());
    const emit = defineEmits(['close-modal']);
    const handlePostProduct = async () => {
        try {
            console.log(product.createProduct());
            const callProduct = callShop();
            await callProduct.postProduct(product.createProduct());
            emit('close-modal');
            console.log("handlePostProduct => product created: ", product);            
        } catch (error) {
            console.error(`handlePostProduct => Erreur lors de la creation du produit ${product.name} :`, error);
        }
    };

</script>

<template>

    <form id="product-form" @submit.prevent="handlePostProduct">

        <div id="product-inputs" v-for="(value, key) in product.formFields()" :key="key">
            <input :id="key" :name="key" v-model="product[key]"  :placeholder="key" :type="typeof value === 'number' ? 'number' : 'text'"/>
        </div>
        <Custom-button id="button-validation" buttonText="ajoute" buttonCollor="blue">Ajoute</Custom-button>

    </form>


</template>

<style>

    #product-inputs {
        display: flex;
        flex-direction: column;
    }

    #button-validation {
        width: 100%;
    }

</style>