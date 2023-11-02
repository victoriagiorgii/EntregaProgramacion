import dotenv from "dotenv";

dotenv.config();

export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url:'mongodb+srv://victoria:victoriaAtlas@cluster0.wzeltg5.mongodb.net/primerLogin? retryWrites=true& w=majority& appName=AtlasApp'
    },
    github:{
        
    }
}