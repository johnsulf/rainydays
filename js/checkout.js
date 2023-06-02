import { renderCartContents } from "./helpers/render_cart_content.js";

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
});

function initCheckout() {
    renderCartSummary();
}

function renderCartSummary() {
    const cartSummaryContainer = document.querySelector('.checkout-cart_content');
    renderCartContents(cartSummaryContainer);
}
