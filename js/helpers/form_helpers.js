export function addFormValidation(formFields, submitButton, fieldValidFunc, modal) {
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            checkFormValidity(formFields, submitButton, fieldValidFunc);
        });
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the form from submitting
        if (!submitButton.classList.contains('disabled')) {
            modal.showModal();
        }
    });
}

export function checkFormValidity(formFields, submitButton, fieldValidFunc) {
    const allFieldsValid = [...formFields].every(fieldValidFunc);

    if (allFieldsValid) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}

export function validateField(field, pattern, errorElementId) {
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

export function clearForm(formFields, submitButton) {
    formFields.forEach(field => {
        if (field.type === 'radio') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
}
