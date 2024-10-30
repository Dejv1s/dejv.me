$(document).ready(function() {
    $('#stars').height($(document).height());
    for (var i = 0; i < 200; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')';
        document.getElementById('stars').appendChild(star);
    }
});