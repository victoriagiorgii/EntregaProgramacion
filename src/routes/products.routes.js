import { Router } from "express";
import {productsService} from "../percistencia/index.js"
import { ProductsManagerFiles } from "../percistencia/filesManager/productsManagerFiles.js";


const router = Router();
//http://localhost:8080/api/products
const products = new ProductsManagerFiles();
const getProducts= products.getProducts();

router.get("/api/products",async  (req, res) => {
    let product = parseInt(req.query.limit);
    if(!product) return res.json(getProducts)
    let allProducts = await getProducts
    let products = allProducts.slice(0, limit)
    res.json(products);
    //res.json({mensaje:"listado productos"});
});

router.post("/", async (req,res)=>{
    try{
    const productInfo = req.body;
    }catch (error){
     res.json({status:"error",mensaje:error.mensaje});
    }
 });
 

router.get("/:pid",async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductsById(productId);
        res.json({mensaje:"finaliza para obtener el producto", data:product});
    } catch (error) {
        res.json({status:"error",mensaje:error.mensaje});
    }
});


export { router as productsRouter};
