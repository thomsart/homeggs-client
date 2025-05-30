import { useToken } from '../composables/token.js'

const { token } = useToken();


class ApiEndpointsFetcher  {
    constructor() {
        this.apiRootUrl = 'http://127.0.0.1:8000/';
        ///////////////////////////////////////////////////////////////////////
        this.accountUrl = this.apiRootUrl + 'account/';

        this.loginUrl = this.accountUrl + 'token/login/'; // method 'POST', data {"email": "", "password": ""} => {"auth_token": "jhewbf67gi4wu"}
        this.meUrl = this.accountUrl + 'users/me/'; // method 'GET', -H 'Authorization: Token jhewbf67gi4wu'
        this.logoutUrl = this.accountUrl + 'token/logout/';
        ///////////////////////////////////////////////////////////////////////
        this.budgetUrl = this.apiRootUrl + 'budget/';

        this.companiesUrl = this.budgetUrl + 'companies/';
        this.exceptionalExpensesUrl = this.budgetUrl + 'exceptional-expenses/';
        this.extrasUrl = this.budgetUrl + 'extras/';
        this.feeOrExpensesUrl = this.budgetUrl + 'fee-or-expenses/';
        this.salariesUrl = this.budgetUrl + 'salaries/';
        this.savingsUrl = this.budgetUrl + 'savings/';
        this.taxesUrl = this.budgetUrl + 'taxes/';
        ///////////////////////////////////////////////////////////////////////
        this.shopUrl = this.apiRootUrl + 'shop/';

        this.coastsUrl = this.shopUrl + 'coasts/';
        this.productsUrl = this.shopUrl + 'products/';
        this.shopsUrl = this.shopUrl + 'shops/';
        ///////////////////////////////////////////////////////////////////////



        ///////////////////////////////////////////////////////////////////////
        this.response = null;
        this.error = null;
    }

    // general method for API calls
    async call({ endpoint, requiresAuth=true, id, method='GET', params={}, body=null}) {    
        this.response = null;
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            let url = new URL(endpoint);
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
            if (requiresAuth) {
                headers['Authorization'] = `Token ${token.value}`;
            }
            if (id) {
                endpoint = `${endpoint}${id}/`;
            };
            this.response = await fetch(endpoint, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });
            if (!this.response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            if (method==='DELETE' & this.response.ok | this.response.status === 204) {
                return this.response;
            }
            return this.response.json();
        } catch (err) {
            this.error = err;
            throw err;
        }
    }
}

export default ApiEndpointsFetcher;

