import { Router } from "express";
import { productsService } from "../percistencia/index.js";


const router = Router();

router.get("/", async (req,res)=>{

  const products = await productsService.getProducts();
  console.log("products", products);
  res.render("index",{products: products});
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTime");
  });

router.get("/chat", (req,res)=>{
  res.render("chat");
});

export {router as viewsRouter}