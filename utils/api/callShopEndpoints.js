import { ref, reactive } from 'vue'
import APIRoutes from './APIRoutes.js'
import { useToken } from '../../composables/token.js'

const url = new APIRoutes();
const { token } = useToken();

export function callShop() {
    const datas = reactive({}); // reactive datas
    const error = ref(null);

    // generic function for API calls
    const fetcher = async ({ endpoint, id=null, method='GET', body=null}) => {

        error.value = null; // reinitialize errors before each calls
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token.value}`,
            };
            if (id) {
                endpoint = endpoint + id;
            }
            const response = await fetch(endpoint, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
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
            case 'allProducts':
                const allProductsResponse = await fetcher({
                    endpoint: url.products,
                    body: options.body,
                });
                datas.value = allProductsResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'addProduct':
                const addProductResponse = await fetcher({
                    endpoint: url.products,
                    body: options.body,
                });
                datas.value = addProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'getProduct':
                const getProductResponse = await fetcher({
                    endpoint: url.products,
                    body: options.body,
                });
                datas.value = getProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'updateProduct':
                const updateProductResponse = await fetcher({
                    endpoint: url.products,
                    body: options.body,
                });
                datas.value = updateProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'deleteProduct':
                const deleteProductResponse = await fetcher({
                    endpoint: url.products,
                    body: options.body,
                });
                datas.value = deleteProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            
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
        products: () => action('products'),
        me: () => action('me'),
    };
}