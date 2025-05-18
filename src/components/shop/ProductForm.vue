<script setup>

    import { reactive } from 'vue'
    import Product from '../../models/shop/product.js'

    import CustomButton from '../CustomButton.vue'

    const newProduct = reactive(new Product());
    const emit = defineEmits(['close-modal']);

    const handlePostProduct = async () => {
        try {
            const product = new Product();
            await product.post({body: newProduct.createForm()});
            emit('close-modal');
        } catch (error) {
            console.error(`Error in handlePostProduct() with ${newProduct.name}: `, error);
        }
    };

</script>

<template>

    <form id="product-form" @submit.prevent="handlePostProduct()">
        <input v-for="(value, key) in newProduct.createForm()" :key="key" :id="key" :name="key" v-model="newProduct[key]" 
            :placeholder="key" :type="typeof value === 'number' ? 'number' : 'text'"/>
        <CustomButton id="custom-button-product-validation" buttonText="ajoute"/>
    </form>

</template>

<style lang="scss" scoped>

    #product-form {
        border-radius: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .space {
            width: 100%;
            height: 0.5em;
        }

        input, #custom-button-product-validation {
            width: 90%;
            height: 2em;
            margin-top: 0.5em;
        }

        #custom-button-product-validation {
            margin-bottom: 0.5em;
            background-color: $color-BLUE;
        }
    }
    

    

</style>