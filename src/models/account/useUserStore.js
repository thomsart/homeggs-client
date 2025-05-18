// idee d'encapsulation
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

import ApiEndpointsFetcher from '../ApiEndpointsFetcher.js'



class User extends ApiEndpointsFetcher {
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

    reset() {
        this.id = null;
        this.lastName = '';
        this.email = '';
        this.phone = '';
    }

    updateDetails({id, first_name, last_name, email, phone}) {
        if (id) this.id = id;
        if (first_name) this.firstName = first_name;
        if (last_name) this.lastName = last_name;
        if (email) this.email = email;
        if (phone) this.phone = phone;
    }

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
            console.error("Error in User.login(): ", err);
            return state.error = { error: err.message };
        }
    }

    async function logout() {
        try {
            state.response = await state.call({
                endpoint: state.logoutUrl,
                method: 'POST',
            });
            return state.reset();
        } catch(err) {
            console.error("Error in User.logout(): ", err);
            return state.error = { error: err.message };
        }
    }

    async function get() {
        try {
            state.response = await state.call({
                endpoint: state.meUrl,
                method: 'GET',
            });
            state.updateDetails(Object.assign({}, state.response));
        } catch(err) {
            state.error = err;
            console.error("Error in User.get(): " , err);
        }
    }

    async function update(options={}) {
        try {
            state.response = await state.call({
                endpoint: state.meUrl,
                method: 'PATCH',
                body: options.body,
            })
            get();
        } catch(err) {
            state.error = err;
            console.error("Error in User.update(): " , err);
        }
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
        id,
        firstName,
        lastName,
        email,
        phone
    };
});
