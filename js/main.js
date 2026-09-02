(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Village timeline detail records - replace placeholders with verified village-history material.
    var timelineRecords = {
        '1920': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1920]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1930': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1930]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1940': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1940]',
            image: '[ADD HISTORICAL IMAGE]',
            video: '[ADD HISTORICAL VIDEO]',
            audio: '[ADD HISTORICAL AUDIO]',
            related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1950': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1950]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1960': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1960]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1970': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1970]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1980': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1980]',
            image: '[ADD HISTORICAL IMAGE]',
            video: '[ADD HISTORICAL VIDEO]',
            audio: '[ADD HISTORICAL AUDIO]',
            related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '1990': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 1990]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '2000': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 2000]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '2010': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 2010]',
            image: '[ADD HISTORICAL IMAGE]', video: '[ADD HISTORICAL VIDEO]', audio: '[ADD HISTORICAL AUDIO]', related: '[ADD RELATED PEOPLE OR EVENTS]'
        },
        '2020': {
            description: '[ADD HISTORICAL DESCRIPTION FOR 2020]',
            image: '[ADD HISTORICAL IMAGE]',
            video: '[ADD HISTORICAL VIDEO]',
            audio: '[ADD HISTORICAL AUDIO]',
            related: '[ADD RELATED PEOPLE OR EVENTS]'
        }
    };

    $('#timelineDetailModal').on('show.bs.modal', function (event) {
        var trigger = $(event.relatedTarget);
        var year = trigger.data('timeline-record');
        var record = timelineRecords[year];

        if (!record) {
            return;
        }

        $('#timelineModalYear').text(year);
        $('#timelineModalDescription').text(record.description);
        $('#timelineModalImage').text(record.image);
        $('#timelineModalVideo').text(record.video);
        $('#timelineModalAudio').text(record.audio);
        $('#timelineModalRelated').text(record.related);
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

})(jQuery);

