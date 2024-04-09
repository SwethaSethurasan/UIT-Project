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
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber.trim() === '') {
      showMessage('Please enter phone number', true);
      return;
    }
  
    const otp = generateOTP();
    localStorage.setItem('otp', otp); // Store OTP in localStorage
    showMessage(`OTP sent to ${phoneNumber} : ${otp}`);
  }
  
  // Function to verify OTP
  function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;
    const generatedOTP = localStorage.getItem('otp');
  
    if (enteredOTP === generatedOTP) {
      showMessage('OTP verified successfully');
      window.location.href = 'cart.html';
    } else {
      showMessage('Invalid OTP', true);
    }
  }
  
  // Function to display message
  function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    if (isError) {
      messageElement.style.color = 'red';
    } else {
      messageElement.style.color = 'green';
    }
  }

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
  
  
  