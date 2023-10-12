import { Router } from "express";
import {productsService} from "../percistencia/index.js"


const router = Router();

router.get("/",async  (req, res) => {
    try{
       let limit = req.query.limit;
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
    const productInfo= req.body;
    const products= await productsService.createProduct(productInfo);
    res.json ({mensaje:"producto agregado",data: products});
    }catch (error){
     res.json({status:"error",mensaje:error.mensaje});
    }
 });
 

router.get("/:pid",async(req,res)=>{
    try {
        const productId = req.params.pid;
        const product = await productsService.getProductsById(productId);
        res.json(product);
    } catch (error) {
        res.json({status:"error",mensaje:error.mensaje});
    }
});

router.put("/:pid", async(req,res)=>{
    try {
        const productId = req.params.pid;
       await productsService.updateProduct(productId);
      res.json({"Producto Actualizado": putProduct});
    } catch (error) {
        res.json(error.mensaje);
    }
})

router.delete("/:pid", async(req,res)=>{
    try {
        const productId = req.params.pid;
        await productsService.deleteProduct(productId);
    } catch (error) {
        res.send('el producto fue eliminado productId',error.mensaje);
    }
})


export { router as productsRouter};
