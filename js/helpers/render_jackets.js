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

export let filteredJackets = [];
let jacketsAmountParagraph = document.querySelector('.jackets_amount') ?? {};

let html = "";

const url = "https://wp.erlendjohnsen.com/wp-json/wc/store/products";

async function getJackets() {
    jacketsContainer.innerHTML = `<div class="loading-container">
                                    <div class="loading-container_loader">
                                        <p>Loading...</p>
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                    </div>
                                  </div>`
    try {
        const response = await fetch(url);
        const jacketsJson = await response.json();
        filteredJackets = jacketsJson;
        renderJackets();
    } catch (error) {
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

