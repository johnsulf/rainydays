import { jackets } from "./models/jackets_list.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const jacketDetail = document.querySelector(".jacket-detail");
const j = jackets[id];

jacketDetail.innerHTML = `<img src="/assets/images/${j.img}" alt="${j.alt}" class="product_info__image">
                            <div class="stars">
                            <i class="fa-solid fa-star fa-xs"></i>
                            <i class="fa-solid fa-star fa-xs"></i>
                            <i class="fa-solid fa-star fa-xs"></i>
                            <i class="fa-solid fa-star fa-xs"></i>
                            <i class="fa-solid fa-star-half-stroke fa-xs"></i>
                            <p>${j.stars}</p>
                            </div>
                            <div class="product_info__info">
                            <h1>${j.model}</h1>
                            <p class="product_info__price">${j.price} $</p>
                            <p>Pick color</p>
                            <div class="product_info__color">
                                <span id="grey-bg"></span>
                                <span id="darkblue-bg"></span>
                                <span id="lightblue-bg"></span>
                                <span id="darkred-bg"></span>
                                <span id="lightred-bg"></span>
                            </div>
                            <p>Choose size</p>
                            <div class="product_info__size">
                                <p class="product_info__size__size">xs</p>
                                <p class="product_info__size__size">s</p>
                                <p class="product_info__size__size">m</p>
                                <p class="product_info__size__size">l</p>
                                <p class="product_info__size__size">xl</p>
                                <p class="product_info__size__size">xxl</p>
                            </div>
                            <a href="/pages/checkout.html" class="cta">add to cart</a>
                            </div>`;