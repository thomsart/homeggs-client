<script setup>

    // we declare props 'buttonText' to set the text of the button
    defineProps({
        buttonText: {
            Type: String,
            required: true,
        },
        buttonColor: {
            type: String,
            default: "#A9EAFE", // default color if no provided
        }
    });

    // to emit an event when clicking on it
    const emit = defineEmits(['button-click']);

    function handleClick() {
        emit('button-click'); // emit the event to the parent
    }

</script>

<template>

    <button type="button" :style="{'--button-bg': buttonColor}" @click="handleClick" class="custom-button">{{ buttonText }}</button>

</template>

<style scoped>

    .custom-button {
        background-color: var(--button-bg); /* we use the css variable */
        border-color: black;
        border-width: 1px;
        color: white;
        padding: auto;
        margin: 1px;
        border-radius: 5px;
        height: 25px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .custom-button:hover {
        filter: brightness(70%);
    }

</style>