import { Router } from "express";
import {cartsService} from "../percistencia/index.js";

const router = Router();
//router.get("/",(req,res)=>{
   
//res.json({mensaje:"listado carrito"});
//});
router.get("/" , async (req,res)=>{
    try{
        const carts= req.body;
        const allCarts= await cartsService.getCarts(carts);
        return res.json(allCarts);
    
    }catch (error){
        res.status(400).json({error:true,mensaje:error});
    }
});

router.get("/:cid" , async (req,res)=>{
    try{
        const cartId= req.params.cid;
        const carts= await cartsService.getCartById(cartId);
         res.json({status:"success", data:carts});
    
    }catch (error){
        res.json({error:true,mensaje:error});
    }
});



router.post("/", async (req,res)=>{
    try{
        const cartCreated = await cartsService.createCart();
        res.json({status:"success",data:cartCreated});
    } catch (error){
        res.json({error:error.mensaje});
    }
});


router.put("/:cid/product/:pid", async (req,res)=>{
    try{
        const {cid:cartId,pid:productId} = req.params;
        const carts = await cartsService.getCartById(cartId);
        const result = await cartsService.addProduct(cartId,productId);
        res.json({status:"success", result});
    }catch (error){
        res.json({error:error.mensaje});
    }
});

router.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid:cartId,pid:productId} = req.params;
        const carts = await cartsService.getCartById(cartId);
        const result = await cartsService.deleteProduct(cartId, productId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

router.put("/:cid/products/:pid", async(req,res)=>{
    try{
        const {cid:cartId, pid:productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
        res.json({status:"success", result});
    }catch (error){
        res.json({error:error.mensaje});
    }
});
router.delete("/:cid", async (req, res) => {
    try {
      const cid = req.params.cid;
      await cartsService.deleteCart(cid);
      res.json({
        status: "success",
        message: "Se elimino con exito",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });

export {router as cartsRouter}