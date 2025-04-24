<script setup>

    import { ref, reactive, onMounted, computed, watch } from 'vue'
    import { callShop } from '../utils/api/callShopEndpoints.js'
    import Product from '../models/shop/product.js'

    import CustomButton from './CustomButton.vue'
    import ProductForm from './ProductForm.vue'

    const products = reactive([]);
    // Filter products in order to only display missing products.
    const missedProducts = computed(() => products.filter(product => product.missing === true));
    const availableProducts = computed(() => products.filter(product => product.missing === false));
    const isModalAvailableProductsOpen = ref(false); // modale for available product
    const isModalProductFormOpen = ref(false);

    onMounted(async () => {
        await loadProducts();
    });

    async function loadProducts() {
        try {
            const callProducts = callShop();
            await callProducts.allProducts();
            const fetchedProducts = callProducts.getDatas();
            // console.log("loadProducts() =>  fetchedProducts: " + JSON.stringify(fetchedProducts));
            products.splice(0, products.length, ...fetchedProducts.map(product => new Product(product)));
            // products.forEach(product =>{console.log(product);})
        } catch (error) {
            console.error("Erreur lors de la récupération des produits dans loadProducts() => :", error);
        }
        // console.log("loadProducts() => reactive products: ", JSON.stringify(products));
    }

    async function handleAddDelToList(product) {
        try {
            const callProducts = callShop();
            await callProducts.updateProduct(product.id, { missing: !product.missing });
            // if (product.missing === true) {
            //     console.log(`handleAddDelToList => ${product.name} retiré de la liste.`);
            // } else {
            //     console.log(`handleAddDelToList => ${product.name} mis dans la liste.`);
            // }
            await loadProducts(); // Refresh products after updating
        } catch (error) {
            console.error(`handleAddDelToList => Erreur lors du retrait du produit ${product.name} :`, error);
        }
    }

    // this watch is used to close the modal-available-products-list directly when its empty for use's confort
    watch(availableProducts, 
        (currentValue) => {
            if (currentValue.length < 1) {
                // console.log("watch(availableProducts) No available products anymore...");
                isModalAvailableProductsOpen.value = false;
            }
        },
        { immediate: true }
    );

    const handleProductFormModal = async () => {
        isModalProductFormOpen.value = false; // To close modal-create-product-form
        await loadProducts();
    };

    async function handleDeleteProduct(productId) {

    }





</script>

<template>

    <h2>Shopping List</h2>

    <h3 v-if="products.length !== 0">A acheter: </h3>
    <h3 v-else>Fais ta liste de course</h3>

    <div id="shopList">
        <custom-button v-for="product in missedProducts" :buttonText="product.name" buttonColor="blueviolet" 
            @button-click="handleAddDelToList(product)"/>
        <div v-if="availableProducts.length > 0">
            <custom-button buttonText="+" button-color="blue" @button-click="isModalAvailableProductsOpen = true"/>
        </div>
        <div v-if="isModalAvailableProductsOpen" class="modal-overlay">
            <custom-button id="button-close-modal" buttonText="<" button-color="blue" 
                @button-click="isModalAvailableProductsOpen = false"/>
            <div id="modal-available-products-list">
                <custom-button v-for="product in availableProducts" :buttonText="product.name" buttonColor="blueviolet" 
                    @button-click="handleAddDelToList(product)"/>
            </div>
        </div>
    </div>

    <custom-button buttonText="Create product" button-color="blue" @button-click="isModalProductFormOpen = true"/>
    <custom-button buttonText="Delete product" button-color="red" @button-click="handleDeleteProduct(name)"/>

    <div v-if="isModalProductFormOpen" class="modal-overlay">
      <div id="modal-create-product-form">
        <custom-button id="button-close-modal" buttonText="<" button-color="blue" @button-click="isModalProductFormOpen = false"/>
        <product-form :is-open="isModalProductFormOpen" @close-modal="handleProductFormModal"/>
      </div>
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
    .modal-overlay {
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
    #modal-available-products-list {
        position: relative;
        background-color: white;
        display: flex;
        flex-direction: column;
        width: 30%;
        height: 30%;
        border: solid 3px;
        border-color: rgb(0, 0, 0);
        border-radius: 1em;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    #modal-create-product-form {
        position: relative;
        background-color: white;
        width: 30%;
        height: 30%;
        border: solid 3px;
        border-color: rgb(0, 0, 0);
        border-radius: 0.5em;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    #button-close-modal {
        margin-top: 5px;
        margin-right: 5px;
    }

</style>