import { Router } from "express";
import  "../public/js/realTime.js";
const router = Router();

router.get("/", async (req,res)=>{
  const products = await productsService.getProducts();
  console.log("products", products);
  res.render("home",{products: products});
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTime");
  });


export {router as viewsRouter}