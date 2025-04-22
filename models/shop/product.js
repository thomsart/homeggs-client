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

    createProduct() {
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



// Madame, Monsieur,

// Par la présente, je souhaite exprimer mon profond désir de devenir citoyen(ne) français(e) et 
// ainsi officialiser un attachement qui dépasse la simple résidence en France. Ce projet n’est pas 
// une démarche administrative ordinaire pour moi, mais une véritable aspiration, un engagement 
// envers un pays que j’aime et qui m’a offert de belles opportunités.

// Je vis en France depuis [année précise, ex. : janvier 2015], et depuis ces années, j’ai eu l’immense 
// privilège de m’intégrer pleinement à la société française. En [année], j’ai épousé [nom du conjoint], 
// un(e) citoyen(ne) français(e), avec qui je partage des valeurs de respect, de solidarité et d’amour.
// De notre union est née une petite fille, [prénom], aujourd’hui âgée de 3 ans. Notre famille, enracinée 
// en France, partage au quotidien les traditions, la culture et les valeurs de ce pays.

// Ce pays est bien plus pour moi qu’un lieu où je vis. Il est celui où j’ai grandi intérieurement, appris, 
// et contribué, tant dans ma vie personnelle que professionnelle. J’ai toujours fait preuve de respect 
// pour les institutions françaises, je maîtrise avec aisance la langue, et j’ai développé un réel attachement 
// aux principes républicains de liberté, égalité et fraternité. Ces principes m’inspirent et correspondent à 
// ma vision d’une société juste et inclusive.

// Devenir français(e) représenterait pour moi un véritable accomplissement. Ce choix est mûrement réfléchi 
// et motivé par un profond sentiment d’appartenance. Je souhaite pouvoir, en tant que citoyen(ne), participer 
// activement à la vie démocratique et apporter ma contribution au pays qui a déjà tant enrichi ma vie.

// Je me tiens bien sûr à votre disposition pour tout complément d’information ou entretien qui pourrait être 
// nécessaire dans le cadre de cette démarche.

// Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, l’expression de ma considération distinguée.

// [Chen Cottenceau]
