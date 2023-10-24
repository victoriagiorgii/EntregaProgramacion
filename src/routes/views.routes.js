import { Router } from "express";
import { productsService } from "../percistencia/index.js";
import { productsModel } from "../percistencia/mongo/Models/product.model.js";


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

router.get("/", async(req,res)=>{
  try {
      const {page}= req.query;
      const result = await productsModel.paginate({},{limit:5,page:parseInt(page),lean:true});
      console.log(result);
      res.render("paginate", result);
  } catch (error) {
      res.send(error.message);
  }
});

export {router as viewsRouter}