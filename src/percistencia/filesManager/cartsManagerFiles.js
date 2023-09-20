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
                const contenidoString = await fs.promises.readFile(this.pathFiles, "utf-8");
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
                const contenidoString= await fs.promises.readFile(this.pathFiles, "utf-8")
                const carts = JSON.parse(contenidoString);
                const newCart={
                    id:1,
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
        cartId= parseInt(cartId);
        productId=parseInt(productId);
    try {
        if (this.fileExist()) {
            const contenidoString = await fs.promises.readFile(this.pathFiles, "utf-8");
            const carts = JSON.parse(contenidoString);
            const cart = carts.find((item) => item.cartId === cartId);
            if(cart){
            const existingProduct =cart.products.find((prod) => prod.id === productId);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    const newProduct = {
                        idProduct: productId,
                        quantity: 1,
                    };
                    cart.push(newProduct);
                }
                await fs.promises.writeFile(this.pathFiles,JSON.stringify(carts,null, '\t'));
                return `Se agregó el producto al carrito ${cartId}`
            } else {
                return `No se encontró el carrito con el id ${cartId}`;
            }
        } else {
            throw new Error("No se pudo agregar el producto al carrito");
        }
   
         } catch (error) {
           console.log(error.mensaje);
            throw error;
         }
}
}