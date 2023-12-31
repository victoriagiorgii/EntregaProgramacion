import { Router } from "express";
import { generateUser } from "../helpers/mock.js";
import { UsersController } from "../controller/users.controller.js";



const router = Router();

router.post("/", UsersController.createUser);


router.get("/",(req,res) =>{
    const cant = parseInt(req.query.cant) || 15;
    let users = [];
    for(let i=0;i<cant;i++){
        const newUser= generateUser();
        users.push(newUser);
    };
    res.json({status:"success", data:users});
});

export {router as usersRoutes};