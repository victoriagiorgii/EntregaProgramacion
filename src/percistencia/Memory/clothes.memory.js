const Product= [];

export class ClothesMemory{
    get(){
        return Product;
    };
    save (product){
        product.push(product);
        return "Producto creado";
    };
}