// Function to generate random OTP
function generateOTP() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
  
  // Function to send OTP
  function sendOTP() {
    const phoneNumber = document.getElementById('phone_number').value;
    if (phoneNumber.trim() === '') {
      showMessage('Please enter phone number', true);
      return;
    }
  
    const otp = generateOTP();
    localStorage.setItem('otp', otp); // Store OTP in localStorage
    showMessage(`OTP sent to ${phoneNumber} : ${otp}`,false,'success');
  }
  function showMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.color = 'green';
    messageDiv.style.margin = 'green 1px';
    messageDiv.className = isError ? 'message error' : 'message success success-border';
}
  
  // Function to verify OTP
  function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;
    const generatedOTP = localStorage.getItem('otp');
  
    if (enteredOTP === generatedOTP) {
      showMessage('OTP verified successfully');
      window.location.href = 'assets/cart.html';
    } else {
      showMessage('Invalid OTP', true);
    }
  }
  
  // Function to display message
  /*function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    if (isError) {
      messageElement.style.color = 'red';
    } else {
      messageElement.style.color = 'green';
    }
  }*/

  // Function to add a game to the cart
function addToCart(button) {
    const slot = button.parentNode;
    const selectedSlot = slot.querySelector('.slot-dropdown').value;
    const price = parseFloat(slot.getAttribute('data-price'));
  
    const cartItemsElement = document.getElementById('cart-items');
    const listItem = document.createElement('li');
    listItem.textContent = `${selectedSlot} - $${price}`;
    cartItemsElement.appendChild(listItem);
  
    // Update total price
    const totalPriceElement = document.getElementById('total-price');
    let currentTotal = parseFloat(totalPriceElement.textContent.replace('$', ''));
    currentTotal += price;
    totalPriceElement.textContent = `$${currentTotal}`;
  
    // Disable the dropdown after booking
    const dropdown = slot.querySelector('.slot-dropdown');
    dropdown.disabled = true;
  
    // Disable the button after booking
    button.disabled = true;
  
    // Mark the slot as booked
    slot.setAttribute('data-booked', 'true');
  }
  
  function Send_Data(){
    const username=document.getElementById('username').value;
    const phone_number=document.getElementById('phone_number').value;
    var httpr=new XMLHttpRequest();
    httpr.open("POST","get_data.php",true);
    httpr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httpr.onreadystatechange=function(){
      if(httpr.readState==4 && httpr.status==200){
        document.getElementById("response").innerHTML="✔️";
      }
    }
    httpr.send("username="+username+"&phone_number="+phone_number);
  }

  const cartItemsData = [
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 30 }
];

// Function to dynamically add cart items and update total price
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    // Clear existing items
    cartItemsContainer.innerHTML = "";

    // Loop through cart items data and create list items
    cartItemsData.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(listItem);

        // Update total price
        totalPrice += item.price;
    });

    // Update total price display
    totalPriceElement.textContent = `$${totalPrice}`;
}

// Function to handle "Proceed to Pay" button click
function handleProceedToPay() {
    // Replace this with your logic for handling the payment process
    console.log("Proceeding to pay...");
}

// Call the function to initially display cart items
displayCartItems();

// Add event listener for "Proceed to Pay" button click
const proceedToPayButton = document.getElementById("proceed-to-pay-button");
proceedToPayButton.addEventListener("click", handleProceedToPay);
 
function proceedToPay() {
  // Redirect to the payment page
  window.location.href = "https://upi-pratyay.vercel.app/?upiid="; // Replace "payment.html" with your actual payment page URL
}