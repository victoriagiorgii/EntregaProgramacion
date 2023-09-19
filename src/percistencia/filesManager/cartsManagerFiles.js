import fs from "fs";

export class CartsManagerFiles{
    constructor (path){
        this.pathFiles = path;
    };

    fileExist(){
        return fs.existsSync(this.pathFiles);
    };

    async getCarts(){
        try{
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles, "uft-8");
                const carts = JSON.parse(contenidoString);
                return carts;
            }else {
                throw new Error (" No se obtuvieron los productos");
            }
        } catch (error){
            throw error;
        }
    };

    async createCart(){
        try{
            if(this.fileExist){
                const contenidoString= await fs.promises.readFile(this.pathFiles, "uft-8")
                const carts = JSON.parse(contenidoString);
                const newCart={
                    id: 1,
                    product:[]
                };
            carts.push(newCart);
            await fs.promises.writeFile(this.pathFiles,JSON.stringify(carts,null, '\t'));
            return newCart;
         }else{
            throw new Error (" No se obtuvieron los carritos");
         }
        
        } catch (error){
            throw error;
        }
    };
    async addProduct(cartId, productId){
    }
}