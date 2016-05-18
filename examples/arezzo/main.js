(function () {
    var $services = $('#services');
    var $carousel = $('#carousel');

    var selectedServiceIndex;
    var $slides;
    var activeSlideIndex;
    var nextSlideIndex;

    $services.on('click', 'li a', function () {
        selectedServiceIndex = $(this).parent().index();
        $services.find('li a')
            .removeClass('active')
            .eq(selectedServiceIndex)
            .addClass('active');

        $services.find('.services .service')
            .removeClass('active')
            .eq(selectedServiceIndex)
            .addClass('active');
    });


    $carousel.on('click', '.next', function () {
        beforeSlide();
        nextSlideIndex = (activeSlideIndex < ($slides.length - 1)) ? activeSlideIndex + 1 : 0;
        moveSlide(nextSlideIndex);
    }).on('click', '.prev', function () {
        beforeSlide();
        nextSlideIndex = activeSlideIndex > 0 ? activeSlideIndex - 1 : $slides.length - 1;
        moveSlide(nextSlideIndex);
    });

    function beforeSlide() {
        $slides = $carousel.find('.slide');
        activeSlideIndex = $slides.filter('.active').index();
    }

    function moveSlide(activeIndex) {
        $slides.removeClass('active prev next').each(function (i, slide) {
            if (i < activeIndex) {
                $(slide).addClass('prev');
            } else if (i > activeIndex) {
                $(slide).addClass('next');
            } else {
                $(slide).addClass('active');
            }
        });
    }

    var $body = $('body');

    $(window).on('scroll', function () {
        $body.toggleClass('scroll', $(this).scrollTop() > 0);
    });
})();
