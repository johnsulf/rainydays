import { renderCartContents } from "./helpers/render_cart_content.js";
import { addFormValidation, validateField, clearForm } from "./helpers/form_helpers.js";

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const zipPattern = /^\d{4}$/;

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
});

function initCheckout() {
    renderCartSummary();
    const formFields = document.querySelectorAll('input[required]');
    const submitButton = document.querySelector('#complete-order-cta');
    const emailField = document.querySelector('#email');
    const zipField = document.querySelector('#zip');
    const modal = document.querySelector('dialog[data-modal]');

    addFormValidation(formFields, submitButton, checkField, modal);

    emailField.addEventListener('blur', () => {
        validateField(emailField, emailPattern, 'email-error');
    });

    zipField.addEventListener('blur', () => {
        validateField(zipField, zipPattern, 'zip-error');
    });

    function checkField(field) {
        const radioFields = ['shipping', 'payment'];
        if (field.type === "radio") {
            return document.querySelector(`input[name=${field.name}]:checked`) != null;
        }
        const validValue = field.value.trim() !== '';
        if (field.id === 'zip') {
            return validValue && zipPattern.test(field.value);
        }
        if (field.id === 'email') {
            return validValue && emailPattern.test(field.value);
        }
        return validValue;
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the form from submitting
        if (!submitButton.classList.contains('disabled')) {
            clearLocalStorage();
            clearForm(formFields, submitButton);
        }
    });
}

function renderCartSummary() {
    const cartSummaryContainer = document.querySelector('.checkout-cart_content');
    renderCartContents(cartSummaryContainer);
}

function clearLocalStorage() {
    localStorage.clear(); // this will remove all items in the local storage
    // if you want to only clear the cart, replace with localStorage.removeItem('cart') or whatever the key for the cart is
}
