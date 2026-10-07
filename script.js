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
