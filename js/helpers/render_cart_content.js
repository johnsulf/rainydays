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
        total += parseFloat(item.price); // calculate the total
        html += `<div class="cart-item">
                    <img class="cart-item_img" src="/assets/images/${item.img}">
                    <div class="cart-item_info">
                        <p class="cart-item_title">${item.model}</p>
                        <p class="cart-item_subtitle">${item.manufactor} | ${item.selectedColor} | ${item.selectedSize}</p>
                    </div>
                    <div class="cart-item_info">
                        <p class="cart-item_subtitle text-primary">${item.price} $</p>
                    </div>
                    <button class="cta cart-item_remove fs-body-small" data-index="${index}">X</button>
                </div>
                <hr>`;
    });

    html += `<div class="cart-total fw-bold">
                <p>Total: ${total.toFixed(2)} $</p>
            </div>`; // display the total

    if (shoppingCart.length !== 0 && !document.getElementById('checkout-page')) {
        html += `<div class="cart-to-checkout">
                    <a href="/pages/checkout.html" class="cta">Go to Checkout</a>
                </div>`;
    }

    container.innerHTML = html;

    // Add event listeners for remove buttons
    const removeButtons = container.querySelectorAll(".cart-item_remove");
    removeButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });
}

function removeCartItem(event) {
    event.stopPropagation();  // stop event bubbling up

    const index = event.target.dataset.index;
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    shoppingCart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

    const cartContainer = document.querySelector('.cart');
    renderCartContents(cartContainer); // show cart directly after removing an item

    document.dispatchEvent(new CustomEvent('cart-updated'));
}
