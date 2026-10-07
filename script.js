document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CART
    ========================= */

    let cart = [];

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");


    /* OPEN CART */

    cartButton.addEventListener("click", function () {
        cartPanel.classList.add("open");
    });


    /* CLOSE CART */

    closeCart.addEventListener("click", function () {
        cartPanel.classList.remove("open");
    });


    /* ADD TO CART */

    const addCartButtons = document.querySelectorAll(".add-cart-button");

    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName = button.dataset.product;

            const productCard = button.closest(".product-card");

            const priceText = productCard
                .querySelector(".product-price")
                .textContent
                .replace("$", "")
                .trim();

            const price = parseFloat(priceText);

            cart.push({
                name: productName,
                price: price
            });

            updateCart();

            cartPanel.classList.add("open");

        });

    });


    /* UPDATE CART */

    function updateCart() {

        cartCount.textContent = cart.length;

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

            cartTotal.textContent = "$0.00";

            return;
        }


        let total = 0;


        cart.forEach(function (item, index) {

            total += item.price;

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price.toFixed(2)}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    Remove
                </button>

            `;

            cartItems.appendChild(cartItem);

        });


        cartTotal.textContent = "$" + total.toFixed(2);


        /* REMOVE ITEMS */

        const removeButtons = document.querySelectorAll(".remove-item");

        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* CHECKOUT */

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        alert(
            "Thank you for shopping with Ebenezer Wears! Checkout will be available soon."
        );

    });


    /* =========================
       FAVORITES
    ========================= */

    const favoriteButtons =
        document.querySelectorAll(".favorite-button");


    favoriteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                button.textContent = "♥";

            } else {

                button.textContent = "♡";

            }

        });

    });


    /* =========================
       SEARCH
    ========================= */

    const searchInput =
        document.getElementById("searchInput");

    const productCards =
        document.querySelectorAll(".product-card");


    searchInput.addEventListener("input", function () {

        const searchTerm =
            searchInput.value.toLowerCase().trim();


        productCards.forEach(function (card) {

            const productName =
                card.dataset.name.toLowerCase();

            const productCategory =
                card.dataset.category.toLowerCase();


            if (
                productName.includes(searchTerm) ||
                productCategory.includes(searchTerm)
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });


    /* =========================
       CATEGORY FILTER
    ========================= */

    const categoryFilter =
        document.getElementById("categoryFilter");


    categoryFilter.addEventListener("change", function () {

        const selectedCategory =
            categoryFilter.value;


        productCards.forEach(function (card) {

            const productCategory =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });


    /* =========================
       CATEGORY CARDS
    ========================= */

    const categoryCards =
        document.querySelectorAll(".category-card");


    categoryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const category =
                card.dataset.category;


            categoryFilter.value = category;


            productCards.forEach(function (product) {

                if (
                    product.dataset.category === category
                ) {

                    product.classList.remove("hidden");

                } else {

                    product.classList.add("hidden");

                }

            });


            document.getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    /* =========================
       SEARCH BUTTON
    ========================= */

    const searchButton =
        document.getElementById("searchButton");


    searchButton.addEventListener("click", function () {

        searchInput.focus();

        document.getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* =========================
       INITIAL CART
    ========================= */

    updateCart();

});
```css
/* =========================
   PRODUCT PAGE
========================= */

.product-page {
    padding: 90px 6%;
    background: #ffffff;
}

.product-details {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
}


/* PRODUCT IMAGE */

.product-details-image {
    width: 100%;
    height: 650px;
    overflow: hidden;
    background: #f2f2f2;
}

.product-details-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


/* PRODUCT INFORMATION */

.product-details-info {
    padding-top: 20px;
}

.product-details-info h1 {
    font-size: 52px;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 20px;
}

.product-details-price {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
}

.product-description {
    max-width: 520px;
    color: #666666;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 35px;
}


/* PRODUCT OPTIONS */

.product-option {
    margin-bottom: 25px;
}

.product-option label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 10px;
}

.product-option select {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    border: 1px solid #dddddd;
    background: #ffffff;
    font-size: 14px;
    cursor: pointer;
}


/* QUANTITY */

.quantity-control {
    width: 140px;
    height: 48px;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.quantity-control button {
    width: 45px;
    height: 100%;
    border: none;
    background: #ffffff;
    font-size: 20px;
    cursor: pointer;
}

.quantity-control span {
    font-size: 15px;
    font-weight: 600;
}


/* ADD TO CART */

.product-add-cart {
    width: 100%;
    max-width: 400px;
    padding: 17px;
    border: none;
    background: #111111;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 40px;
}

.product-add-cart:hover {
    background: #333333;
}


/* EXTRA PRODUCT INFORMATION */

.product-extra {
    max-width: 400px;
    border-top: 1px solid #eeeeee;
}

.product-extra div {
    padding: 18px 0;
    border-bottom: 1px solid #eeeeee;
}

.product-extra strong {
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
}

.product-extra p {
    color: #777777;
    font-size: 13px;
}


/* PRODUCT PAGE MOBILE */

@media (max-width: 800px) {

    .product-page {
        padding: 60px 5%;
    }

    .product-details {
        grid-template-columns: 1fr;
        gap: 45px;
    }

    .product-details-image {
        height: 550px;
    }

    .product-details-info {
        padding-top: 0;
    }

    .product-details-info h1 {
        font-size: 42px;
    }

}


@media (max-width: 480px) {

    .product-details-image {
        height: 450px;
    }

    .product-details-info h1 {
        font-size: 36px;
    }

    .product-page {
        padding: 40px 5%;
    }

}
```
