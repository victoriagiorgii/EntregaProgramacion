import { ProductService} from "../service/product.service.js"

export class ProductController{
    static getProduct = (req,res)=> {
        const result = ClothesService.getProduct();
        res.json ({status:"success", data:result});
    };

    static saveProduct= (res,req)=> {
        const productInfo= req.body;
        const result= ProductService.saveProduct(productInfo);
        res.json({status:"success", data:result})
    };
}