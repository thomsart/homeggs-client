import Api from '../apiCalls'



class Product extends Api {
    constructor({id=0, 
                name="", 
                quantity=0, 
                kilo=0.0, 
                litre=0.0, 
                supply="", 
                frequency=0, 
                missing=false, 
                url="", 
                photo=""} = {}) {
        super(); // Api constructor
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.kilo = kilo;
        this.litre = litre;
        this.supply = supply;
        this.frequency = frequency;
        this.missing = missing;
        this.url = url;
        this.photo = photo;
    }

    formFields() {
        return {
            name: "",
            quantity: 0.0,
            kilo: 0.0,
            litre: 0.0
        }
    };

    toSendInBody() {
        // problem here is this.kilo and this.litre which are supposed to be float
        return {
            name: this.name,
            quantity: this.quantity,
            kilo: this.kilo,
            litre: this.litre
        }
    };

    async getProducts() {
        await this.call({
            endpoint: this.productsUrl,
        });
        return this.response;
    }

    async postProduct(options = {}) {
        await this.call({
            endpoint: this.productsUrl,
            method: 'POST',
            body: options.body,
        });
        return this.response;
    }

    async getProduct(options = {}) {
        await this.call({
            endpoint: this.productsUrl,
            id: options.id,
        });
        return this.response;
    }

    async updateProduct(options = {}) {
        await this.call({
            endpoint: this.productsUrl,
            method: 'PATCH',
            body: options.body,
            id: options.id,
        });
        return this.response;
    }

    async deleteProduct(options = {}) {
        await this.call({
            endpoint: this.productsUrl,
            method: 'DELETE',
            id: options.id,
        });
        return this.response;
    }

}

export default Product;