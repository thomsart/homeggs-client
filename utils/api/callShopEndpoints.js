import { ref, reactive } from 'vue'
import APIRoutes from './APIRoutes.js'
import { useToken } from '../../composables/token.js'

const { token } = useToken();

export function callShop() {
    const url = new APIRoutes();
    const datas = reactive({}); // reactive datas
    const error = ref(null);

    // generic function for API calls
    const fetcher = async ({ endpoint, method='GET', headers={}, params={}, body=null}) => {

        error.value = null; // reinitialize errors before each calls
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token.value}`,
            };
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
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

    // So for each different call now:
    const action = async (type, options = {}) => {
        switch (type) {
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'allProducts':
                const allProductsResponse = await fetcher({
                    endpoint: url.products,
                });
                Object.assign(datas, allProductsResponse);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'addProduct':
                const addProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'POST',
                    body: options.body,
                });
                Object.assign(datas, addProductResponse);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'getProduct':
                const getProductResponse = await fetcher({
                    endpoint: url.products,
                });
                Object.assign(datas, getProductResponse);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'updateProduct':
                const updateProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'PATCH',
                    body: options.body,
                });
                Object.assign(datas, updateProductResponse);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'deleteProduct':
                const deleteProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'DELETE',
                });
                Object.assign(datas, deleteProductResponse);
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
        allProducts: () => action('allProducts'),
        addProduct: (body) => action('addProduct', {body}),
        getProduct: (id) => action('getProduct', {id}),
        updateProduct: (id, body) => action('updateProduct', {id, body}),
        deleteProduct: (id) => action('deleteProduct', {id}),
    };
}