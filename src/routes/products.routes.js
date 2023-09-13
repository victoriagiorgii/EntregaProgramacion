import { Router } from "express";
import {productsService} from "../percistencia/index.js"


const router = Router();
//http://localhost:8080/api/products
router.get("/",(req,res)=>{
   
    res.json({mensaje:"listado productos"});
});

router.post("/", async (req,res)=>{
   try{
    const productInfo = req.body;
   }catch (error){
    res.json({status:"error",mensaje:error.mensaje});
   }
})

router.get("/:pid",async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({mensaje:"finaliza para obtener el producto", data:product});
    } catch (error) {
        res.json({status:"error",mensaje:error.mensaje});
    }
});

export { router as productsRouter};