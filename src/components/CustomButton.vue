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

    <button class="custom-button" type="submit" @click="handleClick"><p>{{ buttonText }}</p></button>

</template>

<style lang="scss">

    .custom-button {
        // border-color: $strong-purple;
        border-width: 1px;
        color: white;
        margin: 5px;
        border-radius: 5px;
        height: 25px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .custom-button:hover {
        filter: brightness(70%);
    }
    .custom-button p {
        margin: 0;  /* Enlève les marges du <p> */
        padding: 0; /* Enlève les paddings du <p> */
        line-height: 1;  /* Contrôle l'espacement vertical des lignes */
    }

</style>