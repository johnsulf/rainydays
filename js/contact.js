import { clearForm } from "./helpers/form_helpers.js";

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const formFields = Array.from(document.querySelectorAll('input[required], textarea[required]'));
    const submitButton = document.querySelector('#send-message');
    const modal = document.querySelector('dialog[data-modal]');
    const form = document.querySelector('#contact-form');

    formFields.forEach((field) => {
        field.addEventListener('input', () => {
            validateField(field);

            const allValid = formFields.every((field) => validateField(field));
            if (allValid) {
                submitButton.classList.remove('disabled');
            } else {
                submitButton.classList.add('disabled');
            }
        });
    });


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const allValid = formFields.every((field) => validateField(field));

        if (allValid) {
            modal.showModal();
            clearForm(formFields, submitButton);
        }
    });
}

function validateField(field) {
    const validValue = field.value.trim() !== '';
    const errorElement = document.querySelector(`#${field.id}-error`);

    let isValid = false;
    if (field.id === 'email') {
        isValid = validValue && emailPattern.test(field.value);
    } else {
        isValid = validValue;
    }

    if (isValid) {
        field.classList.remove('form-error');
        errorElement && errorElement.classList.add('hidden');
    } else {
        field.classList.add('form-error');
        errorElement && errorElement.classList.remove('hidden');
    }

    return isValid;
}

