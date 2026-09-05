
// ================================
// PRODUCT DATA
// ================================

const products = [
    { id: 1, name: "T-Shirt", price: 499 },
    { id: 2, name: "Headphones", price: 999 },
    { id: 3, name: "Smart Watch", price: 1999 },
    { id: 4, name: "Shoes", price: 1499 }
];


// ================================
// ORDER DATA
// ================================

const orders = [
    {
        id: 101,
        items: ["T-Shirt"],
        status: "Delivered"
    },
    {
        id: 102,
        items: ["Headphones"],
        status: "Pending"
    }
];


// ================================
// WISHLIST
// ================================

let wishlist = JSON.parse(
    localStorage.getItem("wishlist")
) || [];


// ================================
// REVIEWS
// ================================

const reviews = [
    {
        prodId: 1,
        user: "Kumar",
        text: "Great quality product!",
        rating: 5
    }
];


// ================================
// DOM ELEMENTS
// ================================

const productList =
    document.getElementById("productList");

const ordersList =
    document.getElementById("ordersList");

const wishlistEl =
    document.getElementById("wishlist");

const reviewsEl =
    document.getElementById("reviews");


// ================================
// RENDER PRODUCTS
// ================================

function renderProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <h4>${product.name}</h4>

            <p>₹${product.price}</p>

            <button class="wishlist-btn">
                Add to Wishlist
            </button>
        `;

        const button =
            div.querySelector(".wishlist-btn");

        button.addEventListener("click", () => {

            addToWishlist(product);

        });

        productList.appendChild(div);
    });
}


// ================================
// ADD TO WISHLIST
// ================================

function addToWishlist(product) {

    const alreadyExists =
        wishlist.some(
            item => item.id === product.id
        );

    if (alreadyExists) {

        alert(
            "This product is already in your wishlist!"
        );

        return;
    }

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

    alert(
        `${product.name} added to wishlist!`
    );
}


// ================================
// RENDER WISHLIST
// ================================

function renderWishlist() {

    wishlistEl.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistEl.innerHTML =
            "<li>Your wishlist is empty.</li>";

        return;
    }

    wishlist.forEach(product => {

        const li =
            document.createElement("li");

        li.textContent =
            `${product.name} - ₹${product.price}`;

        wishlistEl.appendChild(li);
    });
}


// ================================
// RENDER ORDERS
// ================================

function renderOrders() {

    ordersList.innerHTML = "";

    if (orders.length === 0) {

        ordersList.innerHTML =
            "<li>No orders available.</li>";

        return;
    }

    orders.forEach(order => {

        const li =
            document.createElement("li");

        li.textContent =
            `#${order.id} - ${order.items.join(", ")} (${order.status})`;

        ordersList.appendChild(li);
    });
}


// ================================
// RENDER REVIEWS
// ================================

function renderReviews() {

    reviewsEl.innerHTML = "";

    if (reviews.length === 0) {

        reviewsEl.innerHTML =
            "<li>No reviews available.</li>";

        return;
    }

    reviews.forEach(review => {

        const product =
            products.find(
                p => p.id === review.prodId
            );

        const li =
            document.createElement("li");

        if (product) {

            li.textContent =
                `${review.user} on ${product.name}: "${review.text}" (${review.rating}/5)`;

        } else {

            li.textContent =
                `${review.user}: "${review.text}" (${review.rating}/5)`;
        }

        reviewsEl.appendChild(li);
    });
}


// ================================
// MODAL ELEMENTS
// ================================

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const loginBtn =
    document.getElementById("loginBtn");

const registerBtn =
    document.getElementById("registerBtn");

const loginFormBlock =
    document.getElementById("loginForm");

const registerFormBlock =
    document.getElementById("registerForm");


// ================================
// OPEN LOGIN MODAL
// ================================

