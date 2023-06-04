
document.addEventListener('DOMContentLoaded', () => {
    buildFooter();
});

function buildFooter() {
    const footer = document.querySelector('#footer');
    footer.innerHTML = footer.innerHTML =
        `<div class="footer-links tt-uppercase">
            <a href="/pages/jackets.html" class="text-white">our jackets</a>
            <a href="/pages/about.html" class="text-white">about</a>
            <a href="/pages/contact.html" class="text-white">contact</a>
        </div>
    
        <div class="footer__icons">
            <i class="fa-brands fa-facebook icon"></i>
            <i class="fa-brands fa-twitter icon"></i>
            <i class="fa-brands fa-google icon"></i>
            <i class="fa-brands fa-instagram icon"></i>
        </div>
  
      <p>&copy;RAINYDAYS</p>`;
}