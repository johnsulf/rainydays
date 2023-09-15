export function renderCartContents(container) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    container.innerHTML = "";

    if (shoppingCart.length === 0) {
        container.innerHTML = "<p class='margin-block-100 text-secondary'>Shopping cart is empty</p>";
        return;
    }

    let html = '';
    let total = 0;

    shoppingCart.forEach((item, index) => {
        const itemPrice = parseFloat(item.prices.price) / Math.pow(10, item.prices.currency_minor_unit);
        total += itemPrice;
        html += `<div class="cart-item">
                    <img class="cart-item_img" src="${item.images[0].src}">
                    <div class="cart-item_info">
                        <p class="cart-item_title">${item.name}</p>
                        <p class="cart-item_subtitle">${item.name.split(" ")[0]} | ${item.selectedColor} | ${item.selectedSize}</p>
                    </div>
                    <div class="cart-item_info">
                        <p class="cart-item_subtitle text-primary">${item.prices.currency_prefix}${itemPrice}${item.prices.currency_suffix}</p>
                    </div>
                    <button class="cta cart-item_remove fs-body-small" data-index="${index}">X</button>
                </div>
                <hr>`;
    });

    html += `<div class="cart-total fw-bold">
                <p>Total: ${total.toFixed(2)} ${shoppingCart[0].prices.currency_symbol}</p> <!-- Rounded to 2 decimal places -->
            </div>`;

    if (shoppingCart.length !== 0 && !document.getElementById('checkout-page')) {
        html += `<div class="cart-to-checkout">
                    <a href="/pages/checkout.html" class="cta">Go to Checkout</a>
                </div>`;
    }

    container.innerHTML = html;

    const removeButtons = container.querySelectorAll(".cart-item_remove");

    const containerSelector = container.className.includes('checkout-cart_content') ? '.checkout-cart_content' : '.cart';
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => removeCartItem(event, containerSelector));
    });
}



function removeCartItem(event, containerSelector) {
    event.stopPropagation();

    const index = event.target.dataset.index;
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    shoppingCart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

    const cartContainer = document.querySelector(containerSelector);
    renderCartContents(cartContainer);

    document.dispatchEvent(new CustomEvent('cart-updated'));
}

