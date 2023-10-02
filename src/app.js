import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import { productsService } from "./percistencia/index.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";





const PORT= 8080 ;
const app= express();
app.use(express.json());



const httpServer = app.listen(PORT,()=>console.log(`Servidor ejecutandose en el puerto ${PORT}`));

const io = new Server(httpServer);

app.use(viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use(express.static(path.join(__dirname,"/public")));

//handlebars
app.engine('.handlebars', engine({extname: '.handlebars'}));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname,"/views"));




io.on("connection", async (socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("productsArray", products);

    socket.on("addProducts", async(productsData)=>{
     const result = await productsService.createProduct(productsData)
     const products = await productsService.getProducts(result);
     io.emit("productsArray", products);
    });

    socket.on("deleteProduct", async (deletedId) => { 
        const newProducts = await productsService.deleteProduct(deletedId);
        const products = await productsService.getProducts(newProducts);
            io.emit("productsArray", products);
        });
});










