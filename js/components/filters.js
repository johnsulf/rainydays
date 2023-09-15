
document.addEventListener('DOMContentLoaded', () => {
    buildFilters();
    showFilters();
});

const filtersContainer = document.querySelector(".filter");

function buildFilters() {
    filtersContainer.innerHTML =
        `<div class="filter-item" id="color-filter-item">
        <p class="fw-bold">
            <span class="filter-label">Color</span>
            <span class="filter-arrow">&darr;</span>
        </p>
        <div class="filter-options" id="color-filter-options">
            <div class="filter-options_option">
                <input type="checkbox" id="grey" name="color" value="grey">
                <label for="grey">Grey</label>
                <span class="filter-options_colordot bg-grey"></span>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="orange" name="color" value="orange">
                <label for="orange">Orange</label>
                <span class="filter-options_colordot bg-orange"></span>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="red" name="color" value="red">
                <label for="red">Red</label>
                <span class="filter-options_colordot bg-red"></span>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="pink" name="color" value="pink">
                <label for="pink">Pink</label>
                <span class="filter-options_colordot bg-pink"></span>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="blue" name="color" value="blue">
                <label for="blue">Blue</label>
                <span class="filter-options_colordot bg-blue"></span>
            </div>
        </div>
    </div>

    <div class="filter-item" id="size-filter-item">
        <p class="fw-bold">
            <span class="filter-label">Size</span>
            <span class="filter-arrow">&darr;</span>
        </p>
        <div class="filter-options" id="size-filter-options">
            <div class="filter-options_option">
                <input type="checkbox" id="S" name="size" value="S">
                <label for="S">Small</label>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="M" name="size" value="M">
                <label for="M">Medium</label>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="L" name="size" value="L">
                <label for="L">Large</label>
            </div>
            <div class="filter-options_option">
                <input type="checkbox" id="XL" name="size" value="XL">
                <label for="XL">X-Large</label>
            </div>
        </div>
    </div>

    <div class="filter-item" id="review-filter-item">
        <p class="fw-bold">
            <span class="filter-label">Review</span>
            <span class="filter-arrow">&darr;</span>
        </p>
        <div class="filter-options" id="review-filter-options">
            <div class="filter-options_option">
                <input type="radio" id="all" name="reviews" value="0">
                <label for="all">All</label>
            </div>
            <div class="filter-options_option">
                <input type="radio" id="1-star" name="reviews" value="1">
                <label for="1-star">1+</label>
            </div>
            <div class="filter-options_option">
                <input type="radio" id="2-star" name="reviews" value="2">
                <label for="2-star">2+</label>
            </div>
            <div class="filter-options_option">
                <input type="radio" id="3-star" name="reviews" value="3">
                <label for="3-star">3+</label>
            </div>
            <div class="filter-options_option">
                <input type="radio" id="4-star" name="reviews" value="4">
                <label for="4-star">4+</label>
            </div>
            <div class="filter-options_option">
                <input type="radio" id="5-star" name="reviews" value="5">
                <label for="5-star">5</label>
            </div>
        </div>
    </div>`;
}

function showFilters() {
    document.querySelectorAll('.filter-item').forEach((item) => {
        item.addEventListener('click', function (event) {
            let options = this.querySelector('.filter-options');
            let arrow = this.querySelector('.filter-arrow');
            if (options.style.display === 'none' || options.style.display === '') {
                options.style.display = 'grid';
                options.classList.remove('slideOutUp');
                options.classList.add('slideInDown');
                this.classList.add('active');
                arrow.innerHTML = '&uarr;';
            } else {
                options.classList.remove('slideInDown');
                options.classList.add('slideOutUp');
                setTimeout(() => {
                    options.style.display = 'none';
                }, 500);
                this.classList.remove('active');
                arrow.innerHTML = '&darr;';
            }
        });

        item.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        });
    });
}