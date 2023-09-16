import { toggleLoadingIndicator } from "../components/loadingIndicator.js";

import {
    returnGenderString,
    getCheckedOptions,
    filterByColorOrSize,
    filterByRating,
    renderJacketCard,
} from "./gen_helpers.js";

const params = new URLSearchParams(window.location.search);

const jacketsContainer = document.querySelector(".jackets_cards");
const categoryHeader = document.querySelector(".category-header");
const jacketsCardsLoadingContainer = document.querySelector("#cardsLoader");
const gender = params.get('gender');

export let filteredJackets = [];
let jacketsAmountParagraph = document.querySelector('.jackets_amount') ?? {};

let html = "";

const url = "https://wp.erlendjohnsen.com/wp-json/wc/store/products";

async function getJackets() {
    toggleLoadingIndicator(true, jacketsCardsLoadingContainer);
    try {
        const response = await fetch(url);
        const jacketsJson = await response.json();
        filteredJackets = jacketsJson;
        renderJackets();
        toggleLoadingIndicator(false, jacketsCardsLoadingContainer);
    } catch (error) {
        toggleLoadingIndicator(false, jacketsCardsLoadingContainer);
        jacketsContainer.innerHTML = `<p style="padding-block: 8rem;">Something went wrong...</p>`;
        console.log(error);
    }
}

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

    if (gender === 'male') {
        jacketsToRender = jacketsToRender.filter(jacket => jacket.categories.some(category => category.name === 'Male'));
    } else if (gender === 'female') {
        jacketsToRender = jacketsToRender.filter(jacket => jacket.categories.some(category => category.name === 'Female'));
    }

    if (colorFilters.length > 0) {
        jacketsToRender = filterByColorOrSize(jacketsToRender, colorFilters, "Color");
    }

    if (sizeFilters.length > 0) {
        jacketsToRender = filterByColorOrSize(jacketsToRender, sizeFilters, "Size");
    }

    jacketsToRender = filterByRating(jacketsToRender, reviewFilter);

    for (let i = 0; i < jacketsToRender.length; i++) {
        html += renderJacketCard(jacketsToRender[i]);
    }

    jacketsContainer.innerHTML = html;

    const filterElements = document.querySelectorAll('.filter input[type="checkbox"], .filter input[type="radio"]');
    if (filterElements.length > 0) {
        filterElements.forEach(el => {
            el.removeEventListener('change', renderJackets);
            el.addEventListener('change', renderJackets);
        });
    }
    jacketsAmountParagraph.innerHTML = `Showing <span class="text-secondary fw-bold">${jacketsToRender.length}</span> jackets`;
}

document.addEventListener('DOMContentLoaded', () => {
    getJackets();
});

if (categoryHeader) {
    categoryHeader.innerHTML = returnGenderString(gender);
}

