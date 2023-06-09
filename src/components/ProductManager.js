import {promises as fs} from "fs"

export default class ProductManager {
    constructor (){
        this.path = "../productos.json";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)
        console.log(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
        
    }
    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find ((product) => product.id === id)){
            console.log("El código del producto no existe");
        }else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async({id, ...producto}) => {
        await this.deleteProductById(id);
        let productoAnterior = await this.readProducts();
        let modificacionProd = [{...producto, id}, ...productoAnterior];
        await fs.writeFile(this.path, JSON.stringify(modificacionProd));
        
    };
}