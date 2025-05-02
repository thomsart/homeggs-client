class Product  {
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
}

export default Product;