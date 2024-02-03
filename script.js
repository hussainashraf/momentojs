console.log("====================================");
console.log("Connected");
console.log("====================================");

const url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";
const hardcodedImageUrl =
  "https://images.unsplash.com/photo-1519165598262-124d83b93b16?q=80&w=1536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const addToCartButton = document.querySelector(".bouton");
const selectedProduct = document.getElementById('selectedproduct');

// Fetch data from the URL
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const productImage = document.getElementById("productImage");
    const productTitle = document.getElementById("productTitle");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("description");
    const test1 = document.getElementById('test1')
    const compareprice = document.getElementById('comparePrice')
    const calculatedPercentage = document.getElementById("calculatedPercentage"); // New element

   // Corrected reference


    if (data.product) {
      const product = data.product;

      // Update HTML elements with fetched data
      productImage.src = hardcodedImageUrl;
      productTitle.textContent = product.title;
      productPrice.textContent = `${product.price}`;
      productDescription.innerHTML = product.description;
      compareprice.innerHTML = `${product.compare_at_price}`
      test1.innerHTML = "";
      console.log(product.compare_at_price)
      const originalPrice = parseFloat(product.compare_at_price.replace('$', '').replace(',', ''));
      const discountedPrice = parseFloat(product.price.replace('$', '').replace(',', ''));
  
      if (!isNaN(originalPrice) && !isNaN(discountedPrice)) {
        const percentage = calculatePercentage(originalPrice, discountedPrice);
        calculatedPercentage.textContent = ` ${Math.floor(percentage)}% Off`;
      } else {
        calculatedPercentage.textContent = ' N/A';
      }
      const sizeContainer = document.getElementById("sizecontainer");
      product.options[1].values.forEach((size) => {
        const label = document.createElement("label");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "size";
        radioInput.value = size;
        label.appendChild(radioInput);
        label.appendChild(document.createTextNode(` ${size}`));
        label.classList.add("labelbtn");
        sizeContainer.appendChild(label);
      });
    } else {
      console.error("No product data found");
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const inputElement = document.getElementById("input");

decrementButton.addEventListener("click", () => {
  const currentValue = parseInt(inputElement.value, 10);
  if (currentValue > 0) {
    inputElement.value = currentValue - 1;
  }
});

incrementButton.addEventListener("click", () => {
  const currentValue = parseInt(inputElement.value, 10);
  inputElement.value = currentValue + 1;
});

addToCartButton.addEventListener("click", () => {
  const quantity = parseInt(inputElement.value, 10);
  const selectedColor = document.querySelector('input[name="color"]:checked').value;
  const selectedSize = document.querySelector('input[name="size"]:checked').value;
  console.log(selectedColor)
  if (quantity > 0 && selectedSize) {
    // Display add to cart message with product details
    // const color = selectedColor.value;
    // const size = selectedSize.value;

    console.log(selectedSize)

    // Optional: You can hide the product details container or reset the input values
    const message = `${productTitle.textContent} with Color ${selectedColor} and  size ${selectedSize} added to cart`;
    selectedProduct.textContent = message;
      } else {
        alert('Please select color, size, and quantity before adding to cart.');
      }
});

function calculatePercentage(originalPrice, discountedPrice) {
  return ((originalPrice - discountedPrice) / originalPrice) * 100;
}