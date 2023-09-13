import { Router } from "express";
import {cartsService} from "../percistencia/index.js";


const router = Router

router.get("/" , async (req,res)=>{
    try{
        const carts= await cartsService.getCarts()
        res.json({data:carts});
    }catch (error){
        res.json({error:error.mensaje});
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

        res.json({mensaje:"peticin recibida"});
    }catch (error){
        res.json({error:error.mensaje});
    }
});

export {router as cartsRouter}