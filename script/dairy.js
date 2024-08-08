// Create an empty cart array
let cart = [];
cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add event listener to the add to cart buttons
document.querySelectorAll('.popup-btn1, .popup-btn2, .popup-btn3, .popup-btn3, .popup-btn5, .popup-btn6, .popup-btn7, .popup-btn8, .popup-btn9, .popup-btn10, .popup-btn11, .popup-btn12, .popup-btn13, .popup-btn14, .popup-btn15, .popup-btn16').forEach(button => {
  button.addEventListener('click', () => {
    console.log("Hello")
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');
    const productQuantity = document.getElementById(button.id + "-qty").value;

    // Add the product to the cart array
    cart.push({
      name: productName,
      price: productPrice,
      quantity: productQuantity
    });
    alert(productName + " is added to the cart.");

    // Store the cart data in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  });
});