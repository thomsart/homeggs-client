<script setup>

    import { reactive } from 'vue'
    import { callShop } from '../../utils/api/callShopEndpoints.js'
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

    const handleUpdateProduct = async (product) => {
        if (!product || !product.id) {
            console.error("Le produit n'est pas défini ou n'a pas d'ID.");
            return;
        }
        try {
            const callProducts = callShop();
            await callProducts.updateProduct(product.id, productAttributesToUpdate);
            // console.log("handleUpdateProduct => product updated: ", productAttributesToUpdate);
            emit('close-modal');
        } catch(error) {
            console.log(`handleUpdateProduct => Erreur lors de la modification du produit ${product.name} :`, error)
        }
    }

    const handleDeleteProduct = async (product) => {
        if (!product || !product.id) {
            console.error("Le produit n'est pas défini ou n'a pas d'ID.");
            return;
        }
        try {
            const callProducts = callShop();
            await callProducts.deleteProduct(product.id);
            // console.log("handleDeleteProduct => product deleted");
            emit('close-modal');
        } catch(error) {
            console.log(`handleDeleteProduct => Erreur lors de la suppression du produit ${product.name} :`, error)
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
        <custom-button buttonText="Modifier" button-color="brown" @button-click="handleUpdateProduct(product)"/>
        <custom-button buttonText="Supprimer" button-color="red" @button-click="handleDeleteProduct(product)"/>
    </form>


</template>

<style>

    form {
        border: solid black 1px;
        border-radius: 5px;
    }

</style>