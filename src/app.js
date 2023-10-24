import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import { productsService } from "./percistencia/index.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

import { connectDB } from "./config/dbConnection.js";
import { chatService } from "./percistencia/index.js";
import { productsModel } from "./percistencia/mongo/Models/product.model.js";
import mongoose from "mongoose";



const PORT= 8080 ;
const app= express();
app.use(express.json());



const httpServer = app.listen(PORT,()=>console.log(`Servidor ejecutandose en el puerto ${PORT}`));

const io = new Server(httpServer);

 await connectDB();

app.use(viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));





//handlebars
app.engine('.handlebars', engine({extname: '.handlebars'}));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname,"/views"));

//socket servidor

//chat
io.on("connection", async(socket)=>{
    let chat = await chatService.getMessages() ;
    socket.emit("chatHistory", chat);

    socket.on("msgChat", (data)=>{
        chat.push(data);
        io.emit("chatHistory", chat)
    });

    socket.on("msgChat", async (data) => {
        if (data.message.trim() !== "") {
          await chatService.addMessage(data); // Agregar mensaje a la base de datos
          io.emit("chatHistory", chat);
        }
      });

    socket.on("authenticated", (data)=>{
        socket.broadcast.emit("newUser",`El usuario ${data} se acaba de conectar`);
    })
});


//product
io.on("connection", async (socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("productsArray", products);

    socket.on("addProduct", async(productsData)=>{
     const result = await productsService.createProduct(productsData)
     const products = await productsService.getProducts(result);
     io.emit("productsArray", products);
    });

    socket.on("deleteProduct", async (deletedId) => { 
        console.log(deletedId);
        const newProducts = await productsService.deleteProduct(deletedId);
        const products = await productsService.getProducts(newProducts);
            io.emit("productsArray", products);
        });
        
});













