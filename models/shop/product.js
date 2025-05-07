import ApiEndpointsFetcher from '../ApiEndpointsFetcher'


class Product extends ApiEndpointsFetcher {
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

    createForm() {
        return {
            name: this.name,
            quantity: this.quantity,
            kilo: this.kilo,
            litre: this.litre
        }
    };

    getResponse() {
        return {
            datas: this.response,
            error: this.error
        }
    }

    async getAll() {
        try {
            this.response = await this.call({
                endpoint: this.productsUrl,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in Product.getAll(): ", err);
            return this.error = { error: err.message };
        } 
    }

    async post(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'POST',
                body: options.body,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in Product.post(): ", err);
            return { error: err.message };
        }
    }

    async get(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in Product.get(): ", err);
            return { error: err.message };
        }
    }

    async update(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'PATCH',
                body: options.body,
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in Product.update(): ", err);
            return { error: err.message };
        }
    }

    async delete(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'DELETE',
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in Product.delete(): ", err);
            return { error: err.message };
        }
    }
}

export default Product;