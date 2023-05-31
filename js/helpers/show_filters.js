document.querySelectorAll('.filter-item p').forEach((item) => {
    item.addEventListener('click', function () {
        let options = this.nextElementSibling;
        options.style.display = options.style.display === 'none' ? 'grid' : 'none';
    });
});
