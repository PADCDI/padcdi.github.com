jQuery(function($) {
    /**
     * Other UI
     */
    (function() {
        /**
         * Particles, that moving circle and line effect
         */
        $(window).on('particles-init', function(e, target) {
            require.load(
                [
                    'cdn/scripts/particles.min.js',
                    'cdn/json/particles.json'
                ],
                function(particles, config) {
                    particlesJS('particles', config);
                }
            );
        });

        /**
         * Loader
         */
        $(window).on('load', function() {
            $("#preloder div.loader").fadeOut();
            $("#preloder").delay(400).fadeOut("slow");
        });

        /**
         * Responsive Menu
         */
        $(window).on('burger-click', function(e, trigger) {
            $(trigger).next().slideToggle(400);
            e.preventDefault();
        });

        /**
         * Owl Carousel
         */
        $(window).on('owl-carousel-init', function(e, target) {
            require.load(
                'cdn/scripts/owl.carousel.min.js',
                function() {
                    var items = ($(target).data('items') || '1|2|2|2').split('|');

                    $(target).owlCarousel({
                        loop: true,
                        autoplay: true,
                        margin: 30,
                        nav: false,
                        dots: true,
                        responsive:{
                            0:{
                                items: items[0]
                            },
                            600:{
                                items: items[1]
                            },
                            800:{
                                items: items[2]
                            },
                            1000:{
                                items: items[3]
                            }
                        }
                    });
                }
            );
        });
    })();

    /**
     * Notifier
     */
    (function() {
        $(window).on('notify-init', function(e, trigger) {
            var timeout = parseInt($(trigger).attr('data-timeout') || 3000);

            if(!timeout) {
                return;
            }

            setTimeout(function() {
                $(trigger).fadeOut('fast', function() {
                    $(trigger).remove();
                });

            }, timeout);
        });

        $.extend({
            notify: function(message, type, timeout) {
                if(type === 'danger') {
                    type = 'error';
                }

                var toast = toastr[type](message, type[0].toUpperCase() + type.substr(1), {
                    timeOut: timeout
                });

                return toast;
            }
        });
    })();

    /**
     * Initialize
     */
    (function() {
        var cdn = $('html').attr('data-cdn') || '';
        // configure require
        require.config({
            cdn: {
                root : cdn
            },
            components: {
                root : cdn + '/components'
            }
        });

        //need to load dependencies
        $.require(
            [
                'components/doon/doon.min.js',
                'components/toastr/build/toastr.min.css',
                'components/toastr/build/toastr.min.js'
            ],
            function() {
                //activate all scripts
                $(document.body).doon();
            }
        );
    })();
});
