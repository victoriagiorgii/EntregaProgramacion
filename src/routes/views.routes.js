import { Router } from "express";
import { cartsService, productsService } from "../percistencia/index.js";
import { productsModel } from "../percistencia/mongo/Models/product.model.js";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/index", async (req,res)=>{

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
      return res.status(404).send("carrito no encontrado");
    }
    console.log(cart.products);
      res.render("cart", { products: cart.products });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//sign up
router.get("/singUp", (req, res) => {
  res.render("singUp");
});

//login
router.get("/", (req, res) => {
  res.render("login");
});

//profile
router.get("/profile", (req, res) => {
  console.log(req.session);
  if (req.session) {
    const userEmail = req.session.email;
    res.render("profile", {userEmail});
  } else {
    res.redirect("/");
    //agregar sweet alert
  }
});

router.get("/testLogger", (req,res) =>{
  logger.error("log error");
  logger.warning("log warning");
  logger.debbug("log debbug");
  res.send("prueba logger");
});

router.get("/forgot-password", (req,res) =>{
  res.render("forgotPassView");
});

router.get("/reset-password", (req,res) =>{
  const token = req.query.token;
  res.render("resetPassView", {token});
});

export {router as viewsRouter}