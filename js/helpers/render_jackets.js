import { jackets } from "../models/jackets_list.js";
import { getStars } from "./gen_helpers.js";
import { returnGenderString } from "./gen_helpers.js";

const params = new URLSearchParams(window.location.search);

const jacketsContainer = document.querySelector(".products__cards");
const categoryHeader = document.querySelector(".category-header");

const gender = params.get('gender');

let filteredJackets = gender ? jackets.filter(j => j.gender.includes(gender) || j.gender.includes("unisex")) : jackets;

let html = "";

function getCheckedOptions(optionType) {
    const checkedOptions = [];
    const allOptions = document.querySelectorAll(`input[name="${optionType}"]:checked`);

    allOptions.forEach(option => {
        checkedOptions.push(option.value);
    });

    return checkedOptions;
}

function getReviewFilter() {
    const reviewFilter = document.getElementById('review-filter');
    return parseFloat(reviewFilter.value);
}

function renderJackets() {
    html = "";  // reset html content

    const colorFilters = getCheckedOptions('color');
    const sizeFilters = getCheckedOptions('size');
    const reviewFilter = getReviewFilter();

    // Always start with the filtered set of jackets based on gender
    let jacketsToRender = [...filteredJackets];

    if (colorFilters.length > 0) {
        jacketsToRender = jacketsToRender.filter(jacket => colorFilters.some(color => jacket.color.includes(color)));
    }

    if (sizeFilters.length > 0) {
        jacketsToRender = jacketsToRender.filter(jacket => jacket.availableSizes.some(sizeObj => sizeFilters.includes(sizeObj.size)));
    }

    jacketsToRender = jacketsToRender.filter(jacket => jacket.stars >= reviewFilter);

    for (let i = 0; i < jacketsToRender.length; i++) {
        const j = jacketsToRender[i];

        let starsHtml = getStars(j.stars);

        html += `<a href="pages/jacket_detail.html" class="products__card">
                    <img src="/assets/images/${j.img}" alt="${j.alt}">
                    <p>${j.manufactor}</p>
                    <p>${j.model}</p>
                    <p>${j.price} $</p>
                    <div class="stars">
                    ${starsHtml}
                    <p>${j.stars}</p>
                    </div>
                </a>`;
    }
    jacketsContainer.innerHTML = html;
}

document.querySelectorAll('.filter input[type="checkbox"], .filter select').forEach(el => {
    el.removeEventListener('change', renderJackets); // remove any previous listeners
    el.addEventListener('change', renderJackets);
});

renderJackets();

categoryHeader.innerHTML = returnGenderString(gender);
