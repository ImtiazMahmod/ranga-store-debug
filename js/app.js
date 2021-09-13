const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {  
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //product image
    const image = product.image;
    //product rating
    const rating = product.rating
   
    const div = document.createElement("div");
    div.classList.add("product");    
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2><b>${rating.rate}</b><small>/5</small></h2>     
      <h4>${rating.count} ratings</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary btn-class">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="detailsBtn()">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;

  //update price,tax and total price 
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (Math.round(total * 100) / 100).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (Math.round(value * 100) / 100).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    (getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax")).toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};

//details button
const detailsBtn=()=>{
  /* ---
   Modal
   ------ */
   let  modalDisplay=null;
   if(modalDisplay!==null){
     modalDisplay.remove();
   }
   modalDisplay= document.createElement('div');
   modalDisplay.innerHTML =`
   
   <div class="modal" id='MY' tabindex="-1">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title">Last Man</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <h2>Name: </h2>
           <h2>Salary: </h2>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="button" class="btn btn-primary">Save changes</button>
         </div>
       </div>
     </div>
   </div>  
 `
 document.body.append(modalDisplay);
 const modal = new bootstrap.Modal(modalDisplay.querySelector('#MY'));//bootstrap 5 modal 
 // const modal = new bootstrap.Modal(document.getElementById('MY'));//bootstrap 5 modal 
 
 modal.show();

}