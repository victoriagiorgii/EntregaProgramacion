const Product= [];

export class ProductMemory{
    get(){
        return Product;
    };
    save (product){
        product.push(product);
        return "Producto creado";
    };
}