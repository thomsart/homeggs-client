class Product  {
    constructor() {
        this.id = 0;
        this.name = "";
        this.quantity = 0.0;
        this.kilo = 0.0;
        this.litre = 0.0;
        this.supply = null;
        this.frequency = 0;
        this.missing = false;
        this.url = "";
        this.photo = null;
    }

    formFields() {
        return {
            name: "",
            quantity: 0.0,
            kilo: 0.0,
            litre: 0.0
        }
    };

    createProduct() {
        return JSON.stringify({
            name: this.name,
            quantity: this.quantity,
            kilo: this.kilo,
            litre: this.litre
        })
    };
}

export default Product;