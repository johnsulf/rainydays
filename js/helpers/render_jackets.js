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

const jacketsContainer = document.querySelector(".products_cards");
const categoryHeader = document.querySelector(".category-header");

const gender = params.get('gender');

let filteredJackets = gender ? jackets.filter(j => j.gender.includes(gender) || j.gender.includes("unisex")) : jackets;

let html = "";

function getReviewFilter() {
    const reviewFilter = document.getElementById('review-filter');
    return reviewFilter ? parseFloat(reviewFilter.value) : 0;
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

    const filterElements = document.querySelectorAll('.filter input[type="checkbox"], .filter select');
    if (filterElements.length > 0) {
        filterElements.forEach(el => {
            el.addEventListener('change', renderJackets);
        });
    }
}

renderJackets();

if (categoryHeader) {
    categoryHeader.innerHTML = returnGenderString(gender);
}

