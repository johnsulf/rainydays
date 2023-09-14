import { getStars } from "./helpers/gen_helpers.js";

let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
let j;

document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    jacketDetail.innerHTML = `<div class="loading-container">
                                <div class="loading-container_loader">
                                    <p>Loading...</p>
                                    <div class="circle1"></div>
                                    <div class="circle2"></div>
                                </div>
                            </div>`;

    let dataLoaded = false;
    let shouldPopulate = false;
    let fetchError = false;

    setTimeout(() => {
        if (dataLoaded) {
            populateJacketDetails();
            addColorListener();
            addSizeListener();
            addAddToCartListener();
        } else if (fetchError) {
            jacketDetail.innerHTML = `<p>Something went wrong...</p>`;
        } else {
            shouldPopulate = true;
        }
    }, 2000);

    try {
        const response = await fetch(`https://wp.erlendjohnsen.com/wp-json/wc/store/products/${id}`);
        if (response.ok) {
            j = await response.json();
            console.log("Jacket:", j);
            dataLoaded = true;
            if (shouldPopulate) {
                populateJacketDetails();
            }
        } else {
            throw new Error("Failed to fetch");
        }
    } catch (error) {
        fetchError = true;
        if (shouldPopulate) {
            jacketDetail.innerHTML = `<p>Something went wrong...</p>`;
        }
        console.log("Error fetching specific jacket:", error);
    }

});

const jacketDetail = document.querySelector(".jacket-detail");
const allColors = ["Grey", "Red", "Orange", "Blue", "Pink"];
const allSizes = ["Small", "Medium", "Large", "X-Large"];

function generateColorOptions(colors) {
    return colors.map(color => {
        let isAvailable = j.attributes[0].terms.some(c => c.name === color);
        return `<span class="jacket-detail_color_option bg-${color} ${isAvailable ? '' : 'faded'}" 
                    data-value="${color}" ${isAvailable ? '' : 'disabled'}>
                 </span>`;
    }).join('');
}

function generateSizeOptions(sizes) {
    return sizes.map(size => {
        let isAvailable = j.attributes[1].terms.some(s => s.name === size);
        return `<div class="jacket-detail_size_option ${isAvailable ? '' : 'faded'}" 
                    data-value="${size}" ${isAvailable ? '' : 'disabled'}>
                    <p class="fs-tertiary-h">${size.charAt(0)}<p>
                 </div>`;
    }).join('');
}

function populateJacketDetails() {
    jacketDetail.innerHTML = `<div class="jacket-detail_img-stars">
                                <img src="${j.images[0].src}" alt="${j.description}" class="jacket-detail_img">
                                <div class="jacket-detail_stars">
                                    <p>${getStars(j.average_rating)}</p>
                                    <p>${j.average_rating}</p>
                                </div>
                            </div>
                            <div class="jacket-detail_info">
                                <h1>${j.name}</h1>
                                <p>${j.name.split(" ")[0]}</p>
                                <p class="jacket-detail_price">${j.price_html}</p>
                                <p class="fs-body text-primary fw-bold margin-top-50">Pick color</p>
                                <div class="jacket-detail_color">${generateColorOptions(allColors)}</div>
                                <p class="fs-body text-primary fw-bold margin-top-50">Choose size</p>
                                <div class="jacket-detail_size">${generateSizeOptions(allSizes)}</div>
                                <button class="cta disabled margin-block-200 fs-body" id="add-to-chart">add to cart</button>
                            </div>`;
}

let selectedColor, selectedSize;

function addColorListener() {
    document.querySelectorAll('.jacket-detail_color_option').forEach(opt => opt.addEventListener('click', (e) => {
        if (!opt.classList.contains('faded')) {
            document.querySelectorAll('.jacket-detail_color_option').forEach(opt => opt.classList.remove('selected'));
            opt.classList.add('selected');
            selectedColor = opt.dataset.value;
            checkSelection();
        }
    }));
}

function addSizeListener() {
    document.querySelectorAll('.jacket-detail_size_option').forEach(opt => opt.addEventListener('click', (e) => {
        if (!opt.classList.contains('faded')) {
            document.querySelectorAll('.jacket-detail_size_option').forEach(opt => opt.classList.remove('selected'));
            opt.classList.add('selected');
            selectedSize = opt.dataset.value;
            checkSelection();
        }
    }));
}

function checkSelection() {
    const cta = document.querySelector('#add-to-chart');
    if (selectedColor && selectedSize) {
        cta.classList.remove('disabled');
    } else {
        cta.classList.add('disabled');
    }
}

function addAddToCartListener() {
document.querySelector('#add-to-chart').addEventListener('click', () => {
    const cta = document.querySelector('#add-to-chart');
    if (!cta.classList.contains('disabled')) {
        shoppingCart.push({ ...j, selectedColor, selectedSize });
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        document.dispatchEvent(new CustomEvent('cart-updated'));
        document.querySelector("[data-modal]").showModal()
    }
});
}

document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.querySelector("[data-modal]");
    if (modalElement) {
        modalElement.addEventListener('click', () => {
            modalElement.close();
        });
    }
});
