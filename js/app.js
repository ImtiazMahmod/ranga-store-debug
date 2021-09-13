const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR36Oc6BANvURVBVBK1WdJq4Zl4AFFraOdaA-2osT67GGFq2U6Sw5ecb54Y`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};


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
      <h4>${rating.count} Person rated.</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary btn-class">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="detailsBtn(${product.id})">Details</button></div>
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

loadProducts();
const detailsBtn=(id)=>{  
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>showDetails(json))
}
const showDetails=(product)=>{
  console.log(product);
  const detailContainer = document.getElementById('details');
  detailContainer.textContent= '';
  const showDetail = document.createElement('div');
  showDetail.setAttribute("id","show-detail");
  showDetail.classList.add('single-product')
  showDetail.innerHTML = `
  <div id="product-img"> <img src="${product.image}" alt=""></div>
  <div id="detail-decription">
    <h1>${product.title}<title></title>
    </h1>
    <h3>Category: ${product.category}</h3>
    <h1>Price: $ ${product.price}</h1>
    <h2><b>Rating: ${product.rating.rate}</b><small>/5</small></h2>     
    
    <h4>${product.rating.count} person rated</h4>
    <button class='search-button' id='addto-card'>Add to card</button>
  </div>
  `
  detailContainer.append(showDetail);
}