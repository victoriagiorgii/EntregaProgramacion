import { ProductsManagerFiles } from "./filesManager/productsManagerFiles.js";
import { CartsManagerFiles } from "./filesManager/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import{UsersManagerMongo} from "./mongo/usersManagerMongo.js";

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();
export const usersService = new UsersManagerMongo();