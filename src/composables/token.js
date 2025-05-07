// composables.token.js
import { ref, watch } from 'vue'

const token = ref(localStorage.getItem('auth_token')); // initialization from localStorage

export const useToken = (newToken) => {

    const setToken = (newToken) => {
        token.value = newToken; // reactive update
        localStorage.setItem('auth_token', newToken); //synchronisation with the localStorage
    };

    const getToken = () => token.value; // direct access to the ref value

    const clearToken = () => {
        token.value = null; // reactive reinitialisation
        localStorage.removeItem('auth_token'); // cleaning of the storage
    };

    // monitoring of the 'ref' to update the localstorage
    watch(token, (newValue) => {
        if (newValue === null) {
            localStorage.removeItem('auth_token');
        } else {
            localStorage.setItem('auth_token', newValue);
        }
    });

    return { token, setToken, getToken, clearToken };
};