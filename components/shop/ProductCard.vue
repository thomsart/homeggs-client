<script setup>

    import { reactive } from 'vue'
    import { callShop } from '../../utils/api/callShopEndpoints.js'
    import Product from '../../models/shop/product.js'

    import CustomButton from '../CustomButton.vue'

    defineProps({
        product: Object, // data of type object expected
    });
    const emit = defineEmits(['close-modal']); // to use if the response to the updating or deleting are ok

    async function handleUpdateProduct () {
        console.log("Le produit est bien modifié");
        emit('close-modal');
    }

    async function handleDeleteProduct () {
        console.log("Le produit est bien supprimé");
        emit('close-modal');
    }


</script>

<template>

    <div class="card">
        <div class="card-header">
            <input type="text" :placeholder="product.name" required minlength="2" maxlength="50" size="10">
        </div>
        <div class="card-content">
            <input type="text" :placeholder="product.quantity">
        </div>
        <div class="card-content">
            <input type="text" :placeholder="product.kilo">
        </div>
        <div class="card-content">
            <input type="text" :placeholder="product.litre">
        </div>
        <div class="card-footer">
            <small>Produit cree le : {{ product.supply }}</small>
        </div>
        <custom-button buttonText="Modifier" button-color="brown" @button-click="handleUpdateProduct()"/>
        <custom-button buttonText="Delete" button-color="red" @button-click="handleDeleteProduct()"/>
    </div>

</template>

<style>

    .card {
        border: solid black 1px;
        border-radius: 5px;
    }

</style>