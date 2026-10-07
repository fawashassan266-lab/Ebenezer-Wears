```javascript
document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       CART
    ========================= */

    let cart = JSON.parse(localStorage.getItem("ebenezerCart")) || [];


    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");


    function saveCart() {

        localStorage.setItem(
            "ebenezerCart",
            JSON.stringify(cart)
        );

    }


    function updateCart() {

        if (!cartCount || !cartItems || !cartTotal) {
            return;
        }


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

            total += item.price * item.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price.toFixed(2)}
                        × ${item.quantity}
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


        cartTotal.textContent =
            "$" + total.toFixed(2);


        const removeButtons =
            document.querySelectorAll(".remove-item");


        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                cart.splice(index, 1);


                saveCart();

                updateCart();

            });

        });

    }


    /* OPEN CART */

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            cartPanel.classList.add("open");

        });

    }


    /* CLOSE CART */

    if (closeCart) {

        closeCart.addEventListener("click", function () {

            cartPanel.classList.remove("open");

        });

    }



    /* =========================
       ADD TO CART
    ========================= */

    const addCartButtons =
        document.querySelectorAll(".add-cart-button");


    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName =
                button.dataset.product;


            const productCard =
                button.closest(".product-card");


            const priceText =
                productCard
                    .querySelector(".product-price")
                    .textContent
                    .replace("$", "")
                    .trim();


            const price =
                parseFloat(priceText);


            const existingProduct =
                cart.find(function (item) {

                    return item.name === productName;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: productName,

                    price: price,

                    quantity: 1

                });

            }


            saveCart();

            updateCart();


            if (cartPanel) {

                cartPanel.classList.add("open");

            }

        });

    });



    /* =========================
       CHECKOUT
    ========================= */

    if (checkoutButton) {

        checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            alert(
                "Thank you for shopping with Ebenezer Wears! Checkout will be available soon."
            );

        });

    }



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


    if (searchInput) {

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

    }



    /* =========================
       CATEGORY FILTER
    ========================= */

    const categoryFilter =
        document.getElementById("categoryFilter");


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function () {

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

            }
        );

    }



    /* =========================
       CATEGORY CARDS
    ========================= */

    const categoryCards =
        document.querySelectorAll(".category-card");


    categoryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const category =
                card.dataset.category;


            if (categoryFilter) {

                categoryFilter.value =
                    category;

            }


            productCards.forEach(function (product) {

                if (
                    product.dataset.category === category
                ) {

                    product.classList.remove("hidden");

                } else {

                    product.classList.add("hidden");

                }

            });


            const shop =
                document.getElementById("shop");


            if (shop) {

                shop.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });



    /* =========================
       SEARCH BUTTON
    ========================= */

    const searchButton =
        document.getElementById("searchButton");


    if (searchButton && searchInput) {

        searchButton.addEventListener("click", function () {

            searchInput.focus();


            const shop =
                document.getElementById("shop");


            if (shop) {

                shop.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    }



    /* =========================
       PRODUCT PAGE
    ========================= */

    const productAddCart =
        document.getElementById("productAddCart");


    if (productAddCart) {

        productAddCart.addEventListener(
            "click",
            function () {

                const size =
                    document.getElementById("size").value;


                const quantityElement =
                    document.getElementById("quantity");


                const quantity =
                    Number(quantityElement.textContent);


                if (size === "") {

                    alert("Please select a size first.");

                    return;

                }


                const productName =
                    "Classic White Shirt";


                const productPrice =
                    45;


                const existingProduct =
                    cart.find(function (item) {

                        return (
                            item.name === productName &&
                            item.size === size
                        );

                    });


                if (existingProduct) {

                    existingProduct.quantity +=
                        quantity;

                } else {

                    cart.push({

                        name: productName,

                        price: productPrice,

                        size: size,

                        quantity: quantity

                    });

                }


                saveCart();


                alert(
                    productName +
                    " has been added to your cart."
                );

            }
        );

    }



    /* =========================
       INITIAL CART
    ========================= */

    updateCart();


});
```

