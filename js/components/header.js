
import { jackets } from '../models/jackets_list.js';
import { renderCartContents } from "../helpers/render_cart_content.js";

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});

function initHeader() {
    buildHeader();
    handleSearch();
    handleCart();
    document.dispatchEvent(new CustomEvent('cart-updated'));
}

function buildHeader() {
    const header = document.querySelector('#header');
    header.innerHTML = header.innerHTML =
        `<a href="#" class="menu-toggle">
        <i class="fa fa-bars"></i>
    </a>
    <a href="/" class="tt-uppercase fs-secondary-h">rainydays</a>
    <nav class="nav-links tt-uppercase">
        <a href="#" class="menu-close">
            <i class="fa fa-times"></i>
        </a>
        <a href="/pages/jackets.html">all jackets</a>
        <a href="/pages/jackets.html?gender=male">men</a>
        <a href="/pages/jackets.html?gender=female">women</a>
        <a href="/pages/about.html">about</a>
        <a href="/pages/contact.html">contact</a>
    </nav>
    <div class="nav-icons">
        <div>
            <i class="fa-solid fa-magnifying-glass text-primary"></i>
            <div class="search">
                <input type="text" id="search-input" placeholder="Search..." />
                <div id="search-results"></div>
            </div>
        </div>  
        <div class="nav-icons_cart">
            <div class="nav-icons_cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="cart-counter">0</span>
            </div>
            <div class="cart"></div>
        </div>
    </div>`;

    // handle menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // handle menu close
    const menuClose = document.querySelector('.menu-close');
    menuClose.addEventListener('click', (event) => {
        event.preventDefault();
        navLinks.classList.remove('show');
    });
}

function handleSearch() {
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const searchContainer = document.querySelector('.search');
    const searchInput = document.querySelector('#search-input');

    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('show');
        if (searchContainer.classList.contains('show')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const results = jackets.filter(jacket => jacket.manufactor.toLowerCase().includes(searchTerm) ||
            jacket.model.toLowerCase().includes(searchTerm));
        displaySearchResults(results);
    });
}

function displaySearchResults(results) {
    const searchResultsContainer = document.querySelector('#search-results');
    let html = '';

    results.forEach(result => {
        html += `<a class="search-result" href="/pages/jacket_detail.html?id=${result.id}">      
                    <img class="search-result_img" src="/assets/images/${result.img}">
                    <div class="search-result_info">
                        <p class="search-result_title">${result.model}</p>
                        <p class="search-result_subtitle">${result.manufactor}</p>
                    </div>
                </a>
                <hr>`;
    });

    searchResultsContainer.innerHTML = html;
}

function handleCart() {
    const cartIcon = document.querySelector('.nav-icons_cart');
    cartIcon.addEventListener('click', toggleCart);
}

function toggleCart() {
    const cartContainer = document.querySelector('.cart');
    if (cartContainer.classList.contains('show')) {
        hideCart(cartContainer);
    } else {
        showCart(cartContainer);
    }
}

function showCart(cartContainer) {
    cartContainer.classList.add('show');
    renderCartContents(cartContainer);
}

function hideCart(cartContainer) {
    cartContainer.classList.remove('show');
}

document.addEventListener('cart-updated', function () {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartCounter = document.querySelector('.cart-counter');
    cartCounter.textContent = shoppingCart.length;
});