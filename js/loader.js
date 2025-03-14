// Wait for the page to fully load
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    // Add a class to hide the loader with a fade-out effect
    loader.classList.add('loader-hidden');

    // Optionally, remove the loader from the DOM after the fade-out
    loader.addEventListener('transitionend', function () {
        loader.remove();
    });
});