import { jackets } from "../models/jackets_list.js";
import {
    returnGenderString,
    getCheckedOptions,
    filterByOptions,
    filterBySize,
    filterByRating,
    renderJacketCard
} from "./gen_helpers.js";

const params = new URLSearchParams(window.location.search);

const jacketsContainer = document.querySelector(".jackets_cards");
const categoryHeader = document.querySelector(".category-header");

const gender = params.get('gender');

let filteredJackets = gender ? jackets.filter(j => j.gender.includes(gender) || j.gender.includes("unisex")) : jackets;
let jacketsAmountParagraph = document.querySelector('.jackets_amount');

let html = "";

function getReviewFilter() {
    const reviewFilters = document.getElementsByName('reviews');
    let reviewFilter = 0;

    reviewFilters.forEach(filter => {
        if (filter.checked) {
            reviewFilter = parseFloat(filter.value);
        }
    });

    return reviewFilter;
}

function renderJackets() {
    html = "";

    const colorFilters = getCheckedOptions('color');
    const sizeFilters = getCheckedOptions('size');
    const reviewFilter = getReviewFilter();

    let jacketsToRender = [...filteredJackets];

    if (colorFilters.length > 0) {
        jacketsToRender = filterByOptions(jacketsToRender, 'color', colorFilters);
    }

    if (sizeFilters.length > 0) {
        jacketsToRender = filterBySize(jacketsToRender, sizeFilters);
    }

    jacketsToRender = filterByRating(jacketsToRender, reviewFilter);

    for (let i = 0; i < jacketsToRender.length; i++) {
        html += renderJacketCard(jacketsToRender[i]);
    }

    jacketsContainer.innerHTML = html;

    // Add event listeners to checkboxes, and radio buttons
    const filterElements = document.querySelectorAll('.filter input[type="checkbox"], .filter input[type="radio"]');
    if (filterElements.length > 0) {
        filterElements.forEach(el => {
            el.removeEventListener('change', renderJackets);
            el.addEventListener('change', renderJackets);
        });
    }

    jacketsAmountParagraph.innerHTML = `Showing <span class="text-secondary fw-bold">${jacketsToRender.length}</span> jackets`;
}

// Call renderJackets at the end of the file or inside DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    renderJackets();
});



if (categoryHeader) {
    categoryHeader.innerHTML = returnGenderString(gender);
}

