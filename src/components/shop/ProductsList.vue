<script setup>

    import { ref, reactive, onMounted, computed, watch } from 'vue'
    import Product from '../../models/shop/product.js'

    import CustomButton from '../CustomButton.vue'
    import ProductForm from './ProductForm.vue'
    import ProductCard from './ProductCard.vue'

    const displayedProducts = reactive([]);
    const missedProducts = computed(() => displayedProducts.filter(product => product.missing === true)); // Filter products in order to only display missing products.
    const availableProducts = computed(() => displayedProducts.filter(product => product.missing === false)); // Filter products in order to only display available products.
    const isModalSelectedProductOpen = ref(false); // modale for selected product
    const isModalAvailableProductsOpen = ref(false); // modale for available product
    const isModalProductFormOpen = ref(false); // modale for product form
    const isLongPress = ref(false); // notice if a long press was detected
    let startTimer = null; // stock the timer for long press
    let isPressing = false; // notice if the user is pressing the button
    let clickedProduct = {}; // We store the clicked product for the child component ProductCard

    onMounted(async () => {
        await loadProducts();
    });

    async function loadProducts() {
        try {
            const products = new Product();
            const fetchedProducts = await products.getAll();
            // console.log("In loadProducts(), fetchedProducts: " + JSON.stringify(fetchedProducts.datas));
            displayedProducts.splice(0, displayedProducts.length, ...fetchedProducts.datas.map(product => new Product(product)));
        } catch (error) {
            console.error("Error in loadProducts(): ", error);
        }
    }

    async function handleAddDelToList(selectedProduct) {
        try {
            const product = new Product();
            await product.update({id: selectedProduct.id, body: {missing: !selectedProduct.missing}});
            await loadProducts(); // Refresh products after updating
        } catch (error) {
            console.error(`Error in handleAddDelToList(): ${selectedProduct.name} :`, error);
        }
    }

    // this watch is used to close the modal-available-products-list directly when its empty for use's confort
    watch(availableProducts, 
        (currentValue) => {
            if (currentValue.length < 1) {
                isModalAvailableProductsOpen.value = false;
            }
        },
        { immediate: true }
    );

    const handleMouseDown = (selectedProduct) => {
        isPressing = true;
        startTimer = setTimeout(() => {
            isLongPress.value = true; // notice long press
            isModalSelectedProductOpen.value = true; // to keep open the modale
            // console.log("product dans MouseDown", product);
            Object.assign(clickedProduct, selectedProduct);
            // console.log("clickedProduct dans MouseDown", clickedProduct);
            // console.log('Cliiiiick!');
        }, 1000); // 1 seconde
    };

    const handleMouseUp = (selectedProduct) => {
        isPressing = false;
        clearTimeout(startTimer); // cancel the timer if the user drop the click before 1 sec
        if (!isLongPress.value) {
            // console.log('Click!');
            handleAddDelToList(selectedProduct); // Here and only here we decide to take off from list the missed Product
        }
        isLongPress.value = false;
    };
    // canceled the short click only if clickdown is detected
    const handleMouseLeave = () => {
        if (isPressing) {
            clearTimeout(startTimer);
            isLongPress.value = false;
        }
    };

</script>

<template>

    <h2>Shopping List</h2>

    <h3 v-if="displayedProducts.length !== 0">A acheter: </h3>
    <h3 v-else>Fais ta liste de course</h3>

    <div id="shopList">
        <custom-button v-for="product in missedProducts" class="product-button" :buttonText="product.name" buttonColor="blueviolet"
            @mousedown="handleMouseDown(product)" 
            @mouseup="handleMouseUp(product)" 
            @mouseleave="handleMouseLeave()"/>
        <div  v-if="isModalSelectedProductOpen" class="modal-overlay">
            <custom-button id="button-close-modal" buttonText="<" button-color="blue" @button-click="isModalSelectedProductOpen = false"/>
            <product-card :product="clickedProduct" :is-open="isModalSelectedProductOpen" @close-modal="isModalSelectedProductOpen = false & loadProducts()"/>
        </div>
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

    <div v-if="isModalProductFormOpen" class="modal-overlay">
      <div id="modal-create-product-form">
        <custom-button id="button-close-modal" buttonText="<" button-color="blue" @button-click="isModalProductFormOpen = false"/>
        <product-form :is-open="isModalProductFormOpen" @close-modal="isModalProductFormOpen = false & loadProducts()"/>
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