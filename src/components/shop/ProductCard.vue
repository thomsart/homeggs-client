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


    <form>
        <div class="card-header">
            <input v-model="productAttributesToUpdate['name']" type="text" :placeholder="product.name" required minlength="2" maxlength="50" size="10">
        </div>
        <div class="card-content">
            <input v-model="productAttributesToUpdate['quantity']"  type="text" :placeholder="product.quantity">
        </div>
        <div class="card-content">
            <input v-model="productAttributesToUpdate['kilo']"  type="text" :placeholder="product.kilo">
        </div>
        <div class="card-content">
            <input v-model="productAttributesToUpdate['litre']"  type="text" :placeholder="product.litre">
        </div>
        <div class="card-footer">
            <small>Produit cree le : {{ product.supply }}</small>
            <small>Id : {{ product.id }}</small>
        </div>
        <CustomButton id="custom-button-update-product" buttonText="Modifier" @button-click="handleUpdateProduct(product)" />
        <CustomButton id="custom-button-delete-product" buttonText="Supprimer" @button-click="handleDeleteProduct(product)" />
    </form>


</template>

<style lang="scss">

    form {
        border: solid black 1px;
        border-radius: 5px;
    }
    #custom-button-update-product {
        background-color: $color-BROWN;
    }
    #custom-button-delete-product {
        background-color: $color-RED;
    }

</style>