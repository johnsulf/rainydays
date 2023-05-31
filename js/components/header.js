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
            <a href="/">
                <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <a href="pages/checkout.html">
                <i class="fa-solid fa-cart-shopping"></i>
            </a>
        </div>
    `;

    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    menuClose.addEventListener('click', function (event) {
        event.preventDefault();
        navLinks.classList.remove('show');
    });
});
