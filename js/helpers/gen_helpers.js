export function getStars(stars) {
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