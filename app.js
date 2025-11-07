// Product data
const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Headphones", price: 999 },
  { id: 3, name: "Smart Watch", price: 1999 },
  { id: 4, name: "Shoes", price: 1499 }
];

// Orders, Wishlist, Reviews
const orders = [
  { id: 101, items: ["T-Shirt"], status: "Delivered" },
  { id: 102, items: ["Headphones"], status: "Pending" }
];
const wishlist = [{ id: 4, name: "Shoes" }];
const reviews = [
  { prodId: 1, user: "Kumar", text: "Great quality product!", rating: 5 }
];

// Render Products
const productList = document.getElementById("productList");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h4>${p.name}</h4>
    <p>₹${p.price}</p>
    <button>Add to Wishlist</button>
  `;
  productList.appendChild(div);
});



// Render Orders
const ordersList = document.getElementById("ordersList");
orders.forEach(o => {
  const li = document.createElement("li");
  li.textContent = `#${o.id} - ${o.items.join(", ")} (${o.status})`;
  ordersList.appendChild(li);
});

// Render Wishlist
const wishlistEl = document.getElementById("wishlist");
wishlist.forEach(w => {
  const li = document.createElement("li");
  li.textContent = w.name;
  wishlistEl.appendChild(li);
});
btn.addEventListener("click", e => {
  const id = parseInt(e.target.getAttribute("data-id"));
  const product = products.find(p => p.id === id);
  if (!wishlist.some(w => w.id === id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
    alert(`${product.name} added to wishlist!`);
  } else {
    alert("This product is already in your wishlist!");
  }
});

// Render Reviews
const reviewsEl = document.getElementById("reviews");
reviews.forEach(r => {
  const prod = products.find(p => p.id === r.prodId);
  const li = document.createElement("li");
  li.textContent = `${r.user} on ${prod.name}: "${r.text}" (${r.rating}/5)`;
  reviewsEl.appendChild(li);
});

// Modal Handling
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginFormBlock = document.getElementById("loginForm");
const registerFormBlock = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  loginFormBlock.classList.remove("hidden");
  registerFormBlock.classList.add("hidden");
});

registerBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  registerFormBlock.classList.remove("hidden");
  loginFormBlock.classList.add("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Registration Validation
const regForm = document.getElementById("regForm");
const regMsg = document.getElementById("regMsg");

regForm.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(regForm);
  const fullname = f.get("fullname").trim();
  const email = f.get("email").trim();
  const password = f.get("password").trim();
  const phone = f.get("phone").trim();

  if (fullname.length < 3) {
    regMsg.textContent = "Full name must be at least 3 characters.";
    regMsg.className = "msg error";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    regMsg.textContent = "Enter a valid email.";
    regMsg.className = "msg error";
    return;
  }
  if (password.length < 6) {
    regMsg.textContent = "Password must be at least 6 characters.";
    regMsg.className = "msg error";
    return;
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    regMsg.textContent = "Phone number must be 10 digits.";
    regMsg.className = "msg error";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.email === email)) {
    regMsg.textContent = "This email is already registered.";
    regMsg.className = "msg error";
    return;
  }

  users.push({ fullname, email, password, phone });
  localStorage.setItem("users", JSON.stringify(users));
  regMsg.textContent = "Registration successful!";
  regMsg.className = "msg";
  regForm.reset();
});

// Login Validation
const logForm = document.getElementById("logForm");
const logMsg = document.getElementById("logMsg");

logForm.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(logForm);
  const email = f.get("email").trim();
  const password = f.get("password").trim();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    logMsg.textContent = "Invalid email or password.";
    logMsg.className = "msg error";
    return;
  }

  logMsg.textContent = `Welcome, ${user.fullname}!`;
  logMsg.className = "msg";
  logForm.reset();
});

// Report Buttons
document.getElementById("reportProduct").addEventListener("click", () => {
  alert("Product issue reported successfully!");
});
document.getElementById("reportOrder").addEventListener("click", () => {
  alert("Order issue reported successfully!");
});