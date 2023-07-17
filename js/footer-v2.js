$(document).ready(function() {

    $('#c1').click(function() {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        $(".cont-searcher").show(500); //muestro capa buscador
        $(".navbar-toggle").hide(500); //oculto icono menu mobile
    });

    $('.close-search').click(function() {
        $(".cont-searcher").hide(500); //oculto capa buscador
        $(".navbar-toggle").show(500); //muestro icono menu mobile
    });

    $('#js-footer-subscribe-to-newsletter-form').submit(function(ev) {
        ev.preventDefault();

        var $form     = $('#js-footer-subscribe-to-newsletter-form');
        var $message  = $('#js-newsletter-message');
        var actionUrl = $form.attr('action');
        var email     = $form.find('[name="email"]').val();
        var agreement = $form.find('[name="agree_terms_and_conditions"]').prop('checked') ? 1 : '';
        var honeyPot  = $form.find('[name="zipcode"]').val();

        var data = {
            email: email,
            zipcode: honeyPot,
            agree_terms_and_conditions: agreement
        };

        $.post(actionUrl, data, null, 'json')
            .done(function(response) {

                console.log(response);

                $message.html(response.message);
                $message.removeClass();

                if (response.type === 'label-success') {
                    $form.addClass('hidden');
                    $('.mini-newsletter-form p').addClass('hidden');
                }

            });
    });
});
