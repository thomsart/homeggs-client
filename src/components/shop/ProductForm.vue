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

        <div id="product-inputs" v-for="(value, key) in newProduct.createForm()" :key="key">
            <input :id="key" :name="key" v-model="newProduct[key]"  :placeholder="key" :type="typeof value === 'number' ? 'number' : 'text'"/>
        </div>
        <CustomButton id="button-validation" buttonText="ajoute"/>

    </form>


</template>

<style lang="scss">

    #product-inputs {
        display: flex;
        flex-direction: column;
    }

    #button-validation {
        width: 100%;
    }

</style>