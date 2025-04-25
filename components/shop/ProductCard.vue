<script setup>

    import { reactive } from 'vue'
    import { callShop } from '../../utils/api/callShopEndpoints.js'
    import Product from '../../models/shop/product.js'

    import CustomButton from '../CustomButton.vue'

    defineProps({
        product: Object, // Type attendu : un objet (peut être adapté selon ton besoin)
    });


</script>

<template>

    <div class="card">
        <div class="card-header">
            <h3>{{ product.id }}</h3>
        </div>
        <div class="card-content">
            <p>{{ product.name }}</p>
        </div>
        <div class="card-footer">
            <small>{{ product.quantity }}</small>
        </div>
    </div>

</template>

<style>



</style>