export function getStars(stars) {
    // Convert string to number if necessary
    if (typeof stars === 'string') {
        stars = parseFloat(stars);
    }

    let fullStars = Math.floor(stars); // Full stars
    let hasHalfStar = stars % 1 >= 0.1 ? true : false; // Has half star
    let emptyStars = Math.floor(5 - stars - (hasHalfStar ? 0.1 : 0)); // Empty stars

    let starsHtml = "";

    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i class="fa-solid fa-star fa-xs"></i>`;
    }
    if (hasHalfStar) {
        starsHtml += `<i class="fa-solid fa-star-half-stroke fa-xs"></i>`;
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<i class="fa-regular fa-star fa-xs"></i>`;
    }

    return starsHtml;
}


export function returnGenderString(gender) {
    switch (gender) {
        case 'male':
            return 'Mens Jackets';
        case 'female':
            return 'Women Jackets';
        default:
            return 'All Jackets';
    }
}

export function getCheckedOptions(optionType) {
    const checkedOptions = [];
    const allOptions = document.querySelectorAll(`input[name="${optionType}"]:checked`);
    allOptions.forEach(option => {
        checkedOptions.push(option.value);
    });
    return checkedOptions;
}

export function filterByOptions(jackets, optionType, optionList) {
    return jackets.filter(jacket => optionList.some(option => jacket[optionType].includes(option)));
}

export function filterBySize(jackets, sizeFilters) {
    return jackets.filter(jacket => jacket.availableSizes.some(sizeObj => sizeFilters.includes(sizeObj.size)));
}

export function filterByRating(jackets, ratingFilter) {
    return jackets.filter(jacket => parseFloat(jacket.average_rating) >= ratingFilter);
}

export function renderJacketCard(jacket) {
    let starsHtml = getStars(jacket.average_rating);

    return `<a href="/pages/jacket_detail.html?id=${jacket.id}" class="jackets_cards__card">
                <img src="${jacket.images[0].src}" alt="${jacket.short_description}">
                <p>${jacket.name.split(" ")[0]}</p>
                <p>${jacket.name}</p>
                <p>${jacket.price_html}</p>
                <div class="jackets_cards__card__stars">
                    <p>${starsHtml}</p>
                    <p>${jacket.average_rating}</p>
                </div>
            </a>`;
}


