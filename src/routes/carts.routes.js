import { Router } from "express";
import {cartsService} from "../percistencia/index.js";

const router = Router();
//router.get("/",(req,res)=>{
   
 //   res.json({mensaje:"listado carrito"});
//});
router.get("/" , async (req,res)=>{
    try{
        let allCarts= await cartsService.getCarts();
        return res.json(allCarts);
    
    }catch (error){
        res.status(400).json({error:true,mensaje:error});
    }
});



router.post("/", async (req,res)=>{
    try{
        const cartCreated = await cartsService.createCart();
        res.json({data:cartCreated});
    } catch (error){
        res.json({error:error.mensaje});
    }
});

router.post("/:cid/product/:pid", async (req,res)=>{
    try{
        const cartId= parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        res.json({mensaje:"peticion recibida"});
    }catch (error){
        res.json({error:error.mensaje});
    }
});

export {router as cartsRouter}