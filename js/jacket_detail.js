import { jackets } from "./models/jackets_list.js";
import { getStars } from "./helpers/gen_helpers.js";

let shoppingCart = [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const jacketDetail = document.querySelector(".jacket-detail");
const j = jackets[id];

const allColors = ["grey", "red", "orange", "pink"];
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

                            <button class="cta disabled" id="add-to-chart">add to cart</button>`;

const colorOpts = document.querySelectorAll('.jacket-detail_color_option');
const sizeOpts = document.querySelectorAll('.jacket-detail_size_option');
const cta = document.querySelector('#add-to-chart');

let selectedColor, selectedSize;

colorOpts.forEach(opt => opt.addEventListener('click', (e) => {
    
    if(!opt.classList.contains('faded')) {
        colorOpts.forEach(opt => opt.classList.remove('selected')); 
        opt.classList.add('selected');  
        selectedColor = opt.dataset.value;
        checkSelection();
    }
}));

sizeOpts.forEach(opt => opt.addEventListener('click', (e) => {
    
    if(!opt.classList.contains('faded')) {
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

cta.addEventListener('click', (e) => {
    if (!cta.classList.contains('disabled')) {
        const jacketToAdd = {
            ...j,
            selectedColor: selectedColor,
            selectedSize: selectedSize
        };

        shoppingCart.push(jacketToAdd);

        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        
        document.dispatchEvent(new CustomEvent('cart-updated'));
        
        document.getElementById('dialog-overlay').style.display = 'flex';
    }
});

