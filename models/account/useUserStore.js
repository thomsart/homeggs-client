// idee d'encapsulation
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

import Api from '../apiCalls.js'



class User extends Api {
    constructor({id = null,
                firstName = '',
                lastName = '',
                email = '',
                phone = ''
            } = {}) {
        super(); // Api constructor
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    updateDetails({id, first_name, last_name, email, phone}) {
        if (id) this.id = id;
        if (first_name) this.firstName = first_name;
        if (last_name) this.lastName = last_name;
        if (email) this.email = email;
        if (phone) this.phone = phone;
    }

    toSendInBody() {
        return {
            email: this.email,
            password: this.password,
        }
    };

    getResponse() {
        return {
            datas: this.response,
            error: this.error
        }
    }
}

// Ici, on encapsule l'état d'une instance User dans un store Pinia
export const useUserStore = defineStore('user', () => {

    const state = reactive(new User());

    async function login(options={}) {
        try {
            state.response = await state.call({
                endpoint: state.loginUrl,
                method: 'POST',
                body: options.body, // values to send are {email: '', password: ''}
                requiresAuth: false, // of course no token for login
            });
            return state.getResponse();
        } catch(err) {
            console.error("Error in login(): ", err);
            return state.error = { error: err.message };
        }
    }

    async function logout() {
        try {
            state.response = await state.call({
                endpoint: state.logoutUrl,
                method: 'POST',
            });
            return state.getResponse();
        } catch(err) {
            console.error("Error in logout(): ", err);
            return state.error = { error: err.message };
        }
    }

    async function get() {
        try {
            state.response = await state.call({
                endpoint: state.meUrl,
                method: 'GET',
            });
            state.updateDetails(Object.assign({}, state.response)); // new User(state.response); // Object.assign({}, state.response) Met à jour l'utilisateur via le modèle
        } catch(err) {
            state.error = err;
            console.error("Error in get(): " , err);
        }
    }

    function update(details) {
        state.user.updateDetails(details); // Appelle la méthode de la classe
    }

    async function save() {
        try {
            const response = await fetch(`http://api.example.com/users/${state.user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.user.toJSON()),
            });
            const data = await response.json();
            state.user = new User(data); // Met à jour après sauvegarde
        } catch(err) {
            state.error = err;
            console.error('Error saving user:', err);
        }
    }

    async function clear() {

    }

    // Getters
    const id = computed(() => state.id);
    const firstName = computed(() => state.firstName);
    const lastName = computed(() => state.lastName);
    const email = computed(() => state.email);
    const phone = computed(() => state.phone);

    return {
        state,
        login,
        logout,
        get,
        update,
        save,
        clear,
        id,
        firstName,
        lastName,
        email,
        phone
    };
});
