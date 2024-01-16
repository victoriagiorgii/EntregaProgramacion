import {ProductPercis} from "../percistencia/factory.js";

export class ProductsService{
    static getProducts = ()=>{
        return ProductPercis.getProducts();
    };

    static createProduct = (productInfo)=>{
        return ProductPercis.createProduct(productInfo);
    };

    static getProduct = (productId)=>{
        return ProductPercis.getProductById(productId);
    };

    static getProductsPaginate = (query,options)=>{
        return ProductPercis.getProductsPaginate(query, options);
    };
}