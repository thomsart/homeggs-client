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

    createForm() {
        return {
            name: "",
            quantity: 0.0,
            kilo: 0.0,
            litre: 0.0
        }
    };

    toSendInBody() {
        // problem here is this.kilo and this.litre 
        // are supposed to be float
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

    async getProducts() {
        try {
            this.response = await this.call({
                endpoint: this.productsUrl,
            });
            return  this.getResponse();
        } catch(err) {
            console.error("Error in getProducts(): ", err);
            return this.error = { error: err.message };
        } 
    }

    async postProduct(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'POST',
                body: options.body,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in postProduct(): ", err);
            return { error: err.message };
        }
    }

    async getProduct(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in getProduct(): ", err);
            return { error: err.message };
        }
    }

    async updateProduct(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'PATCH',
                body: options.body,
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in updateProduct(): ", err);
            return { error: err.message };
        }
    }

    async deleteProduct(options={}) {
        try {
            await this.call({
                endpoint: this.productsUrl,
                method: 'DELETE',
                id: options.id,
            });
            return this.getResponse();
        } catch(err) {
            console.error("Error in deleteProduct(): ", err);
            return { error: err.message };
        }
    }
}

export default Product;