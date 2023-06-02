import { jackets } from "./models/jackets_list.js";
import { getStars } from "./helpers/gen_helpers.js";

let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const id = new URLSearchParams(window.location.search).get('id');

const jacketDetail = document.querySelector(".jacket-detail");
const j = jackets[id];
const allColors = ["grey", "red", "orange", "blue", "pink"];
const allSizes = ["S", "M", "L", "XL"];

function generateColorOptions(colors) {
    return colors.map(color => {
        let isAvailable = j.color.includes(color);
        return `<span class="jacket-detail_color_option bg-${color} ${isAvailable ? '' : 'faded'}" 
                    data-value="${color}" ${isAvailable ? '' : 'disabled'}>
                 </span>`;
    }).join('');
}

function generateSizeOptions(sizes) {
    return sizes.map(size => {
        let isAvailable = j.availableSizes.some(s => s.size === size && s.quantity > 0);
        return `<div class="jacket-detail_size_option ${isAvailable ? '' : 'faded'}" 
                    data-value="${size}" ${isAvailable ? '' : 'disabled'}>
                    <p class="fs-tertiary-h">${size}<p>
                 </div>`;
    }).join('');
}

jacketDetail.innerHTML = `
    <img src="/assets/images/${j.img}" alt="${j.alt}" class="jacket-detail_img">
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
    <div class="jacket-detail_color">${generateColorOptions(allColors)}</div>
    <p class="fs-body-medium">Choose size</p>
    <div class="jacket-detail_size">${generateSizeOptions(allSizes)}</div>
    <button class="cta disabled margin-block-200" id="add-to-chart">add to cart</button>`;

let selectedColor, selectedSize;

document.querySelectorAll('.jacket-detail_color_option').forEach(opt => opt.addEventListener('click', (e) => {
    if (!opt.classList.contains('faded')) {
        document.querySelectorAll('.jacket-detail_color_option').forEach(opt => opt.classList.remove('selected'));
        opt.classList.add('selected');
        selectedColor = opt.dataset.value;
        checkSelection();
    }
}));

document.querySelectorAll('.jacket-detail_size_option').forEach(opt => opt.addEventListener('click', (e) => {
    if (!opt.classList.contains('faded')) {
        document.querySelectorAll('.jacket-detail_size_option').forEach(opt => opt.classList.remove('selected'));
        opt.classList.add('selected');
        selectedSize = opt.dataset.value;
        checkSelection();
    }
}));

function checkSelection() {
    const cta = document.querySelector('#add-to-chart');
    if (selectedColor && selectedSize) {
        cta.classList.remove('disabled');
    } else {
        cta.classList.add('disabled');
    }
}

document.querySelector('#add-to-chart').addEventListener('click', () => {
    const cta = document.querySelector('#add-to-chart');
    if (!cta.classList.contains('disabled')) {
        shoppingCart.push({ ...j, selectedColor, selectedSize });
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        document.dispatchEvent(new CustomEvent('cart-updated'));
        document.querySelector("[data-modal]").showModal()
    }
});

document.querySelector("[data-close-modal]").addEventListener('click', () => {
    document.querySelector("[data-modal]").close();
});
