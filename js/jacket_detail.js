import { jackets } from "./models/jackets_list.js";
import { getStars } from "./helpers/gen_helpers.js";

// get the current shopping cart from local storage if it exists, otherwise start with an empty array
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const jacketDetail = document.querySelector(".jacket-detail");
const j = jackets[id];

const allColors = ["grey", "red", "orange", "blue", "pink"];
const allSizes = ["S", "M", "L", "XL"];

const colorOptions = allColors.map(color => {
    let isAvailable = j.color.includes(color);
    let colorHtml = `<span class="jacket-detail_color_option bg-${color} ${isAvailable ? '' : 'faded'}" 
                        data-value="${color}" ${isAvailable ? '' : 'disabled'}>
                     </span>`;
    return colorHtml;
}).join('');

const sizeOptions = allSizes.map(size => {
    let isAvailable = j.availableSizes.some(s => s.size === size && s.quantity > 0);
    let sizeHtml = `<div class="jacket-detail_size_option ${isAvailable ? '' : 'faded'}" 
                        data-value="${size}" ${isAvailable ? '' : 'disabled'}>
                        <p class="fs-tertiary-h">${size}<p>
                     </div>`;
    return sizeHtml;
}).join('');

jacketDetail.innerHTML = `<img src="/assets/images/${j.img}" alt="${j.alt}" class="jacket-detail_img">
                            <div class="jacket-detail_stars">
                                <p>${getStars(j.stars)}</p>
                                <p>${j.stars}</p>
                            </div>

                            <div class="jacket-detail_info">
                                <h1>${j.model}</h1>
                                <p>${j.manufactor}</p>
                                <p class="jacket-detail_price">${j.price} $</p>
                            </div>

                            <p class="fs-body-medium">Pick color</p>
                            <div class="jacket-detail_color">
                                ${colorOptions}
                            </div>

                            <p class="fs-body-medium">Choose size</p>
                            <div class="jacket-detail_size">
                                ${sizeOptions}
                            </div>

                            <button class="cta disabled margin-block-200" id="add-to-chart">add to cart</button>`;

const colorOpts = document.querySelectorAll('.jacket-detail_color_option');
const sizeOpts = document.querySelectorAll('.jacket-detail_size_option');
const cta = document.querySelector('#add-to-chart');
const modal = document.querySelector("[data-modal]")
const closeModal = document.querySelector("[data-close-modal]")

let selectedColor, selectedSize;

colorOpts.forEach(opt => opt.addEventListener('click', (e) => {

    if (!opt.classList.contains('faded')) {
        colorOpts.forEach(opt => opt.classList.remove('selected'));
        opt.classList.add('selected');
        selectedColor = opt.dataset.value;
        checkSelection();
    }
}));

sizeOpts.forEach(opt => opt.addEventListener('click', (e) => {

    if (!opt.classList.contains('faded')) {
        sizeOpts.forEach(opt => opt.classList.remove('selected'));
        opt.classList.add('selected');
        selectedSize = opt.dataset.value;
        checkSelection();
    }
}));

function checkSelection() {
    if (selectedColor && selectedSize
        && !document.querySelector('.jacket-detail_color_option.selected.faded')
        && !document.querySelector('.jacket-detail_size_option.selected.faded')) {
        cta.classList.remove('disabled');
    } else {
        cta.classList.add('disabled');
    }
}

cta.addEventListener('click', () => {
    if (!cta.classList.contains('disabled')) {
        const jacketToAdd = {
            ...j,
            selectedColor: selectedColor,
            selectedSize: selectedSize
        };

        shoppingCart.push(jacketToAdd);

        // save the updated shoppingCart back to local storage
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

        // dispatch the event after shopping cart update
        document.dispatchEvent(new CustomEvent('cart-updated'));
        modal.showModal()
    }
});

closeModal.addEventListener('click', () => { modal.close() });

