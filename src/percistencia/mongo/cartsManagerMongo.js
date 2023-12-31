import {cartsModel} from "./Models/carts.model.js";

export class CartsManagerMongo{
    constructor(){
        this.model= cartsModel;
    };


    async getCarts(){
        try{
                const carts = await this.model.find().lean();
                return carts;
        } catch (error){
            throw new Error ("No se puede encontrar los carrirtos de compra");
        }
    };

    async getCartById(cartId){
        try{

            const result= await this.model.findById(cartId).populate("products.productId").lean();
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
            const productExist=carts.products.findIndex(elm=>elm.productId._id == productId)
            
             if(productExist!=-1){
                carts.products[productExist].quantity++;
               
              }else{
                carts.products.push({productId,quantity:1});

            }
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
                let newProducts = carts.products.filter(elm => elm.productId._id != productId);
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

    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.findIndex(elm => elm.productId._id == productId);
            if(productExist>=0 ){
                console.log(cart.products[productExist])
                cart.products[productExist]. quantity = newQuantity;
          const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
          return result;
         }else{
            throw new Error ("El producto no se puede actualizar ")
          }
       } catch (error) {
         console.log("updateProductCart", error.message);
          throw new Error ("No se puedo actualizar el producto del carrito"); 
        }
    };

    async deleteCart(id) {
        try {
          const result = await this.model.findByIdAndDelete(id);
          if (!result) {
            throw new Error("cart not found");
          } else {
            return result;
          }
        } catch (error) {
          console.log(`delete cart error: ${error.message}`);
          throw new Error(`delete cart error: ${error.message}`);
        }
      }
    

};