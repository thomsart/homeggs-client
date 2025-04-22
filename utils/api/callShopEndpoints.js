import { ref, reactive } from 'vue'
import APIRoutes from './APIRoutes.js'
import { useToken } from '../../composables/token.js'
import Product from '../../models/shop/product.js'

const { token } = useToken();

export function callShop() {
    const url = new APIRoutes();
    let response_datas = null;
    let error = '';

    // generic function for API calls
    const fetcher = async ({ endpoint, id, method='GET', params={}, body=null}) => {

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token.value}`,
            };
            if (id) {
                endpoint = `${endpoint}${id}/`;
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
            error = err;
            throw err;
        }
    };

    // So for each different call now:
    const action = async (type, options = {}) => {
        switch (type) {
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'allProducts':
                const allProductResponse = await fetcher({
                    endpoint: url.products,
                });
                response_datas = allProductResponse
                // response_datas = allProductsResponse.map(product => product);
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'postProduct':
                const postProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'POST',
                    body: options.body,
                });
                response_datas = postProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'getProduct':
                const getProductResponse = await fetcher({
                    endpoint: url.products,
                    id: options.id,
                });
                response_datas = getProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'updateProduct':
                const updateProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'PATCH',
                    body: options.body,
                    id: options.id,
                });
                response_datas = updateProductResponse;
                break;
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            case 'deleteProduct':
                const deleteProductResponse = await fetcher({
                    endpoint: url.products,
                    method: 'DELETE',
                    id: options.id,
                });
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
        getDatas: () => response_datas,
        getError: () => error,
        allProducts: () => action('allProducts'),
        postProduct: (body) => action('postProduct', {body}),
        getProduct: (id) => action('getProduct', {id}),
        updateProduct: (id, body) => action('updateProduct', {id, body}),
        deleteProduct: (id) => action('deleteProduct', {id}),
    };
}