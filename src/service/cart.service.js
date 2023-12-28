import { cartsPercis } from "../percistencia/factory.js";

export class CartsService{
    static getCarts = ()=>{
        return cartsPercis.getCarts();
    };

    static getCartById = (cartId)=>{
        return cartsPercis.getCartById(cartId)
    };

    static createCart = ()=>{
        return cartsPercis.createCart();
    };

    static addProduct = (cartId, productId)=>{
        return cartsPercis.addProduct(cartId,productId);
    };

    static deleteProduct = (cartId, productId)=>{
        return cartsPercis.deleteProduct(cartId, productId);
    };

    static updateProductCart = (cartId, productId, newQuantity)=>{
        return cartsPercis.updateProductCart(cartId, productId, newQuantity);
    }
}