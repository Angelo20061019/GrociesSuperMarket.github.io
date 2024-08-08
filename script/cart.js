// Get the cart data from local storage
let cart = JSON.parse(localStorage.getItem('cart'));

// Calculate the subtotal
let subtotal = 0;
cart.forEach(product => {
  subtotal += product.price * product.quantity;
});

// Display the cart data in the table
cart.forEach(product => {
  const newRow = document.createElement('tr');

  const productNameCell = document.createElement('td');
  productNameCell.textContent = product.name;

  const productPriceCell = document.createElement('td');
  productPriceCell.textContent = `Rs.${product.price}`;

  const productQuantityCell = document.createElement('td');
  productQuantityCell.textContent = product.quantity;

  const productSubtotalCell = document.createElement('td');
  productSubtotalCell.textContent = `Rs.${(product.price * product.quantity).toFixed(2)}`;

  const removeButtonCell = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.style.background = "#00000050";
  removeButton.style.border = "none";
  removeButton.style.borderRadius = "5px";
  removeButton.style.padding = "10px";
  removeButton.style.fontSize = "0.5rem"
  removeButton.addEventListener('click', () => {
    // Remove the product from the cart array
    cart = cart.filter(item => item.name !== product.name);
    localStorage.setItem('cart', JSON.stringify(cart));
    newRow.remove();
  });

  removeButtonCell.appendChild(removeButton);

  newRow.appendChild(productNameCell);
  newRow.appendChild(productPriceCell);
  newRow.appendChild(productQuantityCell);
  newRow.appendChild(productSubtotalCell);
  newRow.appendChild(removeButtonCell);

  document.getElementById('cart-table-body').appendChild(newRow);
});

// Create a total row
const totalRow = document.createElement('tr');
const totalCell = document.createElement('td');
totalCell.textContent = `Total: Rs.${subtotal.toFixed(2)}`;
totalCell.colSpan = 5; // Span across all columns
totalRow.appendChild(totalCell);
document.getElementById('cart-table-foot').appendChild(totalRow);

//apply button
function appplyFav() {
  let favCart = JSON.parse(localStorage.getItem('favCart'));

  // Display the cart data in the table
  favCart.forEach(product => {
    const newRow = document.createElement('tr');

    const productNameCell = document.createElement('td');
    productNameCell.textContent = product.name;

    const productPriceCell = document.createElement('td');
    productPriceCell.textContent = `Rs.${product.price}`;

    const productQuantityCell = document.createElement('td');
    productQuantityCell.textContent = product.quantity;

    const productSubtotalCell = document.createElement('td');
    productSubtotalCell.textContent = `Rs.${(product.price * product.quantity).toFixed(2)}`;

    const removeButtonCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.background = "#00000050";
    removeButton.style.border = "none";
    removeButton.style.borderRadius = "5px";
    removeButton.style.padding = "10px";
    removeButton.style.fontSize = "0.5rem"
    removeButton.addEventListener('click', () => {
      // Remove the product from the cart array
      favCart = favCart.filter(item => item.name !== product.name);
      localStorage.setItem('favCart', JSON.stringify(favCart));
      newRow.remove();
    });

    removeButtonCell.appendChild(removeButton);

    newRow.appendChild(productNameCell);
    newRow.appendChild(productPriceCell);
    newRow.appendChild(productQuantityCell);
    newRow.appendChild(removeButtonCell);
    newRow.appendChild(productSubtotalCell);

    document.getElementById('favCart-table-body').appendChild(newRow);

  });

};

document.getElementById("applyfav_btn").addEventListener('click', appplyFav);


//favourite butoon 
document.getElementById('fav_btn').addEventListener('click', () => {
  // Get the product data from the current page
  const productName = document.getElementById('product-name');
  const productPrice = parseFloat(document.getElementById('product-price'));
  const productQuantity = parseFloat(document.getElementById('product-quantity'));

  // Get the cart data from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const existingProduct = cart.find(product => product.name === productName);
  if (existingProduct) {
    // If the product is already in the cart, increment its quantity
    existingProduct.quantity++;
  } else {
    // If the product is not in the cart, add it to the cart
    cart.push({ name: productName, price: productPrice, quantity: productQuantity });
  }

  // Store the updated cart data in local storage
  localStorage.setItem('favCart', JSON.stringify(cart));
  localStorage.setItem('formTable', JSON.stringify(cart));

  // Display the cart data in the console
  console.log('Cart:');
  cart.forEach(product => {
    console.log(`  - ${product.name} x ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`);
  });

  console.log(`Subtotal: $${cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}`);
  alert("Items are added to favourite")
});

