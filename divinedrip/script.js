
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}


function addToCart(productName) {
  if (!isLoggedIn()) {
    alert("Please login first to add products to your cart!");
    window.location.href = "login.html";
    return;
  }
  alert(productName + " added to cart 🛒");
}


function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    alert("Login successful! Welcome to Divine Drip 💜");
    window.location.href = "index.html";
  } else {
    alert("Please fill in both fields!");
  }
}
