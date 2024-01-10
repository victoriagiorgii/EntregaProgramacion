import dotenv from "dotenv";

dotenv.config();

export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION,
        enviroment: process.env.NODE_ENVIRONMENT,
    },
    mongo:{
        url:'mongodb+srv://victoria:victoriaAtlas@cluster0.wzeltg5.mongodb.net/primerLogin? retryWrites=true& w=majority& appName=AtlasApp'
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    token:{
        privateKey: process.env.PRIVATE_KEY,
      },
};