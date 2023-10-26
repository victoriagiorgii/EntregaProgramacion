import { Router } from "express";
import { cartsService, productsService } from "../percistencia/index.js";
import { productsModel } from "../percistencia/mongo/Models/product.model.js";


const router = Router();

router.get("/", async (req,res)=>{

  const docs = await productsService.getProducts();
  console.log("products", docs);
  res.render("index",{docs: docs});
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTime");
  });

router.get("/chat", (req,res)=>{
  res.render("chat");
});

router.get("/paginate", async(req,res)=>{
  try {
    const { limit = 4, page = 1, sort = { price: 1 } } = req.query;
    const query = {};
    const options = {
      limit,
      page,
      sort,
      lean: true,
    };
      const result = await productsService.getProductsPaginate(query,options);
      console.log(result);
      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

      const dataProducts={
        status:"success",
        payload:result.docs,
        totalPages:result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
        ? //reemplaza la pagina actual, por la pagina anterior
          `${baseUrl.replace(
            `page=${result.page}`,
            `page=${result.nextPage}` 
            )}`   
        : null,
        nextLink:result.hasNextPage
        ? baseUrl.includes("page")
          ? baseUrl.replace(
              `page=${result.page}`,
              `page=${result.nextPage}`
            )
          : baseUrl.concat(`?page=${result.nextPage}`)
        : null,
        
        
      
    };
  
      res.render("index",dataProducts);
  } catch (error) {
      res.send(error.message);
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cid = "65295538c0fbd8486dd71250";
    const cart = await cartsService.getCartById(cid);
    if (!cart) {
      return res.render("cart not found");
    } else {
      res.render("cart", { products: cart.products });
    }
  } catch (error) {
    res.render({ error: error.message });
  }
});

export {router as viewsRouter}