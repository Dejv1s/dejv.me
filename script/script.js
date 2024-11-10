//Made by David Stuchlík 2024 ©

// scrollbar
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});
// Hamburger Menu
document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});
// Responsive
$(window).resize(function(){
    console.log($(window).width());
});
