<script setup>

    import { reactive } from 'vue'
    import Product from '../../models/shop/product.js'

    import CustomButton from '../CustomButton.vue'

    // data of type object expected
    defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const productAttributesToUpdate = reactive({});
    const emit = defineEmits(['close-modal']); // to use if the response is ok

    const handleUpdateProduct = async (propsProduct) => {
        if (!propsProduct || !propsProduct.id) {
            return console.error("Error in handleUpdateProduct() with ID.");
        }
        try {
            const product = new Product();
            await product.update({id: propsProduct.id, body: productAttributesToUpdate});
            emit('close-modal');
        } catch(error) {
            console.log(`Error in handleUpdateProduct with ${selectedProduct.name}: `, error)
        }
    }

    const handleDeleteProduct = async (propsProduct) => {
        if (!propsProduct || !propsProduct.id) {
            return console.error("Error in handleDeleteProduct() with ID.");
        }
        try {
            const product = new Product();
            await product.delete({id: propsProduct.id});
            emit('close-modal');
        } catch(error) {
            console.log(`Error in handleDeleteProduct() with ${propsProduct.name}: `, error)
        }
    }


</script>

<template>

    <form id="product-card">
        <label for="name">nom du produit:</label>
        <input v-model="productAttributesToUpdate['name']" type="text" name="name" :placeholder="product.name" required minlength="2" maxlength="50" size="10">
        <label for="quantity">quantité:</label>
        <input v-model="productAttributesToUpdate['quantity']" type="text" name="quantity" :placeholder="product.quantity">
        <label for="kilo">kilo:</label>
        <input v-model="productAttributesToUpdate['kilo']" type="text" name="kilo" :placeholder="product.kilo">
        <label for="litre">litre:</label>
        <input v-model="productAttributesToUpdate['litre']"  type="text" name="litre" :placeholder="product.litre">
        <CustomButton id="custom-button-update-product" buttonText="modifier" @button-click="handleUpdateProduct(product)" />
        <CustomButton id="custom-button-delete-product" buttonText="supprimer" @button-click="handleDeleteProduct(product)" />
    </form>

</template>

<style lang="scss" scoped>

    #product-card {
        border-radius: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        input, #custom-button-update-product, #custom-button-delete-product {
            width: 90%;
            height: 2em;
            margin-top: 0.5em;
        }

        #custom-button-update-product {
            background-color: $color-BROWN;
        }
        #custom-button-delete-product {
            background-color: $color-RED;
        }
    }

</style>