loginBtn.addEventListener("click", () => {

    modal.classList.remove("hidden");

    loginFormBlock.classList.remove("hidden");

    registerFormBlock.classList.add("hidden");

    document.getElementById("logMsg").textContent = "";

    document.getElementById("regMsg").textContent = "";
});


// ================================
// OPEN REGISTER MODAL
// ================================

registerBtn.addEventListener("click", () => {

    modal.classList.remove("hidden");

    registerFormBlock.classList.remove("hidden");

    loginFormBlock.classList.add("hidden");

    document.getElementById("logMsg").textContent = "";

    document.getElementById("regMsg").textContent = "";
});


// ================================
// CLOSE MODAL
// ================================

closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});


// ================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ================================

window.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.add("hidden");

    }
});


// ================================
// REGISTRATION
// ================================

const regForm =
    document.getElementById("regForm");

const regMsg =
    document.getElementById("regMsg");


regForm.addEventListener("submit", event => {

    event.preventDefault();

    const formData =
        new FormData(regForm);

    const fullname =
        formData.get("fullname").trim();

    const email =
        formData.get("email").trim().toLowerCase();

    const password =
        formData.get("password").trim();

    const phone =
        formData.get("phone").trim();


    // Full name validation

    if (fullname.length < 3) {

        showMessage(
            regMsg,
            "Full name must be at least 3 characters.",
            true
        );

        return;
    }


    // Email validation

    if (!/^\S+@\S+\.\S+$/.test(email)) {

        showMessage(
            regMsg,
            "Enter a valid email.",
            true
        );

        return;
    }


    // Password validation

    if (password.length < 6) {

        showMessage(
            regMsg,
            "Password must be at least 6 characters.",
            true
        );

        return;
    }


    // Phone validation

    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            regMsg,
            "Phone number must be exactly 10 digits.",
            true
        );

        return;
    }


    // Get users from localStorage

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Check duplicate email

    const existingUser =
        users.find(
            user => user.email === email
        );


    if (existingUser) {

        showMessage(
            regMsg,
            "This email is already registered.",
            true
        );

        return;
    }


    // Create user

    const newUser = {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone
    };


    // Add user

    users.push(newUser);


    // Save users

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Success message

    showMessage(
        regMsg,
        "Registration successful!",
        false
    );


    // Clear form

    regForm.reset();

});


// ================================
// LOGIN
// ================================

const logForm =
    document.getElementById("logForm");

const logMsg =
    document.getElementById("logMsg");


logForm.addEventListener("submit", event => {

    event.preventDefault();

    const formData =
        new FormData(logForm);

    const email =
        formData.get("email")
            .trim()
            .toLowerCase();

    const password =
        formData.get("password")
            .trim();


    // Get users

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Find matching user

    const user =
        users.find(
            u =>
                u.email === email &&
                u.password === password
        );


    // Invalid login

    if (!user) {

        showMessage(
            logMsg,
            "Invalid email or password.",
            true
        );

        return;
    }


    // Successful login

    showMessage(
        logMsg,
        `Welcome, ${user.fullname}!`,
        false
    );


    logForm.reset();

});


// ================================
// MESSAGE FUNCTION
// ================================

function showMessage(
    element,
    message,
    isError
) {

    element.textContent = message;

    if (isError) {

        element.className =
            "msg error";

    } else {

        element.className =
            "msg success";
    }
}


// ================================
// REPORT PRODUCT ISSUE
// ================================

const reportProduct =
    document.getElementById("reportProduct");

reportProduct.addEventListener(
    "click",
    () => {

        alert(
            "Product issue reported successfully!"
        );

    }
);


// ================================
// REPORT ORDER ISSUE
// ================================

const reportOrder =
    document.getElementById("reportOrder");

reportOrder.addEventListener(
    "click",
    () => {

        alert(
            "Order issue reported successfully!"
        );

    }
);


// ================================
// INITIAL PAGE LOAD
// ================================

renderProducts();

renderWishlist();

renderOrders();

renderReviews();