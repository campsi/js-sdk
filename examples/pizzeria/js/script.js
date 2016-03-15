(function ($) {
    $(document).on('campsiready', function () {
        console.info('campsi is ready');
        "use strict";

        //Change Header Style
        function headerStyle() {
            if ($('.main-header').length) {
                var topBanner = $('#main-slider').innerHeight();
                var windowpos = $(window).scrollTop();
                if (windowpos >= topBanner) {
                    $('.main-header').addClass('scrolled');
                    $('.go-to-top').fadeIn(300);
                } else {
                    $('.main-header').removeClass('scrolled');
                    $('.go-to-top').fadeOut(300);
                }
            }
        }

        if ($('#main-slider').length) {
            var topBanner = $('#main-slider').innerHeight();
        }
        if ($(window).scrollTop() >= topBanner) {
            $('.main-header').addClass('scrolled');
        }


        //Hide Loading Box (Preloader)
        function handlePreloader() {
            if ($('.preloader').length) {
                $('.preloader').delay(500).fadeOut(500);
            }
        }


        //Add OnepageNav / Navigation Bar Style One
        function onePageNavOne() {
            if ($('.menu-box .menu').length) {
                $('.menu-box .menu ul').onePageNav();
            }
        }


        //Add OnepageNav / Navigation Bar Style Two
        function onePageNavTwo() {

            if ($('#nav-menu').length) {
                $('#nav-menu .left-nav > ul,#nav-menu .right-nav > ul').onePageNav();
            }
        }


        console.info("main slider init");
        //Main Slider
        if ($('#main-slider').length) {

            jQuery('.tp-banner').show().revolution({
                dottedOverlay: "yes",
                delay: 10000,
                startwidth: 1170,
                startheight: 600,
                hideThumbs: 200,

                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,

                navigationType: "bullet",
                navigationArrows: "0",
                navigationStyle: "preview4",

                touchenabled: "on",
                onHoverStop: "off",

                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,

                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                keyboardNavigation: "off",

                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,

                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,

                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,

                shadow: 0,
                fullWidth: "on",
                fullScreen: "on",

                spinner: "spinner4",

                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,

                shuffle: "off",

                autoHeight: "off",
                forceFullWidth: "on",


                hideThumbsOnMobile: "off",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "on",
                hideArrowsOnMobile: "off",
                hideThumbsUnderResolution: 0,

                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                videoJsPath: "../video/",
                fullScreenOffsetContainer: "#main-slider"
            });


        }

        // Navbar Height for side Nav
        function navbarHeight() {

            if ($('.header-style-one').length) {
                var windowHeight = $(window).height();

                if (windowHeight > 600) {
                    $('.menu-box').css('height', windowHeight);
                }
                if (windowHeight < 600) {
                    $('.header-style-one').css({'position': 'absolute'});
                }
                else {
                    $('.header-style-one').css({'position': 'fixed'});
                }
            }
        }


        // Check Scrren height for Main Menu
        function navbarHeightTwo() {

            if ($('.header-style-two').length) {
                var windowHeight = $(window).height();

                if (windowHeight < 600) {
                    $('.header-style-two').css({'position': 'absolute'});
                }
                else {
                    $('.header-style-two').css({'position': 'fixed'});
                }
            }
        }


        // Navbar Hide / Show
        if ($('.header-style-one').length) {

            $(".header-style-one .menu-toggle").on('click', function () {
                $(this).fadeToggle(500);
                $('.menu-box').toggleClass('appeared');
            });

            $(".header-style-one .collapse-btn").on('click', function () {
                $('.menu-box').toggleClass('appeared');
                $('.header-style-one .menu-toggle').fadeToggle(1000);

            });

            $(".header-style-one ul li .toggle-icon").on('click', function () {
                $(this).parent('li').children('ul').fadeToggle(500);
            });

        }


        // Datepicker
        if ($('.date-picker').length) {
            $('.date-picker').datepicker();
        }


        //Jquery Prettyphoto Lightbox
        function prettyPhoto() {
            $("a[data-rel^='prettyPhoto']").prettyPhoto({
                animation_speed: 'normal',
                slideshow: 3000,
                autoplay_slideshow: false,
                fullscreen: true,
                social_tools: false
            });
        }


        //Testimonial Slider
        if ($('.testimonials').length) {
            $('.testimonials .slider').owlCarousel({
                items: 2,
                loop: true,
                autoplay: true,
                margin: 100,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },

                    600: {
                        items: 1
                    },

                    768: {
                        items: 2
                    },

                    1024: {
                        items: 2
                    },

                    1200: {
                        items: 2
                    },

                    1600: {
                        items: 2
                    }

                }
            });
        }


        //Dish Of the week Slider
        if ($('.dish-of-week').length) {
            $('.dish-of-week .slider').owlCarousel({
                items: 3,
                loop: true,
                autoplay: true,
                nav: true,
                margin: 25,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 3
                    },

                    600: {
                        items: 3
                    },

                    768: {
                        items: 2
                    },

                    1024: {
                        items: 3
                    },

                    1200: {
                        items: 3
                    },

                    1600: {
                        items: 3
                    }

                }
            });
        }


        //Reservation Form Validation
        if ($('#reservation-form').length) {
            $('#reservation-form').validate({ // initialize the plugin
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    date: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    time: {
                        required: true
                    }
                },
                submitHandler: function (form) {
                    alert('Form Submitted');
                    return true;
                }
            });
        }


        //Contact Form Validation
        if ($('#contact-form').length) {
            $('#contact-form').validate({ // initialize the plugin
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true
                    }
                },
                submitHandler: function (form) {
                    alert('Form Submitted');
                    return true;
                }
            });
        }


        // Go to Top
        if ($('.go-to-top').length) {
            $(".go-to-top").on('click', function () {
                // animate
                $('html, body').animate({
                    scrollTop: $('html').offset().top
                }, 1500);

            });
        }


        // Elements Animation
        function elementsAnimations() {
            var wow = new WOW({
                mobile: true
            });
            wow.init();
        }


        /* ==========================================================================
         When document is ready, do
         ========================================================================== */

        $(document).on('ready', function () {
            headerStyle();
            navbarHeight();
            navbarHeightTwo();
            onePageNavOne();
            onePageNavTwo();
            prettyPhoto();
            elementsAnimations();
        });

        /* ==========================================================================
         When document is Scrollig, do
         ========================================================================== */

        $(window).on('scroll', function () {
            headerStyle();
        });

        /* ==========================================================================
         When document is loading, do
         ========================================================================== */

        handlePreloader();

        /* ==========================================================================
         When document is Resize, do
         ========================================================================== */

        $(window).on('resize', function () {
            navbarHeight();
            navbarHeightTwo();
        });

    })
})(window.jQuery);