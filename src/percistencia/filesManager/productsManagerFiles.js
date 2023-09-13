import fs from "fs";

export class ProductsManagerFiles{
    constructor(path){
        this.pathFiles= path
    };

    fileExist(){
        return existsSync(this.pathFiles);
    }

    async createProduct(productInfo){};

    async getProducts(){
        try{
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
                const products = JSON.parse(contenidoString);
                return products;
            }else{
                throw new Error (" No se pudo obtener productos")
            }
        } catch (error) {
            throw error ;
        }
    };

    async getProductsById(productId){
        try{
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
                const products = JSON.parse(contenidoString);
                const product = products.find(p=>p.id === productId)
                if(!product){
                    throw new Error ("No existe el producto");
                }
                return product ;
            }else{
                throw new Error ("El producto no pudo obtener");
            }

        }catch (error){
            throw error;
        }
    };

    updatePtoduct(){};

    deleteProduct(){};
};