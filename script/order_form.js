// Form elements by IDs
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const form3 = document.getElementById("form3");
const form4 = document.getElementById("form4");
const form5 = document.getElementById("form5");

// Input elements by IDs
const formName = document.getElementById("name1");
const contact = document.getElementById("contact");
const email = document.getElementById("email");
const cardNum = document.getElementById("cardNum");
const cvv = document.getElementById("CVV");
const address = document.getElementById("address");
const district = document.getElementById("district");
const street = document.getElementById("street");

// Error message elements by IDs
const nameError = document.getElementById("name-Error");
const emailError = document.getElementById("email-Error");
const contactError = document.getElementById("contact-Error");
const cardNumError = document.getElementById("cardNum-Error");
const CVVError = document.getElementById("CVV-Error");
const addressError = document.getElementById("address-Error");
const districtError = document.getElementById("district-Error");
const streetError = document.getElementById("street-Error");

// Progress bar elements
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");

let currentActive = 1;

// Validation functions
function validateStep1() {
    let valid = true;

    // Email and contact validation regex
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactCheck = /^[0-9]{10}$/;

    // Name validation
    if (formName.value.trim() === "") {
        valid = false;
        nameError.textContent = "Enter a valid name";
    } else {
        nameError.textContent = "";
    }

    // Contact number validation
    if (!contact.value.match(contactCheck)) {
        valid = false;
        contactError.textContent = "Enter a valid 10-digit contact number";
    } else {
        contactError.textContent = "";
    }

    // Email validation
    if (!email.value.match(emailCheck)) {
        valid = false;
        emailError.textContent = "Enter a valid email address";
    } else {
        emailError.textContent = "";
    }

    return valid;
}

function validateStep2() {
    let valid = true;

    // Card number validation
    if (cardNum.value.trim() === "") {
        valid = false;
        cardNumError.textContent = "Enter a valid card number";
    } else {
        cardNumError.textContent = "";
    }

    // CVV validation
    if (cvv.value.trim() === "" || cvv.value.length !== 3) {
        valid = false;
        CVVError.textContent = "Enter a valid 3-digit CVV";
    } else {
        CVVError.textContent = "";
    }

    return valid;
}

function validateStep3() {
    let valid = true;

    // Address validation
    if (address.value.trim() === "") {
        valid = false;
        addressError.textContent = "Enter a valid address";
    } else {
        addressError.textContent = "";
    }

    // District validation
    if (district.value.trim() === "") {
        valid = false;
        districtError.textContent = "Enter a valid district";
    } else {
        districtError.textContent = "";
    }

    // Street validation
    if (street.value.trim() === "") {
        valid = false;
        streetError.textContent = "Enter a valid street";
    } else {
        streetError.textContent = "";
    }

    return valid;
}

// Progress bar update function
function updateProgress() {
    circles.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });

    const width = ((currentActive - 1) / (circles.length - 1)) * 100 + "%";
    progress.style.width = width;
}

// Form navigation functions
function nextOne() {
    if (validateStep1()) {
        form1.style.left = "-450px";
        form2.style.left = "25px";

        currentActive++;
        updateProgress();
    }
}

function nextTwo() {
    if (validateStep2()) {
        form2.style.left = "-450px";
        form3.style.left = "25px";

        currentActive++;
        updateProgress();
    }
}

function backOne() {
    form1.style.left = "25px";
    form2.style.left = "450px";

    currentActive--;
    updateProgress();
}

function backTwo() {
    form2.style.left = "25px";
    form3.style.left = "450px";

    currentActive--;
    updateProgress();
}

function nextThree() {
    if (validateStep3()) {
        form3.style.left = "-450px";
        form4.style.left = "25px";

        currentActive++;
        updateProgress();
    }
}

function backThree() {
    form3.style.left = "25px";
    form4.style.left = "450px";

    currentActive--;
    updateProgress();
}

function submitOne() {
    form4.style.left = "-450px";
    form5.style.left = "25px";

    currentActive++;
    updateProgress();
}

// Event listeners for buttons
function btnEvents() {
    const next1 = document.getElementById("next1");
    const back1 = document.getElementById("back1");
    const next2 = document.getElementById("next2");
    const back2 = document.getElementById("back2");
    const next3 = document.getElementById("next3");
    const back3 = document.getElementById("back3");
    const submit1 = document.getElementById("submit_btn");

    next1.addEventListener("click", nextOne);
    back1.addEventListener("click", backOne);
    next2.addEventListener("click", nextTwo);
    back2.addEventListener("click", backTwo);
    next3.addEventListener("click", nextThree);
    back3.addEventListener("click", backThree);
    submit1.addEventListener("click", submitOne);
}

document.addEventListener("DOMContentLoaded", btnEvents);

// Order form table population
function orderFormTable() {
    let fromCart = JSON.parse(localStorage.getItem('favCart'));

    // Display the cart data in the table
    fromCart.forEach(product => {
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
        removeButton.addEventListener('click', () => {
            // Remove the product from the cart array
            fromCart = fromCart.filter(item => item.name !== product.name);
            localStorage.setItem('favCart', JSON.stringify(fromCart));
            newRow.remove();
        });

        removeButtonCell.appendChild(removeButton);

        newRow.appendChild(productNameCell);
        newRow.appendChild(productPriceCell);
        newRow.appendChild(productQuantityCell);
        newRow.appendChild(productSubtotalCell);
        newRow.appendChild(removeButtonCell);

        document.getElementById('formCart-table-body').appendChild(newRow);
    });
}

document.getElementById("next3").addEventListener('click', orderFormTable);

// Cart summary
const table = document.getElementById("formCart");

let cartItems = JSON.parse(localStorage.getItem("cart"));

if (cartItems) {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let row = table.insertRow(i + 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        let itemName = cartItems[i].name;
        let price = cartItems[i].price * cartItems[i].quantity;

        cell1.innerHTML = itemName;
        cell2.innerHTML = `Rs.${price.toFixed(2)}`;

        totalPrice += price; // Add price to total
    }
    // Create total row
    let totalRow = table.insertRow(cartItems.length + 1);
    totalRow.insertCell(0).innerHTML = "Total";
    totalRow.insertCell(1).innerHTML = `Rs.${totalPrice.toFixed(2)}`;

    console.log(totalPrice);
}

// Countdown timer
// Set the date we're counting down to (3 days from now)
var countDownDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

// Update the countdown every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the countdown date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Countdown expired";
    }
}, 1000);
