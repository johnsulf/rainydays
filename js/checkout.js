import { renderCartContents } from "./helpers/render_cart_content.js";

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const zipPattern = /^\d{4}$/;

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
});

function initCheckout() {
    renderCartSummary();
    addFormValidation();
}

function renderCartSummary() {
    const cartSummaryContainer = document.querySelector('.checkout-cart_content');
    renderCartContents(cartSummaryContainer);
}

function addFormValidation() {
    const formFields = document.querySelectorAll('input[required]');
    const submitButton = document.querySelector('#complete-order-cta');
    const emailField = document.querySelector('#email');
    const zipField = document.querySelector('#zip');
    const modal = document.querySelector('dialog[data-modal]');

    formFields.forEach(field => {
        field.addEventListener('input', () => {
            checkFormValidity(formFields, submitButton);
        });
    });

    emailField.addEventListener('blur', () => {
        validateField(emailField, emailPattern, 'email-error');
    });

    zipField.addEventListener('blur', () => {
        validateField(zipField, zipPattern, 'zip-error');
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the form from submitting
        if (!submitButton.classList.contains('disabled')) {
            modal.showModal();
            clearLocalStorage();
            clearForm(formFields);
        }
    });

}

function checkFormValidity(formFields, submitButton) {
    const radioFields = ['shipping', 'payment'];
    const allFieldsValid = [...formFields].every(field => {
        if (field.type === "radio") {
            return document.querySelector(`input[name=${field.name}]:checked`) != null;
        }
        return field.value.trim() !== '';
    });

    const zipFieldValid = zipPattern.test(document.querySelector('#zip').value);
    const allValid = allFieldsValid && zipFieldValid;

    if (allValid) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}

function validateField(field, pattern, errorElementId) {
    const errorElement = document.querySelector('#' + errorElementId);
    const isValid = pattern.test(field.value);

    if (!isValid) {
        field.classList.add('form-error');
        errorElement.classList.remove('hidden');
    } else {
        field.classList.remove('form-error');
        errorElement.classList.add('hidden');
    }
}

function clearLocalStorage() {
    localStorage.clear(); // this will remove all items in the local storage
    // if you want to only clear the cart, replace with localStorage.removeItem('cart') or whatever the key for the cart is
}

function clearForm(formFields) {
    formFields.forEach(field => {
        if (field.type === 'radio') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });
    const submitButton = document.querySelector('#complete-order-cta');
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
}

