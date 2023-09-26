import express from "express";
import { __dirname } from "./utils.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";


const PORT= 8080 ;
const app= express();
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.listen(PORT, () =>console.log (`Servidor ejecutandose en el puerto ${PORT}`));


