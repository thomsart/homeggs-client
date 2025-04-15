import { ref, reactive } from 'vue'
import APIRoutes from './APIRoutes.js'
import { useToken } from '../../compoables/token.js'

const url = new APIRoutes();
const { token } = useToken();

export function callAccount() {
    const datas = reactive({}); // reactive datas
    const error = ref(null);

    // generic function for API calls
    const fetcher = async ({ endpoint, method='GET', body=null, requiresAuth=true }) => {

        error.value = null; // reinitialize errors before each calls
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if (requiresAuth) {
                headers['Authorization'] = `Token ${token.value}`;
            }
            const response = await fetch(endpoint, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            if (response.status === 204) {
                return
            }
            return await response.json();
        } catch (err) {
            error.value = err;
            throw err;
        }
    };

    // So for each differents calls now:
    const action = async (type, options = {}) => {
        switch (type) {
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'login':
                const loginResponse = await fetcher({
                    endpoint: url.login,
                    method: 'POST',
                    body: options.body,
                    requiresAuth: false, // of course no token to provide for login
                });
                datas.value = loginResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'me':
                const meResponse = await fetcher({
                    endpoint: url.me;
                    method: 'GET';
                });
                datas.value = Object.assign({}, meResponse);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            
            default:
                throw new Error(`Unknow action type: ${type}`);
        }
    };

    return {
        datas,
        error,
        login: (email, password) => action('login', { body: {email, password} }),
        me: () => action('me'),
    };
}