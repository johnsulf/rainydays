import { jackets } from "../models/jackets_list.js";
import { getStars } from "./gen_helpers.js";
import { returnGenderString } from "./gen_helpers.js";

const params = new URLSearchParams(window.location.search);

const jacketsContainer = document.querySelector(".products__cards");
const categoryHeader = document.querySelector(".category-header");

const gender = params.get('gender');

const filteredJackets = gender ? jackets.filter(j => j.gender.includes(gender) || j.gender.includes("unisex")) : jackets;

let html = "";

function renderJackets() {

    for (let i = 0; i < filteredJackets.length; i++) {
        const j = filteredJackets[i];

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

renderJackets();

categoryHeader.innerHTML = returnGenderString(gender);