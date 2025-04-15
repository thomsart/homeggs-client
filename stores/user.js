// stores.user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: ull,
            email: '',
            firstName: '',
            lastName: '',
            phone: ''
        },
    }),
    getters: {
        id: (state) => state.user.id,
        email: (state) => state.user.email,
        firtsNname: (state) => state.user.firstName,
        lastName: (state) => state.user.lastName,
        phone: (state) => state.user.phone,
    },
    actions: {
        setUser(newUserData) {
            this.user.id = newUserData.id || null;
            this.user.email = newUserData.email || '';
            this.user.firstName = newUserData.firstName || '';
            this.user.lastName = newUserData.lastName || '';
            this.user.phone = newUserData.phone || '';
        },
        clearUser() {
            this.user = {
                id: null,
                email: '',
                firstName: '',
                lastName: '',
                phone: ''
            };
        },
    },
});