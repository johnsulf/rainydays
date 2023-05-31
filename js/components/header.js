import { jackets } from '../models/jackets_list.js';

document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('#header');

    header.innerHTML = `
        <a href="#" class="menu-toggle">
            <i class="fa fa-bars"></i>
        </a>
        <a href="/" class="tt-uppercase fs-secondary-h">rainydays</a>
        <nav class="nav-links tt-uppercase">
            <a href="#" class="menu-close">
                <i class="fa fa-times"></i>
            </a>
            <a href="/pages/jackets.html?gender=male">men</a>
            <a href="/pages/jackets.html?gender=female">women</a>
            <a href="/pages/about.html">about</a>
            <a href="/pages/contact.html">contact</a>
        </nav>
        <div class="nav-icons">
            <div>
                <i class="fa-solid fa-magnifying-glass"></i>
                <div class="search">
                    <input type="text" id="search-input" placeholder="Search..." />
                    <div id="search-results"></div>
                </div>
            </div>
            <a href="pages/checkout.html">
                <i class="fa-solid fa-cart-shopping"></i>
            </a>
        </div>
    `;

    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const searchContainer = document.querySelector('.search');
    const searchInput = document.querySelector('#search-input');
    const searchResultsContainer = document.querySelector('#search-results');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    menuClose.addEventListener('click', function (event) {
        event.preventDefault();
        navLinks.classList.remove('show');
    });

    searchIcon.addEventListener('click', function () {
        searchContainer.classList.toggle('show');
        if (searchContainer.classList.contains('show')) {
            searchInput.focus();
        }
    });


    searchInput.addEventListener('input', function (event) {
        const searchTerm = event.target.value.toLowerCase();

        const results = jackets.filter(jacket => {
            return jacket.manufactor.toLowerCase().includes(searchTerm) ||
                jacket.model.toLowerCase().includes(searchTerm);
        });

        displayResults(results);
    });

    function displayResults(results) {
        let html = '';

        results.forEach(result => {
            html += `<a class="search-result" href="/pages/jacket_detail.html">      
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
});


