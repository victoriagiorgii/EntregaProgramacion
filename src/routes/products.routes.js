import { Router } from "express";
import {productsService} from "../percistencia/index.js"


const router = Router();

router.get("/",async  (req, res) => {
    try{
       let limit = parseInt(req.query.limit);
       let allProducts = await productsService.getProducts();
       if(!limit) 
       return res.json(allProducts);
       else{
       let products = allProducts.slice(0, limit)
       res.json(products);
       }
    }catch(error){
        res.status(400).json({error:true,mensaje:error});
    }
});

router.post("/", async (req,res)=>{

   try{
    let productInfo = (req.body);
    let products= await productsService.createProduct(productInfo);
    if(!products)
     return res.json ({mensaje:"producto agregado"});
    }catch (error){
     res.json({status:"error",mensaje:error.mensaje});
    }
 });
 

router.get("/:pid",async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductsById(productId);
        res.json(product);
    } catch (error) {
        res.json({status:"error",mensaje:error.mensaje});
    }
});

router.put("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const putProduct = req.body;
       await productsService.updateProduct(productId);
      res.json({"Producto Actualizado": putProduct});
    } catch (error) {
        res.json(error.mensaje);
    }
})

router.delete("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
    } catch (error) {
        res.send(error.mensaje);
    }
})


export { router as productsRouter};
