$(document).ready(function(){

    $('.contentType-carousel').each(function() {
    	var slickConfiguration = {
            dots: true,
            infinite: false,
            speed: 300,
            rows: 0,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '<button class="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" style="display: block;">Previous\n' +
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="previousCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-left">\n' +
                '<title id="previousCarouselsSlideTitle">Avanzar hacia el contenido anterior</title>\n' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-left"></use>\n' +
                '</svg>\n' +
                '</button>\n',
            nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;" aria-disabled="false">Next\n' +
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="nextCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-right">\n' +
                '<title id="nextCarouselsSlideTitle">Avanzar hacia el siguiente contenido</title>\n' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-right"></use>\n' +
                '</svg>\n' +
                '</button>\n',
            respondTo: 'min',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        };

    	if ($(this).hasClass('contentType-carousel-v2')) {
    		slickConfiguration.dots = false;
    		slickConfiguration.arrows = true;
    		slickConfiguration.slidesToShow = 3;
    		slickConfiguration.slidesToScroll = 3;
		}

		$(this).slick(slickConfiguration);
    });

});