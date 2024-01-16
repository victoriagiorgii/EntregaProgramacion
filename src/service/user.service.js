import { usersService } from "../percistencia/index.js";

export class UsersService{
    static getUserByEmail = (email) =>{
        return usersService.getUserByEmail(email);
       }
    
       static updateUser = (id,user) =>{
        return usersService.updateUser(id,user);
       }
}