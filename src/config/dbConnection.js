import mongoose from "mongoose";
import { logger } from "../helpers/logger.js";


export const connectDB = async ()=>{
    
    try {
        await mongoose.connect('mongodb+srv://victoria:victoriaAtlas@cluster0.wzeltg5.mongodb.net/coder?retryWrites=true&w=majority');
        logger.info("Base de datos conectada");
    } catch (error) {
        logger.error(`hubo un error conectando la base de datos: ${error.message}`);
    }
};