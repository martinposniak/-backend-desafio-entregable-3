import express from 'express';
import ProductManager from './components/ProductManager.js';

const app = express();
app.use(express.urlencoded({extended:true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/products", async (request, response) => {
    let limit = parseInt(request.query.limit);
    
    if(!limit) return response.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    response.send(productLimit);
});

app.get('/products/:id', async (request, response) => {
    let id = parseInt(request.params.id);
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    response.send(productById);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("Localhost 8080 up");
})
server.on("error", (error) => {
    console.log(`Error al levantar el servidor ${error}`);
})