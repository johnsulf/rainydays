import { getStars } from "./helpers/gen_helpers.js";

let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const id = new URLSearchParams(window.location.search).get('id');

async function getSpecificJacket(id) {
    try {
        const response = await fetch(`https://wp.erlendjohnsen.com/wp-json/wc/store/products/${id}`);
        const jacket = await response.json();
        console.log("API response:", jacket);  // Debugging line
        return jacket;
    } catch (error) {
        console.log("Error fetching specific jacket:", error);
    }
}


let j; // Declare j here so it can be accessed in other functions

document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    j = await getSpecificJacket(id); // Assign the fetched jacket to j
    console.log("Fetched jacket:", j);
    populateJacketDetails(); // Call a function to populate the details
});

const jacketDetail = document.querySelector(".jacket-detail");
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

function populateJacketDetails() {
    jacketDetail.innerHTML = `<div class="jacket-detail_img-stars">
                            <img src="/assets/images/${j.images[0].src}" alt="${j.short_descriptiont}" class="jacket-detail_img">
                            <div class="jacket-detail_stars">
                                <p>${getStars(j.average_rating)}</p>
                                <p>${j.average_rating}</p>
                            </div>
                        </div>
                        <div class="jacket-detail_info">
                            <h1>${j.name}</h1>
                            <p>${j.jacket.name.split(" ")[0]}</p>
                            <p class="jacket-detail_price">${j.price_html} $</p>
                            <p class="fs-body text-primary fw-bold margin-top-50">Pick color</p>
                            <div class="jacket-detail_color">${generateColorOptions(allColors)}</div>
                            <p class="fs-body text-primary fw-bold margin-top-50">Choose size</p>
                            <div class="jacket-detail_size">${generateSizeOptions(allSizes)}</div>
                            <button class="cta disabled margin-block-200 fs-body" id="add-to-chart">add to cart</button>
                        </div>`;
}

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

document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.querySelector("[data-modal]");
    if (modalElement) {
        modalElement.addEventListener('click', () => {
            modalElement.close();
        });
    }
});
