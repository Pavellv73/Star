var inputRangeBG = function (e) {
    var r = $(e);
    var n = r.val();
    var mn = r.attr('min') ? r.attr('min') : 0;
    var mx = r.attr('max') ? r.attr('max') : 0;
    n = 100 * (n - mn) / (mx - mn); // процент положения ползунка относительно начала
    r.css({
        'background-image': '-webkit-linear-gradient(left ,#ffffff 0%,#ffffff ' + n + '%,#fff ' + n + '%, #fff 100%)'
    });
};


$(document).ready(function () {

    $('.fancybox').fancybox();

    $('.carousel').carousel();

    $(".phone").mask("+7 (999) 999-99-99");

    $('input').change(function () {
        $('input').removeClass('incorrect correct');
    });

    $('.parallax').parallax();

    //Меню-гамбургер
    $('.hamburger').click(function () {
        openHabmenu();
        return false
    });



    function openHabmenu() {
        // $('.habmenu').slideToggle();
        // $('.line1').toggleClass("block1-click");
        // $('.line2').toggleClass("block2-click");
        // $('.line3').toggleClass("block3-click");
        $('body').toggleClass('no-scroll');
        $('.menu').slideToggle(300);
    };


    var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
        forEach(hamburgers, function(hamburger) {
            hamburger.addEventListener("click", function() {
                this.classList.toggle("is-active");
            }, false);
        });
    }

    // плавный скролинг по ссылкам
    $('.scroll-to').click(function () {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({scrollTop: $(scroll_el).offset().top - 100}, 500);
        }
        return false;
    });

    // $('.base-block, .start-block').click(function () {
    //     if ($('.base-block').hasClass('check-box') || $('.start-block').hasClass('check-box')){
    //         $('.installment').slideDown(300);
    //         return false;
    //     }else{
    //         $('.installment').slideUp(300);
    //         return false;
    //     }
    //
    // });


    $('.base-block').click(function () {
        $(this).parent().find(".base-block").toggleClass('check-box');
        if (!$('.base-block').hasClass('check-box')){
            $('.installment').slideUp(300);
        }else{
            $('.installment').slideDown(300);
        }
    });

    $('.start-block').click(function () {
        $(this).parent().find(".start-block").toggleClass('check-box');
        if (!$('.start-block').hasClass('check-box')){
            $('.installment').slideUp(300);
        }else{
            $('.installment').slideDown(300);
        }
    });





    $('.curs-slider .slick-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next',
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    prevArrow: '.slick-prev',
                    nextArrow: '.slick-next'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    prevArrow: '.slick-prev',
                    nextArrow: '.slick-next'
                }
            }
        ]
    });

    $('.region-block .slick-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.slick-prev-region',
        nextArrow: '.slick-next-region',
        infinite: true,
        dots: true
    });

    $(".questions-answers .questions").click(function () {
        $(this).parent().find(".answers").slideToggle(300);
    });

    var _download = false;
    var _target = '';
    $('form').ajaxForm({
        beforeSubmit: function (d, $e) {
            $('input').removeClass('incorrect');

            var emailReg = new RegExp("^[-0-9a-z\._]+\@[-0-9a-z\.]+\.[a-z]{2,4}$", "i"),
                phoneReg = '';

            for (var j in d) {
                /*телефон*/
                if (d[j].name == 'phone' && d[j].value == '') {
                    $e.find('input[name="phone"]').addClass('incorrect');
                    return false;
                }

                if (d[j].name == 'phone' && d[j].value != '') {
                    for (var i = 0; i <= 9; i++) {
                        phoneReg = new RegExp(i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString());

                        if (phoneReg.test(d[j].value)) {
                            $e.find('input[name="phone"]').addClass('incorrect');
                            return false;
                        }
                    }
                }

                $e.find('input[name="phone"]').addClass('correct');

                /*имя*/
                if (d[j].name == 'name' && d[j].value == '') {
                    $e.find('input[name="name"]').addClass('incorrect');
                    return false;
                }

                $e.find('input[name="name"]').addClass('correct');

                /*email*/
                if (d[j].name == 'email' && d[j].value == '') {
                    $e.find('input[name="email"]').addClass('incorrect');
                    return false;
                }

                if (d[j].name == 'email' && d[j].value != "") {
                    if (!emailReg.test(d[j].value)) {
                        $e.find('input[name="email"]').addClass('incorrect');
                        return false;
                    }
                }

                $e.find('input[name="email"]').addClass('correct');

                /*цель*/
                if (d[j].name == 'target') {
                    _target = d[j].value;
                }

                if (d[j].name == 'download') {
                    _download = true;
                }
            }

            return true;
        },

        success: function (data) {
            if (_download == true) {

                var link = document.createElement('a');
                link.setAttribute('href', '/price.pdf');
                link.setAttribute('download', 'download');
                onload = link.click();

                _download = false;
            }
            console.info(data);
            $('input').removeClass('incorrect correct');
            $.fancybox($('#thnx'));
        }
    });

});
