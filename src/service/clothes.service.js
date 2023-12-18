import {ProductPercis} from "../percistencia/index.js";

export class ProductService{
    static getProduct(){
        return ProductPercis.get();
    };
    static saveProduct(Product){
        return ProductPercis.save(Product)
    };
}