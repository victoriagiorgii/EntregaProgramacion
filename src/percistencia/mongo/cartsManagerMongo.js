import {cartsModel} from "./Models/carts.model.js";

export class CartsManagerMongo{
    constructor(){
        this.model= cartsModel;
    };


    async getCarts(){
        try{
                const carts = await this.model.find();
                return carts;
        } catch (error){
            throw new Error ("No se puede encontrar los carrirtos de compra");
        }
    };

    async getCartById(cartId){
        try{

            const result= await this.model.findById(cartId).populate("products.productId");
            if(!result){
                throw new Error (`El carrito con el ID: '${cartId}'no existe.`);
            };
            return result;

        } catch (error){
            console.log(error.menssage);
            throw new Error ("No se pudo ontener el carrito")
        }
    };
    

    async createCart() {
        try {
            const newCart={};
            const result= await this.model.create(newCart);
            return result;
        }catch (error){
            console.log(error.message);
            throw new Error ("No se pudo crear el carrito");
        }
    };

    async addProduct(cartId, productId){
        try {
            const carts = await this.getCartById(cartId);
            // const productExist = cart.products.find(elm=>elm.productId._id == productId);
            // console.log("productExist",productExist);
            const newProductCart = {
                productId:productId,
                quantity:1
            }
            carts.products.push(newProductCart);
            const result = await this.model.findByIdAndUpdate(cartId,carts, {new:true});
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    };

    async deleteProduct(cartId, productId){
        try {
            const carts = await this.getCartById(cartId);
            const productExist = carts.products.find(elm=>elm.productId._id == productId);
            if(productExist){
                //si el producto existe en el carrito
                const newProducts = carts.products.filter(elm => elm.productId._id != productId);
                carts.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId,carts, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("deleteProduct",error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };

};