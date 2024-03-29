import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { isAuth, checkRole } from "../middleware/auth.js";
const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", isAuth, checkRole(["admin", "superadmin", "premium"]),ProductsController.createProduct);
router.get("/:pid", ProductsController.getProduct);
router.delete("/:pid", checkRole(["admin,premium"]), ProductsController.deleteProduct);

export {router as productsRouter};




