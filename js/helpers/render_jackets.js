import { jackets } from "../models/jackets_list.js";

const jacketsContainer = document.querySelector(".products__cards");

let html = "";

export function renderJackets(numberOfJackets) {
    for (let i = 0; i < numberOfJackets; i++) {
        const j = jackets[i];

        let starsHtml = "";
        let fullStars = Math.floor(j.stars); // Full stars
        let halfStar = j.stars % 1 >= 0.1 ? true : false;

        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<i class="fa-solid fa-star fa-xs"></i>`;
        }

        if (halfStar) {
            starsHtml += `<i class="fa-solid fa-star-half-stroke fa-xs"></i>`;
        }

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