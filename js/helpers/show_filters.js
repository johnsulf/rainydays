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
            }, 500); // Matches the duration of the animation
            this.classList.remove('active');
            arrow.innerHTML = '&darr;';
        }
    });

    // Stop propagation on checkboxes
    item.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});
