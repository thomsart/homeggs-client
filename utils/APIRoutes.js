

class APIRoute {
    constructor() {
        this.apiRoot = 'http://127.0.0.1:8000/';

        this.account = this.apiRoot + 'account/';
        this.login = this.account + 'token/login/'; // method 'POST', data {"email": "", "password": ""} => {"auth_token": "jhewbf67gi4wu"}
        this.me = this.account + 'users/me/'; // method 'GET', -H 'Authorization: Token jhewbf67gi4wu'
        this.logout = this.account + 'token/logout/';

        this.budget = this.apiRoot + 'budget/';
        this.companies = this.budget + 'companies/';
        this.exceptionalExpenses = this.budget + 'exceptional-expenses/';
        this.extra = this.budget + 'extras/';
        this.feeOrExpenses = this.budget + 'fee-or-expenses/';
        this.salaries = this.budget + 'salaries/';
        this.savings = this.budget + 'savings';
        this.taxes = this.budget + 'taxes/';
    }
}

export default APIRoute;