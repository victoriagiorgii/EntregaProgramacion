import { Router} from "express";
import { ProductController } from "../controller/clothes.controller.js";

const router = Router();

router.get("/", ProductController.getProduct);
router.post("/", ProductController.saveProduct);

export {router as ProductRouter}