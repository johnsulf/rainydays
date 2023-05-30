import { jackets } from "../models/jackets_list.js";
import {
    getStars,
    returnGenderString,
    getCheckedOptions,
    filterByOptions,
    filterBySize,
    filterByRating,
    renderJacketCard
} from "./gen_helpers.js";

const params = new URLSearchParams(window.location.search);

const jacketsContainer = document.querySelector(".products__cards");
const categoryHeader = document.querySelector(".category-header");

const gender = params.get('gender');

let filteredJackets = gender ? jackets.filter(j => j.gender.includes(gender) || j.gender.includes("unisex")) : jackets;

let html = "";

function getReviewFilter() {
    const reviewFilter = document.getElementById('review-filter');
    return parseFloat(reviewFilter.value);
}

function renderJackets() {
    html = "";  // reset html content

    const colorFilters = getCheckedOptions('color');
    const sizeFilters = getCheckedOptions('size');
    const reviewFilter = getReviewFilter();

    // Always start with the full set of jackets
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

    document.querySelectorAll('.filter input[type="checkbox"], .filter select').forEach(el => {
        el.addEventListener('change', renderJackets);
    });
}

renderJackets();

categoryHeader.innerHTML = returnGenderString(gender);
