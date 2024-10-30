$(document).ready(function() {
    // Animate the progress bars
    $('.progress-bar1, .progress-bar2, .progress-bar3, .progress-bar4, .progress-bar5').each(function(index) {
        var $this = $(this);
        var width = $this.data('width');
        $this.css('width', '0%');
        setTimeout(function() {
            $this.animate({
                width: width
            }, 2000);
        }, index * 100);
    });
});