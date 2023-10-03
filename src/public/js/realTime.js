
const socketClient=io();

const productsList = document.getElementById("productsList");

const createProductForm= document.getElementById("createProductForm");


createProductForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    const formData = new FormData (createProductForm);
    const jsonData ={};
    for(const [key, value] of formData.entries()){
        jsonData[key]=value
    };
    jsonData.price = parseInt(jsonData.price)
    console.log(jsonData);

    socketClient.emit("addProduct", jsonData);
    createProductForm.reset();
});


socketClient.on("productsArray",(dataProduct)=>{
    console.log(dataProduct);
    let productsElem="";
    dataProduct.forEach(products =>{
        productsElem += 
      `<li>
           <p>Nombre:${products.title}</p><button onclick="deleteProduct(${products.id})">Eliminar</button>
        </li>`
    });    
    //console.log(productsElem);
    productsList.innerHTML = productsElem;
     
});

const deleteProduct = (productId) =>{
    socketClient.emit("deleteProduct", productId)
}
