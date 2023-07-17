$(document).ready(function(){

    /*
     * NOTA: No me cambiéis el código de este javascript de sitio, por favor.
     */

    $('.slideshow-carousel').slick({
        dots: false, // Esto era TRUE
        arrows: true, // Esto era FALSE
        infinite: false,
        autoplay: true,
        speed: 900,   // Se ha cambiado la velocidad
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" style="display: block;">Previous\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="previousCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-left">\n' +
        '<title id="previousCarouselsSlideTitle">Avanzar hacia el elemento anterior</title>\n' +
        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-left"></use>\n' +
        '</svg>\n' +
        '</button>\n',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;" aria-disabled="false">Next\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="nextCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-right">\n' +
        '<title id="nextCarouselsSlideTitle">Avanzar hacia el siguiente elemento</title>\n' +
        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-right"></use>\n' +
        '</svg>\n' +
        '</button>\n',
        respondTo: 'min',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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
    });

    // Full-width carousel for use in header
    $( ".slideshow-fullwidth" ).closest( ".row" ).addClass( "row-slideshow-fullwidth" ); // select the first div add add the class.

    $('.slideshow-fullwidth').slick({
        dots: true,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 900,
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        respondTo: 'window',
        /*responsive: [
             {
                 breakpoint: 1024,
                 settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1,
                 }
             },
             {
                 breakpoint: 600,
                 settings: {
                     slidesToShow: 1,
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
         ]*/
    });
});